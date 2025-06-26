import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "@/ui/atoms/input";

describe("Input Component", () => {
  describe("Basic Rendering", () => {
    it("renders input element", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
    });

    it("renders with placeholder text", () => {
      render(<Input placeholder="Enter your name" />);
      const input = screen.getByPlaceholderText("Enter your name");
      expect(input).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Input className="custom-class" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("custom-class");
    });

    it("has correct default styles", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass(
        "flex",
        "h-9",
        "w-full",
        "rounded-md",
        "border",
        "border-input",
        "bg-transparent",
        "px-3",
        "py-1",
        "text-sm",
        "shadow-sm",
        "transition-colors"
      );
    });
  });

  describe("Input Types", () => {
    it("renders with text type by default", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("text");
    });

    it("renders with email type", () => {
      render(<Input type="email" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("email");
    });

    it("renders with password type", () => {
      render(<Input type="password" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("password");
    });

    it("renders with number type", () => {
      render(<Input type="number" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("number");
    });

    it("renders with search type", () => {
      render(<Input type="search" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("search");
    });

    it("renders with date type", () => {
      render(<Input type="date" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.type).toBe("date");
    });
  });

  describe("Value and Default Value", () => {
    it("renders with default value", () => {
      render(<Input defaultValue="Default text" data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("Default text");
    });

    it("renders with controlled value", () => {
      render(
        <Input
          value="Controlled value"
          onChange={() => {}}
          data-testid="input"
        />
      );
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("Controlled value");
    });

    it("handles empty value", () => {
      render(<Input value="" onChange={() => {}} data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("");
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
    });

    it("applies disabled styles", () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("does not trigger onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} data-testid="input" />);

      const input = screen.getByTestId("input");
      await user.type(input, "text");

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Event Handling", () => {
    it("calls onChange handler when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} data-testid="input" />);

      const input = screen.getByTestId("input");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(4); // 't', 'e', 's', 't'
    });

    it("calls onFocus handler when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} data-testid="input" />);

      const input = screen.getByTestId("input");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur handler when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} data-testid="input" />);

      const input = screen.getByTestId("input");
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events", () => {
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} data-testid="input" />);

      const input = screen.getByTestId("input");
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Focus Management", () => {
    it("supports focus and blur programmatically", () => {
      const inputRef = { current: null as HTMLInputElement | null };
      render(<Input ref={inputRef} data-testid="input" />);

      const input = screen.getByTestId("input") as HTMLInputElement;
      inputRef.current = input;

      input.focus();
      expect(input).toHaveFocus();

      input.blur();
      expect(input).not.toHaveFocus();
    });

    it("shows focus styles when focused", async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);

      const input = screen.getByTestId("input");
      await user.click(input);

      expect(input).toHaveFocus();
      expect(input).toHaveClass(
        "focus-visible:outline-none",
        "focus-visible:ring-1",
        "focus-visible:ring-ring"
      );
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(<Input aria-label="Search products" data-testid="input" />);
      const input = screen.getByLabelText("Search products");
      expect(input).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(
        <div>
          <Input aria-describedby="help-text" data-testid="input" />
          <div id="help-text">Enter your full name</div>
        </div>
      );

      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-invalid for error states", () => {
      render(<Input aria-invalid="true" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("supports aria-required for required fields", () => {
      render(<Input aria-required="true" required data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toBeRequired();
    });
  });

  describe("Form Integration", () => {
    it("works within form elements", () => {
      render(
        <form data-testid="form">
          <Input name="username" data-testid="input" />
        </form>
      );

      const form = screen.getByTestId("form");
      const input = screen.getByTestId("input");

      expect(form).toContainElement(input);
      expect(input).toHaveAttribute("name", "username");
    });

    it("supports form validation attributes", () => {
      render(
        <Input
          required
          minLength={3}
          maxLength={50}
          pattern="[A-Za-z]+"
          data-testid="input"
        />
      );

      const input = screen.getByTestId("input");
      expect(input).toBeRequired();
      expect(input).toHaveAttribute("minlength", "3");
      expect(input).toHaveAttribute("maxlength", "50");
      expect(input).toHaveAttribute("pattern", "[A-Za-z]+");
    });
  });

  describe("Error States", () => {
    it("applies error styles with custom className", () => {
      render(
        <Input
          className="border-red-600 focus:border-red-600 focus:ring-red-600"
          data-testid="input"
        />
      );

      const input = screen.getByTestId("input");
      expect(input).toHaveClass(
        "border-red-600",
        "focus:border-red-600",
        "focus:ring-red-600"
      );
    });

    it("shows error state visually", () => {
      render(
        <div>
          <Input
            aria-invalid="true"
            className="border-red-600"
            data-testid="input"
          />
          <span className="text-sm text-red-600">This field is required</span>
        </div>
      );

      const input = screen.getByTestId("input");
      expect(input).toHaveClass("border-red-600");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });

  describe("Real-world Usage Examples", () => {
    it("renders as email input in login form", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Input
          type="email"
          placeholder="Enter your email"
          required
          onChange={handleChange}
          data-testid="email-input"
        />
      );

      const input = screen.getByTestId("email-input") as HTMLInputElement;
      expect(input.type).toBe("email");
      expect(input).toBeRequired();

      await user.type(input, "user@example.com");
      expect(input.value).toBe("user@example.com");
    });

    it("renders as password input with security features", () => {
      render(
        <Input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          required
          data-testid="password-input"
        />
      );

      const input = screen.getByTestId("password-input") as HTMLInputElement;
      expect(input.type).toBe("password");
      expect(input).toHaveAttribute("autocomplete", "current-password");
      expect(input).toBeRequired();
    });

    it("renders as search input with debounced functionality", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();

      render(
        <Input
          type="search"
          placeholder="Search products..."
          onChange={handleSearch}
          data-testid="search-input"
        />
      );

      const input = screen.getByTestId("search-input");
      await user.type(input, "laptop");

      expect(handleSearch).toHaveBeenCalled();
      expect((input as HTMLInputElement).value).toBe("laptop");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long input values", async () => {
      const user = userEvent.setup();
      const longText = "a".repeat(1000);

      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;

      await user.type(input, longText);
      expect(input.value).toBe(longText);
    });

    it("handles special characters and unicode", async () => {
      const user = userEvent.setup();
      const specialText = "Hello 世界 🌍 @#$%";

      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input") as HTMLInputElement;

      await user.type(input, specialText);
      expect(input.value).toBe(specialText);
    });

    it("handles rapid input changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} data-testid="input" />);
      const input = screen.getByTestId("input");

      await user.type(input, "fast");
      expect(handleChange).toHaveBeenCalledTimes(4);
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="initial" data-testid="input" />);

      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("initial");

      await user.clear(input);
      await user.type(input, "changed");
      expect(input.value).toBe("changed");
    });

    it("works as controlled component", async () => {
      const user = userEvent.setup();
      let value = "controlled";
      const handleChange = vi.fn(e => {
        value = e.target.value;
      });

      const { rerender } = render(
        <Input value={value} onChange={handleChange} data-testid="input" />
      );

      const input = screen.getByTestId("input") as HTMLInputElement;
      expect(input.value).toBe("controlled");

      await user.type(input, " updated");

      rerender(
        <Input value={value} onChange={handleChange} data-testid="input" />
      );
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
