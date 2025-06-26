import React from "react";
import { cn } from "@/lib/utils";
import { AppHeader, GameSearch } from "@/ui/molecules";
import { SavedGamesSection } from "./saved-games-section";

interface GamingPageLayoutProps {
  className?: string;
}

export const GamingPageLayout = ({ className }: GamingPageLayoutProps) => {
  return (
    <div className={cn("px-6 py-8", className)}>
      {/* Header - Server Component */}
      <AppHeader title="Gaming Haven Z" className="mb-8" />

      {/* Search - Client Component */}
      <GameSearch placeholder="Search games..." />

      {/* Saved games section - Client Component */}
      <SavedGamesSection className="mb-6" />
    </div>
  );
};
