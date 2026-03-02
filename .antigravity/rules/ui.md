---
description: UI engineering rules (NextJS) for Barbershop Manager with Tailwind, shadcn/ui, Zod, react-hook-form, TanStack Query
globs: ["apps/barbershop-manager-admin/**/*.{ts,tsx}", "apps/barbershop-manager-client/**/*.{ts,tsx}"]
alwaysApply: true
---

# UI Rules: Barbershop Manager (React + Vite)

These rules apply to `apps/barbershop-manager-admin` and `apps/barbershop-manager-client`.

## 0) Stack and defaults

- Use: React + TypeScript, TailwindCSS, shadcn/ui components, Zod, react-hook-form, @tanstack/react-query.
- Prefer functional components, hooks, and composition.
- No class components.
- No inline styles unless required for dynamic values (and then keep minimal).
- No custom component libraries when shadcn/ui already covers the use-case.

## 1) Directory responsibilities (UI apps)

Inside each UI app:

- `src/app/`: app composition (providers, router, layout shell, query client setup, toasts).
- `src/features/<feature>/`: feature modules (pages, components, hooks, services specific to that feature).
- `src/shared/`: shared UI utilities for that app only (not cross-app; cross-app must go to packages).
- `src/components/ui/`: shadcn/ui components (generated). Do not modify unless necessary; prefer wrapping.

Cross-app reusable UI belongs in a dedicated shared package (not currently in repo), not inside one UI app.

## 2) Component design rules (professional UI)

### 2.1 Composition

- Prefer small, focused components with explicit props.
- Containers: data fetching + orchestration.
- Presentational components: render-only, receive data and callbacks via props.
- Avoid passing raw query objects deep; pass `data`, `isLoading`, and callbacks.

### 2.2 Loading, empty, error states are mandatory

Every screen must define:

- Loading state (skeleton preferred).
- Empty state (clear, actionable message).
- Error state (user-friendly message + retry when possible).

Do not render blank screens or rely on console logs.

### 2.3 Layout consistency

- Use consistent spacing tokens via Tailwind (e.g., `gap-4`, `space-y-6`, `p-4 md:p-6`).
- Use consistent max width for content pages (e.g., `max-w-6xl mx-auto`).
- Use shadcn/ui primitives for structure: `Card`, `Tabs`, `Dialog`, `Sheet`, `DropdownMenu`, `Table`.

### 2.4 Accessibility (WCAG 2.1 AA target)

All UI must meet WCAG 2.1 AA expectations. If a requirement cannot be satisfied due to product constraints, the PR must document the exception and mitigation.

#### 2.4.1 Keyboard access (WCAG 2.1.1, 2.1.2, 2.1.4)

- Every interactive element must be reachable and operable with keyboard only.
- Do not rely on hover-only interactions for core actions.
- No keyboard traps: focus must be able to enter and leave any component using standard keys (Tab / Shift+Tab / Escape where applicable).
- Provide Escape to close dismissible overlays (`Dialog`, `Sheet`, `Popover`, `DropdownMenu`) unless doing so would cause data loss; if it would, show a confirmation.

#### 2.4.2 Focus visibility and order (WCAG 2.4.3, 2.4.7)

- Focus must always be visible. Do not remove outlines without providing an equivalent visible focus style.
- Focus order must follow visual order and reading order.
- On open:
  - `Dialog`/`Sheet` must move focus into the overlay (first meaningful element).
  - `DropdownMenu` must focus the first menu item.
- On close:
  - Focus must return to the element that triggered the overlay.
- Avoid programmatic focus jumps except:
  - On form submit with errors: move focus to the first invalid field.

#### 2.4.3 Semantics and ARIA correctness (WCAG 4.1.2)

- Use native HTML elements first (`button`, `a`, `input`, `label`, `select`, `textarea`).
- Do not add ARIA where native semantics already exist.
- When ARIA is needed:
  - Use correct roles and required attributes.
  - Never use `aria-hidden="true"` on focusable elements.
  - `aria-label` or `aria-labelledby` is required for icon-only buttons.
- For custom components:
  - Must expose correct roles, states, and names (Radix/shadcn components are preferred).

#### 2.4.4 Names, labels, and instructions (WCAG 1.3.1, 2.4.6, 3.3.2)

- Every input must have an associated label:
  - Visible label preferred.
  - `sr-only` allowed only when a visible label would be redundant (must still exist in DOM).
- Placeholders are not labels and must not be the only way to identify an input.
- Required fields must be indicated in text (not color alone).
- If helper text is necessary to complete a field correctly, render it and associate it to the input (via `aria-describedby`).

#### 2.4.5 Errors and validation feedback (WCAG 3.3.1, 3.3.3)

- Validation errors must be:
  - Presented as text (not only color/icon).
  - Associated to the field (`aria-describedby`).
  - Announced to assistive tech (see live regions below).
- On submit failure:
  - Show a form-level summary near the top listing errors (or at least a clear message).
  - Move focus to the first invalid field.
- Server-side errors must be mapped to fields when possible; otherwise show a form-level error message.

#### 2.4.6 Live regions and announcements (WCAG 4.1.3)

- Use an `aria-live` region for:
  - Form submission success/failure messages.
  - Async operation outcomes when not otherwise obvious.
- Toast notifications must be accessible:
  - Provide readable text.
  - Ensure they are announced (`role="status"` for non-critical, `role="alert"` for critical).
  - Do not steal focus unless user action is required.

#### 2.4.7 Dialogs, sheets, popovers, menus (WCAG 2.1.1, 2.4.3, 2.4.7, 1.3.1)

- Must use shadcn/ui (Radix-based) primitives for:
  - `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `DropdownMenu`, `Select`.
- Overlays must:
  - Trap focus while open (Radix handles this).
  - Have a clear accessible name (title via `DialogTitle` or `aria-label`).
  - Be dismissible via Escape unless prohibited by data-loss rules.
- For destructive actions:
  - Use `AlertDialog` and ensure the destructive action is clearly labeled.

#### 2.4.8 Links and buttons (WCAG 2.4.4, 1.3.1)

- Use `<Button>` for actions and `<Link>` for navigation.
- Link text must be descriptive out of context (avoid “click here”).
- If a control opens in a new tab/window, indicate this in the accessible name or nearby text.

#### 2.4.9 Headings and page structure (WCAG 1.3.1, 2.4.6)

- Each page must have a single `h1` describing the page.
- Use headings in order (`h2` under `h1`, etc.). Do not skip levels purely for styling.
- Landmark structure should be present:
  - `header`, `nav`, `main`, `footer` as appropriate.
  - The primary content area must be inside `<main>`.

#### 2.4.10 Color, contrast, and non-color cues (WCAG 1.4.1, 1.4.3, 1.4.11)

- Do not rely on color alone to convey meaning (errors, status, required fields).
- Ensure text contrast meets AA:
  - Normal text: >= 4.5:1
  - Large text (>= 24px regular or 18.66px bold): >= 3:1
- Ensure UI component boundaries/controls meet non-text contrast AA (>= 3:1) for interactive states (focus, hover, active, disabled).
- If the design system colors do not meet contrast, adjust tokens/classes rather than shipping inaccessible color.

#### 2.4.11 Motion and reduced motion (WCAG 2.3.3)

- Animations/transitions must respect `prefers-reduced-motion`:
  - Disable or significantly reduce non-essential motion when user prefers reduced motion.
- Do not use flashing content.

#### 2.4.12 Responsive + zoom + reflow (WCAG 1.4.4, 1.4.10)

- UI must work at 200% browser zoom without loss of functionality.
- No horizontal scrolling at 320 CSS px width except for content that inherently requires it (e.g., data tables in a scroll container).
- Interactive elements must not become unreachable or overlap at small widths.

#### 2.4.13 Minimum target size (WCAG 2.5.5 AA in WCAG 2.2; best practice here)

- Ensure touch targets are comfortably sized on mobile:
  - Aim for ~40px minimum for primary controls.
- Icon-only controls must have sufficient padding and an accessible name.

#### 2.4.14 Implementation requirements for this repo

- Icon-only buttons:
  - Must include `aria-label` (and optionally a tooltip).
- Form fields using shadcn/ui patterns:
  - Must render label + message, and connect message to input via `aria-describedby`.
- Any custom composite widgets not covered by shadcn/ui:
  - Must be reviewed for keyboard interactions, roles, and announcements before merging.

## 3) Tailwind + shadcn/ui rules

- Use Tailwind utility classes; avoid bespoke CSS files.
- Use `cn()` helper (from shadcn) for class composition; do not manually concatenate strings.
- Use semantic variants: `Button` `variant="default|secondary|destructive|outline|ghost|link"`.
- Prefer shadcn/ui form patterns:
  - `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.
- Do not re-implement shadcn components. Wrap them when you need app-specific defaults.

## 4) Zod + react-hook-form rules (forms must be robust)

### 4.1 Schema-first forms

- Every form must have a Zod schema.
- Derive types from schema: `type FormValues = z.infer<typeof schema>`.
- Use `zodResolver(schema)` with `useForm<FormValues>()`.
- Default values must be explicit; do not rely on `undefined`.

### 4.2 Server errors and field errors

- Field-level validation errors come from Zod -> `FormMessage`.
- Server errors must be mapped:
  - If server returns field errors: call `setError("field", { message })`.
  - Otherwise show a toast and a form-level error block.

### 4.3 Submit behavior

- Disable submit button while submitting.
- Prevent double submission.
- On success: show confirmation (toast) and update caches (React Query).
- On cancel/reset: restore default values intentionally (use `form.reset(defaultValues)`).

### 4.4 Input formatting

- Do not format values during typing unless necessary (causes cursor jumps).
- Format on blur or on submit.
- Keep parsing and formatting helpers in `src/shared/format/*` or feature-specific utils.

## 5) TanStack React Query rules (data access must be predictable)

### 5.1 One QueryClient

- App must have a single `QueryClient` provided at root (`src/app/providers`).
- Configure sensible defaults:
  - retries: small (e.g., 1–2) for GET; 0 for non-idempotent mutations.
  - refetchOnWindowFocus: false (unless required).
- Always use `queryKey` factories.

### 5.2 Query key factories

- Define query keys per feature in `src/features/<feature>/queries/keys.ts`:
  - `const keys = { all: ["feature"], list: (params) => [...], detail: (id) => [...] } as const;`
- Do not handwrite query keys inline in components.

### 5.3 Keep network code out of components

- Components must not call `fetch`/axios directly.
- Put API calls in `src/features/<feature>/api/*` or `src/shared/api/*` (app-level).
- Hooks wrap api functions:
  - `useXyzQuery`, `useCreateXyzMutation`.

### 5.4 Cache updates

After mutations:

- Prefer `queryClient.invalidateQueries({ queryKey: keys.list(...) })` for correctness.
- Use optimistic updates only when the UX benefit is clear and rollback is implemented.

### 5.5 Error handling

- Queries: show inline error state on the screen area.
- Mutations: show toast; keep form errors mapped when applicable.
- Do not swallow errors; do not only `console.error`.

## 6) API contract usage (schemas/types)

- For request/response validation:
  - Prefer using shared Zod schemas from `packages/barbershop-manager-schemas` when available.
- Types:
  - Use shared types from `packages/barbershop-manager-types` only for shared contracts.
- Avoid duplicating DTO types in the UI app.

## 7) State management rules (keep UI stable)

- Prefer React Query for server state.
- Prefer React Hook Form for form state.
- Prefer URL state (search params) for filters/sorting/pagination when it improves shareability.
- For local UI-only state, use `useState/useReducer`.
- Do not introduce Redux/Zustand unless there is a demonstrated need.

## 8) Tables, lists, and pagination (professional defaults)

- Large lists must support:
  - loading skeleton
  - empty state
  - error state
  - pagination or infinite scroll (choose one per screen)
  - stable sorting behavior (explicit sort state)
- Do not render unbounded lists without virtualization when items can be large.

## 9) UX polish rules (solid and consistent)

- Use skeletons for page-level loading; spinners only for small inline actions.
- Use toasts for cross-screen confirmations/errors.
- Use `Dialog` for destructive actions with confirmation.
- Use `destructive` button variant for deletions.
- Provide undo only if it is real and implemented server-side or via rollback.

## 10) Code quality and review gates

- No `any` unless isolated and justified (prefer `unknown` + parsing).
- No `eslint-disable` without a comment explaining why.
- No dead code: remove unused exports and unused components.
- All new components must be exported from their feature index only if intended for reuse.
- Keep files under ~250 lines; split when exceeded.

## 11) Output expectations when generating UI code in this repo

When creating a new screen/feature:

- Create the feature folder under `src/features/<feature>/`.
- Provide:
  - `api.ts` (network functions)
  - `queries/keys.ts`
  - `queries/hooks.ts`
  - `components/*` (presentational)
  - `pages/*` or route component
  - `schema.ts` for Zod + form types
- Ensure the screen includes loading/empty/error states and uses shadcn/ui layout primitives.

## 12) Responsive design rules (mobile, tablet, desktop, large screens)

All new UI must be responsive by default. Build mobile-first and progressively enhance at larger breakpoints.

### 12.1 Breakpoints (Tailwind)

Use Tailwind defaults unless the project defines custom breakpoints:

- base: mobile (default, no prefix)
- `sm`: small phones / large phones
- `md`: tablets
- `lg`: laptops / desktop
- `xl`: large desktop
- `2xl`: very large screens

Rules:

- Do not rely on a single breakpoint change. Use at least `md` and `lg` adjustments for layout-heavy screens.
- Avoid `hidden` content that removes critical functionality on mobile. Prefer alternate layout patterns.

### 12.2 Page-level layout pattern (recommended)

Use this default page container:

- Outer: `w-full`
- Page padding: `p-4 md:p-6`
- Width cap: `max-w-6xl mx-auto` (or `max-w-7xl` for dense dashboards)
- Vertical rhythm: `space-y-6`

Rules:

- Never let content stretch edge-to-edge on large screens without a max width.
- Use consistent header structure: title + optional actions.
- Keep primary actions visible on mobile (top or sticky footer when necessary).

### 12.3 Grids and columns

Rules:

- Mobile-first single column by default.
- Use `md:grid-cols-2` / `lg:grid-cols-3` patterns for cards and summary panels.
- For forms: one column on mobile, two columns on tablet/desktop where it improves scanning.

Patterns:

- Cards:
  - `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`
- Sidebar layouts:
  - Mobile: stack vertically
  - Desktop: `lg:grid lg:grid-cols-[280px_1fr] lg:gap-6`

### 12.4 Navigation patterns (admin + client)

Rules:

- Use responsive navigation:
  - Desktop: persistent sidebar when appropriate.
  - Mobile/tablet: `Sheet` (drawer) navigation triggered by a hamburger button.
- Keep user/account menu in a `DropdownMenu`.
- Do not render two separate nav systems. Use one nav component that adapts.

Implementation expectations (shadcn/ui):

- Use `Sheet` for mobile sidebar.
- Use `NavigationMenu` or a simple `Sidebar` component for desktop.

### 12.5 Tables and dense data (mobile-friendly)

Rules:

- Do not render wide tables on mobile without an adaptation strategy.
- Provide one of the following per table screen:
  1. Horizontal scroll container (`overflow-x-auto`) + sticky first column when useful, OR
  2. “Card list” alternative layout on small screens, OR
  3. Responsive column hiding with a “details” view.

Preferred pattern (professional):

- `md+`: table view
- `<md`: card list view (each row becomes a Card with key fields + actions)

Rules for table actions:

- Keep row actions in `DropdownMenu` (kebab) on small screens.
- Avoid multiple icon buttons per row on mobile.

### 12.6 Forms (mobile-first)

Rules:

- Inputs must be full width on mobile.
- Labels must remain visible (no placeholder-only labeling).
- Use `space-y-4` for vertical form spacing on mobile.
- For multi-column forms:
  - `grid grid-cols-1 gap-4 md:grid-cols-2`
  - Keep long fields spanning full width with `md:col-span-2`.

Dialog/sheet behavior:

- On mobile, prefer `Sheet` for complex forms (multi-step or long content).
- Use `Dialog` for short forms and confirmations.

### 12.7 Modals, dialogs, sheets

Rules:

- `Dialog` width must be responsive:
  - `w-[calc(100vw-2rem)] sm:max-w-lg` (example sizing)
- For very long content, avoid `Dialog` on mobile; use `Sheet` or a full page route.
- Always ensure scroll is within the dialog content, not the page behind it.

### 12.8 Typography and density

Rules:

- Keep readable line lengths:
  - text blocks use `max-w-prose` where appropriate.
- Avoid overly dense UIs on mobile:
  - Use larger touch targets, spacing, and fewer columns.
- Buttons:
  - Mobile: prefer `size="lg"` (or Tailwind `h-10/h-11`) for primary flows.
  - Desktop: default sizes are fine.

### 12.9 Touch targets and spacing

Rules:

- All interactive elements on mobile must be comfortably tappable.
- Minimum target guideline: ~40px height/width for primary interactive controls.
- Avoid tiny icon-only buttons without tooltip/label; use `aria-label`.

### 12.10 Responsive media and overflow

Rules:

- Images must be responsive (`max-w-full h-auto`) and not overflow containers.
- Prevent layout shift:
  - Reserve image space or use consistent aspect ratios.
- For code/IDs/long strings:
  - Use truncation with tooltip or copy button.
  - Use `truncate` + `title`/popover for full value.

### 12.11 Sticky patterns (when needed)

Rules:

- On mobile, allow sticky action areas for critical flows:
  - sticky header for filters/search on list pages if lists are long
  - sticky footer action bar for multi-step forms
- Sticky elements must not cover important content; include padding/margins accordingly.

### 12.12 Testing requirements (responsiveness)

Every new screen must be checked at these widths at minimum:

- ~360px (small mobile)
- ~768px (tablet)
- ~1024px (small desktop)
- ~1440px (large desktop)

Rules:

- No horizontal scrolling on the page body at any width.
- If a component intentionally scrolls horizontally (tables), it must be within a dedicated container.
