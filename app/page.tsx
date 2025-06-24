import Link from "next/link";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Caption,
  GradientText,
} from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-violet py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <H1 className="mb-6 text-white">Aerolab Design System</H1>
          <H2 className="mb-8 text-white/90">
            Una librería completa de componentes y estilos para crear
            experiencias excepcionales
          </H2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/design-system">Ver Sistema de Diseño</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Documentación
            </Button>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <H2 className="mb-4">Sistema de Tipografía</H2>
            <Body className="mx-auto max-w-2xl text-gray">
              Jerarquía tipográfica responsiva con la fuente Inter, diseñada
              para proporcionar excelente legibilidad en todos los dispositivos.
            </Body>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <H3 className="mb-6">Tipografía Desktop</H3>
              <div className="space-y-4">
                <div>
                  <Caption className="mb-2 text-gray">
                    H1 - 24px Semi Bold
                  </Caption>
                  <H1>Heading 1 con Gradiente</H1>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">
                    H2 - 16px Semi Bold
                  </Caption>
                  <H2>Heading 2 en Negro</H2>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">H3 - 14px Medium</Caption>
                  <H3>Heading 3 en Púrpura</H3>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">H4 - 16px Medium</Caption>
                  <H4>Heading 4 en Gris</H4>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">
                    H5 - 14px Medium (Solo Desktop)
                  </Caption>
                  <H5>Heading 5 Desktop Only</H5>
                </div>
              </div>
            </div>

            <div>
              <H3 className="mb-6">Texto de Contenido</H3>
              <div className="space-y-4">
                <div>
                  <Caption className="mb-2 text-gray">Body Text</Caption>
                  <Body>
                    Este es el texto del cuerpo principal. Utiliza la fuente
                    Inter con un peso normal y está optimizado para la lectura
                    en párrafos largos. Mantiene un line-height apropiado para
                    una excelente legibilidad.
                  </Body>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">Caption Text</Caption>
                  <Caption>
                    Texto de caption para contenido secundario, fechas,
                    metadatos y información complementaria.
                  </Caption>
                </div>
                <div>
                  <Caption className="mb-2 text-gray">Gradient Text</Caption>
                  <Body>
                    También puedes usar{" "}
                    <GradientText>texto con gradiente</GradientText> para crear
                    énfasis especial en palabras o frases importantes.
                  </Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <H2 className="mb-4">Paleta de Colores</H2>
            <Body className="mx-auto max-w-2xl text-gray">
              Sistema de colores coherente con variaciones para diferentes
              contextos y estados.
            </Body>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Grays */}
            <div>
              <H4 className="mb-4 text-center">Grays</H4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-gray-dark"></div>
                  <div>
                    <div className="font-medium">Dark</div>
                    <Caption>#000000</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-gray"></div>
                  <div>
                    <div className="font-medium">Gray</div>
                    <Caption>#5C5C5C</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary border bg-gray-light"></div>
                  <div>
                    <div className="font-medium">Light</div>
                    <Caption>#E5E5E5</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary border bg-gray-white"></div>
                  <div>
                    <div className="font-medium">White</div>
                    <Caption>#FFFFFF</Caption>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinks */}
            <div>
              <H4 className="mb-4 text-center">Pinks</H4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-pink-600"></div>
                  <div>
                    <div className="font-medium">Main</div>
                    <Caption>#FF00AE</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-pink-200"></div>
                  <div>
                    <div className="font-medium">Secondary</div>
                    <Caption>#C698B8</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-pink-100"></div>
                  <div>
                    <div className="font-medium">Third</div>
                    <Caption>#E7C0DB</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-pink-50"></div>
                  <div>
                    <div className="font-medium">Fourth</div>
                    <Caption>50% opacity</Caption>
                  </div>
                </div>
              </div>
            </div>

            {/* Violets */}
            <div>
              <H4 className="mb-4 text-center">Violets</H4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-violet-900"></div>
                  <div>
                    <div className="font-medium">Main</div>
                    <Caption>#3C1661</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-violet-600"></div>
                  <div>
                    <div className="font-medium">Secondary</div>
                    <Caption>#6727A6</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-violet-100"></div>
                  <div>
                    <div className="font-medium">Third</div>
                    <Caption>#E7C0DB</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-violet-50"></div>
                  <div>
                    <div className="font-medium">Fourth</div>
                    <Caption>#E2DCE7</Caption>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <H4 className="mb-4 text-center">Status</H4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-red-600"></div>
                  <div>
                    <div className="font-medium">Error</div>
                    <Caption>#D23F63</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-green-600"></div>
                  <div>
                    <div className="font-medium">Success</div>
                    <Caption>#67C076</Caption>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-secondary bg-gradient-violet"></div>
                  <div>
                    <div className="font-medium">Gradient</div>
                    <Caption>Violet Linear</Caption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <H2 className="mb-4">Componentes</H2>
            <Body className="mx-auto max-w-2xl text-gray">
              Biblioteca de componentes reutilizables construidos con el sistema
              de diseño.
            </Body>
          </div>

          <div className="space-y-16">
            {/* Buttons */}
            <div>
              <H3 className="mb-8 text-center">Buttons</H3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-4 text-center">
                  <H4>Variantes</H4>
                  <div className="space-y-3">
                    <Button className="w-full">Default</Button>
                    <Button variant="secondary" className="w-full">
                      Secondary
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Destructive
                    </Button>
                    <Button variant="outline" className="w-full">
                      Outline
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Ghost
                    </Button>
                    <Button variant="link" className="w-full">
                      Link
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <H4>Tamaños</H4>
                  <div className="space-y-3">
                    <Button size="sm" className="w-full">
                      Small
                    </Button>
                    <Button size="default" className="w-full">
                      Default
                    </Button>
                    <Button size="lg" className="w-full">
                      Large
                    </Button>
                    <Button size="icon">🚀</Button>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <H4>Estados</H4>
                  <div className="space-y-3">
                    <Button className="w-full">Normal</Button>
                    <Button className="w-full" disabled>
                      Disabled
                    </Button>
                    <Button className="w-full">Loading...</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <H3 className="mb-8 text-center">Inputs</H3>
              <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <Input placeholder="Email address" type="email" />
                  <Input placeholder="Password" type="password" />
                  <Input placeholder="Search..." type="search" />
                  <Input placeholder="Disabled input" disabled />
                </div>
                <div className="space-y-4">
                  <Input placeholder="Text input" />
                  <Input placeholder="Number input" type="number" />
                  <Input placeholder="Date input" type="date" />
                  <Input
                    placeholder="Input with error"
                    className="border-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <H3 className="mb-8 text-center">Cards</H3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card variant="default" radius="secondary">
                  <H4 className="mb-3">Default Card</H4>
                  <Body className="mb-4">
                    Esta es una tarjeta por defecto con bordes redondeados
                    secundarios y sombra sutil.
                  </Body>
                  <Button size="sm">Acción</Button>
                </Card>

                <Card variant="gradient" radius="main">
                  <H4 className="mb-3 text-white">Gradient Card</H4>
                  <Body className="mb-4 text-white/90">
                    Tarjeta con fondo degradado y bordes redondeados principales
                    para elementos destacados.
                  </Body>
                  <Button variant="secondary" size="sm">
                    Acción
                  </Button>
                </Card>

                <Card variant="bordered" radius="secondary">
                  <H4 className="mb-3 text-violet-900">Bordered Card</H4>
                  <Body className="mb-4">
                    Tarjeta con borde destacado en color violeta para elementos
                    que requieren atención especial.
                  </Body>
                  <Button variant="outline" size="sm">
                    Acción
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <H2 className="mb-4">Border Radius</H2>
            <Body className="mx-auto max-w-2xl text-gray">
              Dos variantes principales de border radius para diferentes tipos
              de componentes.
            </Body>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-main bg-violet-600 font-semibold text-white">
                Main
              </div>
              <H4>Main (30px)</H4>
              <Caption>Para elementos grandes y destacados</Caption>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-secondary bg-pink-600 font-semibold text-white">
                Secondary
              </div>
              <H4>Secondary (8px)</H4>
              <Caption>Para elementos estándar y controles</Caption>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-dark py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <H2 className="mb-4 text-white">¿Listo para empezar?</H2>
          <Body className="mx-auto mb-8 max-w-2xl text-gray-light">
            Explora la documentación completa del sistema de diseño y comienza a
            crear experiencias increíbles con nuestros componentes.
          </Body>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/design-system">Explorar Sistema</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-light text-gray-light hover:bg-gray-light hover:text-gray-dark"
            >
              Ver Documentación
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
