import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { GameCollectionButton } from "./game-collection-button";

// Mock the hooks and components
const mockAddGame = vi.fn();
const mockRemoveGame = vi.fn();
const mockIsGameSaved = vi.fn();
const mockShowGameCollectedToast = vi.fn();
const mockShowGameRemovedToast = vi.fn();

vi.mock("@/hooks/useGames", () => ({
  useGames: () => ({
    addGame: mockAddGame,
    removeGame: mockRemoveGame,
    isGameSaved: mockIsGameSaved,
  }),
}));

vi.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    isOpen: false,
    title: "",
    description: "",
    action: "added",
    onOpenChange: vi.fn(),
    showGameCollectedToast: mockShowGameCollectedToast,
    showGameRemovedToast: mockShowGameRemovedToast,
  }),
}));

vi.mock("@/ui/atoms", () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={className}
      data-testid="collection-button"
    >
      {children}
    </button>
  ),
  GameCollectionToast: ({
    title,
    description,
    action,
  }: {
    title: string;
    description: string;
    action: string;
  }) => (
    <div data-testid="toast">
      {title} - {description} - {action}
    </div>
  ),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Toast: ({
    children,
    open,
  }: {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) => (
    <div
      data-testid="toast-component"
      style={{ display: open ? "block" : "none" }}
    >
      {children}
    </div>
  ),
  ToastViewport: () => <div data-testid="toast-viewport" />,
}));

describe("GameCollectionButton", () => {
  const mockGameData = {
    id: "1",
    title: "Test Game",
    slug: "test-game",
    imageUrl: "/test.jpg",
    imageId: "test123",
    genres: ["Action"],
    summary: "Test summary",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsGameSaved.mockReturnValue(false);
  });

  it("renders collect button when game is not saved", () => {
    mockIsGameSaved.mockReturnValue(false);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Collect game");
  });

  it("renders remove button when game is already saved", () => {
    mockIsGameSaved.mockReturnValue(true);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Game collected");
  });

  it("adds game to collection when collect button is clicked", async () => {
    const user = userEvent.setup();
    mockIsGameSaved.mockReturnValue(false);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    await user.click(button);

    expect(mockAddGame).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockGameData.id,
        title: mockGameData.title,
        slug: mockGameData.slug,
      })
    );
    expect(mockShowGameCollectedToast).toHaveBeenCalledWith(mockGameData.title);
  });

  it("removes game from collection when remove button is clicked", async () => {
    const user = userEvent.setup();
    mockIsGameSaved.mockReturnValue(true);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    await user.click(button);

    expect(mockRemoveGame).toHaveBeenCalledWith(mockGameData.id);
    expect(mockShowGameRemovedToast).toHaveBeenCalledWith(mockGameData.title);
  });

  it("applies correct styling for collect state", () => {
    mockIsGameSaved.mockReturnValue(false);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    expect(button.className).toContain("w-full");
  });

  it("applies correct styling for remove state", () => {
    mockIsGameSaved.mockReturnValue(true);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    expect(button.className).toContain("w-full");
  });

  it("handles game data without required fields gracefully", () => {
    const incompleteGameData = {
      id: "1",
      title: "Test Game",
      slug: "test-game",
    };

    mockIsGameSaved.mockReturnValue(false);

    render(
      <GameCollectionButton
        gameData={incompleteGameData as typeof mockGameData}
      />
    );

    const button = screen.getByTestId("collection-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Collect game");
  });

  it("identifies saved games correctly by id", () => {
    mockIsGameSaved.mockReturnValue(true);

    render(<GameCollectionButton gameData={mockGameData} />);

    const button = screen.getByTestId("collection-button");
    expect(button).toHaveTextContent("Game collected");
  });
});
