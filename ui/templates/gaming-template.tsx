import React from "react";
import { GamingPageLayout } from "@/ui/organisms";

interface GamingTemplateProps {
  className?: string;
}

export const GamingTemplate = ({ className }: GamingTemplateProps) => {
  return <GamingPageLayout className={className} />;
};
