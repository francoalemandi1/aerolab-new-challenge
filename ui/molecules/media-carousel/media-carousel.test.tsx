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

// Mock getElementById for scroll functionality
const mockScrollBy = vi.fn();
const mockGetElementById = vi.fn();

Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
});

describe("MediaCarousel", () => {
  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];
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

  it("calls scrollBy when previous button is clicked", async () => {
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

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
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const nextButton = screen.getByLabelText("Next image");
    await user.click(nextButton);

    expect(mockGetElementById).toHaveBeenCalledWith("carousel-container");
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: 120,
      behavior: "smooth",
    });
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

  it("images have correct styling", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const imageContainers = screen.getAllByTestId("carousel-image");
    imageContainers.forEach(container => {
      const parent = container.parentElement;
      expect(parent?.className).toContain("relative");
      expect(parent?.className).toContain("w-28");
      expect(parent?.className).toContain("h-20");
    });
  });

  it("navigation buttons have correct styling", () => {
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const prevButton = screen.getByLabelText("Previous image");
    const nextButton = screen.getByLabelText("Next image");

    expect(prevButton.className).toContain("absolute");
    expect(prevButton.className).toContain("rounded-full");
    expect(nextButton.className).toContain("absolute");
    expect(nextButton.className).toContain("rounded-full");
  });

  it("handles missing container gracefully", async () => {
    mockGetElementById.mockReturnValue(null);
    const user = userEvent.setup();
    render(<MediaCarousel images={mockImages} />, { wrapper });

    const nextButton = screen.getByLabelText("Next image");
    await user.click(nextButton);

    // Should not throw error when container is null
    expect(mockScrollBy).not.toHaveBeenCalled();
  });
});
