# DESIGN.md — Lluc Bosch Ramis Portfolio

## 1. Dirección artística

El portfolio debe transmitir:

**Software Engineer · Precisión · Ingeniería · Profesionalidad · Simplicidad**

La estética debe estar inspirada en productos tecnológicos y portfolios de ingenieros modernos, pero sin parecer una plantilla.

Debe sentirse:

- sofisticado
- minimalista
- técnico
- elegante
- ligeramente experimental
- profesional

La interfaz debe tener personalidad, pero no competir con el contenido.

---

# 2. Concepto visual

Concepto:

> "Engineering notebook meets modern software product."

Combinar:

- tipografía editorial
- layout limpio
- pequeños detalles técnicos
- grid estructural
- líneas finas
- espacios amplios
- pequeños elementos de navegación
- microinteracciones

Evitar convertir el portfolio en una interfaz de IDE.

No utilizar código como decoración excesiva.

---

# 3. Color

Utilizar un sistema principalmente monocromático.

### Light mode

Background:

`#F7F7F5`

Surface:

`#FFFFFF`

Primary text:

`#111111`

Secondary text:

`#666666`

Borders:

`#DCDCDC`

Accent:

Utilizar un único color de acento.

El color de acento debe ser discreto y utilizarse únicamente para:

- enlaces
- estados hover
- pequeños indicadores
- elementos interactivos
- detalles importantes

No utilizar múltiples colores de acento.

### Dark mode

Background:

`#0B0B0B`

Surface:

`#121212`

Primary text:

`#F2F2F2`

Secondary text:

`#A0A0A0`

Borders:

`#292929`

El accent debe mantenerse consistente.

---

# 4. Tipografía

Utilizar una combinación de:

### Sans principal

Inter, Geist o una alternativa sans moderna.

Uso:

- navegación
- body
- botones
- información técnica
- experiencia

### Monospace

JetBrains Mono, IBM Plex Mono o similar.

Uso limitado para:

- tecnologías
- pequeños labels
- metadata
- fechas
- detalles técnicos

No utilizar monospace para grandes cantidades de texto.

---

# 5. Jerarquía

La jerarquía tipográfica debe ser muy clara.

Hero heading:

Grande, pesado y compacto.

Ejemplo conceptual:

`Software Engineer`

Debe dominar visualmente la primera pantalla.

Body:

Cómodo de leer.

Metadata:

Pequeña, discreta y preferiblemente monospace.

---

# 6. Layout

Utilizar un sistema basado en grid.

Desktop:

- máximo aproximado: 1200–1280px
- gutters amplios
- contenido bien alineado

Mobile:

- padding lateral aproximado: 20px

Desktop debe tener bastante espacio vacío.

No llenar todos los huecos.

El whitespace forma parte del diseño.

---

# 7. Header

Header minimalista.

Izquierda:

`Lluc Bosch Ramis`

Derecha:

- About
- Experience
- Stack
- AI
- Contact

Añadir indicador de disponibilidad únicamente si existe información real que lo justifique.

El header puede ser sticky, pero debe ser muy discreto.

No crear un navbar gigante.

---

# 8. Hero

El hero debe ocupar aproximadamente entre 70% y 90% del viewport inicial.

Composición:

Pequeño eyebrow:

`SOFTWARE ENGINEER`

Título:

`Lluc Bosch Ramis`

Subtítulo profesional.

Ejemplo conceptual:

> Software Engineer focused on building and evolving web applications across backend and frontend systems.

Debajo:

- Contact
- LinkedIn
- GitHub

No utilizar fotografía obligatoriamente.

No utilizar avatar circular genérico.

---

# 9. Elemento distintivo

Añadir un pequeño elemento visual que dé personalidad al portfolio.

Puede ser:

- una retícula técnica
- un indicador de coordenadas
- una línea vertical
- una pequeña animación
- un cursor
- un gráfico abstracto muy simple
- un patrón geométrico

Debe ser extremadamente sutil.

No debe parecer decoración gratuita.

---

# 10. About

Sección breve.

No repetir todo el CV.

La sección debe explicar:

- experiencia profesional
- tipo de problemas que trabaja
- backend + frontend
- interés por ingeniería de software

Máximo aproximadamente 2–3 párrafos.

El texto debe ser escaneable.

---

# 11. Experience

Esta sección debe tener mucha importancia visual.

Formato recomendado:

------------------------------------------------

2022 — NOW

DINGUS

Software Engineer

Descripción breve

Python · Django · React · Flask
MySQL · MongoDB · JavaScript · Git

------------------------------------------------

La experiencia debe parecer una timeline editorial, no una tarjeta SaaS.

No usar cards con sombras.

---

# 12. Technology stack

No utilizar una nube de logos.

No utilizar:

Python █████████ 90%

React ████████ 80%

En su lugar:

### Backend

Python
Django
Flask

### Frontend

JavaScript
React
HTML
Jinja
CSS
Sass

### Data

MySQL
MongoDB

### Tools

Git
Jira
Apache

### AI-assisted development

Claude
Cursor

Mostrar las tecnologías como etiquetas o pequeños elementos tipográficos.

---

# 13. Educación

La educación tiene prioridad secundaria y puede omitirse de la homepage para mantener el foco en la experiencia profesional, el conocimiento del sector hotelero y la forma de trabajar.

No mostrar estudios no completados.

---

# 14. AI-assisted development

Dado que Lluc utiliza herramientas como Claude y Cursor profesionalmente, puede existir un pequeño apartado dentro de la experiencia o stack.

No venderlo como:

"AI expert"

"AI engineer"

"AI specialist"

La idea es comunicar:

> Utilización de herramientas de IA como parte del proceso de desarrollo para acelerar exploración, implementación, debugging y tareas repetitivas.

La IA debe aparecer como una herramienta de ingeniería, no como el centro del portfolio.

---

# 15. Contact

Sección grande y simple.

Ejemplo conceptual:

`Let's build something.`

Debajo:

`lluc.bosch@gmail.com`

Y enlaces sociales.

El email puede utilizar una tipografía grande.

No utilizar formulario salvo necesidad real.

---

# 16. Footer

Footer minimalista.

Contenido:

Lluc Bosch Ramis

Software Engineer

© 2026

LinkedIn · GitHub · Email

No añadir enlaces innecesarios.

---

# 17. Cards

Las cards deben utilizarse con moderación.

Si se utilizan:

- border fino
- background ligeramente diferente
- border-radius pequeño o moderado
- sin sombras fuertes

No usar el estilo:

`rounded-2xl shadow-xl backdrop-blur-xl`

de forma generalizada.

---

# 18. Bordes

Los borders son importantes para crear estructura.

Preferir:

`1px solid`

con bajo contraste.

Utilizar borders para:

- separar experiencia
- dividir secciones
- crear pequeños módulos
- estructurar información

No crear cajas alrededor de absolutamente todo.

---

# 19. Border radius

Utilizar radios pequeños/moderados.

Evitar que toda la interfaz parezca formada por cápsulas.

Botones:

6–10px

Cards:

8–14px

Tags:

4–6px

---

# 20. Botones

Primario:

Botón oscuro en light mode.

Botón claro en dark mode.

Secundario:

Outline.

No utilizar gradientes.

No utilizar botones gigantes.

Los botones deben sentirse como controles de producto, no como elementos de marketing.

---

# 21. Iconografía

Utilizar iconos únicamente cuando aporten información.

Preferir Lucide Icons si se necesita una librería.

No colocar iconos al lado de cada tecnología.

No utilizar emojis como parte del diseño profesional.

---

# 22. Motion

Animaciones:

150–300ms aproximadamente.

Utilizar:

- fade
- translate pequeño
- opacity
- scale muy ligero

Evitar:

- parallax excesivo
- elementos flotando continuamente
- texto que rebota
- animaciones infinitas
- scroll hijacking

El usuario debe sentir que la web es rápida.

---

# 23. Scroll

El scroll debe sentirse natural.

Se pueden añadir pequeñas animaciones al entrar en viewport.

No hacer que la navegación dependa de animaciones.

No implementar scroll horizontal salvo que exista una razón de diseño muy clara.

---

# 24. Responsive

Mobile debe ser una experiencia de primera clase.

En móvil:

- hero más compacto
- navegación simplificada
- experiencia vertical
- stack en columnas
- typography adaptada
- botones fáciles de pulsar

No esconder contenido importante simplemente porque estamos en móvil.

---

# 25. Accesibilidad visual

Contraste suficiente.

No depender únicamente del color para comunicar estados.

Focus states visibles.

Los links deben distinguirse claramente.

El texto secundario no debe ser excesivamente tenue.

---

# 26. Dark mode

Implementar dark mode correctamente.

No hacer simplemente:

background negro + texto blanco.

El dark mode debe conservar:

- jerarquía
- superficies
- borders
- contraste
- profundidad

Utilizar diferentes tonos oscuros.

---

# 27. Responsive typography

El hero puede utilizar typography fluida mediante `clamp()`.

Ejemplo conceptual:

`clamp(3rem, 8vw, 7rem)`

No copiar literalmente si no encaja con el diseño final.

La tipografía debe adaptarse suavemente entre dispositivos.

---

# 28. Imágenes

No utilizar imágenes de stock.

Si no existen imágenes propias relevantes, no utilizar imágenes.

El portfolio debe poder ser visualmente potente sin depender de fotografías.

Optimizar todas las imágenes reales.

---

# 29. Performance visual

La estética nunca debe justificar:

- vídeos pesados
- fondos WebGL
- animaciones pesadas
- librerías innecesarias
- grandes bundles de JavaScript

El portfolio debe cargar rápidamente.

---

# 30. Sensación final

Al entrar en la web, el visitante debería percibir:

"Software Engineer con experiencia profesional real."

No:

"Portfolio de diseñador."

No:

"Landing page de una startup."

No:

"Template de desarrollador junior."

La interfaz debe poner el foco en:

**persona → experiencia → capacidades → trabajo → contacto**

La estética es un multiplicador, no el producto.
