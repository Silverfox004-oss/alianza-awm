import { describe, it, expect } from 'vitest'
import { loadScenarioFile, loadScenarioFiles, listAvailableScenarios } from '@/lib/utils/scenario-loader'

describe('loadScenarioFile', () => {
  it('loads a base scenario by ID', async () => {
    const scenario = await loadScenarioFile('SCN-001')
    expect(scenario).not.toBeNull()
    expect(scenario!.id).toBe('SCN-001')
    expect(scenario!.title).toBeTruthy()
    expect(scenario!.primaryDomains.length).toBeGreaterThan(0)
  })

  it('loads a variant scenario by ID', async () => {
    const scenario = await loadScenarioFile('SCN-013')
    expect(scenario).not.toBeNull()
    expect(scenario!.id).toBe('SCN-013')
  })

  it('returns null for non-existent scenario', async () => {
    const scenario = await loadScenarioFile('SCN-999')
    expect(scenario).toBeNull()
  })

  it('normalizes hyphenated domain keys to underscored', async () => {
    const scenario = await loadScenarioFile('SCN-001')
    expect(scenario).not.toBeNull()
    for (const domain of scenario!.primaryDomains) {
      expect(domain).not.toContain('-')
      expect(domain).toMatch(/^[a-z_]+$/)
    }
  })

  it('extracts scenario sections from markdown', async () => {
    const scenario = await loadScenarioFile('SCN-001')
    expect(scenario).not.toBeNull()
    expect(scenario!.situation).toBeTruthy()
    expect(scenario!.task).toBeTruthy()
    expect(scenario!.context).toBe(scenario!.situation) // alias
  })

  it('includes rubric content', async () => {
    const scenario = await loadScenarioFile('SCN-001')
    expect(scenario).not.toBeNull()
    expect(scenario!.rubric).toBeTruthy()
  })
})

describe('loadScenarioFiles', () => {
  it('loads multiple scenarios by ID', async () => {
    const scenarios = await loadScenarioFiles(['SCN-001', 'SCN-002', 'SCN-013'])
    expect(scenarios.length).toBe(3)
    expect(scenarios.map(s => s.id)).toContain('SCN-001')
    expect(scenarios.map(s => s.id)).toContain('SCN-002')
    expect(scenarios.map(s => s.id)).toContain('SCN-013')
  })

  it('filters out non-existent scenarios', async () => {
    const scenarios = await loadScenarioFiles(['SCN-001', 'SCN-999'])
    expect(scenarios.length).toBe(1)
  })
})

describe('listAvailableScenarios', () => {
  it('returns all published scenarios', async () => {
    const scenarios = await listAvailableScenarios()
    expect(scenarios.length).toBeGreaterThanOrEqual(12) // at least 12 base scenarios
    for (const s of scenarios) {
      expect(s.id).toMatch(/^SCN-\d{3}$/)
      expect(s.title).toBeTruthy()
    }
  })

  it('includes domain keys as underscored', async () => {
    const scenarios = await listAvailableScenarios()
    for (const s of scenarios) {
      for (const domain of s.primaryDomains) {
        expect(domain).not.toContain('-')
      }
    }
  })
})
