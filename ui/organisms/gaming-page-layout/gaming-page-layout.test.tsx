import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GamingPageLayout } from "@/ui/organisms";

// Mock the child components
vi.mock("@/ui/molecules", () => ({
  AppHeader: ({ title, className }: { title: string; className?: string }) => (
    <div className={className} data-testid="app-header">
      {title}
    </div>
  ),
  GameSearch: ({ placeholder }: { placeholder: string }) => (
    <input placeholder={placeholder} data-testid="game-search" />
  ),
}));

vi.mock("@/ui/organisms/saved-games-section", () => ({
  SavedGamesSection: ({ className }: { className?: string }) => (
    <div className={className} data-testid="saved-games-section">
      Saved Games
    </div>
  ),
}));

describe("GamingPageLayout", () => {
  it("renders all main components", () => {
    render(<GamingPageLayout />);

    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("game-search")).toBeInTheDocument();
    expect(screen.getByTestId("saved-games-section")).toBeInTheDocument();
  });

  it("renders header with correct title", () => {
    render(<GamingPageLayout />);

    expect(screen.getByText("Gaming Haven Z")).toBeInTheDocument();
  });

  it("renders search with correct placeholder", () => {
    render(<GamingPageLayout />);

    const searchInput = screen.getByPlaceholderText("Search games...");
    expect(searchInput).toBeInTheDocument();
  });

  it("applies responsive padding classes to main container", () => {
    render(<GamingPageLayout />);

    const container = screen.getByTestId("app-header").parentElement;
    expect(container).toHaveClass("px-6", "py-8", "md:px-12", "md:py-12");
  });

  it("applies custom className when provided", () => {
    render(<GamingPageLayout className="custom-layout" />);

    const container = screen.getByTestId("app-header").parentElement;
    expect(container).toHaveClass("custom-layout");
  });

  it("applies correct spacing classes to header", () => {
    render(<GamingPageLayout />);

    const header = screen.getByTestId("app-header");
    expect(header).toHaveClass("mb-8", "md:mb-12");
  });

  it("applies responsive container to search section", () => {
    render(<GamingPageLayout />);

    const searchContainer = screen.getByTestId("game-search").parentElement;
    expect(searchContainer).toHaveClass("md:mx-auto", "md:max-w-2xl");
  });

  it("applies correct spacing classes to saved games section", () => {
    render(<GamingPageLayout />);

    const savedGamesSection = screen.getByTestId("saved-games-section");
    expect(savedGamesSection).toHaveClass("mb-6", "mt-8", "md:mt-16");
  });

  it("maintains proper component hierarchy", () => {
    render(<GamingPageLayout />);

    const container = screen.getByTestId("app-header").parentElement;
    const header = screen.getByTestId("app-header");
    const search = screen.getByTestId("game-search");
    const savedGames = screen.getByTestId("saved-games-section");

    expect(container).toContainElement(header);
    expect(container).toContainElement(search);
    expect(container).toContainElement(savedGames);
  });
});
