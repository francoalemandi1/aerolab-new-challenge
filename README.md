# Gaming Haven

A modern gaming collection platform built with Next.js, Supabase, and TypeScript. Discover, collect, and manage your favorite games.

**🚀 Live Demo**: [https://the-gaming-haven.vercel.app](https://the-gaming-haven.vercel.app)

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Supabase** - Authentication & database
- **Tailwind CSS** - Styling
- **IGDB API** - Game data
- **Vitest** - Testing

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

## Setup

1. **Clone & install**

   ```bash
   git clone <repository-url>
   cd aerolab-challenge
   npm install
   ```

2. **Environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   IGDB_CLIENT_ID=your_igdb_client_id
   IGDB_ACCESS_TOKEN=your_igdb_client_secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run test` - Run tests
- `npm run test:ui` - Test with UI
- `npm run lint` - Lint code
- `npm run type-check` - Type checking

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- game-card.test.tsx

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
app/
├── (private)/          # Protected routes
│   └── games/         # Games dashboard
├── (public)/          # Public routes
│   └── auth/         # Authentication
├── api/              # API routes
└── globals.css       # Global styles

components/           # Reusable components
hooks/               # Custom React hooks
lib/                 # Utilities & configs
providers/           # Context providers
types/               # TypeScript types
ui/                  # UI components (Atomic Design)
├── atoms/           # Basic components
├── molecules/       # Composed components
├── organisms/       # Complex components
└── templates/       # Page layouts
```

## Environment Setup Notes

- **IGDB API**: Register at [IGDB API](https://api.igdb.com) for game data
- **Supabase**: Create project at [supabase.com](https://supabase.com)
- **Local Development**: Uses `http://localhost:3000`
- **Production**: Deployed on Vercel

---

For issues or questions, check the existing tests and component stories for usage examples.
