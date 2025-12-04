import mysql.connector

#  1. FUNCIÓN DE CONEXIÓN REUTILIZABLE
def conectar():
    """Establece y devuelve la conexión a la base de datos 'Entregamainpy'."""
    try:
        # Intentamos conectar a la base de datos específica
        mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="1234",
            database="Entregamainpy"
        )
        return mydb
    except mysql.connector.Error as err:
        # No mostramos el error 1049 (Unknown database) si la configuracion_inicial() se encarga
        if err.errno != 1049: 
             print(f"Error al conectar a la base de datos: {err}")
        return None

# --- 2. CONFIGURACIÓN INICIAL (Creación de DB y Tabla) ---
def configuracion_inicial():
    """Asegura que la DB y la tabla Cuentas existan."""
    
    # Conexión temporal, SÓLO para crear la DB (sin especificar una base de datos)
    try:
        temp_db = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="1234"
        )
        temp_cursor = temp_db.cursor()
        
        # 2.1 CREAR LA BASE DE DATOS si no existe
        temp_cursor.execute("CREATE DATABASE IF NOT EXISTS Entregamainpy")
        temp_db.commit()
        temp_cursor.close()
        temp_db.close()
        print("Base de datos 'Entregamainpy' verificada/creada.")
        
    except mysql.connector.Error as err:
        print(f"Error al conectar para crear la DB: {err}")
        return False
        
    # Conexión a la DB recién creada para asegurar la tabla
    mydb = conectar()
    if mydb is None:
        print("No se pudo conectar a la DB para crear la tabla.")
        return False

    mycursor = mydb.cursor()
    
    # 2.2 CREACIÓN DE LA TABLA si no existe
    mycursor.execute("""
    CREATE TABLE IF NOT EXISTS Cuentas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(255),
        Contraseña VARCHAR(255),
        Edad INT,
        Peso FLOAT,
        Alturacm INT
    )
    """)
    print("Tabla 'Cuentas' verificada/creada.")

    # 2.3 Inserción de datos de PRUEBA (SOLO si no existen)
    sql = "INSERT INTO Cuentas (Nombre, Contraseña, Edad, Peso, Alturacm) VALUES (%s, %s, %s, %s, %s)"
    val = [
        ( "Eluney Naz", "123", 16, 90.0, 173),
        ("Andrés Bianchi", "123", 31, 67.0, 167),
        ("Máximo Férnandez", "123", 16, 70.0, 174),
        ("Máximo Oliva", "123", 15, 66.0, 180),
        ("Arturo Prat", "123", 61, 78.0, 176),
        ("Benjamín Acosta", "123", 16, 58.0, 172),
        ("Gabriela Ocaño", "123", 51, 137.0, 165)
    ]
    try:
        mycursor.executemany(sql, val)
        mydb.commit()
        print(f"{mycursor.rowcount} registros de prueba insertados.")
    except mysql.connector.Error as err:
        if err.errno == 1062: # Clave duplicada (si ya existen los registros de prueba)
             pass
        else:
             print(f"Error al insertar datos de prueba: {err}")

    # Cierre de conexión de configuración
    mycursor.close()
    mydb.close()
    
    return True

# --- 3. FUNCIONES DEL MENÚ ---

def Registrar_usuario(): 
    print("\nCrear cuenta")
    
    Nombre = input("Nombre: ")
    Contraseña = input("Contraseña: ")
    try:
        Edad = int(input("Edad: "))
        Peso = float(input("Peso: "))
        Alturacm = int(input("Alturacm: "))
    except ValueError:
        print("Error: Edad y Alturacm deben ser números enteros, Peso debe ser un número decimal.")
        return
    
    conexion = conectar()
    if conexion is None:
        return
    
    cursor = conexion.cursor()
    
    query = """
        INSERT INTO Cuentas (Nombre, Contraseña, Edad, Peso, Alturacm)
        VALUES (%s, %s, %s, %s, %s)
    """
    datos = (Nombre, Contraseña, Edad, Peso, Alturacm)
    
    try:
        cursor.execute(query, datos)
        conexion.commit() 
        print("\nTe has registrado con éxito!\n")
    except mysql.connector.Error as err:
        print(f"Error al registrar usuario: {err}")
    
    cursor.close()
    conexion.close()

def iniciar_sesion():
    print("\nInicio de sesión ")
    Nombre = input("Nombre: ")
    Contraseña = input("Contraseña: ")

    conexion = conectar()
    if conexion is None:
        return

    cursor = conexion.cursor()

    query = "SELECT id, Nombre, Alturacm FROM Cuentas WHERE Nombre = %s AND Contraseña = %s"
    cursor.execute(query, (Nombre, Contraseña))
    resultado = cursor.fetchone() 

    if resultado:
        print(f"\nBienvenido a Fitgo! {resultado[1]} (ID: {resultado[0]}, Altura: {resultado[2]}cm)\n")
    else:
        print("\nDatos no encontrados, intenta de nuevo o crea una cuenta.\n")

    cursor.close()
    conexion.close()

def consultar_usuario():
    print("\nConsulta a usuario")
    user_id = input("ID de usuario: ")

    conexion = conectar()
    if conexion is None:
        return

    cursor = conexion.cursor()

    try:
        cursor.execute("SELECT id, Nombre, Edad, Peso, Alturacm FROM Cuentas WHERE id = %s", (user_id,))
        resultado = cursor.fetchone()
    except mysql.connector.Error as err:
        print(f"Error al consultar: {err}")
        resultado = None

    if resultado:
        print("\nDatos del usuario:")
        print(f"ID: {resultado[0]}, Nombre: {resultado[1]}, Edad: {resultado[2]}, Peso: {resultado[3]}kg, Altura: {resultado[4]}cm")
    else:
        print("\nNo existe un usuario con ese ID.")

    cursor.close()
    conexion.close()

def modificar_usuario():
    print("\nCambiar datos")
    user_id = input("ID del usuario a modificar: ")

    try:
        nueva_edad = int(input("Edad Nueva: "))
        nuevo_peso = float(input("Nuevo Peso: "))
        nueva_altura = int(input("Nueva Altura en cm: "))
    except ValueError:
        print("Error: Edad y Alturacm deben ser números enteros, Peso debe ser un número.")
        return

    conexion = conectar()
    if conexion is None:
        return

    cursor = conexion.cursor()

    query = """
        UPDATE Cuentas
        SET Edad = %s, Peso = %s, Alturacm = %s
        WHERE id = %s
    """
    datos = (nueva_edad, nuevo_peso, nueva_altura, user_id)

    try:
        cursor.execute(query, datos)
        conexion.commit()
        if cursor.rowcount > 0:
            print("\nDatos modificados correctamente!\n")
        else:
            print("\nNo se encontró un usuario con ese ID o no se hicieron cambios.")
    except mysql.connector.Error as err:
        print(f"Error al modificar datos: {err}")

    cursor.close()
    conexion.close()

def modificar_contraseña():
    print("\nModifica tu contraseña")
    user_id = input("ID del usuario: ")
    nueva_contr = input("Nueva contraseña: ")

    conexion = conectar()
    if conexion is None:
        return

    cursor = conexion.cursor()

    query = "UPDATE Cuentas SET Contraseña = %s WHERE id = %s"
    
    try:
        cursor.execute(query, (nueva_contr, user_id))
        conexion.commit()
        if cursor.rowcount > 0:
            print("\nContraseña actualizada.\n")
        else:
            print("\nNo se encontró un usuario con ese ID.")
    except mysql.connector.Error as err:
        print(f"Error al modificar contraseña: {err}")

    cursor.close()
    conexion.close()

def eliminar_cuenta():
    print("\nBorrar cuenta")
    user_id = input("ID del usuario a eliminar: ")
    confirmacion = input("Está seguro de que desea eliminar la cuenta? (s/n): ").lower()
    
    if confirmacion != 's':
        print("\nOperación cancelada.")
        return

    conexion = conectar()
    if conexion is None:
        return

    cursor = conexion.cursor()

    try:
        cursor.execute("DELETE FROM Cuentas WHERE id = %s", (user_id,))
        conexion.commit()
        
        if cursor.rowcount > 0:
            print("\nCuenta borrada correctamente.\n")
        else:
            print("\nNo se encontró un usuario con ese ID.")
            
    except mysql.connector.Error as err:
        print(f"Error al eliminar cuenta: {err}")

    cursor.close()
    conexion.close()

# --- 4. FUNCIÓN DEL MENÚ Y EJECUCIÓN PRINCIPAL ---

def menu():
    while True:
        print("\n--- Bienvenido a las cuentas de Fitgo! ---")
        print("1. Registrar usuario")
        print("2. Iniciar sesión")
        print("3. Consultar usuario")
        print("4. Modificar datos")
        print("5. Modificar contraseña")
        print("6. Eliminar cuenta")
        print("7. Salir")
        print("------------------------------------------")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            Registrar_usuario()
        elif opcion == "2":
            iniciar_sesion()
        elif opcion == "3":
            consultar_usuario()
        elif opcion == "4":
            modificar_usuario()
        elif opcion == "5":
            modificar_contraseña()
        elif opcion == "6":
            eliminar_cuenta()
        elif opcion == "7":
            print("Vuelve pronto!")
            break
        else:
            print("Opción inválida. Pruebe otra vez.\n")

if __name__ == "__main__":
    print("Iniciando configuración de base de datos...")
    if configuracion_inicial():
        print("\nConfiguración lista. Iniciando menú.")
        menu()
    else:
        print("\nNo se pudo iniciar la aplicación debido a un error de conexión o configuración con MySQL.")