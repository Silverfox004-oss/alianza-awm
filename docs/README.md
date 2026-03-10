# AI Workforce Map — Notion Export

**Export Date:** March 10, 2026  
**Source Workspace:** Notion  
**Parent Page:** AI Workforce Map (https://www.notion.so/31ed807b9111812eae3fd174ed685dfd)  
**Total Pages Exported:** 37  

This directory contains a complete export of the AI Workforce Map Notion workspace, organized to mirror the Notion hierarchy. All content is saved as clean markdown files with metadata headers.

---

## Quick Navigation

### Top-Level Documents

| File | Description | Notion URL |
|------|-------------|-----------|
| `00-value-proposition.md` | Why this product exists, the core insight, the 5 roles | https://www.notion.so/31ed807b911181258ba7f3413743a08a |
| `01-go-to-market-strategy.md` | ICP, positioning, pricing, launch roadmap | https://www.notion.so/31ed807b9111810a9df9c5012531a995 |
| `02-v1-product-specification.md` | Complete technical and design specification for V1 | https://www.notion.so/31ed807b91118127b505e60cd62fb0c2 |
| `engineering-notes.md` | Dev handoff: architecture decisions, build log, API endpoints | https://www.notion.so/31ed807b911181efb456f9eda13997ec |

---

### Phase 0 — Research & Foundation

**Directory:** `phase-0-research/`  
**Notion URL:** https://www.notion.so/31ed807b911181e19b14cbb8ae56d93b

| File | Description | Notion URL |
|------|-------------|-----------|
| `README.md` | Phase 0 overview and contents index | https://www.notion.so/31ed807b911181e19b14cbb8ae56d93b |
| `competitive-landscape-analysis.md` | Full 9-competitor analysis, government frameworks, UX best practices | https://www.notion.so/31ed807b911181099bf1d551bf8154c4 |
| `competitive-landscape-analysis-2.md` | Condensed competitive matrix version | https://www.notion.so/31ed807b911181f5988bcd69530decef |
| `assessment-science-sjt-design.md` | SJT methodology, rubric design, LLM grading, legal/compliance | https://www.notion.so/31ed807b911181d28f65da7300b0ff87 |
| `scoring-schema-json.md` | Machine-readable JSON schema for the scoring pipeline | https://www.notion.so/31ed807b911181ca9cfbdbc79152dab1 |
| `scoring-domains-7-domains.md` | 7 domains with behavior markers at every score level (0-4) | https://www.notion.so/31ed807b91118185900cf126fd1ebaed |
| `scoring-rubric-role-fit-mapping.md` | Complete scoring pipeline spec with worked example | https://www.notion.so/31ed807b91118140afabc410436c0d81 |
| `role-taxonomy-5-ai-roles.md` | 5 role definitions with thresholds, signals, and red flags | https://www.notion.so/31ed807b911181609b24e76ec00c96ce |

---

### Phase 1 — Scenario Engine

**Directory:** `phase-1-scenario-engine/`  
**Notion URL:** https://www.notion.so/31ed807b91118193b29fc6cf678e5eb1

| File | Description | Notion URL |
|------|-------------|-----------|
| `README.md` | Phase 1 overview and contents | https://www.notion.so/31ed807b91118193b29fc6cf678e5eb1 |
| `ai-workflow-failure-modes-research.md` | 24 failure modes across 6 categories with 45+ real-world citations | https://www.notion.so/31ed807b91118191bab3d81264326593 |
| `12-scenario-archetypes.md` | Structural blueprints for all 12 assessment scenario archetypes | https://www.notion.so/31ed807b9111815f9e75dc9f67cf09ce |
| `base-scenarios-1-6.md` | Full SJT scenarios 1-6 with situations, rubrics, pressure prompts | https://www.notion.so/31ed807b911181b6bb18dc0ecf4fc03c |
| `base-scenarios-7-12.md` | Full SJT scenarios 7-12 with situations, rubrics, pressure prompts | https://www.notion.so/31ed807b911181dd9929da55896d5d85 |
| `scenario-variants.md` | All 12 industry variants (SCN-013 through SCN-024) | https://www.notion.so/31ed807b91118150bf1ddd1d499d9f9b |

---

### Phase 1.5 — Structured Markdown Architecture

**Directory:** `phase-1-5-markdown-architecture/`  
**Notion URL:** https://www.notion.so/31ed807b91118122b202c699f00cb4c0

| File | Description | Notion URL |
|------|-------------|-----------|
| `README.md` | Phase 1.5 overview and architecture summary | https://www.notion.so/31ed807b91118122b202c699f00cb4c0 |
| `markdown-architecture-research.md` | Best practices, YAML schemas, hybrid architecture patterns, Anthropic alignment | https://www.notion.so/31ed807b91118124931cc41de4a619c4 |
| `supabase-schema-seed-sql.md` | Full SQL schema (7 tables) and seed data for all 24 scenarios, 7 rubrics, 5 roles | https://www.notion.so/31ed807b91118145afb0c046461b8bd4 |
| `scenario-template-validation-rules.md` | Scenario file template and all validation constraints | https://www.notion.so/31ed807b911181bf9360ef31a811afa8 |
| `scenario-loader-typescript.md` | Typed TypeScript module for reading/filtering scenario files | https://www.notion.so/31ed807b911181c7b821fc60ae73078c |
| `phase-2-research-llm-as-judge.md` | LLM-as-Judge best practices, scoring scale design, bias mitigation | https://www.notion.so/31ed807b911181cca1edcb0e4171a6be |

---

### Phase 2 — Prompt Architecture

**Directory:** `phase-2-prompt-architecture/`  
**Notion URL:** https://www.notion.so/31ed807b911181dea39af1e1cfb52ea3

| File | Description | Notion URL |
|------|-------------|-----------|
| `README.md` | Phase 2 overview and pipeline summary | https://www.notion.so/31ed807b911181dea39af1e1cfb52ea3 |
| `orchestrator-prompt.md` | Assessment flow controller (state machine, scenario selection) | https://www.notion.so/31ed807b911181c8bbe1e8fbad1adfb2 |
| `examiner-prompt.md` | Scenario presenter and follow-up question engine | https://www.notion.so/31ed807b9111817ea0b6db255759a8da |
| `primary-grader-prompt.md` | Rubric-based JSON scoring engine (GPT-4o, temp 0.0) | https://www.notion.so/31ed807b9111817fa4bac16d8cf1794b |
| `skeptic-grader-prompt.md` | Adversarial second-pass evaluator | https://www.notion.so/31ed807b911181fd9d70d5ec5d3d6873 |
| `synthesizer-prompt.md` | Report generation engine — domain scores, role-fit, recommendations | https://www.notion.so/31ed807b911181ecb18be9ae769ba264 |
| `integration-test-mock-walkthroughs.md` | 3 mock employee walkthroughs validating the full prompt chain | https://www.notion.so/31ed807b911181faac25e0204ef6f68a |

---

### Phase 3 — Application Build

**Directory:** `phase-3-application/`  
**Notion URLs:** Multiple (see table below)

| File | Description | Notion URL |
|------|-------------|-----------|
| `README.md` | Phase 3 overview | — |
| `tech-stack-recommendation.md` | Full tech stack analysis: Next.js 15, Supabase, Vercel AI SDK, Inngest | https://www.notion.so/31ed807b9111817e939df34d1843c71d |
| `project-scaffold.md` | Complete developer setup guide with all commands and configuration | https://www.notion.so/31ed807b91118103aef9ed662c0182b7 |
| `screen-1-employee-intake.md` | Employee intake form (Zod schemas, Server Component, API route) | https://www.notion.so/31ed807b9111811ab145cd8135865e83 |
| `screen-2-assessment-engine.md` | Assessment engine with streaming, auto-save, pause/resume | https://www.notion.so/31ed807b91118158a871fc3187491e4c |
| `grading-pipeline.md` | Inngest grading pipeline with all 5 LLM wrappers, reconciliation logic | https://www.notion.so/31ed807b91118100b2b3d01041f208af |
| `screen-3-employee-results.md` | Employee results with radar chart, risk flags, PDF download | https://www.notion.so/31ed807b911181669350e07fb32ebc0e |
| `screen-4-8-employer-dashboard.md` | All 5 employer dashboard views (Overview, Rankings, Matrix, Risk, Training) | https://www.notion.so/31ed807b91118146b279c573323ab1cb |
| `admin-setup-flow.md` | Admin signup, company setup, assessment link generation | https://www.notion.so/31ed807b91118194939dd583e5015245 |

---

## Content Overview

### Scenario Bank (24 Scenarios)
All 24 assessment scenarios are documented in `phase-1-scenario-engine/`:

**Base Scenarios** (SCN-001 to SCN-012):
- SCN-001: Automation Boundary — Insurance (ClaimsIQ deployment)
- SCN-002: Instruction Rewrite — Marketing (Mosaic Digital / VerticalStack)
- SCN-003: Output Comparison — Legal (two AI contract summaries)
- SCN-004: Hidden Error Review — Healthcare (patient intake analysis)
- SCN-005: Missing Context — Financial Services (incomplete data scenario)
- SCN-006: Workflow Handoff — E-Commerce (human/AI handoff design)
- SCN-007: Escalation Judgment — Pharmaceutical (drug-interaction flag)
- SCN-008: Stakeholder Pressure — Consulting (partner deadline pressure)
- SCN-009: Exception Handling — Logistics (inventory conflict)
- SCN-010: Adoption/Communication — Accounting (reluctant auditors)
- SCN-011: Policy/Constraint Adherence — Government (letter and spirit)
- SCN-012: Drift/Repeated Failure — Telecommunications (slow decline)

**Variant Scenarios** (SCN-013 to SCN-024):
- SCN-013: Automation Boundary — Healthcare (TriageAI deployment)
- SCN-014: Instruction Rewrite — HR (job description overhaul)
- SCN-015: Output Comparison — Real Estate (appraisal reports)
- SCN-016: Hidden Error Review — Financial Services (wellness program summary)
- SCN-017: Missing Context — Education (curriculum proposal)
- SCN-018: Workflow Handoff — Logistics (shipment processing pipeline)
- SCN-019: Escalation Judgment — Food Safety (contamination alert)
- SCN-020: Stakeholder Pressure — Investment Banking (managing director's pitch)
- SCN-021: Exception Handling — Energy (grid balancing conflict)
- SCN-022: Adoption/Communication — Legal (skeptical litigators)
- SCN-023: Policy/Constraint Adherence — Healthcare Compliance (patient safety guides)
- SCN-024: Drift/Repeated Failure — (variant in database)

### Assessment Domains (7)
1. Task Framing
2. Process Thinking
3. Verification Instinct
4. Exception Handling
5. Risk Judgment
6. Operational Consistency
7. Change Leverage

### AI-Adjacent Roles (5)
1. AI Operator
2. AI Approver
3. AI Workflow Translator
4. AI QA / Risk Reviewer
5. AI Change Champion

### Prompt Pipeline (5 Prompts)
1. Orchestrator — State machine, scenario selection
2. Examiner — Scenario presentation, follow-up questions
3. Primary Grader — Rubric-based scoring
4. Skeptic Grader — Adversarial audit
5. Synthesizer — Report generation

---

## Tech Stack Summary
- **Framework:** Next.js 15 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **Database:** Supabase PostgreSQL (project: superheros / rpqxsvqxwhzymnujmyun)
- **Auth:** Supabase Auth
- **LLM SDK:** Vercel AI SDK (@ai-sdk)
- **Background Jobs:** Inngest
- **Hosting:** Vercel Pro
- **Charts:** Recharts + Nivo

---

## File Statistics

| Directory | Files | Approx Size |
|-----------|-------|-------------|
| Root level | 4 | ~36 KB |
| phase-0-research/ | 8 | ~240 KB |
| phase-1-scenario-engine/ | 6 | ~440 KB |
| phase-1-5-markdown-architecture/ | 6 | ~80 KB |
| phase-2-prompt-architecture/ | 7 | ~65 KB |
| phase-3-application/ | 9 | ~190 KB |
| **Total** | **40** | **~1.05 MB** |
