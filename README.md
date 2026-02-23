# Line Manager (BarbershopManager)

Line Manager is a full-stack platform built for managing lines, appointments, and store functionality.

## Requirements
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v10.18.3)

To easily use the correct version of pnpm, enable Corepack which comes with Node.js:
```bash
corepack enable
corepack prepare pnpm@10.18.3 --activate
```

## Project Structure

This project is a monorepo managed by `pnpm workspace` to easily share code between the frontend and backend.

### Apps
- `apps/line-manager-client`: A React application built with Vite and Shadcn UI.
- `apps/line-manager-api`: A NestJS backend API.

### Packages
- `packages/line-manager-schemas`: Shared Zod validation schemas (e.g. authentication, products).
- `packages/line-manager-types`: Shared TypeScript interfaces and types (e.g. Users, Lines).
- `packages/line-manager-utils`: Shared utilities and helper functions.

## Setup Instructions

1. **Install Dependencies**
   Run the following command in the root directory to install all dependencies across the workspaces:
   ```bash
   pnpm install
   ```

2. **Build Packages**
   Before running the applications, you must build the internal shared packages so that TypeScript can resolve them correctly:
   ```bash
   pnpm build
   ```
   *(Alternatively, to specifically build a package: `pnpm -F @line-manager/schemas build`)*

3. **Running the Applications**
   
   To start **both** the frontend client and the backend API simultaneously:
   ```bash
   pnpm dev
   ```

   **Alternatively, to start them individually:**

   Frontend client application (Vite dev server):
   ```bash
   pnpm -F line-manager-client dev
   ```

   Backend API application (NestJS dev server):
   ```bash
   pnpm -F line-manager-api start:dev
   ```

## Linting
To check the code quality across the entire workspace:
```bash
pnpm -r lint
```
## Deploying
Soon...