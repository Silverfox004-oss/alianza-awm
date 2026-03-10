---
id: "SCN-014"
title: "The Job Description Overhaul"
slug: "instruction-rewrite-hr-recruiting"
version: "1.0.0"

archetype: "instruction-rewrite"
module: 1
difficulty: 1
industry: "hr-recruiting"

primary_domains:
  - "task-framing"
  - "process-thinking"
secondary_domains:
  - "risk-judgment"
target_roles:
  - "ai-operator"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-002"
---

## Situation

You work as a Talent Acquisition Specialist at Ridgeline Partners, a 50-person HR consulting firm in Denver that provides recruiting and employer branding services for mid-market technology companies. Ridgeline recently subscribed to TalentForge AI, an enterprise platform that can generate job descriptions, candidate outreach messages, interview guides, compensation benchmarking summaries, and employer brand content based on written instructions.

Your Account Lead, Megan Torres, forwards you an email from the client's VP of Engineering, David Kim, at NexaBridge — a 200-person data infrastructure startup that builds ETL pipeline tools for enterprise clients. NexaBridge has been growing rapidly (headcount doubled in 18 months) and their talent acquisition process has not kept pace — they're still using the same job descriptions their first recruiter wrote three years ago. David's email reads:

> *Hi Megan,*
>
> *We're hiring like crazy and our job postings aren't getting enough qualified applicants. We need to revamp all our engineering job descriptions — they're too generic and we're attracting the wrong candidates. Can you use that AI writing tool to redo our job posts? We have about 8 open roles and we need them up ASAP. Our CTO thinks our postings sound like every other startup and that's why senior engineers keep passing.*
>
> *Thanks,*
> *David*

Megan forwards this to you with a note: "Can you set up TalentForge AI to rewrite their job descriptions? NexaBridge is our biggest new client this year — they signed a \$180K annual contract in January. Let me know what you need."

You know a few things about NexaBridge from onboarding: they build an ETL platform called DataBridge targeting enterprise data teams, their primary candidate persona is senior backend engineers with 5-8 years of experience in distributed systems, their engineering culture emphasizes autonomy and pragmatism over process and ceremony (they famously have no stand-up meetings), and they compete for talent against Snowflake, Databricks, and Fivetran. You also know that NexaBridge has struggled specifically with senior candidates accepting offers — their acceptance rate for senior engineers is 31%, well below the industry average of 55%, suggesting the issue may be deeper than just the job postings.

## The Challenge

David's request is vague on virtually every dimension that matters for producing useful AI output. "Redo our job posts" provides no specifics about: what's wrong with the current postings (is it the content, the format, the distribution channels, or all three?), what "qualified" means in measurable terms (qualified for what level? What technical stack?), what the actual role requirements are versus nice-to-haves, what the compensation range is (critical for attracting senior talent, and now legally required in Colorado, where NexaBridge is based), what NexaBridge's employee value proposition is beyond generic startup perks, whether there are DEI considerations for inclusive language screening, who will review and approve the rewritten descriptions before they go live, or what success looks like (more applicants? Better-qualified applicants? Higher acceptance rates?). If you pass this instruction to TalentForge AI as-is, you'll get generic startup job descriptions that could apply to any data company — descriptions that will feel hollow to the senior distributed-systems engineers NexaBridge is specifically trying to attract.

## Your Task

1. **Rewrite David's request** into a structured AI instruction (or set of instructions) that you could input into TalentForge AI to produce useful, differentiated job descriptions for NexaBridge. Your rewritten instruction(s) should be specific enough that a different specialist at Ridgeline could use them and get comparable results.
2. **Identify what information is still missing** — what questions would you need David or Megan to answer before you could finalize the AI instruction? List at least 3 specific questions with an explanation of why each one matters.
3. **Define success criteria** — how would you measure whether the AI-generated job descriptions are working? What would make you reject an output versus approve it?

## Follow-Up Pressure Prompt

Megan responds to your rewrite:

> "This is solid, but David just called — they have a hiring event next Wednesday and need all 8 job descriptions live on their careers page by Friday. We don't have time to go back with a bunch of questions. Can you just work with what we know about NexaBridge and get TalentForge to generate the 8 descriptions now? We can tweak later. David's CTO is presenting at the event and wants the postings up."

Do you generate the 8 descriptions now with the information you have, or do you push back? If you generate them, what guardrails do you put in place? If you push back, how do you balance David's urgency with the risk of producing ineffective job descriptions?

## Scoring Rubric

### Primary Domains

**Task Framing**

- Score 4 (Excellent): Decomposes David's single vague request into distinct deliverable workstreams (e.g., technical role descriptions, role-level differentiation, culture/EVP framing) with separate AI instructions for each. Each instruction specifies: target candidate persona (senior backend engineers, 5-8 years, distributed systems), technical stack requirements, company culture framing (autonomy, pragmatism, no stand-up meetings), compensation range constraints (Colorado salary transparency law compliance), tone (direct and specific — avoid generic startup clichés), topic scope (DataBridge ETL product, enterprise data engineering challenges), constraints (no discriminatory language, salary range required by Colorado EPEWA, no unverifiable technical claims), input requirements (what reference material TalentForge needs — current JDs, tech stack docs, sample approved descriptions), and success criteria (qualified applicant rate, acceptance rate improvement). Identifies that the 31% acceptance rate suggests the problem may be offer-stage, not application-stage, and flags this for Megan's awareness.
- Score 3 (Strong): Produces a well-structured instruction covering candidate persona, technical requirements, culture framing, tone, and key constraints. Identifies multiple missing information items with clear reasoning. Defines measurable success criteria. Recognizes that Colorado salary transparency law requires compensation ranges in postings. Instruction is reproducible by another specialist.
- Score 2 (Acceptable): Produces a structured instruction with most major parameters. Identifies that information is missing and asks at least 2 relevant questions. Defines success criteria but they may be vague. Instruction is functional but missing some elements (e.g., legal/compliance dimension, the acceptance rate signal).
- Score 1 (Weak): Adds some specificity to David's request but the instruction remains broad. Missing critical parameters like technical stack, compensation transparency requirements, or candidate persona specifics. Questions are generic rather than specific.
- Score 0 (Unsafe/Poor): Passes David's request to TalentForge essentially unchanged. No meaningful restructuring. No identification of missing information. No success criteria.

**Process Thinking**

- Score 4 (Excellent): Frames the AI instruction as part of a larger hiring workflow: instruction → AI generation → internal review → legal/compliance check → client approval → posting → applicant quality tracking → instruction refinement. Identifies who reviews at each stage and what they check. Recognizes that DEI language review and compensation transparency compliance must happen before posting.
- Score 3 (Strong): Identifies that AI-generated job descriptions need legal review (Colorado salary transparency) and client approval before posting. Mentions downstream workflow (who approves, how quality is tracked).
- Score 2 (Acceptable): Mentions that someone should review the AI output before posting. Basic workflow awareness.
- Score 1 (Weak): Treats the AI instruction as the entire process — generate and post. No downstream workflow consideration.
- Score 0 (Unsafe/Poor): Implies AI output goes directly to posting without any human review.

### Secondary Domains

**Risk Judgment**

- Score 4 (Excellent): Identifies specific risks of using vague AI instructions for this client: discriminatory language in job postings (Title VII and state employment law exposure), missing compensation range (Colorado EPEWA violation — civil penalties), misrepresentation of role requirements leading to bad hires, off-brand content that alienates senior distributed-systems engineers, and reputational risk to Ridgeline as a talent consulting firm. Notes that the $180K annual contract and January signing date make this a high-stakes client relationship. Flags that the 31% acceptance rate suggests a deeper problem than job description copy.
- Score 3 (Strong): Identifies at least 2 specific risks of proceeding with vague instructions. Connects risk to business outcome (client relationship, potential legal exposure). Recognizes the compensation transparency legal requirement.
- Score 2 (Acceptable): Mentions that vague instructions could produce poor results but doesn't articulate specific risks or legal consequences.
- Score 1 (Weak): No risk awareness — treats the task as straightforward execution.
- Score 0 (Unsafe/Poor): Generates content without acknowledging any risk.

## Ideal Response Guide

An expert-level response produces something like the following (demonstrating the transformation from vague to structured):

**Original request:** "Use AI to redo our job posts."

**Rewritten as structured instructions:**

*Instruction — Senior Backend Engineer (example):*
"Generate a job description for a Senior Backend Engineer at NexaBridge, a 200-person data infrastructure company in Denver, CO building DataBridge — an enterprise ETL platform. Target candidate: senior backend engineers with 5-8 years of experience in distributed systems, data pipelines, and high-throughput systems. Required technical skills: [list from NexaBridge — needed before generating]. Culture framing: NexaBridge values autonomy and pragmatism — no stand-up meetings, minimal process, engineers make decisions. Competing against Snowflake, Databricks, Fivetran for talent — emphasize engineering scope and ownership, not ping-pong tables. Compensation: [required by Colorado law — must be provided]. Do NOT use generic startup language ('fast-paced,' 'rock star,' 'ninja'). DO include a specific description of what the engineer will own and build in the first 90 days. Format: 400-550 words, plain language, no jargon for jargon's sake."

The expert response also identifies: that the 31% senior engineer acceptance rate suggests the problem may be offer-stage (compensation, competing offers, leveling) rather than application-stage — and flags this to Megan as a separate strategic issue that job description rewrites alone won't fix.

In the follow-up, the expert response balances urgency with quality: generates 8 draft descriptions by Friday using what is known about NexaBridge, but sends them as drafts requiring David's review before posting — not as final, live-ready documents. Includes Colorado salary range placeholders with a note that they must be filled in before posting to comply with EPEWA. Packages the key missing questions alongside the drafts so David can answer them in the same review pass.

## Common Mistakes

- **Adding only adjective-based specificity** — "Make the descriptions professional and engaging" adds no actionable structure
- **Not decomposing the request** — treating "redo 8 job descriptions" as a single AI instruction rather than recognizing each role may need different instructions
- **Ignoring Colorado salary transparency law** — not noting that compensation ranges are legally required in job postings for a Colorado-based employer
- **Missing the acceptance rate signal** — not recognizing that 31% senior engineer acceptance rate suggests a deeper problem than copy quality
- **Generic questions** — asking "What do you want in the descriptions?" instead of specific questions about technical stack, compensation bands, or EVP differentiators
- **No failure handling** — no mention of what to do when AI output uses discriminatory language patterns or unverifiable claims
- **Caving completely in the follow-up** — generating and posting 8 descriptions without client review because of the hiring event deadline
- **Not recognizing the legal risk dimension** — treating job descriptions as purely a marketing/copywriting task rather than recognizing they have employment law implications

## Red Flags

- **Passes David's request to TalentForge essentially unchanged** — indicates zero Task Framing capability and would produce generic job descriptions indistinguishable from what any data startup uses.
- **Recommends posting AI-generated job descriptions without any client review** — bypasses the fundamental client-approval relationship and creates risk of discriminatory language, inaccurate requirements, or missing legal compliance elements being published.
- **Ignores the Colorado salary transparency requirement entirely** — missing a legal compliance requirement that carries civil penalties is a material oversight for an HR consulting firm.
- **Treats the acceptance rate signal as irrelevant** — "David just wants better job descriptions" — without recognizing that a 31% acceptance rate at the offer stage points to a problem that better copy cannot fix.
- **Invents NexaBridge details not in the scenario** — fabricates technical requirements, compensation ranges, or product features to include in the instruction.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the response includes constraints about legal compliance (Colorado salary transparency) in the initial instruction but then, in the follow-up, agrees to post descriptions without the compensation range because of time pressure — directly contradicting the stated legal obligation.
- **Reasoning Absence:** Triggered if the test-taker produces a reasonable instruction but cannot explain why specific constraints matter — e.g., cannot explain why specifying the candidate persona as "5-8 years, distributed systems" matters versus "experienced engineers."
- **Pressure Capitulation:** Triggered if the quality of reasoning visibly degrades between the initial response and the follow-up. A response that generates drafts for the Friday deadline but clearly marks them as not-for-posting-until-reviewed scores higher than one that simply capitulates: "Sure, I'll generate all 8 and David can review live."
