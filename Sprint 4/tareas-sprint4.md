# Tablero de Trabajo — Sprint 4 (Verdia)

## Columnas sugeridas
`Backlog` → `To Do` → `In Progress` → `Code Review` → `Done`

---

## 🔄 Retrospectiva

### Tarea 1 — Retrospectiva Sprint 3
- **Descripción:** Actualizar el archivo retro.md con las conclusiones de la retro del tercer sprint usando la dinámica de estrella de mar.
- **Criterios de aceptación:**
  - Completar los 5 ítems: Comenzar a hacer, Hacer más, Continuar haciendo, Hacer menos, Dejar de hacer.
  - Actualizar `retro.md` con las conclusiones del Sprint 3.
- **Entregable:** `retro.md` actualizado
- **Etiqueta:** `organización`

---

## 📋 Tablero de Trabajo

### Tarea 2 — Reiniciar y actualizar el tablero para Sprint 4
- **Descripción:** Limpiar el tablero del sprint anterior, mover tareas pendientes al backlog, y planificar las nuevas tareas del Sprint 4.
- **Criterios de aceptación:**
  - Tablero actualizado con las tareas de este sprint.
  - Tareas priorizadas y ordenadas según dependencias.
  - Estimar dificultad y tiempos por tarea.
- **Etiqueta:** `organización`

---

## 📦 Datos JSON — Productos

### Tarea 3 — Definir campos de productos
- **Descripción:** Definir los campos necesarios para los productos del sitio: id, name, description, image, category, colors, price, rating, reviews, badge.
- **Criterios de aceptación:**
  - Lista de campos documentada y consensuada.
  - Los campos cubren toda la información que se muestra en las vistas actuales.
- **Etiqueta:** `datos` `planificación`

### Tarea 4 — Generar archivo products.json con Mockaroo
- **Descripción:** Generar datos de prueba para al menos 12 productos usando Mockaroo y guardarlos en `src/data/products.json`.
- **Criterios de aceptación:**
  - Archivo `src/data/products.json` con formato válido.
  - Al menos 12 productos con datos realistas.
  - IDs correlativos, categorías variadas (plantas, macetas, decoración, accesorios).
  - Precios en pesos argentinos.
- **Entregable:** `src/data/products.json`
- **Etiqueta:** `datos` `JSON`

---

## 📦 Datos JSON — Usuarios

### Tarea 5 — Definir campos de usuarios
- **Descripción:** Definir los campos necesarios para los usuarios del sitio: id, firstName, lastName, email, password, category, image.
- **Criterios de aceptación:**
  - Lista de campos documentada.
  - Los campos cubren la información del formulario de registro.
- **Etiqueta:** `datos` `planificación`

### Tarea 6 — Generar archivo users.json con Mockaroo
- **Descripción:** Generar datos de prueba para al menos 10 usuarios usando Mockaroo y guardarlos en `src/data/users.json`.
- **Criterios de aceptación:**
  - Archivo `src/data/users.json` con formato válido.
  - Al menos 10 usuarios con datos realistas.
  - Incluir al menos 2 usuarios con categoría "admin".
  - Contraseñas con formato válido (texto plano para esta etapa).
- **Entregable:** `src/data/users.json`
- **Etiqueta:** `datos` `JSON`

---

## ⚙️ Configuración extra — Multer y method-override

### Tarea 7 — Instalar y configurar method-override
- **Descripción:** Instalar el paquete `method-override` y configurarlo como middleware en `app.js` para poder usar PUT y DELETE desde formularios HTML.
- **Criterios de aceptación:**
  - `method-override` instalado como dependencia.
  - `app.use(methodOverride('_method'))` configurado en `app.js`.
  - Los formularios de edición usan `?_method=PUT`.
  - Los formularios de eliminación usan `?_method=DELETE`.
- **Etiqueta:** `setup` `express`

### Tarea 8 — Instalar y configurar Multer
- **Descripción:** Instalar el paquete `multer` y configurar el storage para subida de imágenes de productos.
- **Criterios de aceptación:**
  - `multer` instalado como dependencia.
  - Storage configurado con `destination` y `filename` personalizados.
  - Las imágenes se guardan en `public/img/products/`.
  - El nombre del archivo incluye timestamp para evitar colisiones.
  - Multer se pasa como middleware en las rutas POST y PUT de productos.
- **Etiqueta:** `setup` `express` `upload`

---

## 🛤️ Rutas CRUD de Productos

### Tarea 9 — Actualizar productRoutes con CRUD completo
- **Descripción:** Modificar `src/routes/productRoutes.js` para incluir las 7 rutas del CRUD.
- **Criterios de aceptación:**
  - `GET /products` → listado
  - `GET /products/create` → formulario creación
  - `GET /products/:id` → detalle
  - `POST /products` → acción creación (con multer)
  - `GET /products/:id/edit` → formulario edición
  - `PUT /products/:id` → acción edición (con multer)
  - `DELETE /products/:id` → acción borrado
- **Depende de:** Tarea 7, Tarea 8
- **Etiqueta:** `express` `rutas`

---

## 🎮 Controladores CRUD

### Tarea 10 — Implementar listado dinámico (GET /products)
- **Descripción:** Modificar `productController.list` para que lea `products.json` y pase los productos a la vista.
- **Criterios de aceptación:**
  - Lee el archivo JSON con `fs.readFileSync`.
  - Pasa el array completo de productos a la vista.
  - Soporta filtrado por categoría vía query string `?cat=plantas`.
  - La vista itera sobre los productos dinámicamente.
- **Depende de:** Tarea 4
- **Etiqueta:** `controladores` `CRUD`

### Tarea 11 — Implementar detalle dinámico (GET /products/:id)
- **Descripción:** Modificar `productController.detail` para que busque un producto por su ID y lo pase a la vista.
- **Criterios de aceptación:**
  - Busca el producto por ID numérica.
  - Si no existe, devuelve error 404.
  - Pasa también los productos relacionados (misma categoría).
  - La vista muestra todos los campos del producto dinámicamente.
  - Los links de editar/eliminar usan el ID del producto.
- **Depende de:** Tarea 4
- **Etiqueta:** `controladores` `CRUD`

### Tarea 12 — Implementar creación de producto (POST /products)
- **Descripción:** Modificar `productController.store` para que cree un nuevo producto y lo guarde en `products.json`.
- **Criterios de aceptación:**
  - Genera un ID incremental.
  - Lee el JSON, agrega el nuevo producto, y escribe el archivo.
  - Si se subió imagen, guarda el filename; si no, usa un emoji como placeholder.
  - Parsea el campo `colors` como array separado por comas.
  - Convierte el precio a número.
  - Redirige al listado después de crear.
- **Depende de:** Tarea 8, Tarea 9
- **Etiqueta:** `controladores` `CRUD`

### Tarea 13 — Implementar edición de producto (PUT /products/:id)
- **Descripción:** Modificar `productController.update` para que actualice un producto existente en `products.json`.
- **Criterios de aceptación:**
  - Busca el producto por ID.
  - Actualiza solo los campos enviados por el formulario.
  - Si se subió una imagen nueva, reemplaza la anterior.
  - Escribe el JSON actualizado.
  - Redirige al detalle del producto después de editar.
- **Depende de:** Tarea 8, Tarea 9
- **Etiqueta:** `controladores` `CRUD`

### Tarea 14 — Implementar borrado de producto (DELETE /products/:id)
- **Descripción:** Modificar `productController.destroy` para que elimine un producto de `products.json`.
- **Criterios de aceptación:**
  - Busca el producto por ID.
  - Lo elimina del array.
  - Escribe el JSON actualizado.
  - Redirige al listado después de borrar.
- **Depende de:** Tarea 9
- **Etiqueta:** `controladores` `CRUD`

---

## 🖼️ Vistas dinámicas

### Tarea 15 — Actualizar productCard.ejs para datos dinámicos
- **Descripción:** Modificar el partial `productCard.ejs` para que acepte un objeto `product` en lugar de variables individuales.
- **Criterios de aceptación:**
  - Recibe un objeto `product` con: id, name, image, colors, rating, reviews, price, badge.
  - El link apunta a `/products/<%= product.id %>`.
  - Usa las funciones helper `formatPrice` y `stars` para formatear precio y rating.
  - Badge opcional: si está vacío no se muestra.
- **Depende de:** Tarea 4
- **Etiqueta:** `EJS` `vistas`

### Tarea 16 — Actualizar home.ejs con datos dinámicos
- **Descripción:** Modificar la vista home para que reciba productos destacados desde el controlador.
- **Criterios de aceptación:**
  - El controlador principal lee `products.json` y pasa los primeros 4 como destacados.
  - La vista itera sobre `featured` usando `productCard.ejs`.
  - Las categorías del home usan links con query string `?cat=`.
- **Depende de:** Tarea 15
- **Etiqueta:** `EJS` `vistas`

### Tarea 17 — Actualizar list.ejs con datos dinámicos
- **Descripción:** Modificar la vista del listado para que itere sobre el array de productos y muestre filtros de categoría.
- **Criterios de aceptación:**
  - Itera sobre `products` dinámicamente.
  - Muestra filtros de categoría con clase `.active` en el seleccionado.
  - Incluye botón "Crear producto" que lleva a `/products/create`.
  - Muestra empty state si no hay productos en la categoría.
- **Depende de:** Tarea 15
- **Etiqueta:** `EJS` `vistas`

### Tarea 18 — Actualizar detail.ejs con datos dinámicos
- **Descripción:** Modificar la vista de detalle para que muestre los datos del producto recibido y botones de editar/eliminar.
- **Criterios de aceptación:**
  - Muestra nombre, descripción, precio, variantes dinámicamente.
  - Botón "Editar" lleva a `/products/:id/edit`.
  - Botón "Eliminar" envía formulario DELETE con confirmación.
  - Muestra guía de cuidado solo si category === 'plantas'.
  - Productos relacionados iterados con productCard.ejs.
- **Depende de:** Tarea 15
- **Etiqueta:** `EJS` `vistas`

### Tarea 19 — Actualizar create.ejs y edit.ejs con formularios funcionales
- **Descripción:** Asegurar que los formularios de creación y edición funcionen con los endpoints correctos.
- **Criterios de aceptación:**
  - Formulario de creación: `action="/products" method="POST" enctype="multipart/form-data"`.
  - Formulario de edición: `action="/products/<%= product.id %>?_method=PUT" method="POST" enctype="multipart/form-data"`.
  - Edit tiene campos con `value` precargados y `selected` en el select.
  - Ambos incluyen campo file para imagen.
  - Ambos redirigen correctamente después de enviar.
- **Depende de:** Tarea 9
- **Etiqueta:** `EJS` `vistas` `formularios`

### Tarea 20 — Actualizar cart.ejs con datos dinámicos
- **Descripción:** Modificar la vista del carrito para que reciba items con cantidades y calcule totales.
- **Criterios de aceptación:**
  - Recibe `cartItems` con propiedad `qty`.
  - Calcula precio por item (price × qty).
  - Muestra subtotal, envío y total dinámicamente.
- **Etiqueta:** `EJS` `vistas`

---

## 🎨 Estilos CSS adicionales

### Tarea 21 — Agregar estilos para nuevos elementos del Sprint 4
- **Descripción:** Agregar CSS para filtros de categoría, botones de acción (editar/eliminar), empty state, variantes de producto y hints de campo.
- **Criterios de aceptación:**
  - Filtros de categoría con estilo pill y estado active.
  - Botón de eliminar con color rojo distintivo.
  - Variantes mostradas como pills/badges.
  - Empty state centrado y prolijo.
  - Field hints con tipografía pequeña y color gris.
- **Etiqueta:** `CSS`

---

## 🔗 Navegación y testing

### Tarea 22 — Verificar navegación completa del sitio con CRUD
- **Descripción:** Verificar que todos los enlaces y acciones del CRUD funcionen correctamente.
- **Criterios de aceptación:**
  - Home → listado (con filtros por categoría)
  - Listado → detalle de cada producto
  - Detalle → editar y eliminar (con confirmación)
  - Listado → crear producto
  - Crear producto → redirige al listado con producto nuevo
  - Editar producto → redirige al detalle actualizado
  - Eliminar producto → redirige al listado sin el producto
  - Navegación entre páginas funciona con IDs dinámicos
- **Etiqueta:** `navegación` `testing`

---

## 📊 Resumen de tareas por categoría

| Categoría | Tareas | Números |
|-----------|--------|--------|
| Organización | 2 | 1, 2 |
| Datos JSON | 4 | 3, 4, 5, 6 |
| Configuración extra | 2 | 7, 8 |
| Rutas CRUD | 1 | 9 |
| Controladores CRUD | 5 | 10, 11, 12, 13, 14 |
| Vistas dinámicas | 6 | 15, 16, 17, 18, 19, 20 |
| Estilos CSS | 1 | 21 |
| Navegación y testing | 1 | 22 |
| **TOTAL** | **22** | — |

---

## 📌 Orden sugerido de ejecución

1. **Tarea 1 (Retro)** + **Tarea 2 (Tablero)** — se pueden hacer en paralelo
2. **Tarea 3, 4** — definir y generar datos de productos
3. **Tarea 5, 6** — definir y generar datos de usuarios
4. **Tarea 7, 8** — instalar method-override y multer
5. **Tarea 9** — actualizar rutas del CRUD
6. **Tarea 10, 11** — listado y detalle dinámicos
7. **Tarea 12, 13, 14** — creación, edición y borrado
8. **Tarea 15** — actualizar productCard.ejs
9. **Tarea 16, 17, 18, 19, 20** — actualizar todas las vistas
10. **Tarea 21** — estilos CSS adicionales
11. **Tarea 22** — testing completo del CRUD