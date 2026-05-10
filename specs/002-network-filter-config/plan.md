# Implementation Plan: Network Filter Configuration

**Branch**: `002-network-filter-config` | **Date**: 2026-05-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-network-filter-config/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a `LINKEDIN_NETWORK_FILTER` env var to control LinkedIn's connection
degree filter (F=1st, S=2nd, O=outside). Auto-construct the search URL from
keyword + network filter when no full URL is provided. Maintain full backward
compatibility with existing `LINKEDIN_SEARCH_URL`.

## Technical Context

**Language/Version**: Node.js 18+ (LTS) — CommonJS modules  
**Primary Dependencies**: playwright ^1.59.1, dotenv  
**Storage**: N/A  
**Testing**: Manual — verify URL construction via log output  
**Target Platform**: Linux (cross-platform via Playwright)  
**Project Type**: CLI automation script (Node.js)  
**Performance Goals**: N/A — trivial string construction  
**Constraints**: URL-safe encoding for network filter array (`["S"]` →
`%5B%22S%22%5D`)  
**Scale/Scope**: Single-user personal automation tool

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Clean Code** ✅ — Small focused change with URL construction
  extracted to config module.
- **II. Security & Credential Management** ✅ — No credentials involved.
- **III. Responsible Automation** ✅ — Network filter doesn't affect
  automation behavior.
- **IV. Resilient Playwright** ✅ — No selector or interaction changes.
- **V. Project Hygiene** ✅ — New env var documented in `.env.example`
  and `README.md`.
- **Development Workflow** ✅ — Following spec workflow.
- **Quality & Review Gates** ✅ — Validation for invalid filter values.

**Result**: GATE PASSED — no violations. Complexity tracking not required.
**Post-design re-check**: ✅ Still passing. Data model, quickstart, and
contracts all align with principles.

## Project Structure

### Documentation (this feature)

```text
specs/002-network-filter-config/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

This feature modifies existing files — no new source files needed:

```text
./
├── src/
│   └── config.js          # MODIFY: add LINKEDIN_NETWORK_FILTER + URL construction
├── .env.example           # MODIFY: add LINKEDIN_NETWORK_FILTER
└── README.md              # MODIFY: add env var to reference table
```

**Structure Decision**: Single-project layout. All changes are in existing
files — no new files required. The URL construction logic lives in
`src/config.js` alongside other configuration logic.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations — all principles satisfied.
