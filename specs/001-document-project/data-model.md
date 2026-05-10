# Data Model: Project Documentation & Code Organization

## Entities

### Environment Configuration

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `TARGET_COMPANY` | string | No | `certisign` | Company name filter for connection targets |
| `LINKEDIN_SEARCH_URL` | string | No | (see .env) | Full LinkedIn search URL override |
| `DELAY_BETWEEN_ACTIONS` | number (ms) | No | 2500 | Pause between scroll actions |
| `DELAY_AFTER_SCROLL` | number (ms) | No | 1500 | Pause after each scroll event |
| `DELAY_BETWEEN_CONNECTIONS` | number (ms) | No | 4000-8000 (random) | Pause between connection sends |
| `MAX_SCROLLS` | number | No | 15 | Maximum scrolls per page load |
| `MAX_RETRIES` | number | No | 3 | Retry attempts on element action failure |

### Connection Log

| Field | Type | Description |
|-------|------|-------------|
| entries | `Set<string>` | In-memory set of processed profile labels |
| expected size | ~50 | Max connections per session before rate limiting |

### Delay/Retry Configuration

Loaded from environment with defaults in `src/config.js`:

```text
DELAY_BETWEEN_ACTIONS  →  scrollWait (default: 2500ms)
DELAY_AFTER_SCROLL     →  postScrollWait (default: 1500ms)
DELAY_BETWEEN_CONNECTIONS →  connectWait (default: random 4000-8000ms)
MAX_SCROLLS            →  maxScrolls (default: 15)
MAX_RETRIES            →  maxRetries (default: 3)
```

## State Transitions

N/A — stateless script. Each run is independent. No persistent state beyond
the in-memory connection Set which resets on each execution.

## Validation Rules

- All delay values MUST be positive integers (ms)
- `MAX_SCROLLS` and `MAX_RETRIES` MUST be >= 0
- Missing env vars MUST fall back to defaults without error
- Invalid env var values (non-numeric for delays) MUST log a warning and
  fall back to default
