# AI Finance Dashboard

A modern, full-stack personal finance and expense tracking application built with **Next.js 16 (App Router)**. This project demonstrates clean architecture, advanced state management, server-side data fetching, and AI-powered categorizations.

## Features

- **Smart AI Categorization:** Automatically categorizes expenses based on descriptions using Google Gemini / DeepSeek via Moonshot AI.
- **Real-time Synchronization:** Seamless state management and optimistic UI updates using TanStack Query (React Query) and React Hook Form.
- **Secure Authentication:** Robust user authentication and session management powered by Clerk, with strict route protection.
- **Database Integrity:** PostgreSQL database hosted on Neon, accessed securely via Prisma ORM with strict Foreign Key constraints.
- **Modern Minimalist UI:** Built with Tailwind CSS, Shadcn UI, and Radix UI primitives, featuring full Light/Dark mode support and responsive design.
- **Data Visualization:** Interactive and dynamic charts using Recharts.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Shadcn UI, Recharts.
- **Backend:** Next.js Route Handlers (API Routes), Prisma ORM.
- **Database:** Neon (Serverless PostgreSQL).
- **Authentication:** Clerk.
- **Validation & Forms:** Zod, React Hook Form.
- **State Management:** TanStack Query (React Query v5).
- **AI Integration:** Google Gen AI SDK / DeepSeek.

## Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/ahmadistanbuli1/ai-finance-dashboard.git
cd ai-finance-dashboard
\`\`\`

### 2. Install dependencies

This project uses `pnpm` as the package manager.
\`\`\`bash
pnpm install
\`\`\`

### 3. Setup Environment Variables

Create a `.env` file in the root of the project and add the following keys:
\`\`\`ini

# Clerk Authentication

NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test*...
CLERK*SECRET_KEY=sk_test*...

# Neon Database (Prisma)

DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.aws.neon.tech/[dbname]?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://[user]:[password]@[endpoint].aws.neon.tech/[dbname]?sslmode=require"

# AI Provider (GEMENI)

GEMINI_API_KEY="sk-..."
\`\`\`

### 4. Setup the Database

Generate the Prisma client and push the schema to your Neon database:
\`\`\`bash
pnpm prisma generate
pnpm prisma db push
\`\`\`

### 5. Start the development server

\`\`\`bash
pnpm dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Design Patterns

- **Facade Pattern:** Aggregated mutations via custom hooks (`useRecordMutations`) for cleaner UI components.
- **Separation of Concerns (SoC):** Distinct boundaries between API routes (Controllers), Services (API fetching), Hooks (State), and Components (UI).
- **Graceful Degradation:** The AI suggestion feature gracefully fails over to manual selection if the AI provider experiences downtime (503 Service Unavailable).

## License

This project is open-source and available under the [MIT License](LICENSE).
