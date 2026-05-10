# Feature Specification: Network Filter Configuration

**Feature Branch**: `002-network-filter-config`  
**Created**: 2026-05-10  
**Status**: Draft  
**Input**: User description: "preciso atualiza uma coisa, tipo ter uma env do nome da empresa, ou keyword para pesquisa ne e tal para mandar invite sabe, e ai ter uma para o filtro de netword do linkedin, ai eu sei que tem o array sabe [S] e tal, S sei que eh de pessoas que sao amigos das que voce ja eh amigo e tal, para nao puxar desconhecido teria que pesquisar para ver umas coisas"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Network Filter as Env Variable (Priority: P1)

A user configuring the script should be able to control the LinkedIn network
filter (connection degree) via a dedicated environment variable, without
needing to craft a full search URL.

**Why this priority**: Currently, changing the network filter requires
editing the full search URL. A dedicated env var makes it trivial to switch
between 1st degree, 2nd degree, or other network levels.

**Independent Test**: A user can change from 2nd-degree-only connections to
1st-degree by changing a single env var value and restarting the script.

**Acceptance Scenarios**:

1. **Given** the script is configured with `LINKEDIN_NETWORK_FILTER=S`,
   **When** the script runs, **Then** the search URL contains
   `network=%5B%22S%22%5D` (URL-encoded `["S"]`).
2. **Given** the script is configured with `LINKEDIN_NETWORK_FILTER=F,S`,
   **When** the script runs, **Then** the search URL contains
   `network=%5B%22F%22,%22S%22%5D`.
3. **Given** the user sets `LINKEDIN_SEARCH_URL` (full URL),
   **When** the script runs, **Then** the individual filter params are
   ignored and the full URL is used as-is.

---

### User Story 2 - Search URL Auto-Construction (Priority: P2)

A user should be able to specify only a search keyword (or rely on the
company name) and a network filter, and have the script construct the full
search URL automatically.

**Why this priority**: This removes the need to understand LinkedIn's URL
encoding for search parameters, reducing setup friction.

**Independent Test**: A user sets only `TARGET_COMPANY` and
`LINKEDIN_NETWORK_FILTER` (no `LINKEDIN_SEARCH_URL`) and the script
successfully constructs a valid search URL.

**Acceptance Scenarios**:

1. **Given** only `TARGET_COMPANY=google` and
   `LINKEDIN_NETWORK_FILTER=S` are set, **When** the script runs,
   **Then** it constructs a URL searching for "google" filtered to 2nd
   degree connections.
2. **Given** no `LINKEDIN_SEARCH_URL` is provided, **When** the script
   runs, **Then** it falls back to auto-construction from the available
   keyword and network filter.

---

### Edge Cases

- What happens if both `LINKEDIN_SEARCH_URL` AND individual params are
  provided? (Full URL should win.)
- What happens if `LINKEDIN_NETWORK_FILTER` has an invalid value (e.g.,
  `X`)? (Should warn and use a safe default.)
- What happens if no keyword and no full URL are provided? (Should use
  existing defaults.)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support a `LINKEDIN_NETWORK_FILTER` environment
  variable to control the `network` parameter in the LinkedIn search URL.
- **FR-002**: The `LINKEDIN_NETWORK_FILTER` value MUST accept one or more
  comma-separated LinkedIn connection degree codes (`F`, `S`, `O`).
- **FR-003**: System MUST construct the search URL from the search keyword
  and network filter when `LINKEDIN_SEARCH_URL` is NOT provided.
- **FR-004**: System MUST preserve backward compatibility — when
  `LINKEDIN_SEARCH_URL` is set, it MUST take precedence over individual
  params and produce the exact same behavior as before.
- **FR-005**: System MUST validate `LINKEDIN_NETWORK_FILTER` and log a
  warning if the value contains invalid codes, falling back to a safe
  default (`S` — 2nd degree).
- **FR-006**: System MUST document the new env vars in `.env.example` and
  `README.md`.

### Key Entities *(include if feature involves data)*

- **Network Filter Configuration**: The set of LinkedIn connection degree
  codes that control who appears in search results. Valid codes: `F` (1st
  degree), `S` (2nd degree), `O` (outside network).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can switch between 1st-degree and 2nd-degree network
  filters by changing one env var and restarting.
- **SC-002**: Existing `LINKEDIN_SEARCH_URL` setups continue to work
  without modification (zero regression).
- **SC-003**: An invalid network filter code produces a clear warning
  message and falls back to a safe default.

## Assumptions

- The target audience is familiar with LinkedIn's connection degrees (1st,
  2nd, 3rd+).
- The `LINKEDIN_SEARCH_URL` env var continues to work as an escape hatch
  for users who need a completely custom URL.
- The default network filter is `S` (2nd degree), which shows people
  connected to your existing connections — a reasonable balance between
  reach and familiarity.
- URL-safe encoding (`%5B%22S%22%5D`) is handled internally by the code,
  not by the user.
