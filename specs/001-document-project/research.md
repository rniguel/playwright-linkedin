# Research: Project Documentation & Code Organization

## Overview

All technical context items were known from existing project inspection. No
`[NEEDS CLARIFICATION]` markers required resolution.

## Decisions

### Module Structure

- **Decision**: Modules by functionality (auth, search, connection, pagination)
- **Rationale**: Natural separation of concerns; aligns with user clarification
  (Q4). Each module has a single responsibility and a clear interface.
- **Alternatives considered**:
  - Layers (service/util/config): Over-engineering for a single-entry-point CLI

### Delay/Retry Configuration

- **Decision**: Centralized `config.js` module with env var overrides
- **Rationale**: FR-011/FR-012 require both centralization and configurability.
  A constants module with `process.env` fallback is the simplest approach.
- **Alternatives considered**:
  - Hardcoded constants (current): Not configurable without editing source

### Entry Point

- **Decision**: Keep `linkedin.js` as the main entry point, stripping inline
  logic in favor of module orchestration
- **Rationale**: FR-009 requires the entry point to be a simple orchestrator.
  Preserving the filename avoids breaking existing muscle memory/documentation.

### Error Handling

- **Decision**: Each module catches and re-throws with context prefix
- **Rationale**: FR-013 requires clear failure reporting. A consistent prefix
  (e.g., `[auth]`, `[search]`) makes logs scannable.
- **Alternatives considered**:
  - Global error handler: Hides module origin

### Logging

- **Decision**: Structured prefix-based console output per FR-014
- **Rationale**: Consistent format (`[module] message`) improves debugging.
- **Alternatives considered**:
  - Library (e.g., winston, pino): Overkill for a personal CLI script

### Environment Variables

| Variable | Current | Proposed |
|----------|---------|----------|
| `TARGET_COMPANY` | Yes | Keep + document |
| `LINKEDIN_SEARCH_URL` | Yes | Keep + document |
| `DELAY_BETWEEN_ACTIONS` | No | Add (default: 2500ms) |
| `DELAY_AFTER_SCROLL` | No | Add (default: 1500ms) |
| `DELAY_BETWEEN_CONNECTIONS` | No | Add (default: 4000-8000ms random) |
| `MAX_SCROLLS` | No | Add (default: 15) |
| `MAX_RETRIES` | No | Add (default: 3) |
