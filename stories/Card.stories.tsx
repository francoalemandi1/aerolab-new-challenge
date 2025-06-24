import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "../ui/molecules/card";
import { Button } from "../ui/atoms/button";
import { H4, Body } from "../ui/atoms/typography";

const meta: Meta<typeof Card> = {
  title: "Design System/Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "gradient", "bordered"],
      description: "The visual variant of the card",
    },
    radius: {
      control: { type: "select" },
      options: ["main", "secondary"],
      description: "The border radius variant",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: "400px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<Meta<typeof Card>>;

export const Default: Story = {
  args: {
    variant: "default",
    radius: "secondary",
    children: (
      <>
        <H4 className="mb-3">Default Card</H4>
        <Body className="mb-4">
          Esta es una tarjeta por defecto con bordes redondeados secundarios y
          sombra sutil.
        </Body>
        <Button size="sm">Acción</Button>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    radius: "main",
    children: (
      <>
        <H4 className="mb-3 text-white">Gradient Card</H4>
        <Body className="mb-4 text-white/90">
          Tarjeta con fondo degradado y bordes redondeados principales para
          elementos destacados.
        </Body>
        <Button variant="secondary" size="sm">
          Acción
        </Button>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    radius: "secondary",
    children: (
      <>
        <H4 className="mb-3 text-violet-900">Bordered Card</H4>
        <Body className="mb-4">
          Tarjeta con borde destacado en color violeta para elementos que
          requieren atención especial.
        </Body>
        <Button variant="outline" size="sm">
          Acción
        </Button>
      </>
    ),
  },
};

export const MainRadius: Story = {
  args: {
    variant: "default",
    radius: "main",
    children: (
      <>
        <H4 className="mb-3">Card with Main Radius</H4>
        <Body className="mb-4">
          Esta tarjeta utiliza el border radius principal (30px) para un aspecto
          más suave y redondeado.
        </Body>
        <Button size="sm">Acción</Button>
      </>
    ),
  },
};

export const SimpleContent: Story = {
  args: {
    variant: "default",
    radius: "secondary",
    children: (
      <Body>Contenido simple de tarjeta sin elementos adicionales.</Body>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    variant: "default",
    radius: "secondary",
    children: (
      <>
        <H4 className="mb-3">Título de Tarjeta Larga</H4>
        <Body className="mb-4">
          Esta es una tarjeta con contenido más extenso para probar cómo se
          comporta el componente con diferentes cantidades de texto. El diseño
          debe mantener su estructura y legibilidad independientemente de la
          longitud del contenido. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Body>
        <div className="flex gap-2">
          <Button size="sm">Primario</Button>
          <Button variant="outline" size="sm">
            Secundario
          </Button>
        </div>
      </>
    ),
  },
};
