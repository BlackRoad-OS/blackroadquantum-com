# Stripe Integration Setup

> Stripe handles all product sales and enterprise licensing for BlackRoad Quantum.

---

## Required Secrets

Add these to GitHub Actions secrets and `.env.local`:

| Variable | Where to find |
|----------|--------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks) |

---

## Setup Guide

### Step 1 — Create a Stripe Account

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign up or log in with the BlackRoad account
3. Complete business verification for **BlackRoad OS, Inc.**

### Step 2 — Get API Keys

1. In the Stripe Dashboard, navigate to **Developers → API keys**
2. Copy the **Publishable key** (`pk_live_...`) and **Secret key** (`sk_live_...`)
3. Add them to your secrets

### Step 3 — Create Products

1. Go to **Products** → **Add product**
2. Create products for BlackRoad Quantum access tiers:

| Product | Price | Description |
|---------|-------|-------------|
| BlackRoad Quantum Access | $99/mo | Full platform access |
| BlackRoad Enterprise | Custom | 30k+ agent deployment |

3. After creating each product, copy its **Price ID** (`price_...`)

### Step 4 — Create Payment Links (No-Code Option)

For the fastest setup without a server:

1. Go to **Payment Links** → **New link**
2. Select your product
3. Copy the generated URL (e.g. `https://buy.stripe.com/...`)
4. Use this URL directly in your CTAs (already in `index.html`)

### Step 5 — Set Up Webhooks (for server-side confirmation)

1. Go to **Developers → Webhooks** → **Add endpoint**
2. **Endpoint URL:** `https://blackroadquantum.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the **Signing secret** (`whsec_...`)
5. Add as `STRIPE_WEBHOOK_SECRET` in your secrets

### Step 6 — Update the CTA Link

In `index.html`, update the Stripe payment link:

```html
<!-- Replace with your actual Stripe Payment Link URL -->
<a href="https://buy.stripe.com/YOUR_LINK_ID" class="btn">Get Access</a>
```

---

## Webhook Handler (Next.js)

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // Grant access to customer
      break
    case 'customer.subscription.deleted':
      // Revoke access
      break
  }

  return NextResponse.json({ received: true })
}
```

> **Note:** Since `next.config.js` uses `output: 'export'` (static site), API routes are not available in the default build. To enable webhooks, either remove `output: 'export'` and deploy to Cloudflare Workers, or use a separate API service.

---

## Summary

| Task | Status |
|------|--------|
| Stripe account setup | Requires manual completion at [dashboard.stripe.com](https://dashboard.stripe.com) |
| Payment links | Update `index.html` CTA with real link after product creation |
| Webhook handler | Add after switching from static export if server-side processing needed |

For questions: **blackroad.systems@gmail.com**
