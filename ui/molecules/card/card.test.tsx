import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "@/ui/molecules/card";
import { Button } from "@/ui/atoms/button";
import { H4, Paragraph } from "@/ui/atoms/typography";

describe("Card Component", () => {
  describe("Basic Rendering", () => {
    it("renders with children content", () => {
      render(
        <Card>
          <h3>Card Title</h3>
          <p>Card content</p>
        </Card>
      );

      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders as div element by default", () => {
      render(<Card data-testid="card">Test content</Card>);
      const card = screen.getByTestId("card");
      expect(card.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Variant Prop", () => {
    it("renders with default variant styles", () => {
      render(
        <Card variant="default" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-white",
        "shadow-lg",
        "border",
        "border-gray-light",
        "rounded-secondary"
      );
    });

    it("renders with gradient variant styles", () => {
      render(
        <Card variant="gradient" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-gradient-violet",
        "text-white",
        "shadow-xl",
        "rounded-secondary"
      );
    });

    it("renders with bordered variant styles", () => {
      render(
        <Card variant="bordered" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-white",
        "border-2",
        "border-violet-600",
        "shadow-md",
        "rounded-secondary"
      );
    });

    it("defaults to default variant when no variant is provided", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-white",
        "shadow-lg",
        "border",
        "border-gray-light",
        "rounded-secondary"
      );
    });
  });

  describe("Radius Prop", () => {
    it("applies main radius when specified", () => {
      render(
        <Card radius="main" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-main");
    });

    it("applies secondary radius when specified", () => {
      render(
        <Card radius="secondary" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-secondary");
    });

    it("defaults to secondary radius when no radius is provided", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-secondary");
    });
  });

  describe("Combined Props", () => {
    it("correctly combines variant and radius props", () => {
      render(
        <Card variant="gradient" radius="main" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-gradient-violet",
        "text-white",
        "shadow-xl",
        "rounded-main"
      );
    });

    it("combines all props with custom className", () => {
      render(
        <Card
          variant="bordered"
          radius="main"
          className="custom-spacing"
          data-testid="card"
        >
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass(
        "p-6",
        "transition-all",
        "duration-200",
        "bg-white",
        "border-2",
        "border-violet-600",
        "shadow-md",
        "rounded-main",
        "custom-spacing"
      );
    });
  });

  describe("Content Rendering", () => {
    it("renders complex nested content correctly", () => {
      render(
        <Card variant="default" radius="secondary">
          <H4>Card Title</H4>
          <Paragraph>This is the card body content.</Paragraph>
          <Button size="sm">Action Button</Button>
        </Card>
      );

      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
        "Card Title"
      );
      expect(
        screen.getByText("This is the card body content.")
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("Action Button");
    });

    it("handles empty content gracefully", () => {
      render(<Card data-testid="card">{null}</Card>);
      const card = screen.getByTestId("card");
      expect(card).toBeInTheDocument();
    });

    it("preserves HTML structure of children", () => {
      render(
        <Card>
          <div>
            <span>Nested span</span>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Card>
      );

      expect(screen.getByText("Nested span")).toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });

  describe("Accessibility", () => {
    it("maintains proper ARIA structure when used with headings", () => {
      render(
        <Card>
          <h2>Card Heading</h2>
          <p>Card description</p>
        </Card>
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Card Heading");
      expect(heading).toBeInTheDocument();
    });

    it("preserves semantic structure of content", () => {
      render(
        <Card>
          <article>
            <h3>Article Title</h3>
            <p>Article content</p>
          </article>
        </Card>
      );

      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("supports custom ARIA attributes", () => {
      render(
        <Card role="region" aria-labelledby="card-title" data-testid="card">
          <h3 id="card-title">Accessible Card</h3>
          <p>Content</p>
        </Card>
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("role", "region");
      expect(card).toHaveAttribute("aria-labelledby", "card-title");
    });
  });

  describe("Visual Variants Integration", () => {
    it("gradient variant works well with white text content", () => {
      render(
        <Card variant="gradient" data-testid="card">
          <H4 className="text-white">White Title</H4>
          <Paragraph className="text-white/90">White body text</Paragraph>
        </Card>
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-gradient-violet", "text-white");
      expect(screen.getByRole("heading", { level: 4 })).toHaveClass(
        "text-white"
      );
    });

    it("bordered variant works with violet text content", () => {
      render(
        <Card variant="bordered">
          <H4 className="text-violet-900">Violet Title</H4>
          <Paragraph>Regular body text</Paragraph>
        </Card>
      );

      expect(screen.getByRole("heading", { level: 4 })).toHaveClass(
        "text-violet-900"
      );
      expect(screen.getByText("Regular body text")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("maintains consistent styling across different content sizes", () => {
      const shortContent = "Short";
      const longContent =
        "This is a very long content that might wrap to multiple lines and should maintain proper styling and spacing throughout the card component regardless of the content length.";

      const { rerender } = render(
        <Card data-testid="card">{shortContent}</Card>
      );

      let card = screen.getByTestId("card");
      expect(card).toHaveClass("p-6");

      rerender(<Card data-testid="card">{longContent}</Card>);

      card = screen.getByTestId("card");
      expect(card).toHaveClass("p-6");
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");

      // Should fall back to defaults
      expect(card).toHaveClass("bg-white", "rounded-secondary");
    });

    it("handles invalid variant gracefully", () => {
      render(
        <Card variant="default" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");

      // Should still render without crashing
      expect(card).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Real-world Usage Examples", () => {
    it("renders a typical product card correctly", () => {
      render(
        <Card variant="default" radius="secondary">
          <div className="mb-4 aspect-square rounded bg-gray-200"></div>
          <H4 className="mb-2">Product Name</H4>
          <Paragraph className="mb-4 text-gray">
            Product description goes here
          </Paragraph>
          <div className="flex items-center justify-between">
            <span className="font-semibold">$99.99</span>
            <Button size="sm">Add to Cart</Button>
          </div>
        </Card>
      );

      expect(screen.getByText("Product Name")).toBeInTheDocument();
      expect(
        screen.getByText("Product description goes here")
      ).toBeInTheDocument();
      expect(screen.getByText("$99.99")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Add to Cart" })
      ).toBeInTheDocument();
    });

    it("renders a feature highlight card correctly", () => {
      render(
        <Card variant="gradient" radius="main">
          <div className="text-center">
            <div className="mb-4 text-4xl">🚀</div>
            <H4 className="mb-2 text-white">Premium Feature</H4>
            <Paragraph className="mb-4 text-white/90">
              Unlock advanced capabilities with our premium plan
            </Paragraph>
            <Button variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
        </Card>
      );

      expect(screen.getByText("🚀")).toBeInTheDocument();
      expect(screen.getByText("Premium Feature")).toHaveClass("text-white");
      expect(
        screen.getByRole("button", { name: "Learn More" })
      ).toBeInTheDocument();
    });
  });
});
