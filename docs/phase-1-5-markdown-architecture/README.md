# Phase 1.5 — Structured Markdown Architecture

**Notion URL:** https://www.notion.so/31ed807b91118122b202c699f00cb4c0  
**Parent:** AI Workforce Map

---

This phase implements the Structured Markdown content architecture — the system that stores all assessment content as structured markdown files with YAML frontmatter, organized in a clean directory, and indexed in a database.

## Core Thesis
Anthropic has validated that structured markdown is superior to broad "unsupervised" agent deployments. This product embraces that pattern: Markdown files are the source of truth for content, with a database index for machine-readable filtering.

## Deliverables
- Markdown Architecture Research (54KB) — Best practices, YAML schemas, hybrid architecture patterns
- Scenario Template + Validation Rules — Standardized format for all scenario files
- Content Directory — 24 scenario files + 7 rubrics + 5 roles, all with YAML frontmatter
- Supabase Schema SQL — 7 tables with enums, indexes, RLS policies
- Seed Data SQL — INSERT statements for all 24 scenarios, 7 rubrics, 5 roles
- Scenario Loader (TypeScript) — Typed module for reading and filtering scenario files

## Architecture
- Markdown files (content/) = source of truth, human-editable
- Supabase database = metadata index for machine queries
- Scenario Loader = TypeScript bridge that reads YAML frontmatter and filters by criteria

## Status
Complete — All deliverables produced and verified.

## Files in This Section
- `markdown-architecture-research.md` — Best practices for Markdown content architecture
- `supabase-schema-seed-sql.md` — Full SQL schema and seed data
- `scenario-template-validation-rules.md` — Template and validation rules for all scenario files
- `scenario-loader-typescript.md` — TypeScript module for reading/filtering scenarios
- `phase-2-research-llm-as-judge.md` — LLM-as-Judge best practices research (stored here as it's under Phase 1.5 in Notion)
