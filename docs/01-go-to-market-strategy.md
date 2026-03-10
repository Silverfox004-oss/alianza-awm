# Go-To-Market Strategy

**Notion URL:** https://www.notion.so/31ed807b9111810a9df9c5012531a995  
**Parent:** AI Workforce Map

---

## Ideal Customer Profile (ICP)

### Best V1 Customer
- 100–1,500 employee company
- Actively experimenting with or considering AI rollout
- Knows roles will shift but does not know who internally should own what
- Has no clear rubric for internal AI talent placement
- Wants a safer adoption path than random experimentation
- Ops-heavy or knowledge-work-heavy environment

### Best Early Verticals

| Vertical | Why |
|----------|-----|
| **Logistics** | Human review structure critical for AI-assisted routing and fulfillment |
| **Back-office operations** | High volume of approval-gated workflows |
| **Support organizations** | AI augmentation already happening, QA is the gap |
| **Sales organizations** | Lead qualification and outbound automation need human oversight |
| **Professional services** | Knowledge work with high compliance sensitivity |

### Secondary Targets
- Enterprise innovation teams
- HR / talent leaders redesigning roles for AI
- Consulting firms doing AI transformation work
- Companies creating "AI manager" or "AI operations" roles without clear hiring rubrics

---

## Positioning and Language

### Use These
- AI workforce mapping
- AI role readiness
- AI operating capacity assessment
- Human infrastructure for AI adoption

### Avoid These
- AI aptitude testing
- AI IQ
- Prompt engineer assessment
- Psychometric AI readiness

### The One-Line Pitch
> "We help companies identify which employees can safely operate and supervise AI systems before they deploy them."

### The Enterprise Framing
> "Operating system for companies to deploy humans and AI together."

---

## Pricing Framework (Proposed)
V1 should position as a **decision support product**, not an oracle.

Potential model:
- **Per-assessment pricing** — charge per employee assessed
- **Team packages** — department-level rollouts (20–50 employees)
- **Enterprise license** — unlimited assessments for a company

The product undercuts consulting firms (who charge $50K+ for workforce assessments) while delivering structured, repeatable, data-driven results.

---

## GTM Motion: 60-Day Pre-Launch Roadmap

### Phase 1: Build Prototype (Days 1–14)
- Working assessment flow
- Scoring logic
- Simple dashboard
- Employee report output
- Tools: Replit, Supabase, React frontend, LLM API evaluation pipeline
- No custom ML models needed

### Phase 2: Run Pilot (Days 15–30)
- Target: 20–50 employees tested across 5–10 companies
- Good early targets: companies experimenting with AI, mid-market ops teams, consulting firms, agencies
- Even free pilots are useful at this stage
- Collect feedback on assessment quality and report usefulness

### Phase 3: Refine Scoring (Days 31–45)
- Analyze where scores correlate with manager expectations
- Identify where scoring is inconsistent
- Strengthen weak scenarios
- This is critical — scenario quality becomes the moat

### Phase 4: Evidence and Metrics (Days 46–60)
- Document: number of employees tested, companies participating, feedback quotes
- Collect "unexpected insight" stories
- Build case study material for sales conversations

---

## Sales Strategy

### Lead With the Report
The highest-value deliverable is the **"AI Workforce Map"** report. It should show:
- Who can lead AI pilots now
- Who can be trained fast
- Who should remain approval-only
- Where outside hires are necessary

### Demo Strategy
Show a real assessment output. A company leader seeing their team mapped into AI-ready roles with specific risk flags and upskill paths is an immediate "this is useful" moment.

### Distribution Channels
1. **Direct outreach** — target COOs, VPs of Operations, HR leaders, and CIOs at mid-market companies
2. **Consulting partnerships** — consulting firms doing AI transformation can white-label or resell
3. **Conference/event presence** — AI transformation, HR tech, operations conferences
4. **Content marketing** — publish insights from aggregate assessment data (anonymized)

---

## Competitive Landscape

### Indirect Competitors

| Competitor Type | Limitation |
|-----------------|------------|
| **HR assessment tools** (Pymetrics, Plum) | Measure personality/cognitive traits, not AI workflow capability |
| **Consulting firms** (Deloitte, McKinsey) | Expensive, manual, not scalable or repeatable |
| **AI training platforms** (Coursera, Udemy) | Teach skills but don't assess real operational readiness |
| **Generic skills assessments** | Don't simulate AI workflows or map to AI-specific roles |

### Our Differentiation
- Simulates real AI-enabled work scenarios (not personality tests)
- Maps to operational AI roles (not abstract skill scores)
- Produces team-level deployment plans (not individual certificates)
- Gets smarter with each company deployment (network data effect)
- **Structured Markdown content architecture** — scenarios and rubrics are version-controlled, extensible, and RAG-ready; no competitor has a composable scenario library approach
- **Anthropic-validated thesis** — the industry leader in AI safety has explicitly chosen structured human-oversight workflows over unsupervised agents, confirming the exact product model AI Workforce Map delivers

---

## Biggest Risks to Mitigate

| Risk | Mitigation |
|------|------------|
| **Becomes a gimmick** | Assessment must feel like real work simulation |
| **Scoring trust** | Transparent scoring, explainable reasoning, clear evidence |
| **Overclaiming accuracy** | Position as decision support, never as hiring verdict |
| **"Feature vs. Company" objection** | Frame as infrastructure/operating system, not a point tool |
| **Scenario quality** | Invest heavily in scenario design — it determines everything |

---

## Revenue Path: $0 to $1M ARR
1. **Months 1–3:** Build prototype, run 5–10 free pilots, refine scoring
2. **Months 3–6:** Begin charging ($100–$500 per pilot, per-employee pricing)
3. **Months 6–9:** Land 10–20 paying customers, build case studies
4. **Months 9–12:** Scale to 30–50 customers, introduce team/enterprise packages
5. **Target:** ~$1M ARR from mid-market companies at $2K–$5K per department assessment

---

## Funding Path (Optional)

### Y Combinator Viability
- Fits YC themes: enterprise AI tooling, workforce transformation, infrastructure for AI adoption
- Strongest with: working prototype + pilot users + traction metrics
- YC invests ~$500K for ~7% equity
- Acceptance rate: ~1–2%, significantly higher with prototype + early users

### Alternative Accelerators
- Techstars
- 500 Global
- Antler

### Bootstrap Path
Build prototype → sell pilots → reach $10K–$20K MRR → raise seed from angels
