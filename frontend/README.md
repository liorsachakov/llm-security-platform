# LLM Security Platform - Frontend

A web-based platform for testing the security of Large Language Models (LLMs). As a **provider**, you deploy this platform alongside the [backend](../llm-security-platform-backend/) to test your own models against prompt injection and jailbreak attacks -- and optionally open it up to other attackers to stress-test your defenses.

## Overview

This is the Next.js frontend that provides:

- **Challenge Dashboard** -- browse and start security challenges targeting LLM models
- **Chat Interface** -- interact with LLM models and attempt to bypass their security guardrails
- **Owner Panel** -- manage challenges, models, and monitor attack attempts on your platform
- **Leaderboard** -- track top attackers and their success rates
- **User Profiles** -- authentication, registration, and user management

The frontend communicates with an AWS-deployed backend via Next.js API routes that act as a proxy layer.

## Architecture

```
Browser  -->  Next.js Frontend (this repo)  -->  AWS API Gateway  -->  Lambda Functions  -->  DynamoDB
                  |                                                                           |
                  |-- API Routes (server-side proxy) -------------------------------------------
                  |-- React UI (client-side) 
```

- **Client-side**: React components call internal `/api/...` routes
- **Server-side**: Next.js API route handlers proxy requests to the backend, handling auth cookies and token forwarding
- **Backend**: AWS Lambda + API Gateway + DynamoDB (see the [backend repo](../llm-security-platform-backend/))

## Prerequisites

- **Node.js** 18 or later
- **Yarn** 4 (this project uses Yarn 4 with PnP -- the `.yarn/` folder is included)
- **A deployed backend** -- follow the [backend README](../llm-security-platform-backend/README.md) to deploy the AWS stack first. You will need the API Gateway URL from that deployment.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd llm-security-platform/frontend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your backend API details:

```env
# Option 1: Full URL (origin + stage combined)
BACKEND_API_BASE_URL=https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com/prod

# Option 2: Origin and stage separately
BACKEND_API_ORIGIN=https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com
BACKEND_API_STAGE=prod
```

You only need **one** of the two options. `BACKEND_API_BASE_URL` takes priority if both are set.

**Where to find your API Gateway URL:**
After deploying the backend with `cdk deploy`, the output will include the API Gateway endpoint URL. It looks like `https://<id>.execute-api.<region>.amazonaws.com`.

### 4. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BACKEND_API_BASE_URL` | Yes* | Full backend API URL including stage (e.g. `https://abc123.execute-api.us-east-1.amazonaws.com/prod`) |
| `BACKEND_API_ORIGIN` | Yes* | Backend API origin without stage (e.g. `https://abc123.execute-api.us-east-1.amazonaws.com`) |
| `BACKEND_API_STAGE` | No | Backend API stage (defaults to `prod` if `BACKEND_API_ORIGIN` is set) |

*Either `BACKEND_API_BASE_URL` **or** `BACKEND_API_ORIGIN` must be provided.

## Building for Production

```bash
yarn build
yarn start
```

This builds an optimized production bundle and starts the Next.js server on port 3000. You can deploy this to any platform that supports Node.js (Vercel, AWS Amplify, Docker, a VPS, etc.).

## Deploying to AWS Amplify

AWS Amplify provides a fully managed hosting solution with SSR support for Next.js. Below is a step-by-step guide based on our tested deployment.

### Prerequisites

- An AWS account with the [AWS CLI](https://aws.amazon.com/cli/) configured
- The backend already deployed (you need the API Gateway URL)

### 1. Create the Amplify App

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **New app** > **Host web app**
3. Connect your GitHub repository
4. When prompted, set the **Root directory** to `frontend` (since the Next.js app lives in a subdirectory)

### 2. Set the Platform to Web Compute (SSR)

Amplify must run in **Web Compute** mode (not static **Web** mode) because this app uses server-side API routes.

If Amplify doesn't auto-detect Next.js SSR, run these AWS CLI commands after creating the app:

```bash
aws amplify update-app --app-id <YOUR_APP_ID> --platform WEB_COMPUTE --region <YOUR_REGION>
aws amplify update-branch --app-id <YOUR_APP_ID> --branch-name main --framework "Next.js - SSR" --region <YOUR_REGION>
```

You can find your App ID in Amplify Console > General settings.

### 3. Configure Environment Variables

In the Amplify Console, go to **Hosting > Environment variables** and add:

| Key | Value |
|---|---|
| `AMPLIFY_MONOREPO_APP_ROOT` | `frontend` |
| `BACKEND_API_ORIGIN` | `https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com` |
| `BACKEND_API_STAGE` | `prod` |

The `AMPLIFY_MONOREPO_APP_ROOT` variable tells Amplify's framework detection to look inside the `frontend/` directory.

### 4. Configure the Build Spec

Go to **Hosting > Build settings** and set the build spec (`amplify.yml`) to:

```yaml
version: 1
applications:
  - appRoot: frontend
    frontend:
      phases:
        preBuild:
          commands:
            - corepack enable
            - yarn install
        build:
          commands:
            - yarn build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - '.yarn/cache/**/*'
```

Key points:
- The `applications` array with `appRoot: frontend` is required because the Next.js app is in a subdirectory
- `corepack enable` activates Yarn 4 (the project uses `packageManager: "yarn@4.12.0"` in `package.json`)
- Build image should be **Amazon Linux 2023** (required for Next.js 14+)

### 5. Deploy

Trigger a build from the Amplify Console or push to your connected branch. Amplify will automatically build and deploy the app.

### Troubleshooting

| Issue | Solution |
|---|---|
| `Cannot read 'next' version in package.json` | Ensure `AMPLIFY_MONOREPO_APP_ROOT=frontend` is set in environment variables |
| `Monorepo spec provided without "applications" key` | Use the `applications` array format in the build spec (see step 4) |
| `Cannot find package: next` | Add `nodeLinker: node-modules` to `.yarnrc.yml` (Amplify's bundler doesn't support Yarn PnP) |
| API routes return "Missing backend API configuration" | Ensure `BACKEND_API_ORIGIN` and `BACKEND_API_STAGE` are set in Amplify environment variables. These are inlined at build time via `next.config.js` |
| 404 on all pages | Verify the platform is `WEB_COMPUTE` (not `WEB`) in General settings |

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login and signup pages
│   ├── (dashboard)/         # Main app pages (challenges, models, profile, leaderboard, owner panel)
│   ├── api/                 # Next.js API route handlers (proxy to backend)
│   ├── chat/                # Challenge chat interface and hooks
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI primitives (shadcn/ui + Radix)
│   ├── landing/             # Landing page components
│   ├── dashboard/           # Dashboard-specific components
│   ├── owner/               # Owner panel components
│   └── auth/                # Auth session provider
└── lib/
    ├── backend-api.ts       # Backend URL resolution from env vars
    ├── client-api.ts        # Client-side API helper (calls internal /api routes)
    ├── auth.ts              # Auth cookie utilities
    ├── auth-client.ts       # Client-side auth helpers
    └── server/
        └── backend-proxy.ts # Server-side proxy logic for API routes
```

## Admin / Owner Setup

The platform distinguishes between regular users (attackers) and admin users (providers/owners):

- **Regular users** can register through the signup page, browse challenges, and attempt attacks
- **Admin users** have access to the Owner Panel where they can create/manage challenges and models

Admin accounts must be created directly in the backend's DynamoDB `UsersTable` -- see the [backend README](../llm-security-platform-backend/README.md#admin-user-setup) for instructions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Package Manager**: Yarn 4 (PnP)
