import React from "react";
import { cn } from "@/lib/utils";
import { AppHeader, GameSearch } from "@/ui/molecules";
import { SavedGamesSection } from "./saved-games-section";

interface GamingPageLayoutProps {
  className?: string;
}

export const GamingPageLayout = ({ className }: GamingPageLayoutProps) => {
  return (
    <div className={cn("px-6 py-8 md:px-12 md:py-12", className)}>
      {/* Header - Server Component */}
      <AppHeader title="Gaming Haven Z" className="mb-8 md:mb-12" />

      {/* Search - Client Component */}
      <div className="md:mx-auto md:max-w-2xl">
        <GameSearch placeholder="Search games..." />
      </div>

      {/* Saved games section - Client Component */}
      <SavedGamesSection className="mb-6 mt-8 md:mt-16" />
    </div>
  );
};
