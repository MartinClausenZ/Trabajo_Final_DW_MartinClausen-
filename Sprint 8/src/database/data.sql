-- ============================================
-- Verdia - Datos Iniciales de Base de Datos
-- Sprint 6 - Sequelize ORM Migration
-- ============================================

USE verdia_development;

-- ============================================
-- Categorías de productos
-- ============================================
INSERT INTO categories (id, name, created_at, updated_at) VALUES
(1, 'plantas',    NOW(), NOW()),
(2, 'macetas',    NOW(), NOW()),
(3, 'decoracion', NOW(), NOW()),
(4, 'accesorios', NOW(), NOW());

-- ============================================
-- Usuarios
-- Contraseñas hasheadas con bcrypt (10 rounds)
-- Passwords de prueba: todas "123456"
-- ============================================
INSERT INTO users (id, first_name, last_name, email, password, category, image, created_at, updated_at) VALUES
(1,  'Valentina', 'González',  'valentina@verdia.com',  '$2b$10$NLT/LarbVHYl4/Eo5bXz3.8yWvL84koj6UZXia056FOB82M82yGj.', 'admin', '👤', NOW(), NOW()),
(2,  'Mateo',     'Rodríguez', 'mateo@gmail.com',       '$2b$10$VibEXA6ptpZLzCql16kfMu1cbSZyEAPsUDrrKosjmwh.DhOetQztq', 'user',  '👤', NOW(), NOW()),
(3,  'Sofía',     'López',     'sofia@outlook.com',     '$2b$10$llTqVLg1TNNz.aTKV.m5muPNSkWxhC9ECQYXyzLTz3NTjttoaoNIi', 'user',  '👤', NOW(), NOW()),
(4,  'Thiago',    'Martínez',  'thiago@yahoo.com',      '$2b$10$IhccIIRZX3PICBHV5VHQAuldKrE0B6U7HIHO1nfr1Ke1oFM03VZc.', 'user',  '👤', NOW(), NOW()),
(5,  'Luna',      'García',    'luna@gmail.com',        '$2b$10$g2nZfJ9VdlNAs67L2AKLhOpH1s5LIfETWJC/mOeu.cz3H7ec5qGg.', 'user',  '👤', NOW(), NOW()),
(6,  'Benjamín',  'Fernández', 'benja@verdia.com',      '$2b$10$2dqEBgSj3U.iP0IEoOjoceUgsOurX6goA/JxnpcQvRM7acyCktmUC', 'admin', '👤', NOW(), NOW()),
(7,  'Catalina',  'Torres',    'catalina@hotmail.com',   '$2b$10$p4rBD1JNIsLS0yk.cFRFsuurJKRA1wot0zWQdiU9xXBd/zHIm8rP2', 'user',  '👤', NOW(), NOW()),
(8,  'Santino',   'Díaz',      'santino@gmail.com',     '$2b$10$9qoCnw/MVzar6gYPlSCNeu952Hg3cNy.lDcXkJ.0WJovqzhWy6gaq', 'user',  '👤', NOW(), NOW()),
(9,  'Mía',       'Sánchez',   'mia@outlook.com',       '$2b$10$g5.qs5APyl9A1zvz0LoqZeWQVQfYZ1figInxAOhrFQBP2iJ.rR2uO', 'user',  '👤', NOW(), NOW()),
(10, 'Joaquín',   'Romero',    'joaquin@yahoo.com',     '$2b$10$DyTCyYkz9nT4pCbw8CDhbuVS6rTfMXsoIg1x.gZs27ac2H9WiZbu2', 'user',  '👤', NOW(), NOW());

-- ============================================
-- Productos
-- ============================================
INSERT INTO products (id, name, description, image, price, rating, reviews, badge, category_id, created_at, updated_at) VALUES
(1,  'Monstera Deliciosa',     'La Monstera Deliciosa, también conocida como costilla de Adán, es una de las plantas de interior más icónicas y deseadas. Sus hojas grandes y fenestradas aportan un toque tropical y elegante a cualquier espacio. Ideal para espacios con luz indirecta y riego moderado.',                            '🪴', 8990.00,  5.0, 24, 'Nuevo',    1, NOW(), NOW()),
(2,  'Pothus Dorado',          'El Pothus Dorado es la planta perfecta para quienes recién empiezan. Resistente, de crecimiento rápido y muy versátil: se puede colgar o dejar trepar. Tolera condiciones de luz baja y necesita riego esporádico.',                                                                  '🌱', 4590.00,  4.0, 18, '',         1, NOW(), NOW()),
(3,  'Cactus San Pedro',       'El Cactus San Pedro es una pieza escultórica natural. De crecimiento columnar y aspecto imponente, necesita muy poco riego y mucha luz. Perfecto para ambientes minimalistas y soleados.',                                                                                                    '🌵', 3290.00,  5.0, 31, '',         1, NOW(), NOW()),
(4,  'Vela Aromática Bosque',  'Vela artesanal de cera de soja con aroma a bosque húmedo y eucalipto. Duración de approximately 40 horas. El frasco de vidrio reciclado es reutilizable como maceta pequeña una vez consumida la vela.',                                                                                     '🕯️', 5990.00,  4.0, 12, '-20%',    3, NOW(), NOW()),
(5,  'Helecho Boston',         'El Helecho Boston es un clásico de las plantas de interior. Sus frondas arqueadas y abundantes crean un efecto cascada ideal para macetas colgantes. Le gusta la humedad ambiente y la luz indirecta.',                                                                                         '🌿', 6790.00,  4.0, 15, '',         1, NOW(), NOW()),
(6,  'Calathea Orbifolia',     'La Calathea Orbifolia deslumbra con sus hojas redondeadas de rayas plateadas. Es una planta que mueve sus hojas siguiendo la luz del día. Requiere humedad alta y riego con agua sin cloro.',                                                                                                  '🍃', 7490.00,  5.0, 22, '',         1, NOW(), NOW()),
(7,  'Maceta Cerámica Nórdica','Maceta de cerámica con acabado mate y diseño nórdico minimalista. Incluye plato porta-maceta integrado. Disponible en blanco y gris claro. Ideal para plantas medianas y grandes.',                                                                                               '🏺', 5990.00,  4.0, 9,  '',         2, NOW(), NOW()),
(8,  'Ficus Lyrata',           'El Ficus Lyrata, o ficus lira, es la planta de interior más deseada por diseñadores y amantes del estilo. Sus hojas grandes en forma de violín le dan un aire sofisticado y dramático.',                                                                                                      '🪴', 12990.00, 5.0, 37, 'Popular',  1, NOW(), NOW()),
(9,  'Maceta de Barro Artesanal','Maceta de barro cocido hecha a mano por artesanos locales. Su porosidad natural permite una mejor respiración de las raíces. Cada pieza es única y puede variar ligeramente en tono y forma.',                                                                                             '🫙', 4790.00,  4.0, 14, '',         2, NOW(), NOW()),
(10, 'Humidificador Mini',     'Humidificador ultrasónico de escritorio, ideal para mantener la humedad que necesitan tus plantas tropicales. Depósito de 300ml, modo continuo e intermitente. Silencioso y con luz LED suave.',                                                                                              '💨', 15990.00, 5.0, 28, '',         4, NOW(), NOW()),
(11, 'Kit de Repotting',       'Kit completo para trasplantar tus plantas: incluye sustrato orgánico premium (2kg), perlita, gravilla decorativa y una pequeña paleta de madera. Todo lo que necesitás en una caja.',                                                                                                         '🧪', 8490.00,  4.0, 11, '',         4, NOW(), NOW()),
(12, 'Spray Antiplagas Natural','Spray orgánico a base de aceite de neem y jabón potásico. Protege tus plantas de pulgones, cochinillas y ácaros sin químicos agresivos. Botella de 500ml con pulverizador ajustable.',                                                                                                   '🛡️', 3990.00,  4.0, 19, '',         4, NOW(), NOW());

-- ============================================
-- Colores / Variantes de productos
-- ============================================
INSERT INTO product_colors (color, product_id, created_at, updated_at) VALUES
-- Producto 1: Monstera Deliciosa
('Verde',         1, NOW(), NOW()),
('Maceta 20cm',    1, NOW(), NOW()),
-- Producto 2: Pothus Dorado
('Verde dorado',   2, NOW(), NOW()),
('Maceta 15cm',    2, NOW(), NOW()),
-- Producto 3: Cactus San Pedro
('Verde azulado',  3, NOW(), NOW()),
('Maceta 12cm',    3, NOW(), NOW()),
-- Producto 4: Vela Aromática Bosque
('Natural',        4, NOW(), NOW()),
('200g',           4, NOW(), NOW()),
-- Producto 5: Helecho Boston
('Verde intenso',  5, NOW(), NOW()),
('Maceta 18cm',    5, NOW(), NOW()),
-- Producto 6: Calathea Orbifolia
('Verde y plateado', 6, NOW(), NOW()),
('Maceta 16cm',      6, NOW(), NOW()),
-- Producto 7: Maceta Cerámica Nórdica
('Blanco',         7, NOW(), NOW()),
('Gris claro',     7, NOW(), NOW()),
('18cm',           7, NOW(), NOW()),
-- Producto 8: Ficus Lyrata
('Verde oscuro',   8, NOW(), NOW()),
('Maceta 24cm',    8, NOW(), NOW()),
-- Producto 9: Maceta de Barro Artesanal
('Terracota',      9, NOW(), NOW()),
('Natural',        9, NOW(), NOW()),
('22cm',           9, NOW(), NOW()),
-- Producto 10: Humidificador Mini
('Blanco',         10, NOW(), NOW()),
('Madera',         10, NOW(), NOW()),
-- Producto 11: Kit de Repotting
('Natural',        11, NOW(), NOW()),
-- Producto 12: Spray Antiplagas Natural
('Verde',          12, NOW(), NOW()),
('500ml',          12, NOW(), NOW());
