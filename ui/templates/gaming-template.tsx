import React from "react";
import { GamingPageLayout } from "../organisms";

interface GamingTemplateProps {
  className?: string;
  hasGames?: boolean;
  onGameClick?: (gameId: string) => void;
}

export const GamingTemplate: React.FC<GamingTemplateProps> = ({
  className,
}) => {
  return <GamingPageLayout className={className} />;
};
