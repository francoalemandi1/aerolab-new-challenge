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
    const title = screen.getByRole("heading");
    const description = screen.getByText(defaultProps.description);

    expect(image).toBeInTheDocument();
    expect(title).toHaveTextContent(defaultProps.title);
    expect(description).toBeInTheDocument();
  });

  it("displays image with correct attributes", () => {
    render(<EmptyState {...defaultProps} />);
    const image = screen.getByTestId("empty-state-image");

    expect(image).toHaveAttribute("src", "/empty-cards.png");
    expect(image).toHaveAttribute("alt", "Empty cards illustration");
  });

  it("applies custom className", () => {
    render(<EmptyState {...defaultProps} className="custom-class" />);
    const container = screen
      .getByTestId("empty-state-image")
      .closest(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    render(<EmptyState {...defaultProps} />);
    const container = screen.getByTestId("empty-state-image").parentElement;

    expect(container?.className).toContain("flex");
    expect(container?.className).toContain("items-center");
    expect(container?.className).toContain("justify-center");
  });

  it("title has correct styling", () => {
    render(<EmptyState {...defaultProps} />);
    const title = screen.getByRole("heading");

    expect(title.className).toContain("text-violet-600");
  });

  it("description has correct styling", () => {
    render(<EmptyState {...defaultProps} />);
    const description = screen.getByText(defaultProps.description);

    expect(description.className).toContain("text-gray");
  });

  it("image has proper dimensions", () => {
    render(<EmptyState {...defaultProps} />);
    const image = screen.getByTestId("empty-state-image");

    expect(image.className).toContain("w-full");
    expect(image.className).toContain("max-w-sm");
  });
});
