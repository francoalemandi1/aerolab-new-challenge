import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("renders with default props", () => {
    render(<SearchInput />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.className).toContain("px-12");
    expect(input.className).toContain("py-4");
  });

  it("displays placeholder text", () => {
    const placeholder = "Search for games...";
    render(<SearchInput placeholder={placeholder} />);
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<SearchInput />);
    const container = screen.getByRole("textbox").parentElement;
    const icon = container?.querySelector('[data-testid="search-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it("handles input changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "test");
    expect(handleChange).toHaveBeenCalledTimes(4); // One for each character
  });

  it("applies custom className", () => {
    render(<SearchInput className="custom-class" />);
    const container = screen.getByRole("textbox").closest(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("forwards input props correctly", () => {
    render(<SearchInput value="test value" readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
    expect(input).toHaveAttribute("readonly");
  });

  it("has proper focus styles", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    expect(input).toHaveFocus();
  });

  it("is accessible", () => {
    render(<SearchInput aria-label="Search games" />);
    const input = screen.getByLabelText("Search games");
    expect(input).toBeInTheDocument();
  });
});
