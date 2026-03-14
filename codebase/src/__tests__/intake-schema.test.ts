import { describe, it, expect } from 'vitest'
import { IntakeFormSchema, StartAssessmentRequestSchema } from '@/lib/schemas/intake'

describe('IntakeFormSchema', () => {
  const validData = {
    name: 'Jane Doe',
    title: 'Senior Analyst',
    department: 'Engineering',
    yearsExperience: 5,
    isManager: false,
    toolUsage: ['Excel', 'ChatGPT'],
    priorAiExposure: 'Moderate' as const,
    confidenceWithAmbiguity: 3,
    comfortReviewingWork: 4,
  }

  it('accepts valid intake data', () => {
    const result = IntakeFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing department', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, department: '' })
    expect(result.success).toBe(false)
  })

  it('rejects negative years of experience', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, yearsExperience: -1 })
    expect(result.success).toBe(false)
  })

  it('rejects years of experience over 50', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, yearsExperience: 51 })
    expect(result.success).toBe(false)
  })

  it('rejects invalid AI exposure level', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, priorAiExposure: 'Expert' })
    expect(result.success).toBe(false)
  })

  it('rejects confidence out of 1-5 range', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, confidenceWithAmbiguity: 6 })
    expect(result.success).toBe(false)
  })

  it('defaults isManager to false', () => {
    const { isManager, ...rest } = validData
    const result = IntakeFormSchema.safeParse(rest)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.isManager).toBe(false)
    }
  })

  it('accepts empty toolUsage', () => {
    const result = IntakeFormSchema.safeParse({ ...validData, toolUsage: [] })
    expect(result.success).toBe(true)
  })
})

describe('StartAssessmentRequestSchema', () => {
  const validRequest = {
    linkSlug: 'test-link-001',
    name: 'Jane Doe',
    title: 'Senior Analyst',
    department: 'Engineering',
    yearsExperience: 5,
    isManager: false,
    toolUsage: [],
    priorAiExposure: 'None' as const,
    confidenceWithAmbiguity: 1,
    comfortReviewingWork: 1,
  }

  it('accepts valid request with linkSlug', () => {
    const result = StartAssessmentRequestSchema.safeParse(validRequest)
    expect(result.success).toBe(true)
  })

  it('rejects request without linkSlug', () => {
    const { linkSlug, ...rest } = validRequest
    const result = StartAssessmentRequestSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('rejects empty linkSlug', () => {
    const result = StartAssessmentRequestSchema.safeParse({ ...validRequest, linkSlug: '' })
    expect(result.success).toBe(false)
  })
})
