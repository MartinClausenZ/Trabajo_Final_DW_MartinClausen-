# Retrospectivas — Verdia

---

## Sprint 1 — Dinámica de Estrella de Mar

### 1. Comenzar a hacer
- Definir hitos intermedios dentro de cada sprint para no acumular trabajo al final.
- Documentar las decisiones de diseño en el README a medida que se toman, no después.
- Crear los wireframes con más detalle (incluir textos reales y no solo placeholders) para evitar dudas durante la maquetación.

### 2. Hacer más
- Investigar referentes de mercado con mayor profundidad para enriquecer la propuesta de valor.
- Revisar la coherencia visual entre los distintos wireframes para asegurar consistencia.
- Iterar los bocetos: hacer una primera versión rápida y luego pulirla.

### 3. Continuar haciendo
- Mantener la claridad en la definición del público objetivo como guía para todas las decisiones.
- Seguir usando los tres pilares (curaduría, guía de cuidado, experiencia de unboxing) como criterio para priorizar funcionalidades.
- Documentar todo en el repositorio de forma ordenada.

### 4. Hacer menos
- Dedicar menos tiempo a buscar referentes adicionales cuando ya se tienen suficientes para decidir.
- Reducir la cantidad de iteraciones de baja fidelidad: pasar más rápido a bocetos de media/alta fidelidad.

### 5. Dejar de hacer
- Posponer la definición de la paleta de colores y tipografías — debería resolverse en la etapa de wireframes para evitar retrabajo en CSS.
- Trabajar sin un tablero de seguimiento: la falta de visibilidad sobre el progreso genera incertidumbre.

---

## Sprint 2 — Dinámica de Estrella de Mar

### 1. Comenzar a hacer
- Usar el tablero de trabajo desde el primer día del sprint para organizar las tareas antes de empezar a codear.
- Testear el sitio en mobile desde las primeras etapas, no solo al final.
- Revisar los wireframes antes de cada vista para asegurarme de que la maqueta respeta el diseño original.

### 2. Hacer más
- Reutilizar bloques de CSS entre componentes para reducir duplicación (ej: las tarjetas de producto aparecen en varias páginas).
- Verificar la navegación entre páginas de forma continua mientras avanzo, no solo al final.
- Prestar atención a los detalles de UX: estados hover, transiciones, feedback visual.

### 3. Continuar haciendo
- Mantener la coherencia con la guía de estilos (colores, tipografías, espaciados) en todas las vistas.
- Documentar el progreso en el repositorio de forma ordenada.
- Usar los wireframes como referencia fiel para la maquetación.

### 4. Hacer menos
- Dejar tareas de responsive para el final — integrar el diseño responsive desde el inicio de cada vista.
- Repetir código HTML entre páginas sin pensar en cómo se podría reutilizar más adelante.

### 5. Dejar de hacer
- Maquetar sin haber organizado antes las tareas en el tablero — el trabajo sin planificación genera desorden y retrabajo.
- Copiar y pegar bloques enteros de HTML entre páginas sin pensar en la estructura futura del proyecto.

---

## Sprint 3 — Dinámica de Estrella de Mar

### 1. Comenzar a hacer
- Testear cada vista EJS en el navegador inmediatamente después de migrarla, no acumlar varias sin verificar.
- Usar console.log en los controladores para confirmar que los datos llegan bien a las vistas.
- Revisar las rutas con Postman o el navegador antes de conectarlas con las vistas.

### 2. Hacer más
- Aprovechar los partials para reducir código repetido lo antes posible.
- Verificar que los includes usan paths relativos correctos desde cada carpeta de vista.
- Prestar atención a los detalles de dinamismo: títulos dinámicos, links con IDs, formularios con action correctos.

### 3. Continuar haciendo
- Mantener la coherencia visual entre el Sprint 2 y el Sprint 3 — el sitio debe verse igual pero ahora renderizado con EJS.
- Documentar el progreso en el repositorio de forma ordenada.
- Usar el tablero de trabajo para organizar las tareas.

### 4. Hacer menos
- Dejar la verificación de rutas para el final — testear cada ruta apenas se crea.
- Repetir código en los controladores cuando se puede reutilizar helpers.

### 5. Dejar de hacer
- Migrar vistas sin antes haber creado y verificado las rutas y controladores correspondientes.
- Duplicar lógica entre controladores que podría estar en un helper o middleware compartido.

---

## Sprint 4 — Dinámica de Estrella de Mar

### 1. Comenzar a hacer
- Usar app.locals para helpers globales (formatPrice, stars) en vez de pasarlos manualmente en cada res.render.
- Verificar la integridad del CSS después de insertar bloques con sed u otras herramientas.
- Testear las 7 rutas CRUD de forma sistemática antes de cerrar el sprint.

### 2. Hacer más
- Reutilizar la misma estructura de archivos (rutas → controlador → vistas) para nuevas entidades (usuarios).
- Aprovechar el patrón factory function para rutas que necesitan middlewares externos (multer).
- Documentar las decisiones de arquitectura en el README a medida que se toman.

### 3. Continuar haciendo
- Mantener la coherencia visual entre sprints — el sitio se ve igual pero ahora es dinámico.
- Documentar el progreso en el repositorio de forma ordenada.
- Usar el tablero de trabajo para organizar las tareas y dependencias.

### 4. Hacer menos
- Dejar la verificación de CSS para el final — revisar estilos nuevos apenas se agregan.
- Repetir lógica de helpers en múltiples controladores.

### 5. Dejar de hacer
- Pasar helpers manualmente en cada res.render cuando ya existen como locals globales.
- Asumir que los inserts por sed dejaron el CSS bien formado sin verificar.