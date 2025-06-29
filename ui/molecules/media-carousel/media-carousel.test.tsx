import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MediaCarousel } from "@/ui/molecules";
import { createQueryClientWrapper } from "../../../vitest.setup";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} data-testid="carousel-image" />
  ),
}));

// Mock Radix UI Dialog
vi.mock("@radix-ui/react-dialog", () => ({
  Root: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="dialog-root">{children}</div> : null,
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-portal">{children}</div>
  ),
  Overlay: ({ className }: { className: string }) => (
    <div data-testid="dialog-overlay" className={className} />
  ),
  Content: ({
    children,
    className,
    onKeyDown,
  }: {
    children: React.ReactNode;
    className: string;
    onKeyDown: (event: React.KeyboardEvent) => void;
  }) => (
    <div
      data-testid="dialog-content"
      className={className}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  ),
  Close: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild: boolean;
  }) =>
    asChild ? children : <button data-testid="dialog-close">{children}</button>,
  Title: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
}));

// Mock Radix UI VisuallyHidden
vi.mock("@radix-ui/react-visually-hidden", () => ({
  Root: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild: boolean;
  }) =>
    asChild ? children : <div data-testid="visually-hidden">{children}</div>,
}));

const mockScrollBy = vi.fn();
const mockGetElementById = vi.spyOn(document, "getElementById");

describe("MediaCarousel", () => {
  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  const mockImageIds = ["abc123", "def456", "ghi789"];

  let wrapper: ReturnType<typeof createQueryClientWrapper>;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = createQueryClientWrapper();
    mockGetElementById.mockReturnValue({
      scrollBy: mockScrollBy,
    } as unknown as HTMLElement);
  });

  it("renders images when provided", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const images = screen.getAllByTestId("carousel-image");
    expect(images).toHaveLength(3);
  });

  it("renders default images when no images provided", () => {
    render(<MediaCarousel images={[]} />, { wrapper });

    // Should render 4 default placeholder containers
    const container = screen.getByTestId("carousel-container");
    const imageContainers = container.children;
    expect(imageContainers).toHaveLength(4);
  });

  it("shows navigation arrows when there are multiple real images", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("hides navigation arrows when no real images", () => {
    render(<MediaCarousel images={[]} />, { wrapper });

    const prevButton = screen.queryByLabelText("Previous image");
    const nextButton = screen.queryByLabelText("Next image");

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("hides navigation arrows when only one real image", () => {
    render(<MediaCarousel images={[mockImages[0]]} />, { wrapper });

    const prevButton = screen.queryByLabelText("Previous image");
    const nextButton = screen.queryByLabelText("Next image");

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("calls scrollBy when carousel navigation buttons are clicked", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    await user.click(prevButton);
    expect(mockGetElementById).toHaveBeenCalledWith("carousel-container");
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: -120,
      behavior: "smooth",
    });

    await user.click(nextButton);
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: 120,
      behavior: "smooth",
    });
  });

  it("makes images clickable to expand", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButtons = screen.getAllByLabelText(/Expandir screenshot/);
    expect(expandButtons).toHaveLength(3);

    // Click the first image to expand
    await user.click(expandButtons[0]);

    // Should render the modal
    expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
  });

  it("shows modal with correct image when expanded", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel imageIds={mockImageIds} />, { wrapper });

    const expandButtons = screen.getAllByLabelText(/Expandir screenshot/);

    // Click the second image
    await user.click(expandButtons[1]);

    // Should show dialog with correct content
    const dialogContent = screen.getByTestId("dialog-content");
    expect(dialogContent).toBeInTheDocument();

    // Should show image counter
    expect(screen.getByText("2 de 3")).toBeInTheDocument();
  });

  it("shows modal navigation buttons when multiple images", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButton = screen.getAllByLabelText(/Expandir screenshot/)[0];
    await user.click(expandButton);

    expect(screen.getByLabelText("Imagen anterior")).toBeInTheDocument();
    expect(screen.getByLabelText("Imagen siguiente")).toBeInTheDocument();
  });

  it("hides modal navigation when only one image", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={[mockImages[0]]} />, { wrapper });

    const expandButton = screen.getByLabelText(/Expandir screenshot/);
    await user.click(expandButton);

    expect(screen.queryByLabelText("Imagen anterior")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Imagen siguiente")).not.toBeInTheDocument();
  });

  it("shows close button in modal", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButton = screen.getAllByLabelText(/Expandir screenshot/)[0];
    await user.click(expandButton);

    expect(screen.getByLabelText("Cerrar modal")).toBeInTheDocument();
  });

  it("shows usage instructions in modal", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButton = screen.getAllByLabelText(/Expandir screenshot/)[0];
    await user.click(expandButton);

    expect(screen.getByText("Usa ← → para navegar")).toBeInTheDocument();
    expect(screen.getByText("ESC para cerrar")).toBeInTheDocument();
  });

  it("has accessible dialog title for screen readers", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButton = screen.getAllByLabelText(/Expandir screenshot/)[0];
    await user.click(expandButton);

    // Should have dialog title for accessibility
    const dialogTitle = screen.getByTestId("dialog-title");
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent("Screenshot 1 de 3");
  });

  it("applies custom className", () => {
    render(<MediaCarousel images={mockImages} className="custom-carousel" />, {
      wrapper,
    });

    const carousel = screen
      .getAllByTestId("carousel-image")[0]
      .closest(".custom-carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("has correct container structure", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const container = screen.getByTestId("carousel-container");
    expect(container).toBeInTheDocument();
    expect(container.className).toContain("flex");
    expect(container.className).toContain("overflow-x-auto");
  });

  it("expand buttons have correct styling and accessibility", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const expandButtons = screen.getAllByLabelText(/Expandir screenshot/);
    expandButtons.forEach(button => {
      expect(button.className).toContain("group");
      expect(button.className).toContain("cursor-pointer");
      expect(button.className).toContain("focus:ring-2");
      expect(button.className).toContain("focus:ring-violet-600");
    });
  });

  it("handles missing container gracefully for carousel navigation", async () => {
    mockGetElementById.mockReturnValue(null);
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const nextButton = screen.getByLabelText("Next image");
    await user.click(nextButton);

    // Should not throw error when container is null
    expect(mockScrollBy).not.toHaveBeenCalled();
  });

  it("supports both image URLs and image IDs", () => {
    const { rerender } = render(<MediaCarousel images={mockImages} />, {
      wrapper,
    });

    expect(screen.getAllByTestId("carousel-image")).toHaveLength(3);

    // Rerender with imageIds - should prefer imageIds over images
    rerender(<MediaCarousel images={mockImages} imageIds={mockImageIds} />);

    // Should still have 3 images but now using imageIds
    const expandButtons = screen.getAllByLabelText(/Expandir screenshot/);
    expect(expandButtons).toHaveLength(3);
  });
});
