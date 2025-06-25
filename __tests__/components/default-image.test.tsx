import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DefaultImage } from "@/ui/atoms";

describe("DefaultImage", () => {
  it("renders with default medium size", () => {
    render(<DefaultImage />);

    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toHaveClass("w-28", "h-20");
  });

  it("renders with small size", () => {
    render(<DefaultImage size="sm" />);

    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toHaveClass("w-16", "h-12");
  });

  it("renders with large size", () => {
    render(<DefaultImage size="lg" />);

    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toHaveClass("w-40", "h-28");
  });

  it("applies custom className", () => {
    render(<DefaultImage className="custom-class" />);

    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("renders image icon", () => {
    render(<DefaultImage />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(<DefaultImage />);

    const container = screen.getByRole("img", { hidden: true }).parentElement;
    expect(container).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "bg-gray-200",
      "rounded-lg"
    );
  });

  it("icon has correct size for small variant", () => {
    render(<DefaultImage size="sm" />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("h-4", "w-4");
  });

  it("icon has correct size for medium variant", () => {
    render(<DefaultImage size="md" />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("h-6", "w-6");
  });

  it("icon has correct size for large variant", () => {
    render(<DefaultImage size="lg" />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("h-8", "w-8");
  });

  it("icon has correct color", () => {
    render(<DefaultImage />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("text-gray-400");
  });
});
