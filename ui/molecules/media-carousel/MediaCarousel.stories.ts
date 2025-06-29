import type { Meta, StoryObj } from "@storybook/react";
import { MediaCarousel } from "@/ui/molecules";

const meta = {
  title: "Molecules/MediaCarousel",
  component: MediaCarousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interactive media carousel with image expansion functionality. Displays game screenshots and allows users to view them in full size using an accessible modal dialog powered by Radix UI.",
      },
    },
  },
  argTypes: {
    images: {
      description: "Array of image URLs (legacy support)",
      control: { type: "object" },
    },
    imageIds: {
      description: "Array of IGDB image IDs (preferred method)",
      control: { type: "object" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof MediaCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock image URLs for stories
const mockImages = [
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6b9t.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6b9u.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6b9v.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6b9w.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6b9x.jpg",
];

// Mock IGDB image IDs
const mockImageIds = ["sc6b9t", "sc6b9u", "sc6b9v", "sc6b9w", "sc6b9x"];

export const WithImageUrls: Story = {
  args: {
    images: mockImages,
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel using direct image URLs. Click on any image to expand it in a modal with navigation controls.",
      },
    },
  },
};

export const WithImageIds: Story = {
  args: {
    imageIds: mockImageIds,
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel using IGDB image IDs (preferred method). Automatically generates optimized URLs for different screen sizes and resolutions.",
      },
    },
  },
};

export const SingleImage: Story = {
  args: {
    images: [mockImages[0]],
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel with a single image. Navigation arrows are hidden in both carousel and modal views.",
      },
    },
  },
};

export const NoImages: Story = {
  args: {
    images: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel with no images provided. Shows placeholder content and no navigation controls.",
      },
    },
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      ...mockImages,
      ...mockImages.map((img, index) =>
        img.replace("sc6b9t", `sc6b9${index + 10}`)
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel with many images to demonstrate horizontal scrolling and navigation. The carousel becomes scrollable with navigation arrows when content overflows.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    images: mockImages.slice(0, 3),
    className: "border-2 border-violet-600 rounded-lg p-4 bg-violet-50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "MediaCarousel with custom styling applied via className prop. Demonstrates how to customize the appearance while maintaining functionality.",
      },
    },
  },
};
