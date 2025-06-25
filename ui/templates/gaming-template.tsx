import React from "react";
import { GamingPageLayout } from "@/ui/organisms";

interface GamingTemplateProps {
  className?: string;
  hasGames?: boolean;
}

export const GamingTemplate: React.FC<GamingTemplateProps> = ({
  className,
  hasGames = false,
}) => {
  return <GamingPageLayout className={className} hasGames={hasGames} />;
};
