# MEMORY.md — Proyecto Web M6

Última actualización: 2026-03-12 (America/Buenos_Aires)

## Proyecto
- Nombre: Web de clases — Diplomatura IA Módulo 6
- Ruta: `/home/guille/.openclaw/workspace/Diplomatura-Inteligencia-Artificial/modulos/M6/web`

## Estado actual conocido
Archivos presentes:
- `index.html`
- `styles.css`
- `script.js`
- `data.json`
- `nebula-bg.js`

## Trabajo reciente
- Se confirmó que este directorio es el workspace activo del proyecto web.
- Aún falta cierre final del sitio (definir exactamente pendientes funcionales/visuales/deploy).
- Se conectó el slide principal de M6 a `data.json` para evitar duplicación de contenido dentro de `script.js`.
- Se mejoró la navegación básica del visor: indicador `1 / N`, atajos con flechas izquierda/derecha y cierre con `Escape`.
- Se ajustó responsive inicial para controles, leyenda y panel de detalle en pantallas chicas.
- Se agregó estado visible de carga/error del slide y protección contra renders asíncronos fuera de orden si se navega rápido.
- Se mejoró accesibilidad básica del HTML con `aria-label`, `aria-live` y botones explícitos `type="button"`.
- El panel flotante ahora puede cargar el contenido real de las notas atómicas de `modulos/M6/notas-atomicas/` usando el campo `file` de `data.json`.
- Se implementó render básico de Markdown en cliente con fallback al resumen corto (`note`) si no hay archivo o falla la carga.

## Repaso validado el 2026-03-12
- Los archivos más recientemente tocados del proyecto son `styles.css` y `script.js` (2026-03-12 11:41) e `index.html` (2026-03-12 11:32).
- `index.html` ya refleja la capa de UI con controles de slide, badge de estado, tooltip y panel lateral con atributos de accesibilidad.
- `script.js` conserva la lógica reciente importante:
  - cache de `data.json` para M6 (`module6Graph`);
  - protección contra carreras de render/panel (`renderTicket`, `panelTicket`);
  - carga de notas atómicas por `fetch('../notas-atomicas/...')`;
  - render cliente de Markdown a HTML;
  - navegación por teclado con flechas y cierre con `Escape`.
- `styles.css` ya contiene los estilos del indicador de slide, badge de estado, panel de detalle y ajustes responsive para pantallas chicas.
- No se detectaron commits en este repo todavía; el estado de avance está sostenido en archivos locales y memoria.
- Se deshabilitaron temporalmente los slides 1 y 2; queda activo solo el slide 0 mediante `enabledSlides = slides.slice(0, 1)` en `script.js`.
- Cuando hay un único slide, los botones de navegación quedan desactivados y las flechas del teclado ya no rotan slides.
- Luego se reactivó el slide 1 para M6 y se mantuvo deshabilitado el slide 2 de comparación.
- `data.json` fue reemplazado para reflejar el nuevo contexto adjunto del usuario:
  - hub central `MOC - ChatGPT en la Preparación de Entrevistas de Trabajo`;
  - clusters de CV, biografías, entrevistas, correos y prompting;
  - relaciones nuevas basadas en el MOC adjunto, reemplazando la estructura anterior.
- Varias notas del nuevo grafo apuntan a archivos reales de `modulos/M6/notas-atomicas/`; cuando no existe nota local exacta, el nodo conserva resumen corto en `note`.
- Para la presentación a alumnos, el panel de detalle ya no muestra bloques internos de trabajo de las notas atómicas.
- Se filtran al renderizar las secciones `Enlaces`, `Prompt sugerido`, `Aplicación web interactiva` y `Pendientes`, además de ocultar la línea técnica de procedencia del archivo.
- Se simplificó la UI superior:
  - se eliminó el texto de ayuda `Arrastrá nodos...`;
  - el título del slide 1 quedó como `M6: empleabilidad con IA`;
  - el segundo renglón/subtítulo del slide 1 quedó vacío.
- Se restauró la flotabilidad de las notas: el panel vuelve a seguir el mouse mientras está visible, con reposicionamiento para no salirse de pantalla.
- El slide 1 (M6) quedó finalmente ajustado para verse mejor al iniciar:
  - el layout se estabiliza antes de pintarse;
  - el viewport del grafo se centra respecto del área útil real de la página;
  - la distribución se abrió más en horizontal para evitar un grafo demasiado vertical;
  - se limitó el escalado automático para que el grafo no quede diminuto.
- El slide 0 también recibió ajuste visual:
  - distribución inicial más horizontal;
  - menor apilamiento vertical;
  - etiquetas largas con corte más temprano y tamaño de fuente algo menor para preservar legibilidad.
- El slide 2 alternativo sigue deshabilitado; el flujo activo queda en 2 slides (`slide 0` general + `slide 1` M6).

## Próximos pasos sugeridos (checklist)
- [ ] Revisar estado funcional end-to-end (navegación, cargas, eventos JS).
- [ ] Ajustar UI/UX final (responsive, jerarquía visual, legibilidad).
- [ ] Validar contenido de `data.json` y su renderizado.
- [ ] Prueba final en desktop + móvil.
- [ ] Definir y ejecutar deploy (si aplica).

## Decisión operativa
- Mantener este archivo actualizado en cada avance importante para no perder contexto entre sesiones.
