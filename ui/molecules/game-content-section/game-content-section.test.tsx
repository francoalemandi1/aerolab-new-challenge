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
    expect(titleElement).toHaveClass(
      "mb-2",
      "text-h2-mobile",
      "text-gray-dark",
      "md:text-h2-desktop"
    );
  });

  it("renders content with correct styling", () => {
    const { container } = render(
      <GameContentSection title="Test">Content text</GameContentSection>
    );

    const contentElement = container.querySelector("div > div:last-child");
    expect(contentElement).toHaveClass(
      "text-sm",
      "leading-relaxed",
      "text-gray",
      "md:text-base"
    );
  });
});
