---
id: "SCN-002"
title: "Instruction Rewrite — B2B Social Media Content"
slug: "instruction-rewrite-marketing"
version: "1.0.0"

archetype: "instruction-rewrite"
module: 1
difficulty: 1
industry: "marketing"

primary_domains:
  - "task-framing"
secondary_domains:
  - "process-thinking"
  - "risk-judgment"
target_roles:
  - "ai-operator"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: null
---

## Situation

You work as a Content Strategist at Mosaic Digital, a 35-person marketing agency in Austin, Texas. Mosaic serves mid-market B2B clients across industries including SaaS, commercial real estate, and professional services. The agency recently subscribed to an enterprise AI content platform called Catalyst AI, which can generate social media posts, blog drafts, ad copy, email sequences, and content calendars based on written instructions.

Your Account Manager, Jake Peralta, forwards you an email from the client's marketing director, Sandra Chen, at VerticalStack — a B2B SaaS company that sells project management software to construction firms. Sandra's email reads:

> *Hi Jake,*
>
> *We need to step up our social media game. Our LinkedIn is basically dead and our competitors are everywhere. Can you use that AI tool you mentioned to make our social media better? We want to post more and get more engagement. Our CEO saw a competitor's viral post last week and now he's on my case about it.*
>
> *Budget isn't a huge concern right now — we just need results. The CEO wants to see improvement by end of Q2.*
>
> *Thanks,*
> *Sandra*

Jake forwards this to you with a note: "Can you set up Catalyst AI to handle this? Sandra's been a client for 3 years and they're renewing in July — we need to keep them happy. Let me know what you need from them."

You know a few things about VerticalStack from prior work: they sell a project management platform called BuildFlow to mid-size construction companies ($10M–$100M revenue), their primary buyer persona is VP of Operations at construction firms, their brand voice has historically been practical and no-nonsense (they avoid buzzwords), and they compete primarily against Procore and Monday.com's construction vertical.

## The Challenge

Sandra's request is vague on virtually every dimension that matters for producing useful AI output. "Make our social media better" provides no specifics about: what platforms beyond LinkedIn, what type of content (thought leadership? product demos? customer stories?), what "better" means in measurable terms, what topics to cover or avoid, who will review and approve the AI-generated content, what the posting frequency should be, or what success looks like by end of Q2.

If you pass this instruction to Catalyst AI as-is, you'll get generic social media content that could apply to any SaaS company — content that will feel hollow to VerticalStack's niche construction audience and will likely embarrass both Mosaic and VerticalStack if posted. Your job is to transform Sandra's vague request into one or more structured, bounded AI instructions that would actually produce useful output.

## Your Task

1. **Rewrite Sandra's request** into a structured AI instruction (or set of instructions) that you could input into Catalyst AI to produce useful, on-brand social media content for VerticalStack. Your rewritten instruction(s) should be specific enough that a different strategist at Mosaic could use them and get comparable results.
2. **Identify what information is still missing** — what questions would you need Sandra or Jake to answer before you could finalize the AI instruction? List at least 3 specific questions with an explanation of why each one matters.
3. **Define success criteria** — how would you measure whether the AI-generated content is working? What would make you reject an output versus approve it?

## Follow-Up Pressure Prompt

*Delivered after the test-taker submits their initial response:*

Jake responds to your rewrite:

> "This is great, but Sandra called and she's anxious — the CEO is breathing down her neck. She wants to see a week's worth of LinkedIn posts by Thursday. We don't have time to go back to her with a bunch of questions. Can you just work with what we know about VerticalStack and get Catalyst AI to generate 5 posts for next week? We can refine later. I don't want to look like we're stalling."

Do you generate the 5 posts now with the information you have, or do you push back? If you generate them, what guardrails do you put in place? If you push back, how do you balance Sandra's urgency with the risk of producing low-quality content?

## Scoring Rubric

### Primary Domains

#### Task Framing

- Score 4 (Excellent): Decomposes Sandra's single vague request into 2-3 distinct content workstreams (e.g., thought leadership, product features, customer success stories) with separate AI instructions for each. Each instruction specifies: target audience (VPs of Operations at mid-size construction firms), platform (LinkedIn), content format (post length, media type), tone (practical, no-nonsense, avoid buzzwords), topic scope (construction project management, BuildFlow features, industry trends), constraints (no claims without evidence, no direct competitor bashing, compliance with LinkedIn best practices), input requirements (what reference material the AI needs — product specs, customer quotes, past approved content), and success criteria (measurable engagement metrics tied to Q2 goals). Explicitly pushes back on the premise: "This is actually 2-3 different content types that need different AI approaches." Includes failure handling: what to do if AI output mentions competitors by name, makes unsupported claims, or generates content inappropriate for the construction industry.
- Score 3 (Strong): Produces a well-structured instruction that covers: audience, platform, format, tone, topic boundaries, and constraints. Identifies multiple missing information items with clear reasoning. Defines measurable success criteria. Includes at least one edge-case consideration (e.g., "If the AI generates content referencing BuildFlow features that don't exist, reject and regenerate"). Instruction is reproducible by another strategist.
- Score 2 (Acceptable): Produces a structured instruction with most major parameters (audience, format, tone, key constraints). Identifies that information is missing and asks at least 2 relevant questions. Defines success criteria but they may be vague ("good engagement"). Instruction is functional but missing some secondary elements.
- Score 1 (Weak): Adds some specificity to Sandra's request but the instruction remains broad ("Create engaging LinkedIn posts for a B2B SaaS company in construction"). Missing critical parameters like tone, constraints, or audience specifics. Identifies that the request is vague but can't effectively restructure it. Questions are generic ("What do you want?") rather than specific.
- Score 0 (Unsafe/Poor): Passes Sandra's request to the AI essentially unchanged ("Use AI to make VerticalStack's social media better — generate LinkedIn posts that get more engagement"). No meaningful restructuring. No identification of missing information. No success criteria.

### Secondary Domains

#### Process Thinking

- Score 4 (Excellent): Frames the AI instruction as part of a larger content workflow: instruction → AI generation → human review → client approval → scheduling → performance monitoring → instruction refinement. Identifies who reviews at each stage and what they check.
- Score 3 (Strong): Identifies that AI-generated content needs a review and approval step before posting. Mentions downstream workflow (who approves, how feedback gets incorporated).
- Score 2 (Acceptable): Mentions that someone should review the AI output before sending to client. Basic workflow awareness.
- Score 1 (Weak): Treats the AI instruction as the entire process — generate and post. No downstream workflow consideration.
- Score 0 (Unsafe/Poor): Implies AI output goes directly to posting without any human review.

#### Risk Judgment

- Score 4 (Excellent): Identifies specific risks of using vague AI instructions for a client: off-brand content damaging client relationship, factually incorrect claims about BuildFlow, content that alienates the construction audience, and reputational risk to Mosaic if poor-quality AI content is associated with their agency. Notes that the July renewal is at stake.
- Score 3 (Strong): Identifies at least 2 specific risks of proceeding with vague instructions. Connects risk to business outcome (client renewal).
- Score 2 (Acceptable): Mentions that vague instructions could produce poor results but doesn't articulate specific risks or business consequences.
- Score 1 (Weak): No risk awareness — treats the task as straightforward execution.
- Score 0 (Unsafe/Poor): Generates content without acknowledging any risk. May even recommend posting AI content without client review.

## Ideal Response Guide

An expert-level response would produce something like the following (demonstrating the transformation from vague to structured):

**Original request:** "Use AI to make our social media better."

**Rewritten as 2-3 structured instructions:**

*Instruction 1 — Thought Leadership Posts:*
"Generate 3 LinkedIn posts per week (150-200 words each) for VerticalStack, a B2B SaaS company selling BuildFlow project management software to mid-size construction firms ($10M-$100M revenue). Target audience: VPs of Operations and Project Managers at construction companies. Tone: practical, direct, no-nonsense — avoid marketing buzzwords like 'revolutionary,' 'game-changing,' or 'synergy.' Topics should address real construction project management challenges: schedule delays, budget overruns, subcontractor coordination, change order tracking, safety compliance documentation. Do NOT mention competitors by name. Do NOT make claims about BuildFlow features without referencing the attached product spec sheet. Each post should end with a discussion question or practical tip, not a hard sales CTA. Format: plain text with line breaks for readability, no emojis, 2-3 relevant hashtags from this approved list: [list needed from client]."

The expert response would also: identify that Sandra hasn't specified whether she wants organic-only or paid social, whether there are compliance or legal review requirements for B2B claims, what existing content has performed well (for tone calibration), and whether the CEO's desire to match a competitor's "viral" post is realistic for a niche B2B audience. The response would define success criteria tied to measurable outcomes: LinkedIn impressions increase X%, engagement rate (likes + comments / impressions) exceeds Y%, and at least Z inbound inquiries attributed to LinkedIn by Q2 end — while noting that these targets need Sandra's input.

In the follow-up, the expert response balances urgency with quality: "I can generate 5 draft posts by Thursday using what we know about VerticalStack, but they go as drafts to Sandra — not for publishing. Here's why: if we post generic AI content on VerticalStack's LinkedIn without Sandra's sign-off, and it's off-brand or contains an inaccurate product claim, that's worse than no posts at all — especially with the renewal in July. I can send Sandra the 5 drafts along with our 3 key questions formatted as quick yes/no choices so she can approve and answer at the same time. This way she sees immediate progress and we get the inputs we need."

## Common Mistakes

- **Adding only adjective-based specificity** — "Make the posts professional, engaging, and impactful" adds no actionable structure; these are subjective adjectives, not measurable constraints
- **Not decomposing the request** — treating "make social media better" as a single AI instruction rather than recognizing it contains multiple distinct content types
- **Ignoring the audience context** — writing instructions for generic B2B content instead of construction-industry-specific content for a technical buyer persona
- **Missing the tone specification** — not leveraging the known brand voice (practical, no-nonsense) as a constraint, which would cause the AI to default to generic marketing-speak
- **Generic questions** — asking "What do you want?" instead of specific questions like "Do you have approved customer quotes we can reference?" or "Are there product features in development that we should NOT mention?"
- **No failure handling** — no mention of what to do when AI output is off-brand, factually wrong, or mentions competitors
- **Caving completely in the follow-up** — generating and posting 5 posts without client review because Jake is anxious
- **Over-specifying to the point of paralysis** — listing so many constraints that the AI couldn't satisfy all of them simultaneously

## Red Flags

- **Passes Sandra's request to the AI essentially unchanged** — "Tell Catalyst AI to generate LinkedIn posts that make VerticalStack's social media better and increase engagement." This indicates zero Task Framing capability and is indistinguishable from what a person with no AI literacy would produce.
- **Invents details not in the scenario** — fabricates VerticalStack product features, customer names, or statistics to include in the instruction. This is worse than vagueness — it's injecting false information.
- **Recommends posting AI-generated content without any human review** — "Generate 5 posts and schedule them for next week." This bypasses the fundamental client-review relationship and creates risk of off-brand or incorrect content being published under the client's name.
- **Shows no awareness that vague instructions create problems** — treats Sandra's email as a perfectly adequate brief and proceeds to "just run it through the AI."

## Reliability Modifier Triggers

- **RM-6 (Inability to Explain Reasoning):** Triggered if the test-taker produces a reasonable instruction but, in the follow-up, cannot explain why specific constraints matter — e.g., cannot explain why specifying tone as "no-nonsense" matters for a construction audience.
- **RM-1 (Contradiction):** Triggered if the test-taker includes constraints in the instruction that contradict the known brand voice (e.g., specifying "fun, playful tone" when VerticalStack is known for being practical and no-nonsense).
- **RM-2 (Overconfidence):** Triggered if the test-taker claims their instruction "covers everything" or produces "complete" instructions while still missing critical elements like success criteria, review process, or failure handling. Also triggered if the follow-up response generates content with no caveats: "These 5 posts are ready to publish."
