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

El catálogo `experiments` de `src/content.ts` enlaza las 14 páginas independientes de `public/experiments/`. Rollup copia sus archivos a `dist/experiments/` sin transformar HTML, CSS ni scripts clásicos. Cada tarjeta abre una pestaña nueva; la portada no ejecuta los sketches.

Los scripts y estilos se conservan tal como estaban en `/Users/hectorrlv/Documents/p5`. Solo se sustituyeron las referencias de bibliotecas de los HTML por rutas locales compartidas en `vendor/`:

| p5.js | Experimentos |
| --- | --- |
| 0.10.2 | Bouncing_balls, Falling_ball |
| 1.0.0 | game-of-life, triangles |
| 1.4.0 | Alive_parka, Brook_ox, Center_circle, Hipocicloide, Orbit, Star, Star2 |
| 1.6.0 | Fourier, mandelbrot, TimesTable |

Las bibliotecas 0.10.2 y 1.0.0 y todos los complementos de sonido se copiaron de los archivos originales. Se descargaron las distribuciones minificadas oficiales de [p5.js 1.4.0](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js) y [p5.js 1.6.0](https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js). La distribución minificada de 1.4.0 evita la descarga externa de traducciones de diagnóstico que realiza la distribución completa. Se conservan sus avisos de licencia. `p5.sound` permanece únicamente en las páginas que ya lo cargaban. No hay dependencias de CDN en ejecución.

Las dimensiones fijas, valores iniciales y comportamiento de cada experimento son los originales; esta integración no los adapta a móvil ni corrige su lógica.
