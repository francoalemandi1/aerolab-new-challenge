import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "bordered";
  radius?: "main" | "secondary";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  radius = "secondary",
  className,
  ...props
}) => {
  const baseClasses = "p-6 transition-all duration-200";

  const variantClasses = {
    default: "bg-white shadow-lg border border-gray-light",
    gradient: "bg-gradient-violet text-white shadow-xl",
    bordered: "bg-white border-2 border-violet-600 shadow-md",
  };

  const radiusClasses = {
    main: "rounded-main",
    secondary: "rounded-secondary",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        radiusClasses[radius],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Usage examples component
export const CardShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <h2 className="mb-4 text-xl font-bold">Card Components</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card variant="default" radius="secondary">
          <h3 className="mb-2 text-lg font-semibold">Default Card</h3>
          <p className="text-gray">
            This is a default card with secondary border radius.
          </p>
        </Card>

        <Card variant="gradient" radius="main">
          <h3 className="mb-2 text-lg font-semibold">Gradient Card</h3>
          <p className="text-white/90">
            This is a gradient card with main border radius.
          </p>
        </Card>

        <Card variant="bordered" radius="secondary">
          <h3 className="mb-2 text-lg font-semibold text-violet-900">
            Bordered Card
          </h3>
          <p className="text-gray">
            This is a bordered card with violet border.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card variant="default" radius="main" className="hover:shadow-xl">
          <h3 className="mb-2 text-lg font-semibold">Hover Effect</h3>
          <p className="text-gray">
            This card has a hover effect with enhanced shadow.
          </p>
        </Card>

        <Card variant="gradient" radius="secondary" className="hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold">Scale Effect</h3>
          <p className="text-white/90">This card scales on hover.</p>
        </Card>
      </div>
    </div>
  );
};
