---

description: "Task list for Project Documentation & Code Organization"

---

# Tasks: Project Documentation & Code Organization

**Input**: Design documents from `specs/001-document-project/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Tests**: Not requested in spec — manual verification only.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, root files at repository root
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `src/` directory structure for modular code
- [x] T002 [P] Create `src/config.js` with delay/retry/env constants and defaults per data-model.md
- [x] T003 [P] Create `.env.example` with all documented env vars and comments

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modules extracted from `linkedin.js` — each MUST be
independently understandable

**⚠️ CRITICAL**: No user story implementation can begin until this phase is
complete

- [x] T004 [P] Create `src/auth.js` — extract LinkedIn login/session initialization from `linkedin.js`
- [x] T005 [P] Create `src/search.js` — extract search, scroll, and profile card detection from `linkedin.js`
- [x] T006 [P] Create `src/connection.js` — extract connection request sending logic from `linkedin.js`
- [x] T007 [P] Create `src/pagination.js` — extract next-page navigation from `linkedin.js`

**Checkpoint**: All modules created and independently readable

---

## Phase 3: User Story 1 — Project README Documentation (Priority: P1) 🎯 MVP

**Goal**: A developer new to the project can set up and run the LinkedIn
connection script in under 5 minutes using only the README.

**Independent Test**: A developer unfamiliar with the project follows the
README from clone to first successful run without asking questions.

### Implementation for User Story 1

- [x] T008 [US1] Create `README.md` with project description, prerequisites, setup steps, and usage
- [x] T009 [US1] Update `package.json` with meaningful `description` and a documented `start` script
- [x] T010 [US1] Verify README is self-contained — fresh clone setup completes in <5 min

**Checkpoint**: Project is documented and runnable by a new developer

---

## Phase 4: User Story 2 — Code Refactoring Into Logical Modules (Priority: P2)

**Goal**: Each logical operation resides in its own module and can be
modified independently without touching unrelated code.

**Independent Test**: Each module (auth, search, connection, pagination) can
be read and modified without understanding the rest of the codebase.

### Implementation for User Story 2

- [x] T011 [US2] Refactor `linkedin.js` to orchestrate modules from `src/` — strip inline business logic
- [x] T012 [US2] Add consistent `[module]` error handling to all `src/*.js` modules
- [x] T013 [US2] Add consistent `[module]` logging prefixes to all `src/*.js` modules
- [x] T014 [US2] Verify no regressions — run refactored script and confirm same behavior

**Checkpoint**: Code is modular, errors are clear, logs are structured

---

## Phase 5: User Story 3 — Environment Configuration Documentation (Priority: P3)

**Goal**: All environment variables are documented with name, type, default,
and description — no need to read source code to configure the project.

**Independent Test**: A developer can set up `.env` from scratch using only
the README env reference table.

### Implementation for User Story 3

- [x] T015 [US3] Add env var reference table to `README.md` with name, type, default, description
- [x] T016 [US3] Add env var fallback validation in `src/config.js` — warn on invalid values, use default

**Checkpoint**: Configuration is fully documented and validated

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and verification

- [x] T017 Remove example comments and placeholder code from all new files
- [x] T018 Final verification — confirm all FR-001 to FR-014 are satisfied
- [x] T019 Verify `.gitignore` includes `.env`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — No dependencies on other stories
- **US2 (P2)**: Can start after Foundational — May read modules created in Phase 2
- **US3 (P3)**: Can start after Foundational — Documents env vars from config.js

### Within Each User Story

- Setup before modules
- Modules before entry point refactoring
- Error handling/logging after module creation
- Verification after implementation

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- User stories can proceed sequentially in priority order (P1 → P2 → P3)

---

## Parallel Example: Foundational (Phase 2)

```bash
# Launch all module creation tasks together:
Task: "Create src/auth.js in src/auth.js"
Task: "Create src/search.js in src/search.js"
Task: "Create src/connection.js in src/connection.js"
Task: "Create src/pagination.js in src/pagination.js"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (config.js, .env.example, src/)
2. Complete Phase 2: Foundational (extract modules)
3. Complete Phase 3: US1 (README, package.json)
4. **STOP and VALIDATE**: Test US1 independently — new developer can run the project
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → All modules extracted
2. Add US1 (README) → Project documented and runnable (MVP!)
3. Add US2 (Refactoring) → Entry point refactored, error/logging improvements
4. Add US3 (Env docs) → Configuration fully documented and validated
5. Each story adds value without breaking previous stories
