"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/ui/atoms/button";
import { ArrowRight, Github } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <motion.main
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Aerolab Challenge
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              A modern full-stack application built with Next.js, TypeScript,
              Supabase, and the latest web technologies. Experience seamless
              authentication, real-time updates, and beautiful UI components.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="group">
              <Link href="/auth/signin">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Built with Next.js and optimized for performance with Web Vitals in mind."
            />
            <FeatureCard
              icon="🔒"
              title="Secure by Default"
              description="Authentication powered by Supabase with row-level security and encrypted data."
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful UI"
              description="Modern design system with Tailwind CSS, shadcn/ui, and smooth animations."
            />
            <FeatureCard
              icon="📱"
              title="Responsive"
              description="Fully responsive design that works perfectly on all devices and screen sizes."
            />
            <FeatureCard
              icon="🧪"
              title="Well Tested"
              description="Comprehensive testing suite with Vitest, React Testing Library, and Storybook."
            />
            <FeatureCard
              icon="🚀"
              title="Production Ready"
              description="CI/CD pipeline with GitHub Actions, health checks, and monitoring."
            />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
