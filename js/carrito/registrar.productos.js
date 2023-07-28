const productoNuevo = (nombre_producto, precio_producto, id) => {
    const linea = document.createElement("section");
    const contenido = `
                <article class="carrito-articulos">
                <div class="carrito-descripcion">
                    <p class="carrito-nombre nombre_articulo">${nombre_producto}</p>
                    <p class="carrito-precio precio_articulo">${precio_producto}</p>
                </div>
                <div class="carrito-cantidad">
                    <p>Cantidad</p>
                    <span class="cantidad">1</span>
                </div>
                <div class="carrito-botones">
                    <button class="carrito-boton-comprar">Comprar</button>
                    <button class="carrito-boton-quitar" id="${id}">Quitar</button>
                </div>
            </article>`
    linea.innerHTML = contenido

    const botonQuitar = linea.querySelector(".carrito-boton-quitar");
        botonQuitar.addEventListener("click", () => {
            const id = botonQuitar.id
            quitarProducto(id).then((respuesta) => {
                console.log(respuesta)
            }).catch(error => alert("Ocurrio un error"+ error))
        })

    return linea
}

const quitarProducto =(id) =>{
    return fetch(`http://localhost:2000/productos/${id}`, {
        method: "DELETE",
    }).catch(error => console.log(error))
}


const carritoProducto = document.getElementById("ventana_carrito");

const listaDeArticulos = () => {
    fetch("http://localhost:2000/productos")
        .then(respuesta => respuesta.json())
        .then(data => data.forEach(({nombre_producto, precio_producto, id}) =>  {
            const nuevoProductoAgregado = productoNuevo(nombre_producto, precio_producto, id)
            carritoProducto.appendChild(nuevoProductoAgregado);
        }))
        .catch(error => console.log("Opss" + error));
}

listaDeArticulos()

const AgregarProductoCarrito = (nombre_producto, precio_producto) => {
    return fetch("http://localhost:2000/productos", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({nombre_producto, precio_producto, id:uuid.v4()})
    })
        
}

export const productos = {
    AgregarProductoCarrito,
    listaDeArticulos,
}