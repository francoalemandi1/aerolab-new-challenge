import type { Meta, StoryObj } from "@storybook/react";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Paragraph,
  Caption,
  GradientText,
} from "./typography";

// H1 Stories
const H1Meta: Meta<typeof H1> = {
  title: "Design System/Typography/H1",
  component: H1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The text content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default H1Meta;

type H1Story = StoryObj<Meta<typeof H1>>;

export const H1Default: H1Story = {
  args: {
    children: "Heading 1 with Gradient",
  },
};

export const H1CustomText: H1Story = {
  args: {
    children: "Sistema de Diseño Aerolab",
  },
};

// H2 Stories
export const H2Meta: Meta<typeof H2> = {
  title: "Design System/Typography/H2",
  component: H2,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const H2Default: StoryObj<typeof H2> = {
  args: {
    children: "Heading 2 in Black",
  },
};

// H3 Stories
export const H3Meta: Meta<typeof H3> = {
  title: "Design System/Typography/H3",
  component: H3,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const H3Default: StoryObj<typeof H3> = {
  args: {
    children: "Heading 3 in Purple",
  },
};

// H4 Stories
export const H4Meta: Meta<typeof H4> = {
  title: "Design System/Typography/H4",
  component: H4,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const H4Default: StoryObj<typeof H4> = {
  args: {
    children: "Heading 4 in Gray",
  },
};

// H5 Stories
export const H5Meta: Meta<typeof H5> = {
  title: "Design System/Typography/H5",
  component: H5,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const H5Default: StoryObj<typeof H5> = {
  args: {
    children: "Heading 5 Desktop Only",
  },
};

// Paragraph Stories
export const ParagraphMeta: Meta<typeof Paragraph> = {
  title: "Design System/Typography/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const ParagraphDefault: StoryObj<typeof Paragraph> = {
  args: {
    children:
      "Este es el texto del cuerpo principal. Utiliza la fuente Inter con un peso normal y está optimizado para la lectura en párrafos largos. Mantiene un line-height apropiado para una excelente legibilidad.",
  },
};

// Caption Stories
export const CaptionMeta: Meta<typeof Caption> = {
  title: "Design System/Typography/Caption",
  component: Caption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const CaptionDefault: StoryObj<typeof Caption> = {
  args: {
    children:
      "Caption text for secondary content, dates, metadata, and complementary information.",
  },
};

// GradientText Stories
export const GradientTextMeta: Meta<typeof GradientText> = {
  title: "Design System/Typography/GradientText",
  component: GradientText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const GradientTextDefault: StoryObj<typeof GradientText> = {
  args: {
    children: "Texto con gradiente violeta",
  },
};
