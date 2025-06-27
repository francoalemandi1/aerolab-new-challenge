import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: "Gaming Haven - Your Game Collection",
  description: "Discover, collect, and explore your favorite games. Search through thousands of games and build your ultimate gaming collection.",
  openGraph: {
    title: "Gaming Haven - Your Game Collection",
    description: "Discover, collect, and explore your favorite games. Search through thousands of games and build your ultimate gaming collection.",
    images: [
      {
        url: "/game-logo.svg",
        width: 512,
        height: 512,
        alt: "Gaming Haven - Game Collection Dashboard",
        type: "image/svg+xml",
      },
    ],
    type: "website",
    siteName: "Gaming Haven",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Haven - Your Game Collection",
    description: "Discover, collect, and explore your favorite games. Search through thousands of games and build your ultimate gaming collection.",
    images: [
      {
        url: "/game-logo.svg",
        alt: "Gaming Haven - Game Collection Dashboard",
      },
    ],
  },
};

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/signin");
  }

  return <HomeClient />;
}
