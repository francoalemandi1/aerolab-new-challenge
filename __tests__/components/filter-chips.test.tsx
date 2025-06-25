import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FilterChips } from "@/ui/molecules";

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
  writable: true,
  value: 0,
});

describe("FilterChips", () => {
  const defaultProps = {
    activeFilter: "last-added" as const,
    onFilterChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  afterEach(() => {
    window.scrollY = 0;
  });

  it("renders all filter options", () => {
    render(<FilterChips {...defaultProps} />);

    expect(screen.getByText("Last added")).toBeInTheDocument();
    expect(screen.getByText("Newest")).toBeInTheDocument();
    expect(screen.getByText("Oldest")).toBeInTheDocument();
  });

  it("highlights active filter", () => {
    render(<FilterChips {...defaultProps} activeFilter="newest" />);

    const newestChip = screen.getByRole("button", { name: "Newest" });
    const lastAddedChip = screen.getByRole("button", { name: "Last added" });

    expect(newestChip).toHaveClass("bg-violet-600", "text-white");
    expect(lastAddedChip).toHaveClass("bg-transparent", "text-violet-600");
  });

  it("handles filter change on click", async () => {
    const handleFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterChips {...defaultProps} onFilterChange={handleFilterChange} />
    );

    const newestChip = screen.getByRole("button", { name: "Newest" });
    await user.click(newestChip);

    expect(handleFilterChange).toHaveBeenCalledWith("newest");
  });

  it("shows fixed chips when scrolled past threshold", () => {
    render(<FilterChips {...defaultProps} />);

    // Initially fixed chips should not be visible
    const fixedContainer = screen.queryByTestId("fixed-chips");
    expect(fixedContainer).toHaveClass("opacity-0");

    // Simulate scroll past threshold
    window.scrollY = 250;
    fireEvent.scroll(window);

    // Fixed chips should now be visible
    expect(fixedContainer).toHaveClass("opacity-100");
  });

  it("hides normal chips when scrolled past threshold", () => {
    render(<FilterChips {...defaultProps} />);

    const normalContainer = screen.getByTestId("normal-chips");

    // Initially normal chips should be visible
    expect(normalContainer).toHaveClass("opacity-100");

    // Simulate scroll past threshold
    window.scrollY = 250;
    fireEvent.scroll(window);

    // Normal chips should now be hidden
    expect(normalContainer).toHaveClass("opacity-0");
  });

  it("applies custom className", () => {
    render(<FilterChips {...defaultProps} className="custom-class" />);
    const container = screen.getByTestId("normal-chips").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("fixed chips have correct positioning", () => {
    render(<FilterChips {...defaultProps} />);
    const fixedContainer = screen.getByTestId("fixed-chips");

    expect(fixedContainer).toHaveClass(
      "fixed",
      "top-4",
      "left-1/2",
      "-translate-x-1/2",
      "z-50"
    );
  });

  it("fixed chips have glassmorphism effect", () => {
    render(<FilterChips {...defaultProps} />);
    const fixedChipsContainer = screen.getByTestId("fixed-chips").firstChild;

    expect(fixedChipsContainer).toHaveClass(
      "bg-white/90",
      "backdrop-blur-sm",
      "rounded-full"
    );
  });

  it("handles keyboard navigation", async () => {
    const handleFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterChips {...defaultProps} onFilterChange={handleFilterChange} />
    );

    const newestChip = screen.getByRole("button", { name: "Newest" });
    newestChip.focus();

    await user.keyboard("{Enter}");
    expect(handleFilterChange).toHaveBeenCalledWith("newest");

    await user.keyboard(" ");
    expect(handleFilterChange).toHaveBeenCalledTimes(2);
  });

  it("scroll event listener is properly managed", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<FilterChips {...defaultProps} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
