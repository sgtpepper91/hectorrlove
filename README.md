# H·R·LOVE

Hub personal de [hectorrlove.com](https://hectorrlove.com), construido con Lit y Firebase Hosting.

## Desarrollo

Requiere Node.js 22+ y pnpm 11+.

```bash
corepack pnpm install
corepack pnpm run start:build
```

Para validar el proyecto:

```bash
corepack pnpm run check
```

## Despliegue

El proyecto Firebase predeterminado es `hectorrlove`. Tras iniciar sesión con Firebase CLI:

```bash
corepack pnpm run build
firebase deploy --only hosting
```

### Dominio raíz

En Firebase Console, abre **Hosting** en el proyecto `hectorrlove`, añade `hectorrlove.com` como dominio personalizado y crea los registros DNS que Firebase indique en el registrador. Firebase también ofrecerá redireccionar `www.hectorrlove.com` al dominio raíz.

Los subdominios de cada aplicación (`ligamx`, `mundial` y `galeria`) se administran en sus propios proyectos Firebase; este repositorio solo controla el hub del dominio raíz.

## Contenido

Los proyectos y enlaces públicos viven en `src/content.ts`. Actualiza ese archivo para agregar una tarjeta o cambiar un destino, sin tocar la interfaz.

## Experimentos

El catálogo `experiments` de `src/content.ts` enlaza las 15 páginas independientes de `public/experiments/`. Rollup copia sus archivos a `dist/experiments/` sin transformar HTML, CSS ni scripts clásicos. Cada tarjeta abre una pestaña nueva; la portada no ejecuta los sketches.

Los originales de `/Users/hectorrlv/Documents/p5` permanecen intactos. Las copias del sitio tienen nombres y descripciones en español, controles accesibles y un diseño compartido. Conservan las rutas de sus carpetas y las bibliotecas locales de `vendor/`:

| p5.js | Experimentos |
| --- | --- |
| 2.3.2 | Alive_parka, Bouncing_balls, Brook_ox, Center_circle, Falling_ball, Fourier, Hipocicloide, Orbit, Star, Star2, TimesTable, epicicloide, game-of-life, mandelbrot, triangles |

Todos los laboratorios usan la distribución minificada oficial local de [p5.js 2.3.2](https://github.com/processing/p5.js/releases/tag/v2.3.2). Ningún sketch usa audio, por lo que `p5.sound` se retiró. No hay dependencias de CDN en ejecución.

### Laboratorio visual

`shared/lab.css` y `shared/lab.js` definen el tema claro/oscuro, los controles, resultados y acciones comunes. Los canvas mantienen coordenadas lógicas estables y se escalan proporcionalmente; redimensionar la página no reinicia la simulación. Las animaciones suspenden su avance cuando la pestaña está oculta. Cada carpeta conserva su propio `sketch.js`.

`shared/math.js` contiene los modelos puros comprobados por las pruebas: agujas de Buffon, rebotes disipativos, descenso por cicloide, órbita con integración Verlet y detección de contacto, mediatrices, circuncentro, Fourier y reglas de Conway. Las unidades de Órbita son de simulación; sus radios no cambian la masa. La braquistócrona representa partículas sin fricción bajo gravedad de 9.81 m/s², con tiempos analíticos. Véase la [solución de referencia mediante cicloide](https://arxiv.org/abs/2507.22548).

Mandelbrot y Julia usan `fractal-worker.js`. Cada selección cancela el cálculo anterior de Julia. Las descargas quedan deshabilitadas mientras se calcula la imagen correspondiente.

### Validación

```bash
corepack pnpm run check
node --test tests/experiment-math.test.mjs
```

La prueba de navegador usa una instalación existente de Playwright y Google Chrome, arranca un servidor temporal sobre `dist` y bloquea peticiones externas:

```bash
PLAYWRIGHT_MODULE=/ruta/a/playwright/index.mjs node tests/experiments.browser.mjs
```

`QA_OUTPUT` permite elegir dónde guardar capturas y el informe JSON (por defecto, en el directorio temporal del sistema). `QA_ONLY=mandelbrot,triangles` limita la ejecución a carpetas concretas. Se comprueban las 14 páginas, etiquetas, límites de controles, descargas, navegación por teclado, temas y coordenadas en móvil.
