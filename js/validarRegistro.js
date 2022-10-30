(function(){
    const formulario = document.querySelector('#formulario-registro');

    
    const enviarRegistro = e => {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;

        if([nombre, email].includes('')){
            mostrarAlerta('Los campos son obligatorios');
            return;
        }

        Swal.fire(
            'Registro correcto',
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
    
    formulario.addEventListener('submit', enviarRegistro);
})();