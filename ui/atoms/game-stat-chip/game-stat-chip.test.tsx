import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Star, Calendar, Gamepad2 } from "lucide-react";
import { GameStatChip } from "./game-stat-chip";

describe("GameStatChip", () => {
  it("renders with rating data", () => {
    render(<GameStatChip icon={Star} label="Rating" value="85" />);

    expect(screen.getByText("Rating:")).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
  });

  it("renders with release date data", () => {
    render(<GameStatChip icon={Calendar} label="Release" value="2024" />);

    expect(screen.getByText("Release:")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders with genre data", () => {
    render(<GameStatChip icon={Gamepad2} label="Genre" value="Action RPG" />);

    expect(screen.getByText("Genre:")).toBeInTheDocument();
    expect(screen.getByText("Action RPG")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <GameStatChip icon={Star} label="Rating" value="92" />
    );

    const chipElement = container.firstChild as HTMLElement;
    expect(chipElement).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "rounded-full",
      "border",
      "border-violet-50",
      "px-4",
      "py-2"
    );
  });

  it("renders icon with correct styling", () => {
    const { container } = render(
      <GameStatChip icon={Star} label="Rating" value="90" />
    );

    const iconElement = container.querySelector("svg");
    expect(iconElement).toHaveClass("h-4", "w-4", "text-violet-600");
  });
});
