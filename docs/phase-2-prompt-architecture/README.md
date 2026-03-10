# Phase 2 — Prompt Architecture

**Notion URL:** https://www.notion.so/31ed807b911181dea39af1e1cfb52ea3  
**Parent:** AI Workforce Map

---

Phase 2 builds the 5-prompt AI pipeline that powers the assessment engine.

**Pipeline:** Orchestrator > Examiner > Primary Grader > Skeptic Grader > Synthesizer

**Research basis:** Phase 2 Research document (under Phase 1.5)

## Key design decisions from research:
- 0-4 integer scale (validated as optimal by 2026 research)
- Chain-of-thought before all scores
- Structured JSON output via tool_use / Structured Outputs
- Atomic per-domain evaluation
- Skeptic as auditor, not re-grader
- Temperature 0.0-0.1 for grading, 0.3-0.5 for Examiner
- GPT-4o / Claude 3.5 Sonnet for grading; GPT-4o-mini / Gemini Flash for orchestration
- Estimated cost: ~$0.42 per 6-scenario assessment

## Files in This Section
- `orchestrator-prompt.md` — Assessment flow controller state machine
- `examiner-prompt.md` — Scenario presenter and follow-up question engine
- `primary-grader-prompt.md` — Rubric-based JSON scoring engine
- `skeptic-grader-prompt.md` — Adversarial second-pass evaluator
- `synthesizer-prompt.md` — Report generation engine
- `integration-test-mock-walkthroughs.md` — 3 mock employee integration test walkthroughs
