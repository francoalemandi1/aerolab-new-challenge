import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/ui/atoms";

describe("Command Components", () => {
  describe("Command", () => {
    it("renders with children", () => {
      render(
        <Command>
          <div>Test Content</div>
        </Command>
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Command className="custom-command">
          <div>Test Content</div>
        </Command>
      );

      const command = screen
        .getByText("Test Content")
        .closest('[class*="custom-command"]');
      expect(command).toBeInTheDocument();
    });
  });

  describe("CommandDialog", () => {
    it("renders when open", () => {
      render(
        <CommandDialog open={true} onOpenChange={() => {}}>
          <div>Dialog Content</div>
        </CommandDialog>
      );

      expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      render(
        <CommandDialog open={false} onOpenChange={() => {}}>
          <div>Dialog Content</div>
        </CommandDialog>
      );

      expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
    });

    it("calls onOpenChange when closed", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <CommandDialog open={true} onOpenChange={onOpenChange}>
          <div>Dialog Content</div>
        </CommandDialog>
      );

      // Press Escape key to close
      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("CommandInput", () => {
    it("renders input with placeholder", () => {
      render(
        <Command>
          <CommandInput placeholder="Search games..." />
        </Command>
      );

      const input = screen.getByPlaceholderText("Search games...");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("handles value changes", async () => {
      const user = userEvent.setup();

      render(
        <Command>
          <CommandInput placeholder="Search..." />
        </Command>
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "test query");

      expect(input).toHaveValue("test query");
    });

    it("shows search icon", () => {
      render(
        <Command>
          <CommandInput placeholder="Search..." />
        </Command>
      );

      // Check for search icon (should be an svg)
      const searchIcon = screen.getByRole("combobox").previousElementSibling;
      expect(searchIcon).toBeInTheDocument();
      expect(searchIcon?.tagName.toLowerCase()).toBe("svg");
    });
  });

  describe("CommandList", () => {
    it("renders children", () => {
      render(
        <Command>
          <CommandList>
            <div>List Content</div>
          </CommandList>
        </Command>
      );

      expect(screen.getByText("List Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Command>
          <CommandList className="custom-list">
            <div>List Content</div>
          </CommandList>
        </Command>
      );

      const list = screen
        .getByText("List Content")
        .closest('[class*="custom-list"]');
      expect(list).toBeInTheDocument();
    });
  });

  describe("CommandEmpty", () => {
    it("renders empty state message", () => {
      render(
        <Command>
          <CommandEmpty>No results found</CommandEmpty>
        </Command>
      );

      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  describe("CommandGroup", () => {
    it("renders with heading", () => {
      render(
        <Command>
          <CommandGroup heading="Recent Games">
            <div>Group Content</div>
          </CommandGroup>
        </Command>
      );

      expect(screen.getByText("Recent Games")).toBeInTheDocument();
      expect(screen.getByText("Group Content")).toBeInTheDocument();
    });

    it("renders without heading", () => {
      render(
        <Command>
          <CommandGroup>
            <div>Group Content</div>
          </CommandGroup>
        </Command>
      );

      expect(screen.getByText("Group Content")).toBeInTheDocument();
    });
  });

  describe("CommandItem", () => {
    it("renders item content", () => {
      render(
        <Command>
          <CommandItem>
            <span>Game Item</span>
          </CommandItem>
        </Command>
      );

      expect(screen.getByText("Game Item")).toBeInTheDocument();
    });

    it("handles click events", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Command>
          <CommandItem onSelect={onSelect}>
            <span>Clickable Item</span>
          </CommandItem>
        </Command>
      );

      const item = screen.getByText("Clickable Item");
      await user.click(item);

      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("applies disabled state", () => {
      render(
        <Command>
          <CommandItem disabled>
            <span>Disabled Item</span>
          </CommandItem>
        </Command>
      );

      const item = screen.getByText("Disabled Item").closest('[role="option"]');
      expect(item).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("CommandSeparator", () => {
    it("renders separator", () => {
      render(
        <Command>
          <CommandSeparator />
        </Command>
      );

      const separator = screen.getByRole("separator");
      expect(separator).toBeInTheDocument();
    });
  });

  describe("CommandShortcut", () => {
    it("renders shortcut text", () => {
      render(
        <Command>
          <CommandItem>
            <span>Item with shortcut</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </Command>
      );

      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });

    it("applies shortcut styling", () => {
      render(
        <Command>
          <CommandItem>
            <span>Item</span>
            <CommandShortcut>Ctrl+K</CommandShortcut>
          </CommandItem>
        </Command>
      );

      const shortcut = screen.getByText("Ctrl+K");
      expect(shortcut).toHaveClass("ml-auto");
    });
  });

  describe("Full Command Example", () => {
    it("renders complete command structure", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Command>
          <CommandInput placeholder="Search games..." />
          <CommandList>
            <CommandEmpty>No games found.</CommandEmpty>
            <CommandGroup heading="Recent">
              <CommandItem onSelect={onSelect}>
                <span>Game 1</span>
              </CommandItem>
              <CommandItem onSelect={onSelect}>
                <span>Game 2</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Popular">
              <CommandItem onSelect={onSelect}>
                <span>Popular Game</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );

      // Check all elements are rendered
      expect(
        screen.getByPlaceholderText("Search games...")
      ).toBeInTheDocument();
      expect(screen.getByText("Recent")).toBeInTheDocument();
      expect(screen.getByText("Popular")).toBeInTheDocument();
      expect(screen.getByText("Game 1")).toBeInTheDocument();
      expect(screen.getByText("Game 2")).toBeInTheDocument();
      expect(screen.getByText("Popular Game")).toBeInTheDocument();
      expect(screen.getByText("⌘P")).toBeInTheDocument();

      // Test interaction
      await user.click(screen.getByText("Game 1"));
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });
});
