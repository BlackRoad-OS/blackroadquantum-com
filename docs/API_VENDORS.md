# Vendor API Routing — BlackRoad Infra Only

> All AI vendor traffic (OpenAI, Anthropic, Google, etc.) routes exclusively  
> through BlackRoad infrastructure. No direct vendor calls from client code.

---

## Architecture

```
Client / Agent
    │
    ▼
BlackRoad API Gateway (api.blackroad.io)
    │
    ├──► OpenAI
    ├──► Anthropic
    ├──► Google AI
    └──► Any other vendor
```

- **No direct OpenAI/Anthropic/Google calls** from application code
- **Single API key** (`BLACKROAD_API_KEY`) authenticates all vendor requests
- Vendor credentials are stored only inside BlackRoad infra — never in client repos
- All requests are logged, rate-limited, and audited centrally

---

## Configuration

Add to your `.env.local` and GitHub Actions secrets:

```bash
BLACKROAD_API_BASE_URL=https://api.blackroad.io
BLACKROAD_API_KEY=<your-key>
```

---

## Usage

### TypeScript / Next.js

```typescript
// lib/blackroad-api.ts
const BLACKROAD_API_BASE_URL = process.env.BLACKROAD_API_BASE_URL!
const BLACKROAD_API_KEY = process.env.BLACKROAD_API_KEY!

export async function chat(messages: { role: string; content: string }[]) {
  const res = await fetch(`${BLACKROAD_API_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BLACKROAD_API_KEY}`,
    },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error(`BlackRoad API error: ${res.status}`)
  return res.json()
}
```

### OpenAI-compatible SDK (drop-in replacement)

```typescript
import OpenAI from 'openai'

// Point the OpenAI SDK at BlackRoad's gateway instead
const client = new OpenAI({
  apiKey: process.env.BLACKROAD_API_KEY,
  baseURL: process.env.BLACKROAD_API_BASE_URL + '/openai/v1',
})
```

### Anthropic-compatible

```typescript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.BLACKROAD_API_KEY,
  baseURL: process.env.BLACKROAD_API_BASE_URL + '/anthropic',
})
```

---

## Network Confirmation

> **Q: Does traffic route through your Pis or Tailscale mesh?**
>
> **A:** No. With the Pis offline, all traffic flows:
>
> `Your device → Cloudflare edge → api.blackroad.io → vendor`
>
> There is no inbound tunnel into Pi hardware. The Pis were only ever an  
> optional local relay — removing them does not affect the cloud routing path.

---

## Adding the BLACKROAD_API_KEY to GitHub Actions

1. Go to your repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `BLACKROAD_API_KEY`
4. Value: your API key from BlackRoad OS
5. Click **Add secret**

Then reference it in workflows:

```yaml
env:
  BLACKROAD_API_KEY: ${{ secrets.BLACKROAD_API_KEY }}
  BLACKROAD_API_BASE_URL: ${{ secrets.BLACKROAD_API_BASE_URL }}
```

---

## Summary

| Requirement | Solution |
|-------------|---------|
| No direct OpenAI/Anthropic/Codex calls | ✅ All routed via `api.blackroad.io` |
| Single point of control | ✅ One `BLACKROAD_API_KEY` |
| Works without Pis | ✅ Cloud-only path |
| Auditable | ✅ All requests logged at gateway |

For access to the BlackRoad API gateway: **blackroad.systems@gmail.com**
