# HireStack (TalentOS)

HireStack (TalentOS) is a production-oriented ATS frontend built with Next.js App Router, TypeScript, and Tailwind CSS v4.

## What changed

- cleaned route structure with shared platform shell
- reusable UI primitives in `components/ui`
- shared layout blocks in `components/layout`
- centralized mock data and theme tokens in `lib/`
- Docker-first Ubuntu deployment setup with standalone Next.js output

## Routes

- `/`
- `/dashboard`
- `/jobs`
- `/jobs/[id]`
- `/jobs/new`
- `/candidates`
- `/candidates/[id]`
- `/analytics`
- `/settings`
- `/applications/new`

## Local development

```bash
npm install
npm run dev
```

`npm run dev` now checks `NEXT_PUBLIC_API_BASE_URL` and, when it points to local backend infrastructure such as `http://localhost:8000`, automatically starts the sibling FastAPI backend if it is not already running.

Useful variants:

```bash
# frontend only
npm run dev:web

# skip backend auto-start for one run
HIRESTACK_SKIP_BACKEND_AUTOSTART=1 npm run dev
```

Backend startup logs are written to `.logs/backend-dev.log` when auto-start is used.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Docker deployment

```bash
docker-compose up --build -d
docker ps
docker logs talentscout-app
```

The app uses `NEXT_PUBLIC_API_BASE_URL` from `.env` for frontend API configuration.
