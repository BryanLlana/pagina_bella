(function(){
    const formulario = document.querySelector('#formulario-contacto');

    
    const enviarDatos = e => {
        e.preventDefault();

        const nombre = document.querySelector('#nombre_contacto').value;
        const telefono = document.querySelector('#tel_contacto').value;
        const email = document.querySelector('#email_contacto').value;
        const mensaje = document.querySelector('#mensaje_contacto').value;

        if([nombre, telefono, email, mensaje].includes('')){
            mostrarAlerta('Todos los Campos son Obligatorios');
            return;
        }

        Swal.fire(
            'Datos enviados correctamente',
            'Presione OK',
            'success'
            )
            
            formulario.reset();
        }
        
    const mostrarAlerta = msg => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
        })
    }
    
    formulario.addEventListener('submit', enviarDatos);
})();