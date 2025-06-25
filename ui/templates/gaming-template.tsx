import React from "react";
import { GamingPageLayout } from "@/ui/organisms";

interface GamingTemplateProps {
  className?: string;
  hasGames?: boolean;
  onGameClick?: (gameId: string) => void;
}

export const GamingTemplate: React.FC<GamingTemplateProps> = ({
  className,
  hasGames = false,
  onGameClick,
}) => {
  return (
    <GamingPageLayout
      className={className}
      hasGames={hasGames}
      onGameClick={onGameClick}
    />
  );
};
