# Data Model: Network Filter Configuration

## Entities

### Network Filter Configuration

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `LINKEDIN_NETWORK_FILTER` | string | No | `S` | LinkedIn connection degree filter (`F`, `S`, `O`, comma-separated) |
| parsed codes | `string[]` | — | `["S"]` | Parsed array of individual degree codes |

## Validation Rules

- Each code MUST be one of: `F`, `S`, `O`
- Codes are case-insensitive on input, normalized to uppercase
- Invalid codes MUST log a warning and be excluded
- If all codes are invalid, fall back to `["S"]`
- Empty `LINKEDIN_NETWORK_FILTER` → use default `["S"]`
