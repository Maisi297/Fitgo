// Función para calcular y mostrar el IMC
function calcularIMC(peso, altura_cm) {
    const altura_m = parseFloat(altura_cm) / 100; // Convertir cm a metros
    const peso_f = parseFloat(peso);
    
    // Verificar que los datos sean números válidos y que la altura no sea cero
    if (!isNaN(peso_f) && !isNaN(altura_m) && altura_m > 0) {
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
        document.getElementById('perfilIMC').textContent = 'IMC: Datos incompletos o inválidos';
    }
}

//  FUNCIÓN: Carga la foto de perfil (Base64)
function cargarFotoPerfil(fotoBase64) {
    const svgAvatar = document.getElementById('perfilAvatar');
    const fotoCargada = document.getElementById('perfilFotoCargada');

    if (fotoBase64) {
        // Muestra la imagen cargada
        fotoCargada.src = fotoBase64;
        fotoCargada.style.display = 'block';
        // Oculta el SVG predeterminado
        svgAvatar.style.display = 'none';
    } else {
        // Muestra el SVG predeterminado
        svgAvatar.style.display = 'block';
        // Oculta la imagen cargada
        fotoCargada.style.display = 'none';
    }
}

// Función principal para cargar y mostrar los datos del perfil
function cargarPerfil() {
    const datosGuardados = localStorage.getItem('fitgo_perfil_usuario');
    
    if (datosGuardados) {
        try {
            const datosUsuario = JSON.parse(datosGuardados);
            
            // Mostrar los datos de texto (sin cambios)
            document.getElementById('perfilNombre').textContent = 'Nombre: ' + (datosUsuario.username || 'N/A');
            document.getElementById('perfilEdad').textContent = 'Edad: ' + (datosUsuario.edad ? datosUsuario.edad + ' años' : 'N/A');
            document.getElementById('perfilPeso').textContent = 'Peso: ' + (datosUsuario.peso_kg ? datosUsuario.peso_kg + ' kg' : 'N/A');
            document.getElementById('perfilAltura').textContent = 'Altura: ' + (datosUsuario.altura_cm ? datosUsuario.altura_cm + ' cm' : 'N/A');
            calcularIMC(datosUsuario.peso_kg, datosUsuario.altura_cm);

            //  Cargar la foto de perfil si existe
            cargarFotoPerfil(datosUsuario.fotoBase64);

        } catch (e) {
            console.error('Error al parsear los datos del usuario:', e);
            document.getElementById('perfilNombre').textContent = 'Nombre: Error al cargar los datos';
        }
    } else {
        // ... (código para cuando no hay datos) ...
        document.getElementById('perfilNombre').textContent = 'Nombre: Inicia sesión para ver tu perfil';
        document.getElementById('perfilEdad').textContent = 'Edad: N/A';
        document.getElementById('perfilPeso').textContent = 'Peso: N/A';
        document.getElementById('perfilAltura').textContent = 'Altura: N/A';
        document.getElementById('perfilIMC').textContent = 'IMC: No se encontraron datos de usuario';
        cargarFotoPerfil(null); // Asegura que se muestre el SVG si no hay sesión
    }

    // Funcionalidad para Cerrar Sesión (sin cambios)
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            localStorage.removeItem('fitgo_perfil_usuario'); 
            alert('Cerrando sesión. Redirigiendo a inicio.');
            window.location.href = 'index.html'; 
        });
    }

    // Funcionalidad: Editar Información (sin cambios)
    const editarInfoBtn = document.getElementById('editarInfoBtn');
    if (editarInfoBtn) {
        editarInfoBtn.addEventListener('click', () => {
            window.location.href = 'cuentas.html';
        });
    }

    //  LÓGICA: Cambiar Foto de Perfil
    const cambiarFotoBtn = document.getElementById('cambiarFotoBtn');
    const fotoInput = document.getElementById('fotoInput');

    if (cambiarFotoBtn && fotoInput) {
        // 1. Al hacer clic en el botón, simular clic en el input de archivo oculto
        cambiarFotoBtn.addEventListener('click', () => {
            fotoInput.click(); 
        });

        // 2. Cuando se selecciona un archivo, manejar la carga
        fotoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fotoBase64 = e.target.result;
                    
                    // Cargar la foto en la vista
                    cargarFotoPerfil(fotoBase64);

                    // Guardar la foto en localStorage con los demás datos de usuario
                    const datosGuardados = localStorage.getItem('fitgo_perfil_usuario');
                    if (datosGuardados) {
                        try {
                            const datosUsuario = JSON.parse(datosGuardados);
                            // Añadir o actualizar la clave fotoBase64
                            datosUsuario.fotoBase64 = fotoBase64;
                            localStorage.setItem('fitgo_perfil_usuario', JSON.stringify(datosUsuario));
                            alert('Foto de perfil actualizada y guardada.');
                        } catch (error) {
                            console.error('Error al guardar la foto:', error);
                        }
                    } else {
                        alert('No hay una sesión activa para guardar la foto. Por favor, inicia sesión primero.');
                    }
                };
                // Leer el archivo como una URL de datos (Base64)
                reader.readAsDataURL(file);
            }
        });
    }
}

// Asegurar que la función se ejecute cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', cargarPerfil);