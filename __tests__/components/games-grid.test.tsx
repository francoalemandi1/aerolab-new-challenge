import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GamesGrid } from "@/ui/molecules";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} data-testid="game-image" />
  ),
}));

describe("GamesGrid", () => {
  const defaultProps = {
    onDeleteGame: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders grid of games", () => {
    render(<GamesGrid {...defaultProps} />);

    const gameImages = screen.getAllByTestId("game-image");
    expect(gameImages).toHaveLength(12); // Should render 12 mock games
  });

  it("has proper grid layout", () => {
    render(<GamesGrid {...defaultProps} />);

    const gridContainer =
      screen.getAllByTestId("game-image")[0].parentElement?.parentElement
        ?.parentElement;
    expect(gridContainer).toHaveClass("grid", "grid-cols-2", "gap-6");
  });

  it("handles game deletion", async () => {
    const handleDeleteGame = vi.fn();
    const user = userEvent.setup();

    render(<GamesGrid {...defaultProps} onDeleteGame={handleDeleteGame} />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(handleDeleteGame).toHaveBeenCalledTimes(1);
    expect(handleDeleteGame).toHaveBeenCalledWith(expect.any(String));
  });

  it("removes game from grid when deleted", async () => {
    const user = userEvent.setup();
    render(<GamesGrid {...defaultProps} />);

    const initialGameCount = screen.getAllByTestId("game-image").length;
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    await user.click(deleteButtons[0]);

    const updatedGameCount = screen.getAllByTestId("game-image").length;
    expect(updatedGameCount).toBe(initialGameCount - 1);
  });

  it("handles multiple game deletions", async () => {
    const user = userEvent.setup();
    render(<GamesGrid {...defaultProps} />);

    const initialGameCount = screen.getAllByTestId("game-image").length;

    // Delete first two games
    let deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    const updatedGameCount = screen.getAllByTestId("game-image").length;
    expect(updatedGameCount).toBe(initialGameCount - 2);
  });

  it("applies custom className", () => {
    render(<GamesGrid {...defaultProps} className="custom-class" />);
    const container =
      screen.getAllByTestId("game-image")[0].parentElement?.parentElement
        ?.parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("each game has unique id", () => {
    const handleDeleteGame = vi.fn();
    render(<GamesGrid {...defaultProps} onDeleteGame={handleDeleteGame} />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    // Click multiple delete buttons and check unique IDs
    const clickPromises = deleteButtons
      .slice(0, 3)
      .map(button => userEvent.setup().click(button));

    return Promise.all(clickPromises).then(() => {
      expect(handleDeleteGame).toHaveBeenCalledTimes(3);

      const calledIds = handleDeleteGame.mock.calls.map(call => call[0]);
      const uniqueIds = [...new Set(calledIds)];

      expect(uniqueIds).toHaveLength(3); // All IDs should be unique
    });
  });

  it("games have proper image sources", () => {
    render(<GamesGrid {...defaultProps} />);

    const gameImages = screen.getAllByTestId("game-image");
    gameImages.forEach(image => {
      expect(image).toHaveAttribute("src");
      expect(image.getAttribute("src")).toMatch(/images\.unsplash\.com/);
    });
  });

  it("maintains grid structure after deletions", async () => {
    const user = userEvent.setup();
    render(<GamesGrid {...defaultProps} />);

    // Delete a few games
    const deleteButtons = screen.getAllByRole("button");
    await user.click(deleteButtons[0]);
    await user.click(deleteButtons[0]); // Click first button again since array updates

    // Grid should still have proper classes
    const gridContainer =
      screen.getAllByTestId("game-image")[0].parentElement?.parentElement
        ?.parentElement;
    expect(gridContainer).toHaveClass("grid", "grid-cols-2", "gap-6");
  });
});
