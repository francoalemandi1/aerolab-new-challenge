import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ErrorProvider } from "@/providers/error-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Gaming Haven",
    template: "%s | Gaming Haven",
  },
  description:
    "Discover, collect, and explore your favorite games with Gaming Haven - your ultimate gaming collection platform",
  keywords: [
    "Gaming",
    "Games",
    "Collection",
    "IGDB",
    "Game Database",
    "Gaming Platform",
  ],
  authors: [{ name: "Gaming Haven Team" }],
  creator: "Gaming Haven",
  icons: {
    icon: "/game-logo.svg",
    shortcut: "/game-logo.svg",
    apple: "/game-logo.svg",
  },
  metadataBase: new URL("https://the-gaming-haven.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://the-gaming-haven.vercel.app",
    title: "Gaming Haven",
    description:
      "Discover, collect, and explore your favorite games with Gaming Haven - your ultimate gaming collection platform",
    siteName: "Gaming Haven",
    images: [
      {
        url: "/game-logo.svg",
        width: 512,
        height: 512,
        alt: "Gaming Haven - Your Ultimate Gaming Collection Platform",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Haven",
    description:
      "Discover, collect, and explore your favorite games with Gaming Haven - your ultimate gaming collection platform",
    images: [
      {
        url: "/game-logo.svg",
        alt: "Gaming Haven - Your Ultimate Gaming Collection Platform",
      },
    ],
    creator: "@gaminghaven",
    site: "@gaminghaven",
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
    { media: "(prefers-color-scheme: light)", color: "#6B46C1" },
    { media: "(prefers-color-scheme: dark)", color: "#3C1661" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/game-logo.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
        <link rel="alternate icon" href="/favicon.ico" sizes="16x16 32x32" />
        <link rel="apple-touch-icon" href="/game-logo.svg" sizes="180x180" />
        <link
          rel="preload"
          href="/game-logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/empty-cards.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/mobile-background.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/desktop-background.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/desktop-keys.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/mobile-keys.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <ErrorProvider>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </QueryProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
