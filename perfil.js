// Función para calcular y mostrar el IMC
function calcularIMC(peso, altura_cm) {
    const altura_m = parseFloat(altura_cm) / 100; // Convertir cm a metros
    const peso_f = parseFloat(peso);
    
    // Verificar que los datos sean números válidos y que la altura no sea cero
    if (!isNaN(peso_f) && !isNaN(altura_m) && altura_m > 0) {
        // Fórmula del IMC: peso / (altura * altura)
        const imc = peso_f / (altura_m * altura_m);
        
        let clasificacion = '';
        if (imc < 18.5) {
            clasificacion = ' (Bajo peso)';
        } else if (imc < 24.9) {
            clasificacion = ' (Peso normal)';
        } else if (imc < 29.9) {
            clasificacion = ' (Sobrepeso)';
        } else {
            clasificacion = ' (Obesidad)';
        }
        
        document.getElementById('perfilIMC').textContent = 'IMC: ' + imc.toFixed(2) + clasificacion;
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
            
            // Mostrar los datos en los elementos HTML
            document.getElementById('perfilNombre').textContent = 'Nombre: ' + (datosUsuario.username || 'N/A');
            document.getElementById('perfilEdad').textContent = 'Edad: ' + (datosUsuario.edad ? datosUsuario.edad + ' años' : 'N/A');
            document.getElementById('perfilPeso').textContent = 'Peso: ' + (datosUsuario.peso_kg ? datosUsuario.peso_kg + ' kg' : 'N/A');
            document.getElementById('perfilAltura').textContent = 'Altura: ' + (datosUsuario.altura_cm ? datosUsuario.altura_cm + ' cm' : 'N/A');

            // Calcular y mostrar IMC
            calcularIMC(datosUsuario.peso_kg, datosUsuario.altura_cm);

        } catch (e) {
            console.error('Error al parsear los datos del usuario:', e);
            document.getElementById('perfilNombre').textContent = 'Nombre: Error al cargar los datos';
        }
    } else {
        // Si no hay datos, muestra mensajes de sesión cerrada o error.
        document.getElementById('perfilNombre').textContent = 'Nombre: Inicia sesión para ver tu perfil';
        document.getElementById('perfilEdad').textContent = 'Edad: N/A';
        document.getElementById('perfilPeso').textContent = 'Peso: N/A';
        document.getElementById('perfilAltura').textContent = 'Altura: N/A';
        document.getElementById('perfilIMC').textContent = 'IMC: No se encontraron datos de usuario';
    }

    // Funcionalidad para Cerrar Sesión
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            // 1. Elimina los datos del usuario del localStorage al cerrar sesión
            localStorage.removeItem('fitgo_perfil_usuario'); 
            alert('Cerrando sesión. Redirigiendo a inicio.');
            // 2. Redirige a la página principal
            window.location.href = 'index.html'; 
        });
    }

    //  NUEVA FUNCIONALIDAD: Editar Información
    const editarInfoBtn = document.getElementById('editarInfoBtn');
    if (editarInfoBtn) {
        editarInfoBtn.addEventListener('click', () => {
            // Redirigir a la página de cuentas/login para que se precarguen y se puedan editar.
            window.location.href = 'cuentas.html';
        });
    }
}

// Asegurar que la función se ejecute cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', cargarPerfil);