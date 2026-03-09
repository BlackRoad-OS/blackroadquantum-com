# Cloudflare Access — OAuth & OATH Replacement

> **Problem solved:** Pi-based OATH (TOTP/HOTP) is offline.  
> **Solution:** Cloudflare Access — fully managed, zero on-premises hardware.

---

## Why Cloudflare Access

Cloudflare Access replaces Pi-hosted OATH authentication with a managed, globally-distributed zero-trust access layer that sits in front of all BlackRoad properties.

| Feature | Pi-based OATH | Cloudflare Access |
|---------|--------------|-------------------|
| TOTP (OATH-compatible) | ✅ | ✅ |
| Hardware required | ✅ Pi cluster | ❌ None |
| Maintenance | Manual | Cloudflare-managed |
| Uptime | Depends on Pis | 99.99% SLA |
| GitHub OAuth | Manual setup | ✅ Built-in |
| SSO / SAML | Manual setup | ✅ Built-in |
| Audit logs | Manual | ✅ Built-in |

---

## Setup Guide

### Step 1 — Enable Cloudflare Zero Trust

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Zero Trust** → **Access** → **Applications**
3. Your account will need a Zero Trust plan (free tier available)

### Step 2 — Create an Access Application

1. Click **Add an application** → **Self-hosted**
2. Set **Application name:** `BlackRoad Quantum`
3. Set **Application domain:** `blackroadquantum.com` (or `*.blackroadquantum.com` for all subdomains)
4. Under **Session duration:** set to your policy (e.g. 24 hours)
5. Click **Next**

### Step 3 — Configure Identity Providers

Cloudflare Access supports multiple identity sources. Recommended for BlackRoad:

#### GitHub OAuth (primary)
1. In Zero Trust dashboard → **Settings** → **Authentication** → **Login methods**
2. Click **Add new** → **GitHub**
3. Create a GitHub OAuth App at [github.com/settings/applications/new](https://github.com/settings/applications/new):
   - **Homepage URL:** `https://blackroadquantum.com`
   - **Callback URL:** `https://[your-team].cloudflareaccess.com/cdn-cgi/access/callback`
4. Copy the **Client ID** and **Client Secret** into Cloudflare

#### One-Time PIN (email, no hardware needed)
1. In **Login methods** → **Add new** → **One-time PIN**
2. Users receive a 6-digit code by email — identical UX to OATH TOTP, no hardware needed

#### TOTP (OATH-compatible, app-based)
1. In **Login methods** → **Add new** → **TOTP** (or use the built-in One-time PIN above)
2. Compatible with Google Authenticator, Authy, and any RFC 6238 TOTP app

### Step 4 — Create an Access Policy

1. Under your application, click **Add a policy**
2. **Policy name:** `BlackRoad Team`
3. **Action:** Allow
4. **Include rule:** `Emails ending in` → `@blackroad.io` (or specific emails)
5. Save

### Step 5 — Retrieve the AUD Tag

1. In the application settings, copy the **Application Audience (AUD)** tag
2. Add it to your secrets:
   ```
   CF_ACCESS_AUD=<your-aud-tag>
   ```
3. Add to GitHub Actions secrets and `.env.local`

### Step 6 — Add to GitHub Actions

In your repository settings → **Secrets and variables** → **Actions**, add:
- `CLOUDFLARE_API_TOKEN` — API token with `Cloudflare Access: Edit` permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
- `CF_ACCESS_AUD` — the AUD tag from Step 5

---

## Protecting API Routes (Optional)

For any server-side routes that need to verify Cloudflare Access JWTs:

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'

const CF_ACCESS_AUD = process.env.CF_ACCESS_AUD!

export async function GET(req: NextRequest) {
  const token = req.headers.get('Cf-Access-Jwt-Assertion')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Validate token against Cloudflare's JWKS endpoint
  // See: https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/
  return NextResponse.json({ ok: true })
}
```

---

## Summary

| Task | Status |
|------|--------|
| Pi-based OATH replaced | ✅ Cloudflare Access handles it |
| TOTP / OATH support | ✅ Via One-time PIN or TOTP login method |
| GitHub OAuth | ✅ Native integration |
| Zero hardware dependency | ✅ Fully cloud-managed |

For questions: **blackroad.systems@gmail.com**
