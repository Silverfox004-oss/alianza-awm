import { describe, it, expect } from 'vitest'
import {
  reconcileScores,
  normalizeTo100,
  computeOverallScore,
  getReadinessBand,
  DOMAIN_KEYS,
  type DomainKey,
} from '@/lib/utils/scoring'

describe('normalizeTo100', () => {
  it('converts 0-4 raw scores to 0-100', () => {
    expect(normalizeTo100(0)).toBe(0)
    expect(normalizeTo100(1)).toBe(25)
    expect(normalizeTo100(2)).toBe(50)
    expect(normalizeTo100(3)).toBe(75)
    expect(normalizeTo100(4)).toBe(100)
  })
})

describe('getReadinessBand', () => {
  it('maps scores to correct bands', () => {
    expect(getReadinessBand(90)).toBe('high_leverage')
    expect(getReadinessBand(85)).toBe('high_leverage')
    expect(getReadinessBand(75)).toBe('strong')
    expect(getReadinessBand(70)).toBe('strong')
    expect(getReadinessBand(60)).toBe('capable')
    expect(getReadinessBand(55)).toBe('capable')
    expect(getReadinessBand(40)).toBe('emerging')
    expect(getReadinessBand(35)).toBe('emerging')
    expect(getReadinessBand(20)).toBe('not_ready')
    expect(getReadinessBand(0)).toBe('not_ready')
  })
})

describe('computeOverallScore', () => {
  it('returns 0 for all-zero domain scores', () => {
    const scores = Object.fromEntries(DOMAIN_KEYS.map(k => [k, 0])) as Record<DomainKey, number>
    expect(computeOverallScore(scores)).toBe(0)
  })

  it('returns 100 for all-4 domain scores', () => {
    const scores = Object.fromEntries(DOMAIN_KEYS.map(k => [k, 4])) as Record<DomainKey, number>
    expect(computeOverallScore(scores)).toBe(100)
  })

  it('returns a weighted average between 0 and 100', () => {
    const scores = Object.fromEntries(DOMAIN_KEYS.map(k => [k, 2])) as Record<DomainKey, number>
    expect(computeOverallScore(scores)).toBe(50)
  })

  it('weights domains correctly (not a simple average)', () => {
    // task_framing=4, everything else=0 → should be 15% of 100 = 15
    const scores = Object.fromEntries(DOMAIN_KEYS.map(k => [k, 0])) as Record<DomainKey, number>
    scores.task_framing = 4
    expect(computeOverallScore(scores)).toBe(15)
  })
})

describe('reconcileScores', () => {
  function makePrimary(scoreMap: Record<string, number>) {
    const result: any = {
      penalty_flags: [],
      overallImpression: 'test',
      missedPenalty: false,
    }
    for (const key of DOMAIN_KEYS) {
      result[key] = { score: scoreMap[key] ?? 2, evidence: 'test', reasoning: 'test' }
    }
    return result
  }

  function makeSkeptic(scoreMap: Record<string, number>, missedPenalty = false) {
    const result: any = {
      missedPenalty,
      additionalPenaltyFlags: [],
      overallCritique: 'test',
    }
    for (const key of DOMAIN_KEYS) {
      result[key] = { score: scoreMap[key] ?? 2, verdict: 'AGREE' }
    }
    return result
  }

  it('uses primary score when gap is 0-1', () => {
    const primary = makePrimary({ task_framing: 3 })
    const skeptic = makeSkeptic({ task_framing: 3 })
    const { reconciledScores } = reconcileScores(primary, skeptic)
    expect(reconciledScores.task_framing).toBe(3)
  })

  it('uses primary score when gap is exactly 1', () => {
    const primary = makePrimary({ task_framing: 3 })
    const skeptic = makeSkeptic({ task_framing: 2 })
    const { reconciledScores } = reconcileScores(primary, skeptic)
    expect(reconciledScores.task_framing).toBe(3)
  })

  it('uses min score when gap is 2+', () => {
    const primary = makePrimary({ task_framing: 4 })
    const skeptic = makeSkeptic({ task_framing: 2 })
    const { reconciledScores } = reconcileScores(primary, skeptic)
    expect(reconciledScores.task_framing).toBe(2)
  })

  it('applies missed penalty when skeptic flags it but primary did not', () => {
    const primary = makePrimary({})
    const skeptic = makeSkeptic({}, true)
    const { reconciledScores, missedPenaltyApplied } = reconcileScores(primary, skeptic)
    expect(missedPenaltyApplied).toBe(true)
    // All scores should be reduced by 1 (from 2 to 1)
    for (const key of DOMAIN_KEYS) {
      expect(reconciledScores[key]).toBe(1)
    }
  })

  it('does not apply missed penalty when both flagged it', () => {
    const primary = makePrimary({})
    primary.missedPenalty = true
    const skeptic = makeSkeptic({}, true)
    const { missedPenaltyApplied } = reconcileScores(primary, skeptic)
    expect(missedPenaltyApplied).toBe(false)
  })

  it('clamps penalty-reduced scores to 0', () => {
    const primary = makePrimary(Object.fromEntries(DOMAIN_KEYS.map(k => [k, 0])))
    const skeptic = makeSkeptic(Object.fromEntries(DOMAIN_KEYS.map(k => [k, 0])), true)
    const { reconciledScores } = reconcileScores(primary, skeptic)
    for (const key of DOMAIN_KEYS) {
      expect(reconciledScores[key]).toBe(0)
    }
  })
})
