# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

CI runs `npm run lint` then `npm run build` on every PR targeting `main`.

## Architecture

This project uses **FSD (Feature-Sliced Design)**:

- `app/` — Next.js App Router: layouts, pages, global styles
- `views/` — Page-level components (`pages/` 대신 사용 — Next.js Pages Router와 이름 충돌 방지)
- `features/` — Feature-specific logic and components
- `widgets/` — Composite UI blocks assembled from features/entities
- `entities/` — Domain entities (data models, entity-level UI)
- `shared/` — Reusable UI components and utilities

Styling uses **Tailwind CSS v4** (configured via `@import "tailwindcss"` in `globals.css`, not a `tailwind.config.js`). The global font is **Pretendard** loaded via CDN and set as `--font-sans` in `@theme {}`.

## Conventions

**Commits**: `타입 : 작업 내용`
- `feat :` new feature
- `fix :` bug fix
- `refactor :` code refactoring (no behavior change)
- `chore :` config, build tasks

**Branches**: `타입/이슈번호-작업요약`
- e.g., `feat/#12-swipe-card`, `fix/#45-login-error`

**PRs**: target `main`; use the PR template (linked issue via `close #`, work summary, screenshot if applicable).
