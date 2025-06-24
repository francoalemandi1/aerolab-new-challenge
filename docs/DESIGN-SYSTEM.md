# Design System Documentation

Esta documentación describe el sistema de diseño implementado en el proyecto, incluyendo colores, tipografía, componentes y mejores prácticas.

## 🎨 Color Palette

### Grays

```css
--gray-dark: #000000
  /* Para textos principales y elementos de alta importancia */ --gray: #5c5c5c
  /* Para textos secundarios y elementos de soporte */ --gray-light: #e5e5e5
  /* Para bordes y fondos sutiles */ --gray-white: #ffffff
  /* Para fondos principales y elementos destacados */;
```

### Pinks

```css
--pink-600: #ff00ae /* Color principal para elementos destacados */
  --pink-200: #c698b8 /* Color secundario para elementos de soporte */
  --pink-100: #e7c0db /* Color terciario para fondos sutiles */
  --pink-50: rgba(255, 0, 174, 0.5) /* Pink principal con 50% opacidad */;
```

### Violets

```css
--violet-900: #3c1661 /* Color principal para elementos importantes */
  --violet-600: #6727a6 /* Color secundario para elementos destacados */
  --violet-100: #e7c0db /* Color terciario para fondos */ --violet-50: #e2dce7
  /* Color cuarto para fondos muy sutiles */;
```

### Status Colors

```css
--red-600: #d23f63 /* Para errores y elementos críticos */ --green-600: #67c076
  /* Para éxito y elementos positivos */;
```

### Typography Colors

```css
--typography-h3: #775c90 /* Color específico para H3 */ --typography-h4: #666666
  /* Color específico para H4 */;
```

## 🎨 Gradients

### Violet Linear Gradient

```css
background: linear-gradient(135deg, #6727a6 0%, #3c1661 100%);
```

**Uso en Tailwind:**

```jsx
<div className="bg-gradient-violet">Contenido</div>
```

## 📝 Typography

El sistema utiliza la fuente **Inter** con las siguientes especificaciones:

### Mobile Typography

- **H1**: 20px, Semi Bold (600), Gradient Text
- **H2**: 16px, Semi Bold (600), #000000
- **H3**: 14px, Medium (500), #775C90
- **H4**: 14px, Medium (500), #666666

### Desktop Typography

- **H1**: 24px, Semi Bold (600), Gradient Text
- **H2**: 16px, Semi Bold (600), #000000
- **H3**: 14px, Medium (500), #775C90
- **H4**: 16px, Medium (500), #666666
- **H5**: 14px, Medium (500), #666666

### Componentes de Tipografía

```jsx
import { H1, H2, H3, H4, H5, Body, Caption, GradientText } from '@/ui/atoms/typography';

// Uso básico
<H1>Título Principal</H1>
<H2>Subtítulo</H2>
<H3>Encabezado Terciario</H3>
<Body>Texto del cuerpo</Body>

// Texto con gradiente personalizado
<GradientText>Texto con gradiente</GradientText>
```

## 🔄 Border Radius

### Principales

- **Main**: 30px - Para elementos grandes y destacados
- **Secondary**: 8px - Para elementos estándar

**Uso en Tailwind:**

```jsx
<div className="rounded-main">Elemento con border radius principal</div>
<div className="rounded-secondary">Elemento con border radius secundario</div>
```

## 🎛️ Componentes

### Card Component

El componente Card proporciona contenedores flexibles con diferentes variantes:

```jsx
import { Card } from '@/ui/molecules/card';

// Variantes disponibles
<Card variant="default" radius="secondary">
  Contenido de la tarjeta por defecto
</Card>

<Card variant="gradient" radius="main">
  Contenido con fondo gradient
</Card>

<Card variant="bordered" radius="secondary">
  Contenido con borde destacado
</Card>
```

#### Props del Card

- `variant`: `'default' | 'gradient' | 'bordered'`
- `radius`: `'main' | 'secondary'`
- `className`: clases CSS adicionales
- `children`: contenido del componente

### Typography Components

Todos los componentes de tipografía son responsivos automáticamente:

```jsx
// Los tamaños se ajustan automáticamente según el breakpoint
<H1>Se muestra en 20px en mobile, 24px en desktop</H1>
<H4>Se muestra en 14px en mobile, 16px en desktop</H4>
<H5>Solo se muestra en desktop (hidden en mobile)</H5>
```

## 🎯 Uso Práctico

### Clases Tailwind Disponibles

#### Colores

```css
/* Grays */
.text-gray-dark, .bg-gray-dark
.text-gray, .bg-gray
.text-gray-light, .bg-gray-light
.text-gray-white, .bg-gray-white

/* Pinks */
.text-pink-600, .bg-pink-600
.text-pink-200, .bg-pink-200
.text-pink-100, .bg-pink-100
.text-pink-50, .bg-pink-50

/* Violets */
.text-violet-900, .bg-violet-900
.text-violet-600, .bg-violet-600
.text-violet-100, .bg-violet-100
.text-violet-50, .bg-violet-50

/* Status */
.text-red-600, .bg-red-600
.text-green-600, .bg-green-600

/* Typography */
.text-typography-h3
.text-typography-h4
```

#### Tipografía

```css
/* Mobile sizes */
.text-h1-mobile, .text-h2-mobile, .text-h3-mobile, .text-h4-mobile

/* Desktop sizes */
.text-h1-desktop, .text-h2-desktop, .text-h3-desktop, .text-h4-desktop, .text-h5-desktop

/* Font weights */
.font-semibold /* 600 */
.font-medium  /* 500 */
```

#### Gradientes

```css
.bg-gradient-violet /* Gradiente principal */
.bg-gradient-violet-text /* Para texto con gradiente */
```

#### Border Radius

```css
.rounded-main      /* 30px */
.rounded-secondary /* 8px */
```

## 📱 Responsive Design

El sistema está diseñado mobile-first con breakpoints estándar:

- **Mobile**: < 768px
- **Desktop**: ≥ 768px (md: breakpoint en Tailwind)

### Ejemplos de Uso Responsivo

```jsx
// Typography responsiva automática
<H1>Este título se adapta automáticamente</H1>

// Clases responsivas manuales
<div className="text-h3-mobile md:text-h3-desktop">
  Título responsivo manual
</div>

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

## 🎨 Design System Page

Para ver todos los componentes en acción, visita:

```
/design-system
```

Esta página muestra:

- Todos los componentes de tipografía
- Paleta de colores completa
- Ejemplos de cards
- Variaciones de border radius
- Ejemplos de gradientes

## 🛠️ Implementación Técnica

### Tailwind Configuration

El sistema está implementado en `tailwind.config.ts` con:

- Colores personalizados en `theme.extend.colors`
- Tamaños de tipografía en `theme.extend.fontSize`
- Gradientes en `theme.extend.backgroundImage`
- Border radius en `theme.extend.borderRadius`

### Componentes TypeScript

Los componentes están tipados con TypeScript para mejor DX:

- Props claramente definidas
- Autocompletado en el IDE
- Validación de tipos en tiempo de compilación

### Performance

- Los componentes usan `React.forwardRef` cuando es apropiado
- Las clases CSS se generan estáticamente con Tailwind
- No hay JavaScript runtime overhead para los estilos

## 🎯 Mejores Prácticas

### Do's ✅

- Usar los componentes de tipografía en lugar de clases directas
- Mantener consistencia con la paleta de colores
- Usar las variantes de Card en lugar de crear estilos custom
- Seguir el sistema responsive mobile-first

### Don'ts ❌

- No usar colores fuera de la paleta definida
- No crear tamaños de tipografía custom
- No usar border-radius diferentes a los definidos
- No romper la consistencia visual del sistema

## 📚 Recursos Adicionales

- **Figma**: [Enlace al sistema de diseño]
- **Storybook**: `npm run storybook` para ver componentes aislados
- **Documentación completa**: `/design-system` en la aplicación
