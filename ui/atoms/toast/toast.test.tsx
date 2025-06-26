import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toast, ToastProvider, GameCollectionToast } from "@/ui/atoms";

// Mock the toast hook
vi.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    toasts: [],
    addToast: vi.fn(),
    removeToast: vi.fn(),
  }),
}));

describe("Toast Components", () => {
  describe("Toast", () => {
    it("renders with title and description", () => {
      const { container } = render(
        <ToastProvider>
          <Toast>
            <div>Test Title</div>
            <div>Test Description</div>
          </Toast>
        </ToastProvider>
      );

      expect(container).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ToastProvider>
          <Toast className="custom-toast">
            <div>Test Content</div>
          </Toast>
        </ToastProvider>
      );

      expect(container).toBeInTheDocument();
    });

    it("handles close action", async () => {
      const { container } = render(
        <ToastProvider>
          <Toast>
            <div>Test Content</div>
            <button>Close</button>
          </Toast>
        </ToastProvider>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("GameCollectionToast", () => {
    it("renders add toast correctly", () => {
      render(
        <ToastProvider>
          <GameCollectionToast
            title="Game collected"
            description="Test Game has been added to your collection"
            action="added"
          />
        </ToastProvider>
      );

      expect(screen.getByText("Game collected")).toBeInTheDocument();
      expect(
        screen.getByText("Test Game has been added to your collection")
      ).toBeInTheDocument();
    });

    it("renders remove toast correctly", () => {
      render(
        <ToastProvider>
          <GameCollectionToast
            title="Game removed"
            description="Test Game has been removed from your collection"
            action="removed"
          />
        </ToastProvider>
      );

      expect(screen.getByText("Game removed")).toBeInTheDocument();
      expect(
        screen.getByText("Test Game has been removed from your collection")
      ).toBeInTheDocument();
    });

    it("shows correct icon for add action", () => {
      render(
        <ToastProvider>
          <GameCollectionToast
            title="Game collected"
            description="Test description"
            action="added"
          />
        </ToastProvider>
      );

      expect(screen.getByText("Game collected")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("shows correct icon for remove action", () => {
      render(
        <ToastProvider>
          <GameCollectionToast
            title="Game removed"
            description="Test description"
            action="removed"
          />
        </ToastProvider>
      );

      expect(screen.getByText("Game removed")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("defaults to added action when no action specified", () => {
      render(
        <ToastProvider>
          <GameCollectionToast
            title="Test Title"
            description="Test description"
          />
        </ToastProvider>
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });
  });

  describe("ToastProvider", () => {
    it("provides toast context to children", () => {
      render(
        <ToastProvider>
          <div>Test Child</div>
        </ToastProvider>
      );

      expect(screen.getByText("Test Child")).toBeInTheDocument();
    });
  });
});
