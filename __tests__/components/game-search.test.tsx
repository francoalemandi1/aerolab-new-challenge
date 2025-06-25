import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GameSearch } from "@/ui/molecules";

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

describe("GameSearch", () => {
  const mockOnGameSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input with placeholder", () => {
    render(<GameSearch placeholder="Search for games..." />);

    const input = screen.getByPlaceholderText("Search for games...");
    expect(input).toBeInTheDocument();
  });

  it("shows search icon", () => {
    render(<GameSearch />);

    const container =
      screen.getByPlaceholderText("Search games...").parentElement;
    const icon = container?.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("shows dropdown when typing", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      expect(
        screen.getByText("Grand Theft Auto San Andreas")
      ).toBeInTheDocument();
    });
  });

  it("filters games based on search input", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "V");

    await waitFor(() => {
      expect(screen.getByText("Grand Theft Auto V")).toBeInTheDocument();
      expect(
        screen.queryByText("Grand Theft Auto III")
      ).not.toBeInTheDocument();
    });
  });

  it("calls onGameSelect when game is clicked", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      const gameItem = screen.getByText("Grand Theft Auto San Andreas");
      expect(gameItem).toBeInTheDocument();
    });

    const gameItem = screen.getByText("Grand Theft Auto San Andreas");
    await user.click(gameItem);

    expect(mockOnGameSelect).toHaveBeenCalledWith({
      id: "1",
      title: "Grand Theft Auto San Andreas",
      imageUrl: expect.any(String),
    });
  });

  it("closes dropdown when game is selected", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      expect(
        screen.getByText("Grand Theft Auto San Andreas")
      ).toBeInTheDocument();
    });

    const gameItem = screen.getByText("Grand Theft Auto San Andreas");
    await user.click(gameItem);

    await waitFor(() => {
      expect(screen.queryByText("Grand Theft Auto V")).not.toBeInTheDocument();
    });
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <GameSearch onGameSelect={mockOnGameSelect} />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      expect(
        screen.getByText("Grand Theft Auto San Andreas")
      ).toBeInTheDocument();
    });

    const outsideElement = screen.getByTestId("outside");
    await user.click(outsideElement);

    await waitFor(() => {
      expect(
        screen.queryByText("Grand Theft Auto San Andreas")
      ).not.toBeInTheDocument();
    });
  });

  it("shows game images in dropdown", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      const images = screen.getAllByTestId("game-image");
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it("applies custom className", () => {
    render(<GameSearch className="custom-class" />);

    const container = screen
      .getByPlaceholderText("Search games...")
      .closest(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("hides dropdown when input is empty", async () => {
    const user = userEvent.setup();
    render(<GameSearch onGameSelect={mockOnGameSelect} />);

    const input = screen.getByPlaceholderText("Search games...");
    await user.type(input, "Grand");

    await waitFor(() => {
      expect(
        screen.getByText("Grand Theft Auto San Andreas")
      ).toBeInTheDocument();
    });

    await user.clear(input);

    await waitFor(() => {
      expect(
        screen.queryByText("Grand Theft Auto San Andreas")
      ).not.toBeInTheDocument();
    });
  });
});
