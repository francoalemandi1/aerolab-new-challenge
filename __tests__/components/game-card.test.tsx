import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GameCard } from "@/ui/atoms";

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

describe("GameCard", () => {
  const defaultProps = {
    id: "test-game-1",
    title: "Test Game",
    imageUrl: "https://example.com/game.jpg",
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<GameCard {...defaultProps} />);

    const image = screen.getByTestId("game-image");
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", defaultProps.imageUrl);
    expect(deleteButton).toBeInTheDocument();
  });

  it("displays game image with correct alt text", () => {
    render(<GameCard {...defaultProps} />);
    const image = screen.getByTestId("game-image");
    expect(image).toHaveAttribute("alt", defaultProps.title);
  });

  it("handles delete button click", async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();

    render(<GameCard {...defaultProps} onDelete={handleDelete} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    await user.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(defaultProps.id);
  });

  it("prevents event propagation on delete button click", async () => {
    const handleDelete = vi.fn();
    const handleCardClick = vi.fn();
    const user = userEvent.setup();

    render(
      <div onClick={handleCardClick}>
        <GameCard {...defaultProps} onDelete={handleDelete} />
      </div>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleCardClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<GameCard {...defaultProps} className="custom-class" />);
    const container =
      screen.getByTestId("game-image").parentElement?.parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("has proper aspect ratio", () => {
    render(<GameCard {...defaultProps} />);
    const imageContainer = screen.getByTestId("game-image").parentElement;
    expect(imageContainer?.className).toContain("aspect-[4/5]");
  });

  it("delete button has proper styling", () => {
    render(<GameCard {...defaultProps} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(deleteButton).toHaveClass(
      "absolute",
      "bottom-2",
      "right-2",
      "bg-white/90",
      "backdrop-blur-sm"
    );
  });

  it("has hover effects", () => {
    render(<GameCard {...defaultProps} />);
    const imageContainer = screen.getByTestId("game-image").parentElement;

    expect(imageContainer?.className).toContain("hover:scale-105");
  });

  it("delete button is accessible", () => {
    render(<GameCard {...defaultProps} />);
    const deleteButton = screen.getByRole("button");

    expect(deleteButton).toBeInTheDocument();
  });

  it("handles keyboard navigation on delete button", async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();

    render(<GameCard {...defaultProps} onDelete={handleDelete} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    deleteButton.focus();
    await user.keyboard("{Enter}");
    expect(handleDelete).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleDelete).toHaveBeenCalledTimes(2);
  });
});
