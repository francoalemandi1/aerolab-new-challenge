import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: "Gaming Haven Z - Saved Games",
  description: "Your collection of saved games in Gaming Haven Z",
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

  return <HomeClient hasGames={true} />;
}
