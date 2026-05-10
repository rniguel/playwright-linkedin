# Quickstart

No setup changes. To use the network filter:

```bash
# Filter to 2nd degree connections only (friends of friends)
LINKEDIN_NETWORK_FILTER=S npm start

# Filter to 1st degree only (your direct connections)
LINKEDIN_NETWORK_FILTER=F npm start

# Filter to 1st + 2nd degree
LINKEDIN_NETWORK_FILTER=F,S npm start
```

Set `LINKEDIN_NETWORK_FILTER` in `.env` to make it permanent.
