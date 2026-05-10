# Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your target company and search URL

# 3. Run the script
node linkedin.js
```

The script opens a headful Chromium browser. Log in to LinkedIn manually
when prompted. The script will then search, scroll, and send connection
requests automatically.
