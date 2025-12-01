// Función que maneja el envío del formulario y guarda los datos
function guardarDatos(event) {
    // Evita el envío tradicional del formulario
    event.preventDefault(); 
    
    // Obtener los valores de los campos del formulario
    const usuario = document.querySelector('[name="username"]').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value; // Usar el ID correcto
    const edad = document.querySelector('[name="edad"]').value;
    
    // Crear un objeto con los datos a guardar. Usamos claves descriptivas.
    const datosUsuario = {
        username: usuario,
        peso_kg: peso,
        altura_cm: altura,
        edad: edad,
        fechaGuardado: new Date().toLocaleString() 
    };
    
    // Guardar el objeto en el localStorage
    try {
        localStorage.setItem('fitgo_perfil_usuario', JSON.stringify(datosUsuario));
        
        // ** REDIRECCIÓN A LA PÁGINA DE PERFIL DESPUÉS DE GUARDAR **
        alert(`¡Bienvenido, ${usuario}! Tus datos han sido guardados.`);
        window.location.href = 'perfil.html'; 
        
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
        alert('Error al guardar los datos en el navegador.');
    }
}

// Función para cargar los datos guardados (opcional, para precargar si ya existían)
function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('fitgo_perfil_usuario');
    if (datosGuardados) {
        try {
            const datosUsuario = JSON.parse(datosGuardados);
            
            // Rellenar campos del formulario si existen datos previos
            document.querySelector('[name="username"]').value = datosUsuario.username || '';
            document.getElementById('peso').value = datosUsuario.peso_kg || '';
            document.getElementById('altura').value = datosUsuario.altura_cm || '';
            document.querySelector('[name="edad"]').value = datosUsuario.edad || '';
        } catch (e) {
            console.error('Error al parsear datos guardados:', e);
        }
    }
}

// Escucha el evento 'submit' del formulario una vez que el documento esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Asocia la función guardarDatos al evento submit
        loginForm.addEventListener('submit', guardarDatos);
    }
    
    // Carga los datos guardados al cargar la página de cuentas (útil para que el usuario no rellene de nuevo)
    cargarDatosGuardados();
});