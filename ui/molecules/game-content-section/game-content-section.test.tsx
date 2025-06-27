import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GameContentSection } from "./game-content-section";

describe("GameContentSection", () => {
  it("renders title and content", () => {
    render(
      <GameContentSection title="Summary">
        <p>This is a game summary</p>
      </GameContentSection>
    );

    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("This is a game summary")).toBeInTheDocument();
  });

  it("renders with text content", () => {
    render(
      <GameContentSection title="Platforms">
        PlayStation 5 • Xbox Series X/S • PC
      </GameContentSection>
    );

    expect(screen.getByText("Platforms")).toBeInTheDocument();
    expect(
      screen.getByText("PlayStation 5 • Xbox Series X/S • PC")
    ).toBeInTheDocument();
  });

  it("applies default className", () => {
    const { container } = render(
      <GameContentSection title="Test">Test content</GameContentSection>
    );

    const sectionElement = container.firstChild as HTMLElement;
    expect(sectionElement).toHaveClass("mb-8");
  });

  it("applies custom className", () => {
    const { container } = render(
      <GameContentSection title="Test" className="custom-class mb-12">
        Test content
      </GameContentSection>
    );

    const sectionElement = container.firstChild as HTMLElement;
    expect(sectionElement).toHaveClass("custom-class", "mb-12");
  });

  it("renders title with correct styling", () => {
    render(<GameContentSection title="Test Title">Content</GameContentSection>);

    const titleElement = screen.getByText("Test Title");
    // Check for H2 default classes plus the additional mb-2 class
    expect(titleElement).toHaveClass("font-inter");
    expect(titleElement).toHaveClass("font-semibold");
    expect(titleElement).toHaveClass("md:text-h2-desktop");
    expect(titleElement).toHaveClass("text-gray-dark");
    expect(titleElement).toHaveClass("mb-2");
  });

  it("renders content with correct styling", () => {
    const { container } = render(
      <GameContentSection title="Test">Content text</GameContentSection>
    );

    // Get the content div (the second div child)
    const contentElement = container.querySelector("div > div:nth-child(2)");
    expect(contentElement).toHaveClass(
      "text-sm",
      "leading-relaxed",
      "text-gray",
      "md:text-base"
    );
  });
});
