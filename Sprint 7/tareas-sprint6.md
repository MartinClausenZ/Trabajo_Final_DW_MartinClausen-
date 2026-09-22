# Tablero de Trabajo — Sprint 6 (Verdia)

## Columnas sugeridas
`Backlog` → `To Do` → `In Progress` → `Code Review` → `Done`

---

## 🔄 Retrospectiva

### Tarea 1 — Retrospectiva Sprint 5
- **Descripción:** Actualizar retro.md con las conclusiones del Sprint 5 usando la dinámica de estrella de mar.
- **Criterios de aceptación:** Completar los 5 ítems. Actualizar retro.md.
- **Entregable:** retro.md actualizado
- **Etiqueta:** `organización`

---

## 📋 Tablero de Trabajo

### Tarea 2 — Reiniciar y actualizar tablero para Sprint 6
- **Descripción:** Limpiar tablero del sprint anterior, mover pendientes al backlog, planificar tareas nuevas.
- **Etiqueta:** `organización`

---

## 📦 Dependencias y configuración

### Tarea 3 — Instalar Sequelize, Sequelize-CLI y MySQL2
- **Descripción:** Instalar los paquetes ORM y driver de MySQL.
- **Criterios de aceptación:** sequelize, sequelize-cli, mysql2 en package.json.
- **Etiqueta:** `setup` `base-de-datos`

### Tarea 4 — Crear carpeta database/ con config, models, migrations, seeders
- **Descripción:** Organizar la estructura de Sequelize dentro de src/database/.
- **Criterios de aceptación:** config/config.js, models/index.js, migrations/, seeders/.
- **Etiqueta:** `estructura`

### Tarea 5 — Configurar config.js con conexión MySQL
- **Descripción:** Definir development, test y production con credenciales MySQL.
- **Etiqueta:** `configuración`

---

## 🗃️ Modelos Sequelize

### Tarea 6 — Crear modelo Category
- **Descripción:** Tabla categories: id, name. Relación 1:N con Product.
- **Etiqueta:** `modelo` `categorías`

### Tarea 7 — Crear modelo User
- **Descripción:** Tabla users: id, first_name, last_name, email, password, category, image.
- **Etiqueta:** `modelo` `usuarios`

### Tarea 8 — Crear modelo Product
- **Descripción:** Tabla products: id, name, description, image, price, rating, reviews, badge, category_id (FK). Relación N:1 con Category, 1:N con ProductColor.
- **Etiqueta:** `modelo` `productos`

### Tarea 9 — Crear modelo ProductColor
- **Descripción:** Tabla product_colors: id, color, product_id (FK). Relación N:1 con Product.
- **Etiqueta:** `modelo` `variantes`

### Tarea 10 — Crear modelos Cart y CartItem (opcional)
- **Descripción:** Tabla carts (id, user_id, total, status) y cart_items (id, cart_id, product_id, quantity, price).
- **Etiqueta:** `modelo` `carrito` `opcional`

### Tarea 11 — Definir asociaciones en cada modelo
- **Descripción:** belongsTo, hasMany en associate() de cada modelo.
- **Etiqueta:** `relaciones`

---

## 📝 Scripts SQL

### Tarea 12 — Crear structure.sql
- **Descripción:** Script SQL completo con CREATE DATABASE, CREATE TABLEs, PKs, FKs, constraints.
- **Criterios de aceptación:** Todas las tablas con tipos correctos, FK con ON DELETE/UPDATE.
- **Etiqueta:** `SQL` `estructura`

### Tarea 13 — Crear data.sql (opcional)
- **Descripción:** INSERT statements para poblar tablas desde datos existentes en JSON.
- **Etiqueta:** `SQL` `datos` `opcional`

---

## 📊 DER (Diagrama de Entidad-Relación)

### Tarea 14 — Crear diagrama DER en PDF
- **Descripción:** Diagrama visual que muestre todas las tablas, campos, tipos, PKs, FKs y relaciones.
- **Etiqueta:** `documentación` `DER`

---

## 🔧 Migración de controladores a Sequelize

### Tarea 15 — Reescribir productController con Sequelize
- **Descripción:** Reemplazar readProducts/writeProducts por db.Product.findAll, findByPk, create, update, destroy.
- **Criterios de aceptación:** CRUD completo funcional con Sequelize.
- **Etiqueta:** `controladores` `productos` `Sequelize`

### Tarea 16 — Reescribir userController con Sequelize
- **Descripción:** Reemplazar readUsers/writeUsers por db.User.findOne, create, findByPk, update, destroy.
- **Criterios de aceptación:** Login, registro, perfil, edición y logout con Sequelize.
- **Etiqueta:** `controladores` `usuarios` `Sequelize`

### Tarea 17 — Actualizar mainController con Sequelize
- **Descripción:** Reemplazar readProducts por db.Product.findAll para la home.
- **Etiqueta:** `controladores` `home` `Sequelize`

### Tarea 18 — Actualizar authMiddleware con Sequelize
- **Descripción:** Reemplazar readUsers por db.User.findOne en cookieAuth.
- **Etiqueta:** `middleware` `autenticación` `Sequelize`

---

## 🔗 App.js y startup

### Tarea 19 — Conectar Sequelize en app.js
- **Descripción:** Importar db, usar db.sequelize.sync() antes de app.listen.
- **Etiqueta:** `configuración` `startup`

---

## 🖼️ Vistas actualizadas

### Tarea 20 — Actualizar create.ejs con categorías dinámicas
- **Descripción:** Reemplazar options hardcodeados por categories de la DB (category_id).
- **Etiqueta:** `EJS` `vistas` `productos`

### Tarea 21 — Actualizar edit.ejs con categorías dinámicas
- **Descripción:** Reemplazar options hardcodeados por categories de la DB (category_id).
- **Etiqueta:** `EJS` `vistas` `productos`

### Tarea 22 — Agregar buscador en list.ejs
- **Descripción:** Input de búsqueda con GET /products?search=xxx.
- **Etiqueta:** `EJS` `vistas` `búsqueda`

---

## ✅ Testing y entrega

### Tarea 23 — Verificar que el servidor arranca y las rutas funcionan
- **Descripción:** Testear CRUD de productos y flujo de usuarios.
- **Etiqueta:** `testing`

### Tarea 24 — Empaquetar proyecto como verdia-sprint6.zip
- **Descripción:** Comprimir todo el proyecto para entrega.
- **Etiqueta:** `entrega`

---

## 📊 Resumen de tareas

| Categoría | Cantidad |
|-----------|----------|
| Organización | 2 |
| Setup/Config | 3 |
| Modelos | 6 |
| Scripts SQL | 2 |
| DER | 1 |
| Controladores | 4 |
| App.js | 1 |
| Vistas | 3 |
| Testing/Entrega | 2 |
| **TOTAL** | **24** |
