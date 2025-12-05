# SQL de referencia (ya ejecutado en MySQL):
# USE mydatabase;
# CREATE TABLE Rutinas (
#     Rutinas_id INT AUTO_INCREMENT PRIMARY KEY,
#     nombre_rutina VARCHAR(100) NOT NULL,
#     sector_trabajado VARCHAR(50) NOT NULL,
#     edad_requerida INT,
#     Tiempo FLOAT NOT NULL
# );

import mysql.connector

# ============================================
# FUNCIÓN DE CONEXIÓN
# ============================================
def conectar():
    """Devuelve una conexión a la base de datos mydatabase."""
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="mydatabase"
    )

# ============================================
# FUNCIONES DE LÓGICA DE RUTINAS
# ============================================

def crear_rutina():
    """Función para pedir datos y registrar una nueva rutina en la BD."""
    print("\n--- 1. CREAR NUEVA RUTINA ---")

    nombre = input("Nombre de la rutina: ")
    sector = input("Sector trabajado: ")
    edad = int(input("Edad requerida (puede ser 0 si no aplica): "))
    tiempo = float(input("Tiempo (en minutos): "))

    db = conectar()
    cur = db.cursor()

    sql = """
        INSERT INTO Rutinas (nombre_rutina, sector_trabajado, edad_requerida, Tiempo)
        VALUES (%s, %s, %s, %s)
    """
    valores = (nombre, sector, edad, tiempo)
    cur.execute(sql, valores)
    db.commit()

    print("✅ Rutina creada correctamente. Filas afectadas:", cur.rowcount)

    cur.close()
    db.close()


def consultar_rutina():
    """Función para buscar y mostrar los datos de una rutina."""
    print("\n--- 2. CONSULTAR RUTINA ---")
    nombre = input("Nombre de la rutina a buscar: ")

    db = conectar()
    cur = db.cursor()

    sql = "SELECT * FROM Rutinas WHERE nombre_rutina = %s"
    cur.execute(sql, (nombre,))
    resultados = cur.fetchall()

    if resultados:
        for fila in resultados:
            print(fila)
    else:
        print("⚠️ No se encontró ninguna rutina con ese nombre.")

    cur.close()
    db.close()


def mostrar_todas_rutinas():
    """Función para listar todas las rutinas registradas."""
    print("\n--- 3. MOSTRAR TODAS LAS RUTINAS ---")

    db = conectar()
    cur = db.cursor()

    cur.execute("SELECT * FROM Rutinas")
    for fila in cur.fetchall():
        print(fila)

    cur.close()
    db.close()


def modificar_rutina():
    """Función para cambiar datos de una rutina existente."""
    print("\n--- 4. MODIFICAR DATOS DE RUTINA ---")
    nombre = input("Nombre de la rutina a modificar: ")
    nuevo_tiempo = float(input("Nuevo tiempo (en minutos): "))

    db = conectar()
    cur = db.cursor()

    sql = "UPDATE Rutinas SET Tiempo = %s WHERE nombre_rutina = %s"
    cur.execute(sql, (nuevo_tiempo, nombre))
    db.commit()

    print("✅ Filas modificadas:", cur.rowcount)

    cur.close()
    db.close()


def eliminar_rutina():
    """Función para eliminar una rutina de la base de datos."""
    print("\n--- 5. ELIMINAR RUTINA ---")
    nombre = input("Nombre de la rutina a eliminar: ")

    db = conectar()
    cur = db.cursor()

    sql = "DELETE FROM Rutinas WHERE nombre_rutina = %s"
    cur.execute(sql, (nombre,))
    db.commit()

    print("✅ Filas eliminadas:", cur.rowcount)

    cur.close()
    db.close()

# ============================================
# MENÚ PRINCIPAL
# ============================================
def menu():
    """Muestra el menú principal para la gestión de Rutinas."""
    while True:
        print("\n========= GESTIÓN DE RUTINAS =========")
        print("1. Crear nueva rutina")
        print("2. Consultar rutina por nombre")
        print("3. Mostrar todas las rutinas")
        print("4. Modificar datos de una rutina")
        print("5. Eliminar rutina")
        print("6. Salir")
        print("======================================")

        opcion = input("✅ Seleccione una opción: ")

        if opcion == "1":
            crear_rutina()
        elif opcion == "2":
            consultar_rutina()
        elif opcion == "3":
            mostrar_todas_rutinas()
        elif opcion == "4":
            modificar_rutina()
        elif opcion == "5":
            eliminar_rutina()
        elif opcion == "6":
            print("👋 ¡Hasta pronto! Saliendo del sistema de gestión de rutinas.")
            break
        else:
            print("❌ Opción inválida. Por favor, ingrese un número del 1 al 6.\n")


# ============================================
# EJECUCIÓN DEL PROGRAMA
# ============================================
if __name__ == "__main__":
    menu()
