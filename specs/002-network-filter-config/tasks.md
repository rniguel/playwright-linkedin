---

description: "Task list for Network Filter Configuration"

---

# Tasks: Network Filter Configuration

**Input**: Design documents from `specs/002-network-filter-config/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, research.md

**Tests**: Not requested — manual verification via log output.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, root files at repository root
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project initialization needed — project is already set up.

No tasks — skipping.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic that MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 Add `LINKEDIN_NETWORK_FILTER` parsing, validation (F/S/O codes),
  and URL-safe encoding in `src/config.js`

**Checkpoint**: Network filter configured and validated

---

## Phase 3: User Story 1 — Network Filter as Env Variable (Priority: P1) 🎯 MVP

**Goal**: A user can control the LinkedIn network filter via
`LINKEDIN_NETWORK_FILTER` env var without crafting a full URL.

**Independent Test**: Set `LINKEDIN_NETWORK_FILTER=F`, restart script,
confirm search URL contains `network=%5B%22F%22%5D` in logs.

### Implementation for User Story 1

- [x] T002 [P] [US1] Add `LINKEDIN_NETWORK_FILTER` to `.env.example` with documentation comment
- [x] T003 [US1] Add `LINKEDIN_NETWORK_FILTER` to `README.md` env var reference table

**Checkpoint**: Network filter env var is functional and documented

---

## Phase 4: User Story 2 — Search URL Auto-Construction (Priority: P2)

**Goal**: The search URL is automatically built from `TARGET_COMPANY`
keyword + `LINKEDIN_NETWORK_FILTER` when no full URL is provided.

**Independent Test**: Set only `TARGET_COMPANY=google` + `LINKEDIN_NETWORK_FILTER=S`,
run script, confirm the search URL is auto-constructed.

### Implementation for User Story 2

- [x] T004 [US2] Ensure `LINKEDIN_SEARCH_URL` takes precedence when set (backward compat)
- [x] T005 [US2] Verify full scenario — run script with only `TARGET_COMPANY`
  + `LINKEDIN_NETWORK_FILTER`, confirm URL construction in logs

**Checkpoint**: URL auto-construction works, backward compat preserved

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification

- [x] T006 Final verification — confirm all FR-001 to FR-006 are satisfied

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — can start immediately
- **User Stories (Phase 3+)**: Both depend on Phase 2 completion
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — No dependencies on other stories
- **US2 (P2)**: Can start after Foundational — May verify US1 is working first

### Within Each User Story

- Core logic before docs
- Implementation before verification

### Parallel Opportunities

- T002 [P] can run in parallel with other tasks (different file: `.env.example`)

---

## Parallel Example: Documentation

```bash
# Launch docs update alongside config changes:
Task: "Add LINKEDIN_NETWORK_FILTER to .env.example"
Task: "Add LINKEDIN_NETWORK_FILTER to README.md"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (T001 — config logic)
2. Complete Phase 3: US1 (T002-T003 — env var functional + documented)
3. **STOP and VALIDATE**: Test US1 independently
4. Proceed to US2 if desired

### Incremental Delivery

1. Complete Foundational → Core config logic ready
2. Add US1 (env var) → Network filter env var works (MVP!)
3. Add US2 (auto-construction) → Full URL auto-construction
