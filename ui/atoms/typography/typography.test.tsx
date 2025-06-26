import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Caption,
  GradientText,
} from "@/ui/atoms/typography";

describe("Typography Components", () => {
  describe("H1", () => {
    it("renders with correct text", () => {
      render(<H1>Test Heading 1</H1>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test Heading 1"
      );
    });

    it("applies custom className", () => {
      render(<H1 className="custom-class">Test</H1>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "custom-class"
      );
    });

    it("has correct default styles", () => {
      render(<H1>Test</H1>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-semibold",
        "bg-gradient-violet-text",
        "bg-clip-text",
        "text-transparent"
      );
    });

    it("renders as h1 element", () => {
      render(<H1>Test</H1>);
      expect(screen.getByRole("heading", { level: 1 }).tagName).toBe("H1");
    });
  });

  describe("H2", () => {
    it("renders with correct text", () => {
      render(<H2>Test Heading 2</H2>);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Test Heading 2"
      );
    });

    it("has correct default styles", () => {
      render(<H2>Test</H2>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-semibold",
        "text-gray-dark"
      );
    });

    it("merges custom className with defaults", () => {
      render(<H2 className="text-red-500">Test</H2>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-semibold",
        "text-red-500"
      );
    });
  });

  describe("H3", () => {
    it("renders with correct text", () => {
      render(<H3>Test Heading 3</H3>);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Test Heading 3"
      );
    });

    it("has correct default styles", () => {
      render(<H3>Test</H3>);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-medium",
        "text-typography-h3"
      );
    });
  });

  describe("H4", () => {
    it("renders with correct text", () => {
      render(<H4>Test Heading 4</H4>);
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
        "Test Heading 4"
      );
    });

    it("has correct responsive styles", () => {
      render(<H4>Test</H4>);
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-medium",
        "text-typography-h4"
      );
    });
  });

  describe("H5", () => {
    it("renders with correct text", () => {
      render(<H5>Test Heading 5</H5>);
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
        "Test Heading 5"
      );
    });

    it("has correct desktop-only styles", () => {
      render(<H5>Test</H5>);
      const heading = screen.getByRole("heading", { level: 5 });
      expect(heading).toHaveClass(
        "font-inter",
        "font-medium",
        "hidden",
        "md:block",
        "text-typography-h4"
      );
    });

    it("is hidden on mobile", () => {
      render(<H5>Test</H5>);
      const heading = screen.getByRole("heading", { level: 5 });
      expect(heading).toHaveClass("hidden", "md:block");
    });
  });

  describe("Body", () => {
    it("renders with correct text", () => {
      render(<Body>Test body text</Body>);
      expect(screen.getByText("Test body text")).toBeInTheDocument();
    });

    it("has correct default styles", () => {
      render(<Body>Test</Body>);
      const bodyText = screen.getByText("Test");
      expect(bodyText).toHaveClass(
        "font-inter",
        "text-base",
        "text-gray",
        "leading-relaxed"
      );
    });

    it("renders as p element by default", () => {
      render(<Body>Test</Body>);
      expect(screen.getByText("Test").tagName).toBe("P");
    });

    it("handles long text content correctly", () => {
      const longText =
        "This is a very long text that should wrap properly and maintain good readability with the appropriate line height and spacing.";
      render(<Body>{longText}</Body>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe("Caption", () => {
    it("renders with correct text", () => {
      render(<Caption>Test caption</Caption>);
      expect(screen.getByText("Test caption")).toBeInTheDocument();
    });

    it("has correct default styles", () => {
      render(<Caption>Test</Caption>);
      const caption = screen.getByText("Test");
      expect(caption).toHaveClass(
        "font-inter",
        "text-sm",
        "text-gray",
        "leading-relaxed"
      );
    });

    it("renders as span element by default", () => {
      render(<Caption>Test</Caption>);
      expect(screen.getByText("Test").tagName).toBe("SPAN");
    });
  });

  describe("GradientText", () => {
    it("renders with correct text", () => {
      render(<GradientText>Test gradient</GradientText>);
      expect(screen.getByText("Test gradient")).toBeInTheDocument();
    });

    it("has correct gradient styles", () => {
      render(<GradientText>Test</GradientText>);
      const gradientText = screen.getByText("Test");
      expect(gradientText).toHaveClass(
        "bg-gradient-violet-text",
        "bg-clip-text",
        "text-transparent"
      );
    });

    it("renders as span element by default", () => {
      render(<GradientText>Test</GradientText>);
      expect(screen.getByText("Test").tagName).toBe("SPAN");
    });

    it("can be used inline within other text", () => {
      render(
        <Body>
          This is normal text with <GradientText>gradient text</GradientText>{" "}
          inline.
        </Body>
      );
      expect(screen.getByText("gradient text")).toHaveClass(
        "bg-gradient-violet-text"
      );
      expect(screen.getByText(/This is normal text with/)).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("maintains proper heading hierarchy", () => {
      render(
        <div>
          <H1>Main Title</H1>
          <H2>Section Title</H2>
          <H3>Subsection Title</H3>
          <H4>Sub-subsection Title</H4>
          <H5>Minor Heading</H5>
        </div>
      );

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
    });

    it("preserves text content for screen readers", () => {
      render(<H1>Important Heading</H1>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAccessibleName("Important Heading");
    });

    it("gradient text maintains accessibility", () => {
      render(<GradientText>Important gradient text</GradientText>);
      const gradientText = screen.getByText("Important gradient text");
      expect(gradientText).toBeInTheDocument();
      // Even with transparent text class, content should be accessible
      expect(gradientText.textContent).toBe("Important gradient text");
    });
  });

  // Responsive Design Tests
  describe("Responsive Design", () => {
    it("H1 has responsive text sizing", () => {
      render(<H1>Responsive heading</H1>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("md:text-h1-desktop");
    });

    it("H4 has responsive text sizing", () => {
      render(<H4>Responsive heading</H4>);
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading).toHaveClass("md:text-h4-desktop");
    });

    it("H5 is hidden on mobile", () => {
      render(<H5>Desktop only heading</H5>);
      const heading = screen.getByRole("heading", { level: 5 });
      expect(heading).toHaveClass("hidden", "md:block");
    });
  });

  // Integration Tests
  describe("Integration", () => {
    it("components work together in a typical page structure", () => {
      render(
        <article>
          <H1>Article Title</H1>
          <H2>Introduction</H2>
          <Body>
            This is the introduction paragraph with some{" "}
            <GradientText>highlighted text</GradientText>.
          </Body>
          <H3>Main Section</H3>
          <Body>Main content goes here.</Body>
          <Caption>Published on January 1, 2024</Caption>
        </article>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Article Title"
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Introduction"
      );
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Main Section"
      );
      expect(screen.getByText("highlighted text")).toHaveClass(
        "bg-gradient-violet-text"
      );
      expect(screen.getByText("Published on January 1, 2024")).toHaveClass(
        "font-inter",
        "text-sm"
      );
    });
  });
});
