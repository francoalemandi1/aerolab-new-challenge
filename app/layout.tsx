import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Aerolab Challenge",
    template: "%s | Aerolab Challenge",
  },
  description: "A modern full-stack application built with Next.js, TypeScript, and Supabase",
  keywords: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React"],
  authors: [{ name: "Aerolab Team" }],
  creator: "Aerolab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aerolab-challenge.vercel.app",
    title: "Aerolab Challenge",
    description: "A modern full-stack application built with Next.js, TypeScript, and Supabase",
    siteName: "Aerolab Challenge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerolab Challenge",
    description: "A modern full-stack application built with Next.js, TypeScript, and Supabase",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
