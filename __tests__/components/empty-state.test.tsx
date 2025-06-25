import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "@/ui/molecules";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} data-testid="empty-state-image" />
  ),
}));

describe("EmptyState", () => {
  const defaultProps = {
    title: "Nothing here yet",
    description: "Start adding some content",
  };

  it("renders with required props", () => {
    render(<EmptyState {...defaultProps} />);

    const image = screen.getByTestId("empty-state-image");
    const title = screen.getByRole("heading", { level: 2 });
    const description = screen.getByText(defaultProps.description);

    expect(image).toBeInTheDocument();
    expect(title).toHaveTextContent(defaultProps.title);
    expect(description).toBeInTheDocument();
  });

  it("displays image with correct attributes", () => {
    render(<EmptyState {...defaultProps} />);
    const image = screen.getByTestId("empty-state-image");

    expect(image).toHaveAttribute("src", "/empty-cards.png");
    expect(image).toHaveAttribute("alt", "Empty state");
  });

  it("applies custom className", () => {
    render(<EmptyState {...defaultProps} className="custom-class" />);
    const container = screen.getByTestId("empty-state-image").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("has proper layout structure", () => {
    render(<EmptyState {...defaultProps} />);
    const container = screen.getByTestId("empty-state-image").parentElement;

    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-center"
    );
  });

  it("title has correct styling", () => {
    render(<EmptyState {...defaultProps} />);
    const title = screen.getByRole("heading", { level: 2 });

    expect(title).toHaveClass("text-violet-600", "mb-2");
  });

  it("description has correct styling", () => {
    render(<EmptyState {...defaultProps} />);
    const description = screen.getByText(defaultProps.description);

    expect(description).toHaveClass("text-gray-600");
  });

  it("image has proper dimensions", () => {
    render(<EmptyState {...defaultProps} />);
    const image = screen.getByTestId("empty-state-image");

    expect(image).toHaveClass("w-48", "h-48", "mb-6");
  });
});
