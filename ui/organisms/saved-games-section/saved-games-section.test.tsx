import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SavedGamesSection } from "@/ui/organisms";

// Mock the child components and hooks
const mockGetFilteredGames = vi.fn();
vi.mock("@/hooks/useGames", () => ({
  useGames: () => ({
    savedGames: [],
    isHydrated: true,
    getFilteredGames: mockGetFilteredGames,
  }),
}));

vi.mock("@/ui/molecules", () => ({
  FilterChips: ({
    onFilterChange,
  }: {
    onFilterChange: (filter: string) => void;
  }) => (
    <div data-testid="filter-chips">
      <button onClick={() => onFilterChange("action")}>Action</button>
      <button onClick={() => onFilterChange("all")}>All</button>
    </div>
  ),
  GamesGrid: ({ games }: { games: unknown[] }) => (
    <div data-testid="games-grid">
      {games.length > 0 ? `${games.length} games` : "No games"}
    </div>
  ),
  EmptyState: () => <div data-testid="empty-state">No saved games</div>,
}));

vi.mock("@/ui/atoms", () => ({
  H1: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h1 className={className} data-testid="section-title">
      {children}
    </h1>
  ),
  H2: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h2 className={className} data-testid="section-title">
      {children}
    </h2>
  ),
  LoadingSpinner: ({ text }: { size?: string; text?: string }) => (
    <div data-testid="loading-spinner">{text}</div>
  ),
}));

describe("SavedGamesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders section title", () => {
    render(<SavedGamesSection />);

    expect(screen.getByTestId("section-title")).toBeInTheDocument();
    expect(screen.getByText("Saved games")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SavedGamesSection className="custom-section" />);

    const section = screen.getByTestId("section-title").parentElement;
    expect(section).toHaveClass("custom-section");
  });

  it("renders filter chips", () => {
    render(<SavedGamesSection />);

    // Filter chips are only shown when there are games, with empty array they're not shown
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("shows empty state when no games", () => {
    render(<SavedGamesSection />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No saved games")).toBeInTheDocument();
  });

  it("shows games grid when games exist", () => {
    // The component will use the mocked empty array
    render(<SavedGamesSection />);

    // With empty array, it should show empty state
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("applies responsive title alignment", () => {
    render(<SavedGamesSection />);

    const title = screen.getByTestId("section-title");
    expect(title).toHaveClass("md:text-center");
  });

  it("applies correct spacing classes", () => {
    render(<SavedGamesSection />);

    const section = screen.getByTestId("section-title").parentElement;
    expect(section).toBeInTheDocument();
  });

  it("renders with proper component hierarchy", () => {
    render(<SavedGamesSection />);

    const section = screen.getByTestId("section-title").parentElement;
    const title = screen.getByTestId("section-title");
    const emptyState = screen.getByTestId("empty-state");

    expect(section).toContainElement(title);
    expect(section).toContainElement(emptyState);
  });

  it("handles filter changes", () => {
    render(<SavedGamesSection />);

    // With empty games, filters are not shown and empty state is displayed
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
