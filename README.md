# BlackRoad Quantum

> Next-generation quantum computing platform for enterprise AI applications.
> **Live:** [blackroadquantum.com](https://blackroadquantum.com)

---

## 🌌 About BlackRoad OS, Inc.

**BlackRoad OS** is an AI operating layer above Google, OpenAI, Anthropic, and every other AI vendor — unifying them under a single, operator-controlled interface managed by **Alexa Amundson (CEO)**.

| Dimension | Details |
|-----------|---------|
| Core Product | Unified AI API layer with vendor-agnostic routing |
| Purpose | Manage AI model memory and continuity across models |
| Scale | 30,000 AI agents + 30,000 human employees |
| Infra | 578+ repositories across 15 specialized organizations |
| Operator | Alexa Amundson (CEO & sole operator) |
| Routing | All traffic routes through BlackRoad infra only |

---

## 📦 Products

| Product | Domain | Description |
|---------|--------|-------------|
| BlackRoad OS | [blackroad.io](https://blackroad.io) | Core AI operating layer |
| BlackRoad Quantum | [blackroadquantum.com](https://blackroadquantum.com) | Quantum computing infrastructure |
| Lucidia | [lucidia.earth](https://lucidia.earth) | AI consciousness & memory system |
| BlackRoad Systems | [blackroad.systems](https://blackroad.systems) | Infrastructure & DevOps |
| Research | [blackroadquantum.info](https://blackroadquantum.info) | Quantum research portal |
| Shop | [blackroadquantum.shop](https://blackroadquantum.shop) | Products & licensing |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Cloudflare account (for deployment)

### Local Development

```bash
git clone https://github.com/BlackRoad-OS/blackroadquantum-com.git
cd blackroadquantum-com
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build      # outputs to /out (static export)
```

### Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy out --project-name=blackroadquantum-com
```

---

## 🔐 Authentication (OATH / OAuth)

Authentication is handled via **Cloudflare Access** — no on-premises hardware required.

See [`docs/CLOUDFLARE_ACCESS_OAUTH.md`](docs/CLOUDFLARE_ACCESS_OAUTH.md) for the complete setup guide.

**Summary:**
- Cloudflare Access replaces any Pi-based OATH setup
- Supports GitHub OAuth, TOTP (OATH-compatible), and one-time email PINs
- Zero infrastructure to maintain — fully managed via Cloudflare dashboard

---

## 💳 Stripe Payments

Stripe is integrated for product access and enterprise licensing.

See [`docs/STRIPE_SETUP.md`](docs/STRIPE_SETUP.md) for setup instructions.

Required secrets:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## 🌐 Infrastructure

| Layer | Technology | Status |
|-------|-----------|--------|
| Hosting | Cloudflare Pages | ✅ Active |
| Auth | Cloudflare Access | ✅ Active |
| Payments | Stripe | ✅ Active |
| CDN/DNS | Cloudflare | ✅ Active |
| CI/CD | GitHub Actions | ✅ Active |

See [`docs/API_VENDORS.md`](docs/API_VENDORS.md) for vendor API routing configuration.

---

## 🔑 Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env.local
```

See [`.env.example`](.env.example) for all required variables.

---

## 📊 Status

🟢 **Active Development** | 🏢 **BlackRoad OS, Inc.** | 👔 **CEO: Alexa Amundson**

---

## 📜 License

**Copyright © 2026 BlackRoad OS, Inc. All Rights Reserved.**

**PROPRIETARY AND CONFIDENTIAL** — Not for commercial resale.

- ✅ Permitted: Testing, evaluation, educational use
- ❌ Prohibited: Commercial use or redistribution without written permission

**Contact:** blackroad.systems@gmail.com

See [LICENSE](LICENSE) for complete terms.
