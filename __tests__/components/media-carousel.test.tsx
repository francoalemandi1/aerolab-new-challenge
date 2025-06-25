import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MediaCarousel } from "@/ui/molecules";

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

// Mock getElementById for scroll functionality
const mockScrollBy = vi.fn();
const mockGetElementById = vi.fn(() => ({
  scrollBy: mockScrollBy,
}));

Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
});

describe("MediaCarousel", () => {
  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders images when provided", () => {
    render(<MediaCarousel images={mockImages} />);

    const images = screen.getAllByTestId("carousel-image");
    expect(images).toHaveLength(3);
  });

  it("renders default images when no images provided", () => {
    render(<MediaCarousel images={[]} />);

    // Should render 4 default placeholder images
    const containers = screen.getAllByRole("img", { hidden: true });
    expect(containers).toHaveLength(4);
  });

  it("shows navigation arrows when there are multiple real images", () => {
    render(<MediaCarousel images={mockImages} />);

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("hides navigation arrows when no real images", () => {
    render(<MediaCarousel images={[]} />);

    const prevButton = screen.queryByLabelText("Previous image");
    const nextButton = screen.queryByLabelText("Next image");

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("hides navigation arrows when only one real image", () => {
    render(<MediaCarousel images={[mockImages[0]]} />);

    const prevButton = screen.queryByLabelText("Previous image");
    const nextButton = screen.queryByLabelText("Next image");

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("calls scrollBy when previous button is clicked", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />);

    const prevButton = screen.getByLabelText("Previous image");
    await user.click(prevButton);

    expect(mockGetElementById).toHaveBeenCalledWith("carousel-container");
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: -120,
      behavior: "smooth",
    });
  });

  it("calls scrollBy when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />);

    const nextButton = screen.getByLabelText("Next image");
    await user.click(nextButton);

    expect(mockGetElementById).toHaveBeenCalledWith("carousel-container");
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: 120,
      behavior: "smooth",
    });
  });

  it("applies custom className", () => {
    render(<MediaCarousel images={mockImages} className="custom-carousel" />);

    const carousel = screen
      .getByTestId("carousel-image")
      .closest(".custom-carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("has correct container structure", () => {
    render(<MediaCarousel images={mockImages} />);

    const container = screen
      .getByRole("img", { hidden: true })
      .closest('[id="carousel-container"]');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex", "gap-2", "overflow-x-auto", "pb-2");
  });

  it("images have correct styling", () => {
    render(<MediaCarousel images={mockImages} />);

    const imageContainers = screen.getAllByTestId("carousel-image");
    imageContainers.forEach(container => {
      const parent = container.parentElement;
      expect(parent).toHaveClass(
        "relative",
        "w-28",
        "h-20",
        "flex-shrink-0",
        "overflow-hidden",
        "rounded-lg"
      );
    });
  });

  it("navigation buttons have correct styling", () => {
    render(<MediaCarousel images={mockImages} />);

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    expect(prevButton).toHaveClass(
      "absolute",
      "-left-4",
      "top-1/2",
      "-translate-y-1/2",
      "z-10",
      "rounded-full",
      "p-2",
      "transition-colors",
      "backdrop-blur-sm"
    );

    expect(nextButton).toHaveClass(
      "absolute",
      "-right-4",
      "top-1/2",
      "-translate-y-1/2",
      "z-10",
      "rounded-full",
      "p-2",
      "transition-colors",
      "backdrop-blur-sm"
    );
  });

  it("handles missing container gracefully", async () => {
    mockGetElementById.mockReturnValue(null);
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />);

    const nextButton = screen.getByLabelText("Next image");
    await user.click(nextButton);

    // Should not throw error when container is null
    expect(mockScrollBy).not.toHaveBeenCalled();
  });
});
