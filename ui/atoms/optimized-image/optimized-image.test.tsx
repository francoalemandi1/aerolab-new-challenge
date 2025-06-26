import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  GameCardImage,
  GameDetailImage,
  GameThumbnailImage,
} from "./optimized-image";

describe("OptimizedImage Components", () => {
  describe("GameCardImage", () => {
    it("renders with required props", () => {
      render(
        <GameCardImage imageId="test123" alt="Test Game" fill sizes="256px" />
      );

      const image = screen.getByRole("img", { name: "Test Game" });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "Test Game");
    });

    it("constructs correct IGDB URL", () => {
      render(
        <GameCardImage imageId="test123" alt="Test Game" fill sizes="256px" />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src");
      expect(image.getAttribute("src")).toContain("test123");
    });

    it("applies retina sizing when retina prop is true", () => {
      render(
        <GameCardImage
          imageId="test123"
          alt="Test Game"
          fill
          sizes="256px"
          retina={true}
        />
      );

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });

    it("handles missing imageId gracefully", () => {
      render(<GameCardImage imageId="" alt="Test Game" fill sizes="256px" />);

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <GameCardImage
          imageId="test123"
          alt="Test Game"
          fill
          sizes="256px"
          className="custom-image-class"
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveClass("custom-image-class");
    });
  });

  describe("GameDetailImage", () => {
    it("renders with larger size for detail view", () => {
      render(
        <GameDetailImage
          imageId="detail123"
          alt="Detail Game"
          fill
          sizes="512px"
        />
      );

      const image = screen.getByRole("img", { name: "Detail Game" });
      expect(image).toBeInTheDocument();
    });

    it("supports priority loading", () => {
      render(
        <GameDetailImage
          imageId="detail123"
          alt="Detail Game"
          fill
          sizes="512px"
          priority
        />
      );

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });
  });

  describe("GameThumbnailImage", () => {
    it("renders with thumbnail size", () => {
      render(
        <GameThumbnailImage
          imageId="thumb123"
          alt="Thumbnail Game"
          fill
          sizes="64px"
        />
      );

      const image = screen.getByRole("img", { name: "Thumbnail Game" });
      expect(image).toBeInTheDocument();
    });

    it("handles small sizes appropriately", () => {
      render(
        <GameThumbnailImage
          imageId="thumb123"
          alt="Thumbnail Game"
          width={48}
          height={48}
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("width", "48");
      expect(image).toHaveAttribute("height", "48");
    });
  });
});
