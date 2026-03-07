# Plan: Auth & Route Protection Architecture

## TL;DR

Use Next.js edge middleware to gate `/appointments` and `/cart` behind a JWT cookie check, a global 401 interceptor in the API client for mid-session expiry, and a re-login modal (not a hard redirect) when auth disappears. Public routes (/, /store, /contact) remain accessible without auth.

## Current State

- NestJS API issues JWT in httpOnly cookie (7-day expiry, sameSite=lax)
- No middleware.ts exists — all routes are currently unprotected
- Client auth state in Zustand with localStorage (marked for deletion)
- `useMe()` hook exists but isn't used for route protection
- No 401 interceptor logic in the API client
- No refresh token flow implemented

---

## Steps

### Phase 1: Edge Middleware (Route Gating)

1. **Create `apps/barbershop-manager-client/middleware.ts`**
   - Use `NextRequest` to read the `jwt` cookie via `request.cookies.get('jwt')`
   - If cookie is absent and path matches a protected route, redirect to `/login?redirect={originalPath}`
   - Export a `config.matcher` array targeting only `/appointments/:path*` and `/cart/:path*`
   - This does NOT validate the JWT (no secret available at the edge) — it only checks cookie _existence_. The API validates the actual token on every request.

2. **Update login flow to respect `redirect` query param**
   - In the OTP verification success handler (`components/auth/otp.tsx`), read `redirect` from the URL search params
   - If present, redirect there instead of `/`

### Phase 2: Global 401 Interceptor

3. **Add 401 response interceptor in `lib/api.ts`**
   - After each fetch, check if `response.status === 401`
   - If so, emit a custom event (e.g. `window.dispatchEvent(new Event('auth:expired'))`) or call a global callback
   - Do NOT redirect — this is the "non-disruptive" path

4. **Create a re-login modal component** (`components/auth/relogin-modal.tsx`)
   - Listens for the `auth:expired` event
   - Shows a dialog/modal: "Your session has expired. Please log in again."
   - CTA button navigates to `/login?redirect={currentPath}`
   - Uses the existing `<Dialog>` UI component from `components/ui/dialog.tsx`

5. **Mount the re-login modal globally**
   - Add `<ReLoginModal />` to the root layout (`app/layout.tsx`) or inside `QueryProvider`
   - This ensures it's available on every page, including public ones (in case a logged-in user's token expires while browsing /store)

### Phase 3: Server-Side Auth State + Hydration

6. **Create server-side `getUser()` helper** (new file `lib/server-auth.ts`)
   - Use `jose` package to verify + decode the JWT cookie server-side (reads `JWT_SECRET` from env)
   - Reads cookie via `cookies()` from `next/headers`
   - Returns `{ phone }` payload or `null` — zero network calls
   - Wrapped in `React.cache()` so multiple calls in one render are deduplicated
   - Used by server components that just need an auth check

7. **Fetch full user profile via `queryClient.fetchQuery` in `(routes)/layout.tsx`**
   - Same pattern as existing cart fetch: `queryClient.fetchQuery({ queryKey: ["me"], queryFn: ... })`
   - Only runs once per full page load (server layout doesn't re-render on client nav)
   - Hydrate TanStack Query cache via `<HydrationBoundary>` so client components read user via `useMe()` without refetching
   - `useMe()` stays in `lib/auth.ts` as a client-side cache reader (data already hydrated from server)

8. **Remove Zustand auth store** (`stores/auth-store.ts` — marked for deletion)
   - All auth state comes from: server `getUser()` for auth checks, `queryClient.fetchQuery(["me"])` for profile, client `useMe()` reads hydrated cache

9. **Wire nav to real auth state** — `nav-user.tsx` uses `useMe()` (reads hydrated cache, no fetch) for login/logout UI

---

## Relevant Files

- `apps/barbershop-manager-client/middleware.ts` — **CREATE**: edge middleware for route protection
- `apps/barbershop-manager-client/lib/server-auth.ts` — **CREATE**: server-side `getUser()` using `jose` JWT decode
- `apps/barbershop-manager-client/lib/auth.ts` — **MODIFY**: keep mutations + `useMe()` as client cache reader
- `apps/barbershop-manager-client/lib/api.ts` — **MODIFY**: add 401 interceptor with custom event dispatch
- `apps/barbershop-manager-client/components/auth/relogin-modal.tsx` — **CREATE**: session-expired modal
- `apps/barbershop-manager-client/app/layout.tsx` — **MODIFY**: mount `<ReLoginModal />`
- `apps/barbershop-manager-client/components/auth/otp.tsx` — **MODIFY**: respect `redirect` query param after login
- `apps/barbershop-manager-client/app/(routes)/layout.tsx` — **MODIFY**: `queryClient.fetchQuery(["me"])` + `<HydrationBoundary>`
- `apps/barbershop-manager-client/stores/auth-store.ts` — **DELETE**: replaced by TanStack Query hydration
- `apps/barbershop-manager-client/components/navbar/nav-user.tsx` — **MODIFY**: wire to `useMe()` hydrated data
- `apps/barbershop-manager-client/components/ui/dialog.tsx` — **REUSE**: existing Dialog for re-login modal

## Verification

1. **No-cookie access to /appointments** → should redirect to `/login?redirect=/appointments`
2. **No-cookie access to /cart** → should redirect to `/login?redirect=/cart`
3. **No-cookie access to /, /store, /contact** → should render normally (public)
4. **Login with redirect param** → after OTP verify, should land on the original protected page
5. **Expire/delete the JWT cookie manually in DevTools** → next API call should trigger the re-login modal (not a hard redirect)
6. **Re-login modal CTA** → should navigate to `/login?redirect={currentPath}`
7. **Fresh page load with valid cookie** → `useMe()` should return user, nav shows logged-in state

## Decisions

- Middleware checks cookie _existence_ only — fast edge check, no JWT secret needed at the edge
- `getUser()` in `lib/server-auth.ts` decodes JWT locally via `jose` — zero network calls for server-side auth checks
- Full user profile fetched via `queryClient.fetchQuery(["me"])` in `(routes)/layout.tsx` — runs once per full page load, hydrated to client via `<HydrationBoundary>`
- Client `useMe()` reads from hydrated TanStack Query cache — no redundant fetch
- Protected routes: `/appointments`, `/cart` only. All others are public.
- Auth expiry UX: non-disruptive modal, not a hard redirect. User stays on page.
- Zustand auth store deleted — TanStack Query hydration is the single source of truth
- New dependency: `jose` package for server-side JWT verification

## Further Considerations

1. **JWT refresh flow**: The API has a `POST /auth/refresh` endpoint but it's not wired up. Consider adding a silent refresh attempt before showing the modal (try refresh → if 401 → show modal). This would reduce friction for users whose token just expired. **Recommendation**: implement as a follow-up, not in this PR.
2. **Missing /verify-otp route**: Login and register redirect to `/verify-otp` but no page exists for it — this is a separate bug to fix.
3. **Rate limiting on /auth/send-otp**: Not part of this plan, but SMS flood is a real risk. Should be addressed server-side.
