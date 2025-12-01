// Función para calcular y mostrar el IMC
function calcularIMC(peso, altura_cm) {
    const altura_m = parseFloat(altura_cm) / 100; // Convertir cm a metros
    const peso_f = parseFloat(peso);
    
    // Verificar que los datos sean números válidos y que la altura no sea cero
    if (!isNaN(peso_f) && !isNaN(altura_m) && altura_m > 0) {
        // Fórmula del IMC: peso / (altura * altura)
        const imc = peso_f / (altura_m * altura_m);
        document.getElementById('perfilIMC').textContent = 'IMC: ' + imc.toFixed(2);
    } else {
        // Muestra un mensaje amigable si los datos son inválidos o faltan
        document.getElementById('perfilIMC').textContent = 'IMC: Datos incompletos o inválidos';
    }
}

// Función principal para cargar y mostrar los datos del perfil
function cargarPerfil() {
    // Intenta obtener los datos del localStorage
    const datosGuardados = localStorage.getItem('fitgo_perfil_usuario');
    
    if (datosGuardados) {
        try {
            // Analiza el string JSON para convertirlo en objeto
            const datosUsuario = JSON.parse(datosGuardados);
            
            // Mostrar los datos usando las claves correctas (peso_kg, altura_cm)
            document.getElementById('perfilNombre').textContent = 'Nombre: ' + (datosUsuario.username || 'N/A');
            document.getElementById('perfilEdad').textContent = 'Edad: ' + (datosUsuario.edad ? datosUsuario.edad + ' años' : 'N/A');
            document.getElementById('perfilPeso').textContent = 'Peso: ' + (datosUsuario.peso_kg ? datosUsuario.peso_kg + ' kg' : 'N/A');
            document.getElementById('perfilAltura').textContent = 'Altura: ' + (datosUsuario.altura_cm ? datosUsuario.altura_cm + ' cm' : 'N/A');

            // Calcular y mostrar IMC
            calcularIMC(datosUsuario.peso_kg, datosUsuario.altura_cm);

        } catch (e) {
            console.error('Error al parsear los datos del usuario:', e);
            document.getElementById('perfilNombre').textContent = 'Nombre: Error de datos';
        }
    } else {
        // Si no hay datos, muestra mensajes de error
        document.getElementById('perfilNombre').textContent = 'Nombre: No hay datos de sesión';
        document.getElementById('perfilEdad').textContent = '';
        document.getElementById('perfilPeso').textContent = '';
        document.getElementById('perfilAltura').textContent = '';
        document.getElementById('perfilIMC').textContent = '';
    }

    // Funcionalidad para Cerrar Sesión
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            alert('Cerrando sesión. Redirigiendo a inicio.');
            window.location.href = 'index.html'; 
        });
    }
}

// Asegurar que la función se ejecute cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', cargarPerfil);