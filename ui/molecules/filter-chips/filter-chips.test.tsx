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

    expect(screen.getAllByText("Last added")).toHaveLength(2); // Normal and fixed chips
    expect(screen.getAllByText("Newest")).toHaveLength(2);
    expect(screen.getAllByText("Oldest")).toHaveLength(2);
  });

  it("highlights active filter", () => {
    render(<FilterChips {...defaultProps} activeFilter="newest" />);

    const newestButtons = screen.getAllByRole("button", { name: "Newest" });
    const lastAddedButtons = screen.getAllByRole("button", {
      name: "Last added",
    });

    // Check that newest buttons contain active styling
    newestButtons.forEach(button => {
      expect(button.className).toContain("bg-violet-600");
      expect(button.className).toContain("text-white");
    });

    // Check that last added buttons contain inactive styling
    lastAddedButtons.forEach(button => {
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("text-violet-600");
    });
  });

  it("handles filter change on click", async () => {
    const handleFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterChips {...defaultProps} onFilterChange={handleFilterChange} />
    );

    const newestChips = screen.getAllByRole("button", { name: "Newest" });
    await user.click(newestChips[0]); // Click the first one (normal chips)

    expect(handleFilterChange).toHaveBeenCalledWith("newest");
  });

  it("shows fixed chips when scrolled past threshold", () => {
    render(<FilterChips {...defaultProps} />);

    // Initially fixed chips should not be visible
    const fixedContainer = screen.queryByTestId("fixed-chips");
    expect(fixedContainer?.className).toContain("opacity-0");

    // Simulate scroll past threshold
    window.scrollY = 250;
    fireEvent.scroll(window);

    // Fixed chips should now be visible
    expect(fixedContainer?.className).toContain("opacity-100");
  });

  it("hides normal chips when scrolled past threshold", () => {
    render(<FilterChips {...defaultProps} />);

    const normalContainer = screen.getByTestId("normal-chips");

    // Initially normal chips should be visible
    expect(normalContainer.className).toContain("opacity-100");

    // Simulate scroll past threshold
    window.scrollY = 250;
    fireEvent.scroll(window);

    // Normal chips should now be hidden
    expect(normalContainer.className).toContain("opacity-0");
  });

  it("applies custom className", () => {
    render(<FilterChips {...defaultProps} className="custom-class" />);
    const container = screen
      .getByTestId("normal-chips")
      .closest(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("fixed chips have correct positioning", () => {
    render(<FilterChips {...defaultProps} />);
    const fixedContainer = screen.getByTestId("fixed-chips");

    expect(fixedContainer.className).toContain("fixed");
    expect(fixedContainer.className).toContain("z-50");
  });

  it("fixed chips have glassmorphism effect", () => {
    render(<FilterChips {...defaultProps} />);
    const fixedContainer = screen.getByTestId("fixed-chips");

    expect(fixedContainer.className).toContain("bg-white/90");
    expect(fixedContainer.className).toContain("backdrop-blur-sm");
  });

  it("handles keyboard navigation", async () => {
    const handleFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterChips {...defaultProps} onFilterChange={handleFilterChange} />
    );

    const newestChips = screen.getAllByRole("button", { name: "Newest" });
    const newestChip = newestChips[0]; // Use the first one (normal chips)
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
