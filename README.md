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
