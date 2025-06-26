import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AppHeader } from "@/ui/molecules";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} data-testid="app-logo" />
  ),
}));

describe("AppHeader", () => {
  it("renders with required props", () => {
    render(<AppHeader title="Gaming Haven Z" />);

    const logo = screen.getByTestId("app-logo");
    const title = screen.getByRole("heading", { level: 1 });

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Gaming Haven Z");
  });

  it("renders with custom title", () => {
    const customTitle = "Custom Gaming Title";
    render(<AppHeader title={customTitle} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent(customTitle);
  });

  it("displays logo with correct attributes", () => {
    render(<AppHeader title="Gaming Haven Z" />);
    const logo = screen.getByTestId("app-logo");

    expect(logo).toHaveAttribute("src", "/game-logo.svg");
    expect(logo).toHaveAttribute("alt", "Gaming Haven Z Logo");
  });

  it("applies custom className", () => {
    render(<AppHeader title="Test Title" className="custom-class" />);
    const container = screen.getByTestId("app-logo").closest(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    render(<AppHeader title="Test Title" />);
    const container = screen.getByTestId("app-logo").parentElement;

    expect(container).toBeInTheDocument();
    expect(container?.tagName).toBe("DIV");
  });

  it("title has correct styling", () => {
    render(<AppHeader title="Test Title" />);
    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toHaveClass("text-violet-600");
  });

  it("logo has correct dimensions", () => {
    render(<AppHeader title="Test Title" />);
    const logo = screen.getByTestId("app-logo");

    expect(logo).toHaveAttribute("width", "24");
    expect(logo).toHaveAttribute("height", "24");
  });
});
