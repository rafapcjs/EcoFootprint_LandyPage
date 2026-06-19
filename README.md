# BioCaptura CO₂ — Landing page

Página informativa y landing sobre la **captura de CO₂ mediante microalgas (Chlorella)**.
Construida con **React + TypeScript + Vite**, con componentes modulares y CSS Modules.

## Requisitos

- Node.js 18 o superior (probado con Node 24)

## Puesta en marcha

```bash
npm install      # instala dependencias
npm run dev      # arranca el servidor de desarrollo (http://localhost:5173)
npm run build    # genera la versión de producción en /dist
npm run preview  # sirve la build de producción localmente
```

## Estructura

```
co2page/
├─ index.html              # documento raíz + metadatos SEO
├─ public/
│  ├─ leaf.svg             # favicon
│  └─ media/               # imágenes y videos del proyecto (nombres limpios)
├─ src/
│  ├─ main.tsx             # punto de entrada de React
│  ├─ App.tsx              # composición de las secciones
│  ├─ index.css            # estilos globales + tokens de diseño (variables CSS)
│  ├─ data/
│  │  └─ content.ts        # TODO el contenido tipado (textos, listas, media)
│  ├─ hooks/
│  │  └─ useScrollReveal.ts # IntersectionObserver para animar al hacer scroll
│  ├─ lib/
│  │  └─ reveal.ts         # helper de retardos escalonados de animación
│  └─ components/
│     ├─ layout/           # Navbar · Footer
│     ├─ sections/         # Hero · Stats · Marquee · About · HowItWorks ·
│     │                    #   Gallery · Benefits · Faq · Vision
│     └─ ui/               # primitivas reutilizables: Icon · SectionHeading
└─ vite.config.ts
```

## Buenas prácticas aplicadas

- **Separación contenido / presentación:** todos los textos viven en `src/data/content.ts`
  con interfaces TypeScript. Editar copys o traducir no obliga a tocar componentes.
- **Estructura por responsabilidad:** `layout/` (estructura de página), `sections/` (cada
  bloque de la landing) y `ui/` (primitivas reutilizables), con CSS Modules co-localizado.
- **DRY:** la cabecera de sección (eyebrow + título + lead) se centraliza en
  `ui/SectionHeading`, y los retardos de animación en `lib/reveal`.
- **Design tokens** mediante variables CSS en `:root` (colores, gradientes, radios, sombras,
  tipografía) — un solo lugar para reestilar todo el sitio.
- **Accesibilidad:** HTML semántico, `aria-label`/`aria-modal`, foco visible, navegación por
  teclado en la galería (Escape para cerrar) y respeto a `prefers-reduced-motion`.
- **Responsive** con CSS Grid y breakpoints; menú móvil tipo hamburguesa.
- **Rendimiento/calidad:** sin dependencias de UI externas (iconos SVG propios); transiciones
  con propiedades explícitas (nunca `transition: all`).

## Personalización rápida

- Cambiar textos, cifras, pasos o preguntas → `src/data/content.ts`
- Cambiar colores/estilo global → variables en `:root` de `src/index.css`
- Reemplazar imágenes/videos → carpeta `public/media/` (y actualizar rutas en `content.ts`)

> Los archivos originales de WhatsApp se conservan en la raíz; las copias usadas por el sitio
> están en `public/media/` con nombres descriptivos.
