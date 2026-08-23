<p align="center">
  <a href="https://llucbosch.com" aria-label="Abrir el portfolio de Lluc Bosch Ramis">
    <img src="./public/og-image.png" alt="Lluc Bosch Ramis — Software Engineer" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://llucbosch.com"><strong>Ver portfolio</strong></a>
  ·
  <a href="https://www.linkedin.com/in/lluc-bosch-ramis-80959b213/">LinkedIn</a>
  ·
  <a href="mailto:lluc.bosch@gmail.com">Contacto</a>
</p>

<p align="center">
  <a href="https://github.com/lluc898/portfolio/actions/workflows/ci.yml"><img src="https://github.com/lluc898/portfolio/actions/workflows/ci.yml/badge.svg" alt="Estado de la integración continua" /></a>
  <img src="https://img.shields.io/badge/Astro-7.2-BC52EE?logo=astro&logoColor=white" alt="Astro 7.2" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

# Portfolio de Lluc Bosch Ramis

Portfolio profesional de **Lluc Bosch Ramis**, Software Engineer especializado en desarrollo web, tecnología hotelera y flujos de ingeniería asistidos por IA.

La web presenta experiencia profesional, proyectos, stack técnico y forma de trabajo con una interfaz sobria, rápida y accesible. Está construida como sitio estático con Astro y publicada en [llucbosch.com](https://llucbosch.com).

## Características

- Contenido orientado a recruiters y equipos de ingeniería.
- Arquitectura estática, sin JavaScript de aplicación innecesario.
- Diseño responsive con tema claro y oscuro.
- Navegación por teclado, foco visible y soporte para `prefers-reduced-motion`.
- SEO técnico con canonical, Open Graph, Twitter Cards, sitemap y datos estructurados.
- Página 404 propia y configuración de producción con Nginx y Docker Compose.
- Validación automática de tipos y build en cada push y pull request.

## Proyecto destacado

### Neon Led Spain

E-commerce de neones LED personalizados con catálogo, configurador visual, precio en vivo, carrito, solicitudes a medida y panel administrativo.

El caso de estudio del portfolio explica el problema del producto, la solución y varias decisiones técnicas, entre ellas el recálculo del precio en servidor y el despliegue self-hosted.

- [Ver caso de estudio](https://llucbosch.com/#proyectos)
- [Abrir demo](https://neonledspain.llucbosch.com/)
- [Consultar código](https://github.com/lluc898/neonweb)

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | [Astro](https://astro.build/) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) + CSS |
| Tipografía | Inter Variable + JetBrains Mono Variable |
| Producción | Nginx + Docker Compose |
| Calidad | Astro Check + GitHub Actions |

## Desarrollo local

Necesitas Node.js `>=22.12.0` y npm `>=9.6.5`.

```bash
git clone https://github.com/lluc898/portfolio.git
cd portfolio
npm ci
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:4321`.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run check` | Comprueba Astro y TypeScript |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |

## Estructura

```text
src/
├── components/   Componentes reutilizables
├── layouts/      Layout, metadatos y datos estructurados
├── pages/        Homepage y página 404
└── styles/       Sistema visual global

public/           Favicon, robots e imagen social
deploy/           Configuración de Nginx y Docker Compose
```

Las decisiones de producto y diseño están documentadas en [CODEX.md](./CODEX.md) y [DESIGN.md](./DESIGN.md).

## Contacto

- Web: [llucbosch.com](https://llucbosch.com)
- LinkedIn: [Lluc Bosch Ramis](https://www.linkedin.com/in/lluc-bosch-ramis-80959b213/)
- Email: [lluc.bosch@gmail.com](mailto:lluc.bosch@gmail.com)
