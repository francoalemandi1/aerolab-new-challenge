# Aerolab Challenge

A modern, full-stack application built with Next.js, TypeScript, Supabase, and the latest web technologies. This project demonstrates best practices in web development including authentication, real-time updates, comprehensive testing, and beautiful UI components.

## 🚀 Tech Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service with authentication and database

### UI & Animation
- **shadcn/ui** - Modern, accessible UI components
- **Radix UI** - Unstyled, accessible UI primitives
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide Icons** - Beautiful, customizable icon library

### Forms & Validation
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation

### Data Fetching & State Management
- **TanStack Query (React Query)** - Server state management
- **React Virtual** - Virtualization for large lists

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Storybook** - Component development and testing

### Developer Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

### Email & Communication
- **Mailgun** - Transactional email service

### Deployment & CI/CD
- **Vercel** - Production and staging deployments
- **GitHub Actions** - Continuous integration and deployment

## ✨ Features

- 🔐 **Authentication System** - Secure login/signup with Supabase
- 📧 **Email Integration** - Password reset and transactional emails
- 🎨 **Modern UI** - Beautiful, responsive design with atomic design principles
- ⚡ **Performance Optimized** - Web Vitals optimized, image optimization
- 🔍 **SEO Ready** - Proper metadata, semantic HTML, SSR
- ♿ **Accessible** - Keyboard navigation, screen reader support
- 🧪 **Well Tested** - Unit tests, integration tests, Storybook
- 🚀 **Production Ready** - CI/CD pipeline, health checks, monitoring
- 📱 **Responsive** - Works perfectly on all devices
- 🔒 **Secure** - Environment variables protection, middleware security

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Supabase account
- Mailgun account (for email features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aerolab-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `MAILGUN_API_KEY` - Your Mailgun API key
   - `MAILGUN_DOMAIN` - Your Mailgun domain

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create a new Supabase project
2. Run the following SQL to create the profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  PRIMARY KEY (id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run test-storybook` - Run Storybook tests

## 🏗️ Project Structure

```
aerolab-challenge/
├── app/                     # Next.js App Router
│   ├── auth/               # Authentication routes
│   │   ├── ui/            # Route-specific UI components
│   │   │   ├── atoms/     # Basic auth components
│   │   │   ├── molecules/ # Composed auth components  
│   │   │   ├── organisms/ # Complex auth forms
│   │   │   └── templates/ # Auth page templates
│   │   └── signin/        # Sign in page
│   ├── api/               # API routes
│   │   └── health/        # Health check endpoint
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── ui/                     # Global UI components (Atomic Design)
│   ├── atoms/             # Basic components (Button, Input)
│   ├── molecules/         # Composed components
│   ├── organisms/         # Complex components
│   └── templates/         # Page templates
├── providers/             # React context providers
├── lib/                   # Utility libraries and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── constants/             # Application constants
├── __tests__/            # Test files
├── public/               # Static assets (favicon, images)
├── middleware.ts         # Next.js middleware
└── ...config files
```

## 🎨 Atomic Design Architecture

This project follows **Atomic Design** principles for component organization:

### Global Components (`/ui`)
- **Atoms**: Basic building blocks (Button, Input, etc.)
- **Molecules**: Simple groups of atoms (Form fields, etc.)
- **Organisms**: Complex components made of molecules/atoms
- **Templates**: Page-level layout components

### Route-Specific Components (`/app/[route]/ui`)
Each route segment can have its own UI folder with the same atomic structure for components specific to that route.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🧪 Testing

Run tests with:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run Storybook:
```bash
npm run storybook
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
