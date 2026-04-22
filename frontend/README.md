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

This builds an optimized production bundle and starts the Next.js server on port 3000. You can deploy this to any platform that supports Node.js (Vercel, AWS, Docker, a VPS, etc.).

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
