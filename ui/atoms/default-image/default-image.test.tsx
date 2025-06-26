import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DefaultImage } from "./default-image";

describe("DefaultImage", () => {
  it("renders with default medium size", () => {
    render(<DefaultImage />);

    const container = screen.getByTestId("default-image-container");
    expect(container.className).toContain("w-28");
    expect(container.className).toContain("h-20");
  });

  it("renders with small size", () => {
    render(<DefaultImage size="sm" />);

    const container = screen.getByTestId("default-image-container");
    expect(container.className).toContain("w-16");
    expect(container.className).toContain("h-12");
  });

  it("renders with large size", () => {
    render(<DefaultImage size="lg" />);

    const container = screen.getByTestId("default-image-container");
    expect(container.className).toContain("w-40");
    expect(container.className).toContain("h-28");
  });

  it("applies custom className", () => {
    render(<DefaultImage className="custom-class" />);

    const container = screen.getByTestId("default-image-container");
    expect(container.className).toContain("custom-class");
  });

  it("renders image icon", () => {
    render(<DefaultImage />);

    const icon = screen.getByTestId("default-image-icon");
    expect(icon).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(<DefaultImage />);

    const container = screen.getByTestId("default-image-container");
    expect(container.className).toContain("flex");
    expect(container.className).toContain("items-center");
    expect(container.className).toContain("justify-center");
    expect(container.className).toContain("rounded-lg");
    expect(container.className).toContain("bg-gray-200");
  });

  it("icon has correct size for small variant", () => {
    render(<DefaultImage size="sm" />);

    const icon = screen.getByTestId("default-image-icon");
    expect(icon).toBeInTheDocument();
  });

  it("icon has correct size for medium variant", () => {
    render(<DefaultImage size="md" />);

    const icon = screen.getByTestId("default-image-icon");
    expect(icon).toBeInTheDocument();
  });

  it("icon has correct size for large variant", () => {
    render(<DefaultImage size="lg" />);

    const icon = screen.getByTestId("default-image-icon");
    expect(icon).toBeInTheDocument();
  });

  it("icon has correct color", () => {
    render(<DefaultImage />);

    const icon = screen.getByTestId("default-image-icon");
    expect(icon).toBeInTheDocument();
  });
});
