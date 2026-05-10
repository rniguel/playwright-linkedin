<!--
  Sync Impact Report
  Version change: (template) → 1.0.0
  Modified principles: N/A (initial draft - all principles newly defined)
  Added sections:
    - I. Clean Code
    - II. Security & Credential Management
    - III. Responsible Automation
    - IV. Resilient Playwright
    - V. Project Hygiene
    - Development Workflow
    - Quality & Review Gates
    - Governance (amendment procedure, versioning policy, compliance review)
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ no changes needed (Constitution Check is generic)
    - .specify/templates/spec-template.md: ✅ no changes needed
    - .specify/templates/tasks-template.md: ✅ no changes needed
    - .specify/extensions/git/commands/*.md: ✅ no outdated references found
  Follow-up TODOs: None
-->

# Playwright LinkedIn Constitution

## Core Principles

### I. Clean Code

Code MUST be modular, readable, and maintainable. Duplication MUST be avoided
(DRY principle). Functions MUST be small, focused on a single responsibility,
and clearly named. Every function SHOULD fit on a single screen; if it grows
larger, extract sub-functions.

### II. Security & Credential Management

Credentials MUST NEVER be hardcoded. All secrets (passwords, tokens, API keys)
MUST be loaded from environment variables via `dotenv` or equivalent. The
`.env` file MUST be listed in `.gitignore` and NEVER committed to version
control.

### III. Responsible Automation

Automation MUST NOT be aggressive. Random delays (jitter) MUST be applied
between actions to simulate human interaction. Clear, structured logs MUST be
printed to the terminal at each step so the user can follow progress and
diagnose issues. The system MUST NOT send requests faster than a human would.

### IV. Resilient Playwright

Playwright selectors MUST be resilient — prefer text-based (`has-text`,
`getByText`, `getByRole`) and aria-label attributes over fragile CSS chains.
Temporary failures (timeouts, missing elements) MUST be handled with retry
logic. Elements MUST be properly awaited (via `waitForSelector`,
`waitForTimeout`, or `waitForNavigation`) before interaction. `force: true`
SHOULD only be used as a fallback after standard interactions fail.

### V. Project Hygiene

The project MUST have a `README.md` that explains setup, usage, and
configuration. Setup MUST be simple — ideally a single `npm install` command.
All npm scripts MUST be documented in `package.json` with clear descriptions.
Unnecessary files SHOULD NOT be committed to version control.

## Development Workflow

All development MUST follow this workflow:

1. **Specification**: Features are specified in `.specify/` before implementation.
2. **Branching**: Each feature gets a numbered feature branch.
3. **Implementation**: Code is written following the Core Principles above.
4. **Review**: All changes MUST be reviewed for compliance with this constitution.
5. **Commit**: Commits SHOULD be atomic and descriptive.

Automation scripts MUST be idempotent — running them multiple times SHOULD
NOT produce different results.

## Quality & Review Gates

- **Constitution Compliance**: Every PR/review MUST verify compliance with all
  Core Principles.
- **Security Review**: No secrets in code. Environment variable usage MUST be
  documented.
- **Code Quality**: Functions MUST be small, code MUST be DRY, and selectors
  MUST be resilient.
- **Logging**: Every automation step MUST produce a clear, parseable log line.
- **Complexity Justification**: Any deviation from these principles MUST be
  documented and justified.

## Governance

This constitution supersedes all other project practices. Amendments require:

1. A documented proposal explaining the change.
2. Approval from the project maintainer.
3. A migration plan for existing code if the amendment introduces breaking
   changes.

**Versioning Policy**:
- MAJOR: Backward-incompatible governance or principle removals/redefinitions.
- MINOR: New principles or materially expanded guidance.
- PATCH: Clarifications, wording fixes, non-semantic refinements.

**Compliance**: All agents and contributors MUST verify their output against
this constitution. Non-compliant contributions SHOULD be rejected until
brought into alignment.

**Version**: 1.0.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
