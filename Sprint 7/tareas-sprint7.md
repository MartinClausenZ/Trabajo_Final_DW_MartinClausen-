# Tablero de Trabajo — Sprint 7: Validaciones

## 🔴 Pendiente

_(Tareas que no se pudieron completar en este sprint)_

- Testear todas las validaciones con MySQL real (no disponible en sandbox)
- Validación async de email duplicado en front-end register (requiere endpoint API)
- Validación async de existencia de email en front-end login (requiere endpoint API)

## 🟡 En Progreso

_(Nada pendiente)_

## 🟢 Completado

### Planificación
1. ✅ Leer consignas del Sprint 7 y determinar tareas
2. ✅ Actualizar tablero de trabajo (tareas-sprint7.md)
3. ✅ Redactar retrospectiva Sprint 6 (retro.md)

### Validaciones Back-end (Express Validator)
4. ✅ Instalar express-validator como dependencia
5. ✅ Crear middleware validateRegister.js (nombre, apellido, email único, contraseña 8+ chars con mayús/minús/número/especial, confirmar contraseña, imagen válida)
6. ✅ Crear middleware validateLogin.js (email válido y existente, contraseña obligatoria y correcta)
7. ✅ Crear middleware validateProduct.js (nombre 5+ chars, descripción 20+ chars, imagen válida, categoría existe en DB, precio positivo)
8. ✅ Crear middleware validateProfile.js (nombre 2+ chars, apellido 2+ chars, email válido y único excluyendo propio usuario, contraseña opcional con mismas reglas, imagen válida)
9. ✅ Integrar middlewares en userRoutes.js (register, login, profile PUT)
10. ✅ Integrar middlewares en productRoutes.js (store, update)
11. ✅ Actualizar userController.js — usar validationResult, mapear errores a objeto, re-renderizar con errors + old
12. ✅ Actualizar productController.js — usar validationResult en store y update, re-renderizar con errors + old
13. ✅ Proteger rutas de creación/edición/borrado de productos con authOnly

### Validaciones Front-end (JavaScript)
14. ✅ Crear /public/js/validations-register.js — validaciones custom en input/blur y submit para registro
15. ✅ Crear /public/js/validations-login.js — validaciones custom en input/blur y submit para login
16. ✅ Crear /public/js/validations-product.js — validaciones custom para crear/editar productos
17. ✅ Crear /public/js/validations-profile.js — validaciones custom para editar perfil
18. ✅ Agregar scripts de validación en las vistas EJS (register, login, create, edit, profile/edit)
19. ✅ Agregar novalidate a todos los formularios para manejar validación via JS

### Vistas y CSS
20. ✅ Actualizar register.ejs — mostrar errores express-validator por campo, mantener old data
21. ✅ Actualizar login.ejs — mostrar errores express-validator por campo, mantener old data
22. ✅ Actualizar create.ejs — mostrar errores express-validator, mantener old data en todos los campos
23. ✅ Actualizar edit.ejs — mostrar errores express-validator, mantener old data
24. ✅ Actualizar profile/edit.ejs — mostrar errores express-validator, mantener datos
25. ✅ Agregar estilos CSS para .valid, .error en inputs, textareas y selects
26. ✅ Agregar estilos para feedback visual inmediato (bordes verdes/rojos, mensajes)

### Validaciones en Modelo Sequelize (DB)
27. ✅ Agregar validaciones al modelo User.js (notNull, notEmpty, len, isEmail, unique msg)
28. ✅ Agregar validaciones al modelo Product.js (notNull, notEmpty, len, isDecimal, min, isInt)
29. ✅ Verificar que structure.sql tiene NOT NULL, UNIQUE, FKs y constraints correctas

---

**Total de tareas:** 29
**Completadas:** 26
**Pendientes (por limitación de sandbox):** 3