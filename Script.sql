
-- Corresponde a la ejecución de temp_cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}") en Python
CREATE DATABASE IF NOT EXISTS FitgoHomeDB;
USE FitgoHomeDB;

-- 2. CREACIÓN DE TABLAS

-- Tabla Estadisticas (Métricas del Home)
-- Corresponde al primer mycursor.execute() en configuracion_inicial_home()
CREATE TABLE IF NOT EXISTS Estadisticas (
    Clave VARCHAR(100) PRIMARY KEY,
    Valor VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255)
);

-- Tabla Programas
-- Corresponde al segundo mycursor.execute()
CREATE TABLE IF NOT EXISTS Programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL UNIQUE,
    Descripcion TEXT,
    Duracion VARCHAR(50),
    Nivel VARCHAR(50)
);

-- Tabla Testimonios
-- Corresponde al tercer mycursor.execute()
CREATE TABLE IF NOT EXISTS Testimonios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Autor VARCHAR(100) NOT NULL,
    Logro VARCHAR(100),
    Comentario TEXT,
    Calificacion INT
);

-- 3. INSERCIÓN DE DATOS INICIALES

-- Insertar Datos en Estadisticas (Usa INSERT IGNORE para evitar duplicados)
-- Corresponde a mycursor.executemany(sql_stats, val_stats)
INSERT IGNORE INTO Estadisticas (Clave, Valor, Descripcion) VALUES
('UsuariosActivos', 'Muchos', 'Usuarios activos'),
('RutinasDisponibles', 'Varias', 'Rutinas disponibles'),
('Satisfaccion', '95%', 'Satisfacción');

-- Insertar Datos en Programas (Usa INSERT IGNORE para evitar duplicados)
-- Corresponde a mycursor.executemany(sql_programas, val_programas)
INSERT IGNORE INTO Programas (Nombre, Descripcion, Duracion, Nivel) VALUES
('Perder peso', 'Programas efectivos de cardio y nutrición para alcanzar tu peso ideal', '8-12 semanas', 'Todos los niveles'),
('Ganar músculo', 'Rutinas de fuerza y hipertrofia para desarrollar masa muscular', '12-16 semanas', 'Intermedio-Avanzado'),
('Vida saludable', 'Equilibrio perfecto entre ejercicio, nutrición y bienestar mental', 'Continuo', 'Todos los niveles');

-- Insertar Datos en Testimonios (Usa INSERT IGNORE para evitar duplicados)
-- Corresponde a mycursor.executemany(sql_testimonios, val_testimonios)
INSERT IGNORE INTO Testimonios (Autor, Logro, Comentario, Calificacion) VALUES
('María González', 'Perdió 15kg en 4 meses', 'FitGo cambió mi vida completamente...', 5),
('Carlos Ruiz', 'Ganó 8kg de músculo', 'Las rutinas son increíbles...', 5),
('Ana Martínez', 'Mejoró su salud integral', 'No solo mejoré físicamente, también mentalmente...', 5);