# VA Ivy Mission Control

A full-stack SaaS dashboard to manage the US college application journey for Dương Vũ Anh — covering academics, testing, activities, awards, books, projects, research, chess, and tasks.

## Tech Stack

- **Frontend:** Next.js 14 App Router, TypeScript, Tailwind CSS
- **Database:** MySQL + Prisma ORM (v6)
- **Auth:** JWT cookie-based session
- **Password:** bcryptjs hashing
- **Charts:** Recharts
- **Validation:** Zod

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your MySQL credentials:

```bash
cp .env.example .env
```

`.env`:
```
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/ken_prj"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret-here"
```

### 3. Run database migration

Make sure your MySQL server is running and the database `ken_prj` exists:

```sql
CREATE DATABASE ken_prj;
```

Then run migrations:

```bash
npx prisma migrate dev --name init
```

### 4. Seed the database

```bash
npm run seed
```

This creates:
- Default user account
- 3 academic subjects
- 2 tests (SAT, IELTS)
- 2 activities
- 2 awards
- 2 books
- 2 projects
- 2 research items
- 2 chess tournaments
- 10 sample tasks

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Default Login

| Field | Value |
|---|---|
| Username | `duongvuanh` |
| Password | `123456` |

## Modules

| Path | Description |
|---|---|
| `/dashboard` | KPI cards, progress charts, mission overview |
| `/academics` | Academic subjects with grade filter |
| `/testing` | SAT, IELTS, AP, and other tests |
| `/activities` | Extracurricular activities |
| `/awards` | Competition results and awards |
| `/books` | Reading list |
| `/projects` | Personal and team projects |
| `/research` | Academic research |
| `/chess` | Tournament results and ELO tracking |
| `/tasks` | All tasks with filter/search |
| `/settings` | Change password |

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run seed      # Seed database
npx prisma studio # Open Prisma Studio GUI
```
