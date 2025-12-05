-- 1. CONFIGURACIÓN INICIAL DE LA BASE DE DATOS
----------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS FitgoHomeDB;
USE FitgoHomeDB;

-- 2. CREACIÓN DE TABLAS

-- 2.1. Tabla de USUARIOS
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nombre de usuario o Email (campo: id="username")',
    password_hash VARCHAR(255) NOT NULL COMMENT 'Contraseña cifrada (campo: id="password")',
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para optimizar búsquedas por nombre de usuario/email (login)
CREATE INDEX idx_usuario ON usuarios (usuario);


-- 2.2. Tablas de Contenido del Home
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Estadisticas (
    Clave VARCHAR(100) PRIMARY KEY,
    Valor VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL UNIQUE,
    Descripcion TEXT,
    Duracion VARCHAR(50),
    Nivel VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Autor VARCHAR(100) NOT NULL,
    Logro VARCHAR(100),
    Comentario TEXT,
    Calificacion INT
);

-- 3. INSERCIÓN DE DATOS INICIALES/DE PRUEBA

-- 3.1. Usuarios de Prueba (NOMBRES ACTUALIZADOS AQUÍ 👇)
-- El ID 1 será para Eluney Naz y el ID 2 para Facundo Salas.
----------------------------------------------------------------------
INSERT INTO usuarios (usuario, password_hash, nombre, apellido) VALUES
('eluney.naz@sitio.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Eluney', 'Naz'),
('facundo.salas@mail.com', '$2a$10$zyxwutsrqponmlkjihgfedcba0987654321', 'Facundo', 'Salas');

-- 3.2. Datos de Prueba para el Home (Estadísticas, Programas, Testimonios)
----------------------------------------------------------------------
INSERT INTO Estadisticas (Clave, Valor, Descripcion) VALUES
('UsuariosActivos', 'Muchos', 'Usuarios activos'),
('RutinasDisponibles', 'Varias', 'Rutinas disponibles'),
('Satisfaccion', '95%', 'Satisfacción');

INSERT INTO Programas (Nombre, Descripcion, Duracion, Nivel) VALUES
('Perder peso', 'Programas efectivos de cardio y nutrición para alcanzar tu peso ideal', '8-12 semanas', 'Todos los niveles'),
('Ganar músculo', 'Rutinas de fuerza y hipertrofia para desarrollar masa muscular', '12-16 semanas', 'Intermedio-Avanzado'),
('Vida saludable', 'Equilibrio perfecto entre ejercicio, nutrición y bienestar mental', 'Continuo', 'Todos los niveles');

INSERT INTO Testimonios (Autor, Logro, Comentario, Calificacion) VALUES
('María González', 'Perdió 15kg en 4 meses', 'FitGo cambió mi vida completamente...', 5),
('Carlos Ruiz', 'Ganó 8kg de músculo', 'Las rutinas son increíbles...', 5),
('Ana Martínez', 'Mejoró su salud integral', 'No solo mejoré físicamente, también mentalmente...', 5);

-- 4. CONSULTAS, MODIFICACIÓN Y ELIMINACIÓN DE DATOS DEL USUARIO

-- 4.1. CONSULTA DE DATOS DEL USUARIO
----------------------------------------------------------------------
-- Consulta para obtener todos los datos de un usuario por su ID
SELECT id, usuario, nombre, apellido, fecha_registro
FROM usuarios
WHERE id = 1; -- Datos de Eluney Naz

-- Consulta para verificar las credenciales de un usuario (Inicio de Sesión)
SELECT id, usuario, nombre
FROM usuarios
WHERE usuario = 'facundo.salas@mail.com';


-- 4.2. MODIFICAR DATOS DEL USUARIO (ACTUALIZACIONES MODIFICADAS AQUÍ 👇)
----------------------------------------------------------------------

-- Ejemplo 1: El usuario (Eluney Naz) actualiza su apellido (por ID)
UPDATE usuarios
SET apellido = 'Naz G.'
WHERE id = 1;

-- Ejemplo 2: El usuario (Facundo Salas) cambia su contraseña (se actualiza el hash cifrado)
UPDATE usuarios
SET password_hash = '$2a$10$nuevohashseguroparacontrasena' -- Se debe ingresar un nuevo hash generado
WHERE usuario = 'facundo.salas@mail.com';


-- 4.3. ELIMINACIÓN DEL USUARIO O DATOS PERSONALES
----------------------------------------------------------------------

-- ELIMINAR CUENTA COMPLETA: Elimina permanentemente el registro del usuario con ID=2 (Facundo Salas)
DELETE FROM usuarios
WHERE id = 2;

-- ELIMINAR DATOS PERSONALES ESPECÍFICOS: Elimina el nombre y apellido del usuario con ID=1 (Eluney Naz)
UPDATE usuarios
SET nombre = NULL,
    apellido = NULL
WHERE id = 1;


-- Verificación final (opcional, para confirmar las acciones)
SELECT * FROM usuarios;