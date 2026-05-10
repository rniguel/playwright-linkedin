# Research: Network Filter Configuration

## Overview

All technical context items were known from existing project knowledge. No
`[NEEDS CLARIFICATION]` markers required resolution.

## Decisions

### LinkedIn Network Filter Codes

| Code | Meaning |
|------|---------|
| `F` | 1st degree connections (people you're directly connected to) |
| `S` | 2nd degree connections (friends of your connections) |
| `O` | Outside your network (group members, followers, etc.) |

Multiple codes can be combined: `F,S` shows both 1st and 2nd degree.

### URL Encoding

LinkedIn expects the `network` parameter as a JSON array, URL-encoded:
- `["S"]` → `%5B%22S%22%5D`
- `["F","S"]` → `%5B%22F%22,%22S%22%5D`

Use `encodeURIComponent(JSON.stringify(codes))` for URL-safe encoding.

### URL Construction Priority

1. If `LINKEDIN_SEARCH_URL` is set → use as-is (full backward compat)
2. If only `TARGET_COMPANY` / keyword is set → construct URL with
   `?keywords={keyword}&network={encoded}`
3. If nothing is set → default: `TARGET_COMPANY=certisign` +
   `LINKEDIN_NETWORK_FILTER=S`

### Keyword Source

- `TARGET_COMPANY` doubles as the search keyword when constructing the URL
- No separate `SEARCH_KEYWORD` env var needed — `TARGET_COMPANY` already
  serves this purpose and is always set
