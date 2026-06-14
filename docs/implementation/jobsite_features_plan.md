# Jobsite Features Implementation Plan

Goal: Add the missing clickable jobsite features from the hackathon checklist without adding a backend or external AI dependency.

Architecture:
- Keep the existing Next.js App Router prototype.
- Add local mock job data and deterministic helper functions for search, matching, and application status.
- Use client components only where localStorage or interactive filtering is needed.

Scope:
- Add `/register` for prototype sign up and registration.
- Add `/jobs` for job listings, keyword search, filters, match scores, and apply actions.
- Add `/applications` for local application tracking.
- Enhance `/profile` with a resume-builder style preview.
- Add navigation and dashboard quick actions so the features are visible to judges.

Files:
- Create `src/data/jobs.ts` for mock job listings.
- Create `src/lib/job-market.ts` and `src/lib/job-market.test.ts` for search and application behavior.
- Create `src/components/careeros/jobs-page.tsx`.
- Create `src/components/careeros/applications-page.tsx`.
- Create `src/components/careeros/register-page.tsx`.
- Create route files under `src/app/(platform)/jobs`, `src/app/(platform)/applications`, and `src/app/register`.
- Modify navigation, dashboard, profile, README, and types.

Verification:
- `npm.cmd test`
- `npm.cmd run lint`
- `npm.cmd run build`
- Local HTTP checks for `/register`, `/jobs`, `/applications`, `/profile`, and `/dashboard`.
- Deploy to Vercel and push to GitHub after validation.
