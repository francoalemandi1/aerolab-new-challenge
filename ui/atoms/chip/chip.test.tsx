import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "@/ui/atoms";

describe("Chip", () => {
  it("renders with default props", () => {
    render(<Chip>Test Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Test Chip" });
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("px-1.5", "py-1");
  });

  it("applies active styles when isActive prop is true", () => {
    render(<Chip isActive>Active Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Active Chip" });
    expect(chip).toHaveClass("bg-violet-600", "text-white", "px-2.5");
  });

  it("applies inactive styles when isActive prop is false", () => {
    render(<Chip isActive={false}>Inactive Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Inactive Chip" });
    expect(chip).toHaveClass("bg-transparent", "text-violet-600", "px-1.5");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Chip onClick={handleClick}>Clickable Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Clickable Chip" });

    await user.click(chip);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Chip className="custom-class">Custom Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Custom Chip" });
    expect(chip).toHaveClass("custom-class");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Chip disabled>Disabled Chip</Chip>);
    const chip = screen.getByRole("button", { name: "Disabled Chip" });
    expect(chip).toBeDisabled();
  });

  it("has proper typography styles", () => {
    render(<Chip>Typography Test</Chip>);
    const chip = screen.getByRole("button", { name: "Typography Test" });
    expect(chip.className).toContain("font-medium");
  });

  it("has proper hover and focus states", async () => {
    const user = userEvent.setup();
    render(<Chip>Hover Test</Chip>);
    const chip = screen.getByRole("button", { name: "Hover Test" });

    await user.hover(chip);
    // Test that hover class exists in className
    expect(chip.className).toContain("hover:bg-violet");

    chip.focus();
    expect(chip).toHaveFocus();
  });

  it("supports keyboard navigation", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Chip onClick={handleClick}>Keyboard Test</Chip>);
    const chip = screen.getByRole("button", { name: "Keyboard Test" });

    chip.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
