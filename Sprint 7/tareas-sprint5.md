# Tablero de Trabajo — Sprint 5 (Verdia)

## Columnas sugeridas
`Backlog` → `To Do` → `In Progress` → `Code Review` → `Done`

---

## 🔄 Retrospectiva

### Tarea 1 — Retrospectiva Sprint 4
- **Descripción:** Actualizar retro.md con las conclusiones del Sprint 4 usando la dinámica de estrella de mar.
- **Criterios de aceptación:**
  - Completar los 5 ítems: Comenzar a hacer, Hacer más, Continuar haciendo, Hacer menos, Dejar de hacer.
  - Actualizar retro.md.
- **Entregable:** retro.md actualizado
- **Etiqueta:** `organización`

---

## 📋 Tablero de Trabajo

### Tarea 2 — Reiniciar y actualizar tablero para Sprint 5
- **Descripción:** Limpiar tablero del sprint anterior, mover pendientes al backlog, planificar tareas nuevas.
- **Criterios de aceptación:**
  - Tablero actualizado con las tareas de este sprint.
  - Tareas priorizadas y ordenadas según dependencias.
- **Etiqueta:** `organización`

---

## 📦 Dependencias

### Tarea 3 — Instalar bcryptjs
- **Descripción:** Instalar bcryptjs para encriptar contraseñas.
- **Criterios de aceptación:**
  - bcryptjs en package.json como dependencia.
  - Contraseñas del JSON hasheadas con bcrypt.hashSync.
- **Etiqueta:** `setup` `seguridad`

### Tarea 4 — Instalar express-session y cookie-parser
- **Descripción:** Instalar los paquetes para manejo de sesiones y cookies.
- **Criterios de aceptación:**
  - express-session y cookie-parser en package.json.
  - Sesión configurada en app.js con secret y cookie maxAge.
  - cookieParser() como middleware.
- **Etiqueta:** `setup` `sesión`

---

## 🔐 Middlewares de autenticación

### Tarea 5 — Crear authMiddleware.js
- **Descripción:** Implementar tres middlewares: cookieAuth (app), guestOnly (ruta), authOnly (ruta).
- **Criterios de aceptación:**
  - cookieAuth: busca cookie rememberUser y loguea en sesión si es válida.
  - cookieAuth: pasa datos del usuario a res.locals.user para todas las vistas.
  - guestOnly: redirige a /users/profile si hay sesión.
  - authOnly: redirige a /users/login si no hay sesión.
- **Depende de:** Tarea 4
- **Etiqueta:** `middleware` `autenticación`

---

## 🎮 Controlador de usuarios

### Tarea 6 — Implementar userController con CRUD
- **Descripción:** Crear el controlador completo con login, registro, perfil, edición y logout.
- **Criterios de aceptación:**
  - readUsers / writeUsers / nextUserId — helpers de JSON.
  - loginForm / login — formulario y procesamiento con verificación bcrypt.
  - registerForm / store — formulario y creación con bcrypt y multer.
  - profile — mostrar datos del usuario en sesión.
  - editForm / update — editar perfil con imagen opcional.
  - logout — destruir sesión y limpiar cookie.
  - Auto-login después del registro.
- **Depende de:** Tarea 3, Tarea 5
- **Etiqueta:** `controladores` `CRUD` `usuarios`

---

## 🛤️ Rutas de usuarios

### Tarea 7 — Actualizar userRoutes con middlewares
- **Descripción:** Refactorizar rutas como factory function con multer y middlewares guest/auth.
- **Criterios de aceptación:**
  - Factory function recibe upload (multer) como parámetro.
  - Rutas de huéspedes: GET/POST login, GET/POST register → guestOnly.
  - Rutas de usuarios: GET profile, GET/PUT edit, POST logout → authOnly.
  - POST register y PUT edit usan upload.single('image').
- **Depende de:** Tarea 5, Tarea 6
- **Etiqueta:** `express` `rutas` `usuarios`

---

## 🖼️ Vistas de usuarios

### Tarea 8 — Actualizar login.ejs funcional
- **Descripción:** Formulario funcional con POST /users/login, errores dinámicos, checkbox remember.
- **Criterios de aceptación:**
  - action="/users/login" method="POST".
  - Campo email y password con required.
  - Checkbox name="remember" para "Recordarme".
  - Errores condicionales: errors.email, errors.password.
  - Valor old persistido en campos.
- **Depende de:** Tarea 7
- **Etiqueta:** `EJS` `vistas` `login`

### Tarea 9 — Actualizar register.ejs funcional
- **Descripción:** Formulario funcional con POST /users/register, enctype multipart, campo imagen.
- **Criterios de aceptación:**
  - action="/users/register" method="POST" enctype="multipart/form-data".
  - Campos: firstName, lastName, email, password, confirmPassword, image.
  - Campo file con accept="image/*".
  - Checkbox de términos con required.
  - Errores condicionales y old persistido.
- **Depende de:** Tarea 7
- **Etiqueta:** `EJS` `vistas` `registro`

### Tarea 10 — Crear profile.ejs
- **Descripción:** Página de perfil que muestra datos del usuario logueado.
- **Criterios de aceptación:**
  - Muestra avatar (imagen o emoji), nombre, email, categoría.
  - Badge visual para admin vs user.
  - Botón "Editar perfil" que lleva a /users/profile/edit.
  - Botón "Cerrar sesión".
- **Etiqueta:** `EJS` `vistas` `perfil`

### Tarea 11 — Crear edit.ejs de perfil
- **Descripción:** Formulario para editar datos del usuario logueado.
- **Criterios de aceptación:**
  - PUT vía _method=PUT.
  - enctype="multipart/form-data" para imagen.
  - Campos pre-llenados con datos actuales.
  - Contraseña opcional (solo si quiere cambiarla).
  - Imagen actual indicada como hint.
- **Etiqueta:** `EJS` `vistas` `edición`

---

## 🔗 Header y Footer con sesión

### Tarea 12 — Actualizar header.ejs con estado de sesión
- **Descripción:** Mostrar avatar/nombre si el usuario está logueado, botón de login si no.
- **Criterios de aceptación:**
  - Si user existe: muestra avatar, saludo "Hola, Nombre" y botón logout.
  - Si user no existe: muestra ícono genérico 👤 que lleva a /users/login.
  - Avatar img si la imagen es archivo, emoji si es placeholder.
- **Etiqueta:** `EJS` `parciales` `sesión`

### Tarea 13 — Actualizar footer.ejs con estado de sesión
- **Descripción:** Links de "Mi cuenta" cambian según estado de sesión.
- **Criterios de aceptación:**
  - Si logueado: "Mi perfil" y "Cerrar sesión".
  - Si no logueado: "Iniciar sesión" y "Crear cuenta".
- **Etiqueta:** `EJS` `parciales` `sesión`

---

## 🎨 Estilos CSS

### Tarea 14 — Agregar estilos de perfil y sesión
- **Descripción:** CSS para profile-card, avatares, badges, user-menu, logout-form.
- **Criterios de aceptación:**
  - Avatar chico (.avatar-sm) en header.
  - Profile card centrada con avatar grande.
  - Badges de admin/user con colores de la paleta.
  - Botón logout inline en header y footer.
  - Responsive para perfil en mobile.
- **Etiqueta:** `CSS`

---

## 🔑 Encriptación de contraseñas

### Tarea 15 — Hashear contraseñas del JSON existente
- **Descripción:** Re-hashear todas las contraseñas del users.json con bcrypt.
- **Criterios de aceptación:**
  - Todas las contraseñas en users.json están hasheadas con bcryptjs.
  - bcrypt.compareSync funciona correctamente para verificación.
- **Depende de:** Tarea 3
- **Etiqueta:** `seguridad` `datos`

---

## 🔗 Navegación y testing

### Tarea 16 — Verificar flujo completo de autenticación
- **Descripción:** Testear registro → login → perfil → edición → logout.
- **Criterios de aceptación:**
  - Registro: crea usuario, hashea pass, redirige a perfil.
  - Login exitoso: redirige a perfil, datos en header.
  - Login fallido: errores visibles, no redirige.
  - Remember: cookie persiste sesión.
  - Rutas guest: login/register redirigen a perfil si hay sesión.
  - Rutas auth: perfil/edit redirigen a login si no hay sesión.
  - Logout: destruye sesión y cookie, redirige a home.
- **Etiqueta:** `navegación` `testing`

---

## 📊 Resumen de tareas por categoría

| Categoría | Tareas | Números |
|-----------|--------|--------|
| Organización | 2 | 1, 2 |
| Dependencias | 2 | 3, 4 |
| Middlewares | 1 | 5 |
| Controladores | 1 | 6 |
| Rutas | 1 | 7 |
| Vistas | 4 | 8, 9, 10, 11 |
| Header/Footer | 2 | 12, 13 |
| CSS | 1 | 14 |
| Seguridad | 1 | 15 |
| Navegación | 1 | 16 |
| **TOTAL** | **16** | — |

---

## 📌 Orden sugerido de ejecución

1. **Tarea 1 (Retro)** + **Tarea 2 (Tablero)**
2. **Tarea 3, 4** — instalar bcryptjs, express-session, cookie-parser
3. **Tarea 15** — hashear contraseñas del JSON
4. **Tarea 5** — crear authMiddleware
5. **Tarea 6** — implementar userController
6. **Tarea 7** — actualizar userRoutes
7. **Tarea 8, 9** — actualizar login.ejs y register.ejs
8. **Tarea 10, 11** — crear profile.ejs y edit.ejs
9. **Tarea 12, 13** — actualizar header y footer
10. **Tarea 14** — estilos CSS
11. **Tarea 16** — testing completo