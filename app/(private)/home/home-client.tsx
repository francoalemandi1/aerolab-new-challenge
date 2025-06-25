"use client";

import { useRouter } from "next/navigation";
import { GamingTemplate } from "@/ui/templates";

interface HomeClientProps {
  hasGames?: boolean;
}

export function HomeClient({ hasGames = true }: HomeClientProps) {
  const router = useRouter();

  const handleGameClick = (gameId: string) => {
    router.push(`/home/${gameId}`);
  };

  return <GamingTemplate hasGames={hasGames} onGameClick={handleGameClick} />;
}
