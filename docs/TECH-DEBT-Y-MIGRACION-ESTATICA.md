# Análisis de tech debt y plan de migración a un sitio estático

**Fecha del análisis:** Julio 2026
**Alcance:** repositorio completo (`eoriol-front`), web personal enriqueoriol.com

---

## 1. Resumen ejecutivo

El sitio es una SPA **Angular 8** (noviembre 2019) con server-side rendering vía
**Angular Universal** desplegado como **Firebase Cloud Function**, más Firebase Hosting
para los estáticos. Angular 8 lleva sin soporte desde **noviembre de 2020** y el stack
que lo rodea (TSLint, Protractor, Karma, Travis CI, Universal Analytics, la API de
Universal pre-Ivy) está **completamente descontinuado**. El build solo funciona con el
flag `NODE_OPTIONS=--openssl-legacy-provider`, síntoma de que el toolchain (webpack 4)
ya no es compatible con Node moderno.

La paradoja es que **el 95% del sitio ya es contenido estático**: la home es texto fijo,
los cursos/libros vienen de un JSON versionado a mano dentro de `assets/fixtures`, y el
blog es un WordPress headless que apenas cambia. Toda la maquinaria de SSR + Cloud
Functions + service worker + hidratación existe para servir contenido que podría
pre-renderizarse en build.

**Recomendación:** migrar a **Astro** (genera HTML estático, permite islas React donde
haga falta interactividad), exportando el blog de WordPress a Markdown, y desplegando
solo en Firebase Hosting (sin functions). Alternativas evaluadas en §5. Actualizar
Angular 8 → Angular actual **no** se recomienda: son ~12 versiones mayores con cambio
completo de la API de Universal y del sistema de módulos; el esfuerzo sería comparable
a reescribir, manteniendo un framework que sobra para este contenido.

---

## 2. Inventario del sitio (qué hay que migrar)

### Rutas

| Ruta | Componente | Contenido |
|---|---|---|
| `/home` (y `/`) | `HomeComponent` | Hero, "about", tarjetas de experiencia, cursos/libros, últimos 3 posts, contacto |
| `/blog` | `PostsListComponent` | Lista de posts con infinite scroll y buscador |
| `/blog/:year/:month/:slug` | `PostDetailComponent` | Post desde WordPress, code-prettify, comentarios, barra de compartir |
| `/subscribe` | `SubscribeMobileModule` (lazy) | Formulario de alta en Mailchimp (versión móvil) |
| `**` | `PageNotFoundComponent` | 404 |

### Fuentes de datos en runtime

| Dato | Origen | ¿Realmente dinámico? |
|---|---|---|
| Posts del blog | WordPress headless (`blog.enriqueoriol.com/wp-json/wp/v2` + endpoint custom `/wp-json/custom/v1`) | No — cambia solo cuando se publica un post |
| Cursos y libros | `src/assets/fixtures/book-courses-v1.5.json` (JSON estático, versionado a mano v1.1…v1.5) | No — ya es estático |
| Comentarios | WordPress REST (`/comments`), lectura y escritura | Sí (lectura y POST) |
| Formulario de contacto | Contact Form 7 del WordPress (`/wp-json/contact-form-7/.../feedback`) | Sí (POST) |
| Suscripción newsletter | Mailchimp vía **JSONP** con IDs de lista hardcodeados en `mailchimp.service.ts` | Sí (POST) |
| Texto de home, experiencia, about | Hardcodeado en las plantillas | No |

Las únicas funcionalidades genuinamente dinámicas son **tres formularios** (comentar,
contactar, suscribirse) y la **búsqueda del blog**. Nada de esto justifica SSR ni
Cloud Functions: todos son llamadas client-side a servicios externos que un sitio
estático puede hacer igual.

---

## 3. Tech debt detectado

### 3.1 Crítico — bloquea mantenimiento y builds

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| 1 | **Angular 8.2, sin soporte desde nov-2020** (hoy va por v20+). Sin parches de seguridad. | `package.json` | No se pueden corregir CVEs del framework; cada año que pasa la actualización es más cara |
| 2 | **Build requiere OpenSSL legacy**: `NODE_OPTIONS=--openssl-legacy-provider` en `start` y `build:universal` | `package.json` scripts | webpack 4 usa hashes MD4 no soportados por Node ≥17; es un parche temporal que puede romper en cualquier versión de Node |
| 3 | **API de Universal muerta**: `@nguniversal/module-map-ngfactory-loader` y `AppServerModuleNgFactory` son artefactos de ViewEngine, **eliminados en Angular 9+**. La sintaxis lazy `./blog/blog.module#BlogModule` (`app.routes.ts`) también fue eliminada. | `server/index.ts`, `app.routes.ts` | Hace imposible una actualización incremental de Angular: el SSR habría que reescribirlo desde cero de todos modos |
| 4 | **TypeScript 3.4 / RxJS 6.4 / zone.js 0.9 / core-js 2** — todo el árbol de dependencias tiene años de CVEs acumulados (webpack 4, node-sass transitivo, etc.) | `package.json`, `yarn.lock` + `package-lock.json` | `npm audit` reportará cientos de vulnerabilidades sin fix posible dentro de Angular 8 |
| 5 | **CI muerto**: `.travis.yml` apunta a Travis CI (de facto discontinuado para OSS) con **Node 8.11.2**, mientras `.node-version` pide Node 22 y `dist/package.json` (functions) pide Node 20. Tres versiones de Node contradictorias. | `.travis.yml`, `.node-version`, `dist/package.json` | No hay despliegue automatizado real; los deploys son manuales (el README ya lo documenta así) |

### 3.2 Alto — herramientas y servicios descontinuados

| # | Problema | Evidencia |
|---|---|---|
| 6 | **TSLint + codelyzer**: TSLint fue deprecado en 2019; no hay lint viable | `tslint.json` |
| 7 | **Protractor**: proyecto oficialmente terminado (2023); los e2e no pueden ejecutarse en entornos modernos | `protractor.conf.js`, `e2e/` |
| 8 | **Karma**: deprecado (abril 2023) | `karma.conf.js` |
| 9 | **Google Analytics Universal (`UA-2769438-8`)**: UA dejó de procesar datos en julio 2023 — **la analítica lleva ~3 años sin registrar nada** | `environment.prod.ts`, `angulartics2` |
| 10 | **Google+** en el JSON-LD (`sameAs: plus.google.com/...`): servicio cerrado en 2019 | `home.component.ts` |
| 11 | **Doble lockfile**: coexisten `yarn.lock` y `package-lock.json`, con riesgo de árboles de dependencias distintos según la herramienta usada | raíz del repo |
| 12 | **`dist/package.json` versionado en git** con dependencias duplicadas del root y versiones divergentes (`firebase-admin ^12` vs `^8.9.2` en root, `firebase-functions ^5` vs `^3.3`) — el manifiesto de las Cloud Functions se mantiene a mano y desincronizado | `dist/package.json` vs `package.json` |

### 3.3 Medio — arquitectura y código

| # | Problema | Evidencia |
|---|---|---|
| 13 | **SSR en Cloud Function para contenido estático**: cada visita sin caché paga cold start de una función que arranca Angular entero; el deploy exige `firebase deploy --only functions,hosting` coordinado | `server/index.ts`, `firebase.json`, README |
| 14 | **Librería vendorizada**: `code-prettify` copiado entero en `src/libs/code-prettify-mod` (~404 KB, ~40 archivos de lenguajes) con alias `@prettify/*`; código de 2013 sin mantenimiento, cuando existen Prism/Shiki | `src/libs/`, `tsconfig.json` |
| 15 | **Secretos/IDs hardcodeados**: IDs de lista de Mailchimp (`u`, `id`) en `mailchimp.service.ts`; JSONP como mecanismo (obsoleto e inseguro por diseño) | `mailchimp.service.ts` |
| 16 | **`postNewComment` envía el comentario por query string** (contenido, autor y email en la URL) en lugar del body, y hace `observable.subscribe()` interno además de devolver el observable (patrón propenso a dobles envíos, mitigado con `share()`) | `wordpress.service.ts` |
| 17 | **`sitemap.xml` mantenido a mano** (264 URLs): cada post nuevo exige editar el XML manualmente | `src/sitemap.xml` |
| 18 | **Contenido versionado por copia**: `book-courses-v1.1.json` … `v1.5.json` conviven en assets (y se despliegan todos); la "versión activa" es una constante en `environment.ts` | `src/assets/fixtures/` |
| 19 | **Datos de negocio caducos en el contenido**: precios y cupones de Udemy de 2018 (`couponCode=BLOGREADER`, "23 €"), posts fixture antiguos | `db.json`, fixtures |
| 20 | **Service worker (ngsw) + app shell manual en `index-1.html`**: complejidad de PWA (cache de API de WordPress incluida) para un sitio de contenido; el nombre `index-1.html` es en sí deuda histórica | `ngsw-config.json`, `angular.json` |
| 21 | **CSP/CORS header de hosting apunta a staging**: `Access-Control-Allow-Origin: https://eoriolfront-staging.firebaseapp.com` en el `firebase.json` que se usa también en producción | `firebase.json` |
| 22 | **Tests generados por CLI sin mantenimiento**: specs `.spec.ts` de scaffolding; sin CI no se ejecutan nunca, valor real ≈ 0 | `src/**/*.spec.ts` |
| 23 | **Dependencia total de un WordPress vivo**: si `blog.enriqueoriol.com` cae o se desactualiza (WP + plugins + endpoint custom PHP), el blog entero deja de renderizar. Es un segundo sistema que mantener (hosting PHP, actualizaciones de seguridad de WP, Contact Form 7, plugin custom) | `wordpress.service.ts`, `environment.prod.ts` |

---

## 4. Por qué NO conviene actualizar Angular

- **8 → 20 son ~12 versiones mayores**, atravesando la migración ViewEngine→Ivy, la
  eliminación de la sintaxis lazy por string, el reemplazo completo de
  `@nguniversal/*` por `@angular/ssr`, standalone components, y el nuevo control flow.
  Cada dependencia de terceros (`angulartics2`, `ngx-scroll-to`, `ngx-infinite-scroll`,
  `@ngx-lite/json-ld`) habría que sustituirla o eliminarla igualmente.
- Al final del esfuerzo seguirías teniendo **un framework SPA + SSR + Cloud Functions
  para servir contenido estático**, con el mismo coste de mantenimiento recurrente
  (una major de Angular cada 6 meses).
- El esfuerzo es del mismo orden que reescribir las ~10 vistas/componentes visibles en
  un stack estático, pero la reescritura elimina la deuda en lugar de refinanciarla.

---

## 5. Opciones de stack para la versión estática

| Criterio | **Astro** (recomendada) | Next.js (React) | Eleventy / HTML puro |
|---|---|---|---|
| Salida | HTML estático puro; JS solo en "islas" interactivas | SSG posible, pero arrastra runtime React en cada página | HTML/CSS puro |
| Contenido Markdown | Nativo (content collections, MDX) | Requiere configurar (contentlayer/MDX) | Nativo |
| Interactividad (formularios, búsqueda) | Islas en React/Preact/vanilla — se puede usar React solo donde haga falta | React en todo | JS vanilla a mano |
| SEO (meta, OG, JSON-LD, sitemap) | Integrado / trivial | Bien soportado | Manual pero simple |
| Curva y mantenimiento | Baja; upgrades sencillos | Media-alta; el framework evoluciona rápido | Mínima, pero todo es artesanal |
| Encaje con este sitio | **Ideal**: blog + landing con 3 formularios | Sobredimensionado | Viable pero la lista/búsqueda del blog y las plantillas de post se hacen incómodas |

**Recomendación: Astro con islas React (o Preact) opcionales.** Cumple el objetivo de
"más estático y fácil de mantener", permite escribir los componentes interactivos en
React (satisface la opción React) y el resultado se sirve desde Firebase Hosting sin
funciones. Si se prefiere quedarse 100% en el ecosistema React, Next.js con `output:
'export'` es la segunda opción.

---

## 6. Plan de migración por fases

### Fase 0 — Decisiones y limpieza de contenido (previo, ~1 día)

1. **Decidir el destino del blog**: exportar WordPress a Markdown (recomendado, ver
   Fase 1) vs. seguir consumiendo WP en build-time. Exportar elimina el servidor WP
   como dependencia de mantenimiento (deuda #23).
2. Purgar contenido muerto: cupones/precios de 2018, referencias a Google+ (deuda #10, #19).
3. Decidir qué hacer con los **comentarios**: los existentes se pueden exportar e
   incrustar como estáticos; los nuevos, migrar a **Giscus** (GitHub Discussions) o
   similar. Mantener el POST a WP REST implicaría conservar WordPress vivo.
4. Crear propiedad **GA4** (o Plausible/umami) — la analítica actual lleva años muerta (deuda #9).

### Fase 1 — Exportar el contenido (~1-2 días)

1. Exportar posts de WordPress a Markdown con `wordpress-export-to-markdown` (usa el
   export XML de WP), conservando slug, fecha, imagen destacada y metadatos OG en el
   frontmatter.
2. Descargar las imágenes de los posts al repo (o a un bucket) — hoy viven en el WP.
3. Convertir `book-courses-v1.5.json` en una colección de contenido (un `.md`/`.json`
   por curso) y **borrar** las versiones v1.1–v1.4 (deuda #18).
4. Exportar los comentarios existentes a JSON estático si se quieren preservar.

### Fase 2 — Reconstruir la UI (~3-5 días)

Mapeo directo de componentes Angular → componentes Astro (la mayoría sin JS):

| Angular | Nuevo | JS en cliente |
|---|---|---|
| `HomeComponent` + hero/about/experience-card/book-card/review | Página `index.astro` + componentes estáticos | Ninguno (el acordeón de cursos puede ser `<details>` o una isla mínima) |
| `PostsListComponent` (infinite scroll + búsqueda) | `/blog` paginado estáticamente (`/blog/2`, `/blog/3`…) + búsqueda con Pagefind (índice estático) | Isla pequeña para búsqueda |
| `PostDetailComponent` | Páginas generadas de las colecciones, ruta `blog/[year]/[month]/[slug]` idéntica a la actual | Resaltado de código con **Shiki en build** (sustituye los 404 KB de code-prettify vendorizado, deuda #14) |
| `header`, `menu-mobile`, `hamburger-menu`, `social-icons-bar`, `page-not-found` | Componentes estáticos + CSS | Toggle de menú en vanilla JS |
| `contact` | Formulario estático → Formspree/Basin, o POST client-side | Isla de formulario |
| `subscribe-*` (Mailchimp JSONP) | **Formulario POST estándar de Mailchimp embed** (elimina JSONP y los IDs en código TS, deuda #15) | Ninguno u opcionalmente una isla |
| `add-comment`/`comment` | Giscus embed (o isla React contra WP si se conserva) | Widget |
| Directiva LQIP (`lqimg-placeholder`) | `<Image>` de Astro (genera responsive + lazy + placeholder automáticamente) | Ninguno |

Los estilos SCSS actuales (`styles.scss`, `variables.scss`, SCSS por componente) son
reutilizables casi tal cual.

### Fase 3 — SEO y compatibilidad de URLs (~1 día, crítico)

1. **Preservar el esquema de URLs** `blog/:year/:month/:slug.html` — las páginas
   generadas deben responder exactamente en las URLs del sitemap actual (264 URLs),
   incluida la variante con y sin `.html` (el código actual acepta ambas).
2. Generar `sitemap.xml` automáticamente en build (elimina el mantenimiento manual, deuda #17).
3. Meta tags, OG y JSON-LD por página desde el frontmatter (hoy se hacen imperativamente
   con `Meta`/`Title` en cada componente).
4. Redirección `/home` → `/` (o mantener `/home` como alias) en `firebase.json`.

### Fase 4 — Despliegue y CI (~1 día)

1. `firebase.json`: eliminar el rewrite `"function": "ssr"` y las funciones; hosting
   estático puro con `cleanUrls` y las cabeceras de caché actuales. Corregir el header
   CORS que apunta a staging (deuda #21).
2. **Borrar**: `server/`, `webpack.server.config.js`, `dist/package.json`,
   `main.server.ts`, `app.server.module.ts`, interceptor Universal, TransferState.
3. Sustituir Travis por **GitHub Actions** (build + deploy a Firebase Hosting con
   preview channels por PR). Un solo Node version (`.node-version`), un solo lockfile (deuda #5, #11).
4. Retirar el service worker de Angular. Importante: desplegar un
   `ngsw-worker.js` de desinstalación (el "safety worker" que provee Angular) durante
   un tiempo, para que los navegadores con la PWA cacheada no queden atrapados en la
   versión vieja (deuda #20).
5. Eliminar Karma/Jasmine/Protractor/TSLint; si se quiere lint y algún test, ESLint +
   un smoke test de build (los specs actuales no aportan, deuda #6-8, #22).

### Fase 5 — Apagado de sistemas (~después de un periodo de gracia)

1. Verificar en Search Console que las URLs siguen indexadas y sin errores.
2. Apagar las Cloud Functions y, si el blog se exportó, **retirar el WordPress**
   (o dejarlo en modo lectura privado como archivo). Esto elimina el mayor coste de
   mantenimiento recurrente del sistema actual.

### Estimación total

**~7-10 días de trabajo efectivo** para paridad funcional completa. El resultado:

- 0 servidores propios (ni Cloud Function ni WordPress) — solo Firebase Hosting.
- Publicar un post = añadir un `.md` y hacer push (el CI construye y despliega).
- Upgrades del stack = `npm update` de un metaframework, sin migraciones de framework SPA.
- Sitemap, imágenes responsive, resaltado de código y meta tags generados en build.

---

## 7. Qué NO migrar (funcionalidad a descartar)

- **Infinite scroll** en `/blog`: paginación estática es más simple, más rápida y mejor
  para SEO.
- **Service worker / PWA**: para un blog, el coste (bugs de caché, usuarios atrapados
  en versiones viejas) supera el beneficio.
- **`angulartics2` + eventos GA**: GA4 con script estándar (o Plausible) es suficiente.
- **JSONP de Mailchimp**: el form embed oficial hace lo mismo sin código.
- **Los 5 JSON versionados de cursos**: una sola fuente de verdad en el repo.
- **El endpoint WP custom (`wp-json/custom/v1`)**: era necesario para el overview de
  posts con SSR; desaparece con el contenido en el repo.
