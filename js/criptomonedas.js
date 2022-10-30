(function () {
    const criptomonedas = document.querySelector('#criptomonedas');
    const formulario = document.querySelector('#formulario');
    const resultado = document.querySelector('#resultado');
    const selectMoneda = document.querySelector('#moneda');
    const selectCripto = document.querySelector('#criptomonedas');

    const objBusqueda = {
        moneda: '',
        criptomoneda: ''
    }

    document.addEventListener('DOMContentLoaded', () => {
        consultarCriptos();
        formulario.addEventListener('submit', enviarFormulario);
        selectMoneda.addEventListener('change', leerValor);
        selectCripto.addEventListener('change', leerValor);
    })


    const enviarFormulario = e => {
        e.preventDefault();

        const { moneda, criptomoneda } = objBusqueda;

        if ([moneda, criptomoneda].includes('')) {
            mostrarAlerta('Ambos campos son obligatorios');
            return;
        }

        consultarAPI();
    }

    const consultarAPI = async () => {
        const { moneda, criptomoneda } = objBusqueda;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        
        try {
            mostrarSpinner();
            const resultado = await fetch(url);
            const data = await resultado.json();
            mostrarCotizacion(data.DISPLAY[criptomoneda][moneda]);
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarSpinner = () => {
        limpiarHTML();

        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        spinner.innerHTML = `
            <div class="cube1"></div>
            <div class="cube2"></div>
        `;

        resultado.appendChild(spinner);
    }

    const mostrarCotizacion = cotizacion => {

        limpiarHTML();

        const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

        const precio = document.createElement('p');
        precio.classList.add('precio');
        precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

        const precioAlto = document.createElement('p');
        precioAlto.classList.add('adicional');
        precioAlto.innerHTML = `El Precio más alto del día: <span>${HIGHDAY}</span>`;

        const precioBajo = document.createElement('p');
        precioBajo.classList.add('adicional');
        precioBajo.innerHTML = `El Precio más bajo del día: <span>${LOWDAY}</span>`;

        const ultimaHora = document.createElement('p');
        ultimaHora.classList.add('adicional');
        ultimaHora.innerHTML = `Variación ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

        const ultimaActualizacion = document.createElement('p');
        ultimaActualizacion.classList.add('adicional');
        ultimaActualizacion.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

        resultado.appendChild(precio);
        resultado.appendChild(precioAlto);
        resultado.appendChild(precioBajo);
        resultado.appendChild(ultimaHora);
        resultado.appendChild(ultimaActualizacion);
    }

    const limpiarHTML = () => {
        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }

    const mostrarAlerta = msg => {
        if (!formulario.querySelector('.error')) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('error', 'boton');
            divMensaje.textContent = msg;

            formulario.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000)
        }
    }

    const leerValor = e => {
        objBusqueda[e.target.name] = e.target.value;
    }

    const consultarCriptos = async () => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

        try {
            const resultado = await fetch(url);
            const { Data } = await resultado.json();
            llenarSelectCripto(Data);
        } catch (error) {
            console.log(error);
        }
    }

    const llenarSelectCripto = data => {
        data.forEach(cripto => {
            const { CoinInfo: { FullName, Name } } = cripto;
            const option = document.createElement('option');
            option.value = Name;
            option.textContent = FullName;
            criptomonedas.appendChild(option);
        })
    }
})();