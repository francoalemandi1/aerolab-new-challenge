import React from "react";
import { LucideIcon } from "lucide-react";

interface GameStatChipProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const GameStatChip = ({
  icon: Icon,
  label,
  value,
}: GameStatChipProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-violet-50 px-4 py-2">
      <Icon className="h-4 w-4 text-violet-600" />
      <span className="font-inter text-sm text-violet-600">{label}: </span>
      <span className="font-inter text-sm text-gray-dark">{value}</span>
    </div>
  );
};
