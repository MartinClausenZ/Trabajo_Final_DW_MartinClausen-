# Tablero de Trabajo — Sprint 3 (Verdia)

## Columnas sugeridas

Backlog → To Do → In Progress → Code Review → Done

\---

## Retrospectiva

### Tarea 1 — Retrospectiva Sprint 2

* **Descripción:** Actualizar el archivo retro.md con las conclusiones de la retro del segundo sprint usando la dinámica de estrella de mar.
* **Criterios de aceptación:**

  * Completar los 5 ítems: Comenzar a hacer, Hacer más, Continuar haciendo, Hacer menos, Dejar de hacer.
  * Actualizar `retro.md` con las conclusiones del Sprint 2 (agregar debajo de las del Sprint 1).
* **Entregable:** `retro.md` actualizado
* **Etiqueta:** `organización`

\---

## Tablero de Trabajo

### Tarea 2 — Reiniciar y actualizar el tablero para Sprint 3

* **Descripción:** Limpiar el tablero del sprint anterior, mover tareas pendientes al backlog, y planificar las nuevas tareas del Sprint 3.
* **Criterios de aceptación:**

  * Tablero actualizado con las tareas de este sprint.
  * Tareas priorizadas y ordenadas según dependencias.
  * Estimar dificultad y tiempos por tarea.
* **Entregable:** Link al tablero actualizado en el README
* **Etiqueta:** `organización`

\---

## Configuración del proyecto Node.js + Express + EJS

### Tarea 3 — Inicializar proyecto Node.js

* **Descripción:** Crear package.json e instalar las dependencias necesarias (express, ejs, nodemon).
* **Criterios de aceptación:**

  * `npm init` ejecutado.
  * `express`, `ejs` instalados como dependencias.
  * `nodemon` instalado como devDependency.
  * Scripts `start` y `dev` configurados.
* **Etiqueta:** `setup` `node`

### Tarea 4 — Configurar Express y EJS

* **Descripción:** Crear app.js con la configuración básica de Express, setear EJS como motor de templates, configurar carpeta de vistas y archivos estáticos.
* **Criterios de aceptación:**

  * `app.set('view engine', 'ejs')` configurado.
  * `app.set('views', ...)` apuntando a `src/views`.
  * `app.use(express.static(...))` apuntando a `public`.
  * Servidor escuchando en puerto 3000.
* **Etiqueta:** `setup` `express`

### Tarea 5 — Mover CSS y assets a /public

* **Descripción:** Copiar la carpeta css/ y los recursos estáticos a la carpeta public/ para que Express los sirva correctamente.
* **Criterios de aceptación:**

  * `public/css/styles.css` existe y es accesible desde el navegador.
  * Imágenes y otros assets están en `public/img/`.
  * Los links a CSS en las vistas usan rutas absolutas (`/css/styles.css`).
* **Etiqueta:** `setup` `assets`

\---

## Rutas y Controladores

### Tarea 6 — Crear estructura de rutas

* **Descripción:** Crear los archivos de rutas separados: mainRoutes, productRoutes y userRoutes.
* **Criterios de aceptación:**

  * `src/routes/mainRoutes.js` con GET `/`.
  * `src/routes/productRoutes.js` con GET `/products`, `/products/detail`, `/products/cart`, `/products/create`, `/products/edit`.
  * `src/routes/userRoutes.js` con GET `/users/login`, `/users/register`.
  * Todas las rutas montadas en app.js con `app.use()`.
* **Etiqueta:** `express` `rutas`

### Tarea 7 — Crear controladores

* **Descripción:** Crear los controladores que responden a cada ruta usando `res.render()`.
* **Criterios de aceptación:**

  * `src/controllers/mainController.js` con método `home`.
  * `src/controllers/productController.js` con métodos `list`, `detail`, `cart`, `createForm`, `editForm`.
  * `src/controllers/userController.js` con métodos `login`, `register`.
  * Todos los métodos usan `res.render()` en lugar de `res.send()`.
* **Etiqueta:** `express` `controladores`

\---

## Migración a EJS

### Tarea 8 — Renombrar vistas a .ejs

* **Descripción:** Renombrar todos los archivos .html del Sprint 2 a la extensión .ejs y colocarlos en la carpeta `src/views/` correspondiente.
* **Criterios de aceptación:**

  * `index.html` → `src/views/home.ejs`
  * `productDetail.html` → `src/views/products/detail.ejs`
  * `productCart.html` → `src/views/products/cart.ejs`
  * `register.html` → `src/views/users/register.ejs`
  * `login.html` → `src/views/users/login.ejs`
* **Depende de:** Tarea 6, Tarea 7
* **Etiqueta:** `ejs` `migración`

\---

## Partials (componentes reutilizables)

### Tarea 9 — Crear partial head.ejs

* **Descripción:** Extraer todo el contenido del `<head>` de las vistas a un archivo parcial reutilizable.
* **Criterios de aceptación:**

  * Crear `src/views/partials/head.ejs` con el elemento `<head>` completo.
  * Incluye meta tags, link a CSS, Google Fonts, tag `<title>` con valor dinámico.
  * Usar `<%- include('partials/head', { title: '...' }) %>` en todas las vistas.
  * Verificar que el título cambia dinámicamente por página.
* **Etiqueta:** `ejs` `partials`

### Tarea 10 — Crear partial header.ejs

* **Descripción:** Extraer el header con navegación a un archivo parcial reutilizable.
* **Criterios de aceptación:**

  * Crear `src/views/partials/header.ejs` con el `<header>` completo.
  * Logo, links de navegación, barra de búsqueda, íconos de usuario y carrito.
  * Menú hamburguesa con script JS incluido.
  * Todos los links usan rutas de Express (`/`, `/products`, `/users/login`, etc.).
  * Usar `<%- include('partials/header') %>` en todas las vistas.
* **Etiqueta:** `ejs` `partials`

### Tarea 11 — Crear partial footer.ejs

* **Descripción:** Extraer el footer a un archivo parcial reutilizable.
* **Criterios de aceptación:**

  * Crear `src/views/partials/footer.ejs` con el `<footer>` completo.
  * 4 columnas de links, redes sociales, copyright.
  * Todos los links usan rutas de Express.
  * Usar `<%- include('partials/footer') %>` en todas las vistas.
* **Etiqueta:** `ejs` `partials`

### Tarea 12 — Crear partial productCard.ejs

* **Descripción:** Extraer la tarjeta de producto a un archivo parcial reutilizable para usarla en el home, listado y productos relacionados.
* **Criterios de aceptación:**

  * Crear `src/views/partials/productCard.ejs`.
  * Recibe variables: emoji, name, variant, rating, reviews, price, badge.
  * Se usa en: home (destacados), products/list (listado), products/detail (relacionados).
  * Badge opcional: si está vacío no se muestra.
* **Etiqueta:** `ejs` `partials`

### Tarea 13 — Implementar partials en TODAS las vistas

* **Descripción:** Reemplazar el código repetido de cada vista con los includes de los partials creados.
* **Criterios de aceptación:**

  * Todas las vistas usan `<%- include('partials/head') %>`.
  * Todas las vistas usan `<%- include('partials/header') %>`.
  * Todas las vistas usan `<%- include('partials/footer') %>`.
  * Las tarjetas de producto usan `<%- include('partials/productCard') %>`.
  * No queda código repetido de header, footer o head en ninguna vista.
  * El sitio se ve exactamente igual que en el Sprint 2.
* **Depende de:** Tarea 9, 10, 11, 12
* **Etiqueta:** `ejs` `partials` `refactor`

\---

## Organización de vistas en carpetas

### Tarea 14 — Reorganizar vistas en carpetas

* **Descripción:** Mover las vistas a las carpetas correspondientes según el dominio del sitio.
* **Criterios de aceptación:**

  * `src/views/home.ejs` (queda en raíz de views)
  * `src/views/products/list.ejs`
  * `src/views/products/detail.ejs`
  * `src/views/products/cart.ejs`
  * `src/views/products/create.ejs`
  * `src/views/products/edit.ejs`
  * `src/views/users/login.ejs`
  * `src/views/users/register.ejs`
  * Actualizar los `res.render()` en los controladores para que coincidan con las nuevas rutas.
* **Etiqueta:** `ejs` `organización`

\---

## Página: Creación de productos

### Tarea 15 — Maquetar formulario de creación de productos

* **Descripción:** Crear la vista `products/create.ejs` con el formulario para que el administrador cargue nuevos productos.
* **Criterios de aceptación:**

  * Campos: Nombre, Descripción (textarea), Imagen (file), Categoría (select), Colores/Tamaños, Precio.
  * Formulario con `enctype="multipart/form-data"` para subir imágenes.
  * Select de categorías con opciones: Plantas, Macetas, Decoración, Accesorios.
  * Botón "Crear producto" con estilo consistente.
  * Link de vuelta al listado.
  * Usa partials (head, header, footer).
  * Estilo consistente con las demás páginas (card blanca, fondo verde claro).
* **Etiqueta:** `HTML` `EJS` `productos` `admin`

### Tarea 16 — Estilos CSS para formularios de productos

* **Descripción:** Agregar estilos CSS específicos para los formularios de creación y edición de productos.
* **Criterios de aceptación:**

  * Select y textarea con estilo consistente con los inputs de los formularios de auth.
  * File input estilizado de forma prolija.
  * Layout centrado y responsive.
  * Card con max-width 560px como los formularios de auth.
* **Etiqueta:** `CSS` `productos` `admin`

\---

## Página: Edición de productos

### Tarea 17 — Maquetar formulario de edición de productos

* **Descripción:** Crear la vista `products/edit.ejs` con el formulario para editar productos existentes, con datos precargados.
* **Criterios de aceptación:**

  * Mismos campos que el formulario de creación, pero con valores precargados de ejemplo.
  * Atributo `value` en inputs con datos del producto.
  * Textarea con contenido precargado.
  * Select con opción correspondiente pre-seleccionada (`selected`).
  * Indicación de imagen actual debajo del input file.
  * Botón "Guardar cambios" con estilo consistente.
  * Link de vuelta al listado.
  * Usa partials (head, header, footer).
* **Etiqueta:** `HTML` `EJS` `productos` `admin`

\---

## Navegación

### Tarea 18 — Verificar navegación completa del sitio

* **Descripción:** Verificar que todos los enlaces entre páginas funcionen con las nuevas rutas de Express.
* **Criterios de aceptación:**

  * Logo → `/`
  * Links nav → `/products`
  * Tarjetas de producto → `/products/detail`
  * Botón "Agregar al carrito" → `/products/cart`
  * Ícono usuario → `/users/login`
  * Footer "Iniciar sesión" → `/users/login`
  * Footer "Crear cuenta" → `/users/register`
  * Login "Registrate" → `/users/register`
  * Registro "Iniciar sesión" → `/users/login`
  * Ícono carrito → `/products/cart`
  * Breadcrumb "Inicio" → `/`
  * Botón "Ver catálogo" → `/products`
  * Links en formularios de productos → `/products`
* **Etiqueta:** `navegación` `testing`

\---

## Resumen de tareas por categoría

|Categoría|Tareas|Números|
|-|-|-|
|Organización|2|1, 2|
|Setup Node/Express/EJS|3|3, 4, 5|
|Rutas y Controladores|2|6, 7|
|Migración a EJS|1|8|
|Partials|5|9, 10, 11, 12, 13|
|Organización de carpetas|1|14|
|Formulario creación|2|15, 16|
|Formulario edición|1|17|
|Navegación|1|18|
|**TOTAL**|**18**|—|

\---

## Orden sugerido de ejecución

1. Tarea 1 (Retro) + Tarea 2 (Tablero) — se pueden hacer en paralelo
2. Tarea 3, 4, 5 — setup del proyecto (secuencial: 3 → 4 → 5)
3. Tarea 6, 7 — rutas y controladores (6 → 7)
4. Tarea 8 — renombrar vistas
5. Tarea 9, 10, 11, 12 — crear partials (en paralelo)
6. Tarea 13 — implementar partials en vistas
7. Tarea 14 — organizar en carpetas
8. Tarea 15, 16 — formulario creación
9. Tarea 17 — formulario edición
10. Tarea 18 — testing de navegación completa

