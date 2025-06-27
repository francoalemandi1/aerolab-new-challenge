import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming Haven - Discover Your Next Favorite Game",
  description: "Welcome to Gaming Haven - the ultimate platform to discover, collect, and explore your favorite games. Start building your gaming collection today!",
  openGraph: {
    title: "Gaming Haven - Discover Your Next Favorite Game",
    description: "Welcome to Gaming Haven - the ultimate platform to discover, collect, and explore your favorite games. Start building your gaming collection today!",
    images: [
      {
        url: "/game-logo.svg",
        width: 512,
        height: 512,
        alt: "Gaming Haven - Discover Your Next Favorite Game",
        type: "image/svg+xml",
      },
    ],
    type: "website",
    siteName: "Gaming Haven",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Haven - Discover Your Next Favorite Game",
    description: "Welcome to Gaming Haven - the ultimate platform to discover, collect, and explore your favorite games. Start building your gaming collection today!",
    images: [
      {
        url: "/game-logo.svg",
        alt: "Gaming Haven - Discover Your Next Favorite Game",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-pink-600"></div>
        <p className="text-gray-dark">Loading...</p>
        <p className="text-sm text-gray">
          Redirecting based on authentication status
        </p>
      </div>
    </div>
  );
}
