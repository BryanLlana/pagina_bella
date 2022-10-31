(function(){
    const listaGaleria = document.querySelector('#lista-galeria');

    const llenarGalería = async()=>{
        try {
            const resultado = await fetch('./productos.json');
            const data = await resultado.json();

            data.forEach(foto => {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.src = `./img/${foto.img}`;
                img.alt = `Imagen`;

                div.appendChild(img);

                listaGaleria.appendChild(div);
            })

        } catch (error) {
            console.log(error);
        }
    }

    llenarGalería();
})();