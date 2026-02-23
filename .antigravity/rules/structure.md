---
description: LineManager monorepo structure and boundaries
globs: ["**/*"]
alwaysApply: true
---

# LineManager monorepo rules

## Repository layout

This repo is a pnpm workspace monorepo.

Top-level:
- `apps/` contains deployable applications only.
- `packages/` contains shared libraries only.
- Repo root contains workspace config only (pnpm + tooling). Do not place app source code in repo root.

## Apps (deployables)

### apps/line-manager-admin (React + Vite)
Contains:
- UI routes/pages, admin-only features, UI components, app wiring (router/providers), admin-specific assets.
Must not contain:
- Shared domain logic or shared utilities (move to `packages/*`).
- Shared schemas/types duplicated locally (use `packages/line-manager-schemas` and `packages/line-manager-types`).

### apps/line-manager-client (React + Vite)
Contains:
- End-user UI routes/pages, client-only features, UI components, app wiring, client assets.
Must not contain:
- Admin-only code.
- Shared logic duplicated locally (use `packages/*`).

### apps/line-manager-api (Nest.js)
Contains:
- Nest modules/controllers/services, auth, persistence, integrations, API bootstrap/config.
Must not contain:
- Frontend code.
- Duplicated shared schemas/types (consume from `packages/*`).

## Packages (shared libs)

### packages/line-manager-types
Purpose:
- TypeScript types/interfaces/enums/utility types shared across apps.
Rules:
- Keep it type-only (or near type-only).
- Do not include runtime logic, schema validation, fetching, DB, or UI code.
- Avoid depending on other internal packages (preferred leaf).

### packages/line-manager-schemas
Purpose:
- Runtime schemas for shared contracts (DTOs, domain entities, validation).
Rules:
- Must be usable in Node and browser where applicable.
- May depend on `line-manager-types`.
- Must not include fetching, DB access, Nest wiring, or UI components.

### packages/line-manager-utils
Purpose:
- Small deterministic utilities (formatting, parsing, errors, dates, helpers).
Rules:
- Prefer pure functions; avoid side effects.
- Must not include framework code (React/Nest) or schemas/types definitions.

## Import boundaries (enforce in reviews and with linting)

Allowed:
- Any `apps/*` may import from any `packages/*`.

Forbidden:
- `apps/line-manager-admin` must not import from `apps/line-manager-client` (and vice versa).
- `packages/*` must not import from `apps/*`.
- Do not use deep imports into package internals. Import only from the package entry:
  - ✅ `import { X } from "@line-manager/utils"`
  - ❌ `import { X } from "@line-manager/utils/src/..."`

## Public API surface

Each package should expose a single public entrypoint:
- `packages/<pkg>/src/index.ts`

Export only intended public symbols from `src/index.ts`.
Internal files are not part of the public API.

## Tests and generated code

Tests:
- Keep tests within the owning app/package.
- Do not place cross-app tests in repo root.

Generated code:
- Put build output in `dist/` and do not commit it unless required.
