import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingSpinner } from "./loading-spinner";

describe("LoadingSpinner", () => {
  it("renders with default props", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("renders with custom text", () => {
    const customText = "Loading your games...";
    render(<LoadingSpinner text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);

    let spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size="md" />);
    spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-spinner";
    render(<LoadingSpinner className={customClass} />);

    const container = screen.getByRole("status").parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner text="Loading content" />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");

    const hiddenText = screen.getByText("Loading...");
    expect(hiddenText).toHaveClass("sr-only");
  });

  it("renders without text when not provided", () => {
    render(<LoadingSpinner />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument(); // sr-only text
    expect(screen.queryByText("Loading your games...")).not.toBeInTheDocument();
  });

  it("has spinning animation", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
