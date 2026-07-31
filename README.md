# IREX Mining — Website + Admin Dashboard

Premium bilingual (FR/EN) corporate website for IREX MINING SARL with a complete admin dashboard for real-time content management.

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion + shadcn/ui
- **Backend**: Next.js API Routes (serverless, Node.js runtime)
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (production via Neon)
- **Auth**: JWT-based admin auth (jose + bcryptjs)
- **Hosting**: Vercel (frontend + API) + Neon (PostgreSQL)

## Quick Start (Development)

```bash
# 1. Install dependencies
bun install

# 2. Set up environment variables
cp .env.example .env
# Edit .env if needed (default SQLite works out of the box)

# 3. Push database schema
bun run db:push

# 4. Seed initial data
bun run db:seed

# 5. Start dev server
bun run dev
```

Visit:
- **Public site**: http://localhost:3000
- **Admin dashboard**: http://localhost:3000/admin
- **Admin login**: http://localhost:3000/admin/login
  - Email: `admin@irexmining.com`
  - Password: `admin123`

## Production Deployment (Vercel + Neon)

### 1. Create a Neon PostgreSQL database
1. Go to https://neon.tech and create a new project
2. Copy the connection string (looks like `postgresql://user:pass@ep-xxx.region.aws.neon.tech/irex_mining?sslmode=require`)

### 2. Update Prisma schema for PostgreSQL
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 3. Push schema to Neon
```bash
DATABASE_URL="postgresql://..." bun run db:push
```

### 4. Seed the production database
```bash
DATABASE_URL="postgresql://..." bun run db:seed
```

### 5. Deploy to Vercel
1. Push your code to GitHub
2. Import the repo in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` = your Neon connection string
   - `ADMIN_JWT_SECRET` = a strong random string (use `openssl rand -base64 32`)
4. Deploy

### 6. Change default admin credentials
After first login, the admin password should be changed. For now, you can re-seed with a different password by editing `scripts/seed.ts` line 30.

## Admin Dashboard Features

The dashboard at `/admin` allows the client to manage in real-time:

| Section | What can be edited |
|---------|-------------------|
| **Inbox** | Form submissions from website (product inquiries, contact, careers, donations) |
| **Products** | Add/edit/delete products & services (name FR/EN, description, price, image, badge, category, type) |
| **Categories** | Add/edit/delete product categories (name FR/EN, icon, order) |
| **Projects** | Add/edit/delete projects (name FR/EN, description, sector, year, status: Livré/En cours/À venir, client, location, image) |
| **Team** | Add/edit/delete team members (name, role FR/EN, expertise, bio, photo, social links) |
| **Blog** | Add/edit/delete blog posts (title FR/EN, excerpt, content markdown, category, cover image, author, read time) |
| **Events** | Add/edit/delete events (name FR/EN, description, date, location, type, image, register URL) |
| **Careers** | Add/edit/delete job openings (title FR/EN, description, location, type CDI/CDD/Stage, department, salary) |
| **Donations** | Add/edit/delete donation tiers (amount, title FR/EN, perks FR/EN, popular flag) |
| **FAQ** | Add/edit/delete FAQ items (question FR/EN, answer FR/EN, category, order) |
| **Partners** | Add/edit/delete partners (name, logo URL, website) |
| **Stats** | Edit site-wide statistics (HSE compliance, product categories, expertise domains, support availability) |
| **Contact Info** | Edit address, phone, email, hours (FR/EN), Google Maps embed URL |

**Pages NOT editable from dashboard** (per client requirement):
- Home page (Accueil) — static content
- About page (À Propos) — static content

## Customer Flow (Product Inquiry)

1. Visitor browses the public shop
2. Clicks on a product card
3. A modal opens with product details + inquiry form
4. Visitor fills name, email, phone, company, message
5. Submission is saved to DB with status "new"
6. Admin sees it in the Inbox dashboard
7. Admin can mark as read/handled, reply via email, or delete

## API Endpoints

All public endpoints: `GET /api/{entity}` returns published items
All admin endpoints: `POST/PUT/DELETE` require JWT auth cookie

| Entity | Public GET | Admin CRUD |
|--------|-----------|------------|
| Products | `/api/products` | `/api/products`, `/api/products/[id]` |
| Categories | `/api/categories` | `/api/categories`, `/api/categories/[id]` |
| Projects | `/api/projects` | `/api/projects`, `/api/projects/[id]` |
| Team | `/api/team` | `/api/team`, `/api/team/[id]` |
| Blog | `/api/blog` | `/api/blog`, `/api/blog/[id]` |
| Events | `/api/events` | `/api/events`, `/api/events/[id]` |
| Careers | `/api/careers` | `/api/careers`, `/api/careers/[id]` |
| Donations | `/api/donations` | `/api/donations`, `/api/donations/[id]` |
| FAQ | `/api/faq` | `/api/faq`, `/api/faq/[id]` |
| Partners | `/api/partners` | `/api/partners`, `/api/partners/[id]` |
| Stats | `/api/stats` | `/api/stats`, `/api/stats/[id]` |
| Contact Info | `/api/contact-info` | `/api/contact-info` (PUT) |
| Submissions | POST `/api/submissions` | `/api/submissions` (GET admin), `/api/submissions/[id]` (PUT/DELETE) |
| Auth | — | `/api/auth/login`, `/api/auth/logout`, `/api/auth/me` |

## Color Palette

- **Obsidian** `#0a0a0b` — deep black background
- **Coal** `#14141a` — card background
- **Gold** `#d4a547` — primary accent
- **Copper** `#b8612c` — secondary accent
- **Emerald** `#2d7a5f` — tertiary accent (for sustainability/HSE sections)
- **Ivory** `#faf7f0` — light section backgrounds

## License

© IREX Mining. All rights reserved.
Designed by EINSOF DIGIT.
