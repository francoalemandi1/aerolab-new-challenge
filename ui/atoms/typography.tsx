import React from "react";
import { cn } from "@/lib/utils";

// Typography Component Props
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

// H1 Component - Gradient text for both mobile and desktop
export const H1: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        "font-inter font-semibold",
        "text-h1-mobile md:text-h1-desktop",
        "bg-gradient-violet-text bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

// H2 Component - Black text
export const H2: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={cn(
        "font-inter font-semibold",
        "text-h2-mobile md:text-h2-desktop",
        "text-gray-dark",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

// H3 Component - Custom purple color
export const H3: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn(
        "font-inter font-medium",
        "text-h3-mobile md:text-h3-desktop",
        "text-typography-h3",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

// H4 Component - Gray color, different sizes for mobile/desktop
export const H4: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h4
      className={cn(
        "font-inter font-medium",
        "text-h4-mobile md:text-h4-desktop",
        "text-typography-h4",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

// H5 Component - Only for desktop
export const H5: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h5
      className={cn(
        "font-inter font-medium",
        "hidden text-h5-desktop md:block",
        "text-typography-h4",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
};

// Body Text Component
export const Body: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(
        "font-inter text-base",
        "leading-relaxed text-gray",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// Caption/Small Text Component
export const Caption: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "font-inter text-sm",
        "leading-relaxed text-gray",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Gradient Text Component (for special cases)
export const GradientText: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "bg-gradient-violet-text bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Display Components for showcasing the design system
export const TypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-xl font-bold">Design System Typography</h2>

        <div className="space-y-4">
          <H1>Heading 1 - Gradient Text</H1>
          <H2>Heading 2 - Black Text</H2>
          <H3>Heading 3 - Purple Text</H3>
          <H4>Heading 4 - Gray Text</H4>
          <H5>Heading 5 - Desktop Only</H5>
          <Body>
            This is body text using the Inter font family. It demonstrates the
            regular text styling for paragraphs and general content.
          </Body>
          <Caption>This is caption text for smaller content</Caption>
          <p>
            You can also use <GradientText>gradient text</GradientText> inline
            for special emphasis.
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Color Palette</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Grays */}
          <div className="space-y-2">
            <h4 className="font-medium">Grays</h4>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-gray-dark text-sm text-white">
              Dark
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-gray text-sm text-white">
              Gray
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-gray-light text-sm text-gray-dark">
              Light
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary border bg-gray-white text-sm text-gray-dark">
              White
            </div>
          </div>

          {/* Pinks */}
          <div className="space-y-2">
            <h4 className="font-medium">Pinks</h4>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-pink-600 text-sm text-white">
              Main
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-pink-200 text-sm text-gray-dark">
              Secondary
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-pink-100 text-sm text-gray-dark">
              Third
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-pink-50 text-sm text-gray-dark">
              Fourth
            </div>
          </div>

          {/* Violets */}
          <div className="space-y-2">
            <h4 className="font-medium">Violets</h4>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-violet-900 text-sm text-white">
              Main
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-violet-600 text-sm text-white">
              Secondary
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-violet-100 text-sm text-gray-dark">
              Third
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-violet-50 text-sm text-gray-dark">
              Fourth
            </div>
          </div>

          {/* Status Colors */}
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-red-600 text-sm text-white">
              Red
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-green-600 text-sm text-white">
              Green
            </div>
            <div className="flex h-12 w-full items-center justify-center rounded-secondary bg-gradient-violet text-sm text-white">
              Gradient
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Border Radius</h3>
        <div className="flex gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-main bg-violet-600 text-sm text-white">
            Main (30px)
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-secondary bg-pink-600 text-sm text-white">
            Secondary (8px)
          </div>
        </div>
      </div>
    </div>
  );
};
