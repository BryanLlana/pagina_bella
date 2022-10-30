(function(){

const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let productosCarrito = JSON.parse(localStorage.getItem('productos')) || [];

const cargarEventos = () => {

    llenarProductoHTML();

    if(productosCarrito.length > 0){
        llenarCarritoHTML();
    }

    listaProductos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    btnVaciarCarrito.addEventListener('click', ()=>{
        productosCarrito = [];
        limpiarHTML();

        localStorage.setItem('productos', JSON.stringify(productosCarrito));

        Swal.fire(
            'Productos Eliminados',
            'Presione OK',
            'success'
        )
    })
}

const llenarProductoHTML = async() =>{
    try {
        const resultado = await fetch('./productos.json');
        const data = await resultado.json();
        
        data.forEach(producto => {
            const {titulo, precio, img, id} = producto;
            const divProducto = document.createElement('div');
            divProducto.classList.add('main__producto');
            divProducto.innerHTML = `
                <img src="./img/${img}" class="main__prodimagen">
                <div class="main__prodcontenido">
                    <h4>${titulo}</h4>
                    <div class="main__prodestrellas">
                        <img src="./img/estrellas.png">
                    </div>
                    <p class="main__prodprecio">Precio: <span>${'$'+precio}</span></p>
                    <a href="#" data-id=${id} class="main__prodbtn boton">Agregar Al Carrito</a>
                </div>
            `;

            listaProductos.appendChild(divProducto);
        })
    } catch (error) {
        console.log(error);
    }
}

const eliminarCurso = e =>{
    e.preventDefault();

    if(e.target.classList.contains('borrar-producto')){
        const idProducto = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(producto=>producto.id !== idProducto);
        llenarCarritoHTML();

        localStorage.setItem('productos', JSON.stringify(productosCarrito));

        Swal.fire(
            'Producto Eliminado',
            'Presione OK',
            'success'
        )
    }
}

const agregarCurso = e => {
    e.preventDefault();

    if (e.target.classList.contains('main__prodbtn')) {
        const producto = e.target.parentElement.parentElement;
        extraerCurso(producto);
    }
}

const extraerCurso = producto => {
    const infoProducto = {
        img: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);

    if (existe) {
        productosCarrito = productosCarrito.map(producto=>{
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        })
    } else {
        productosCarrito = [...productosCarrito, infoProducto];
    }

    localStorage.setItem('productos', JSON.stringify(productosCarrito));

    llenarCarritoHTML();

    Swal.fire(
        'Producto Agregado',
        'Presione OK',
        'success'
    )
}

const llenarCarritoHTML = () => {

    limpiarHTML();

    productosCarrito.forEach(producto => {
        const { img, titulo, precio, id, cantidad } = producto;
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>
                <img src=${img} width="100"> 
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id=${id}>X</a>
            </td>
        `;

        listaCarrito.appendChild(tr);
    })
}

const limpiarHTML = () => {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

cargarEventos();

})();