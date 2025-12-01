// main.js

// Función que maneja el envío del formulario y guarda los datos
function guardarDatos(event) {
    // Evita el envío tradicional del formulario para que JavaScript pueda manejarlo
    event.preventDefault(); 
    
    // Obtener los valores de los campos del formulario
    // Usamos querySelector por el atributo name, y getElementById para el id="peso"
    const usuario = document.querySelector('[name="username"]').value;
    const peso = document.getElementById('peso').value;
    const altura = document.querySelector('[name="altura"]').value;
    const edad = document.querySelector('[name="edad"]').value;
    
    // Crear un objeto con los datos a guardar
    const datosUsuario = {
        username: usuario,
        peso_kg: peso,
        altura_cm: altura,
        edad: edad,
        fechaGuardado: new Date().toLocaleString() 
    };
    
    // Guardar el objeto en el localStorage (se convierte a JSON String)
    try {
        localStorage.setItem('fitgo_perfil_usuario', JSON.stringify(datosUsuario));
        alert('Datos de perfil (Usuario, Peso, Altura, Edad) guardados exitosamente en el navegador.');
        
        // Opcional: Si necesitas hacer el envío POST al servidor después de guardar:
        // event.target.submit(); 
        
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
        alert('Error al guardar los datos en el navegador.');
    }
}

// Función para cargar los datos guardados al abrir la página y rellenar el formulario
function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('fitgo_perfil_usuario');
    if (datosGuardados) {
        // Convertir la cadena JSON de vuelta a un objeto JavaScript
        const datosUsuario = JSON.parse(datosGuardados);
        
        // Rellenar campos del formulario
        document.querySelector('[name="username"]').value = datosUsuario.username || '';
        document.getElementById('peso').value = datosUsuario.peso_kg || '';
        document.querySelector('[name="altura"]').value = datosUsuario.altura_cm || '';
        document.querySelector('[name="edad"]').value = datosUsuario.edad || '';
    }
}

// Escucha el evento 'submit' del formulario una vez que el documento esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', guardarDatos);
    }
    
    // Carga los datos guardados al cargar la página
    cargarDatosGuardados();
});