const productoNuevo = (nombre_producto, precio_producto, id, cantidad) => {
    //seccion de productos agregados al carrito
    const linea = document.createElement("section");
    const contenido = `
                <article class="carrito-articulos">
                    <div class="carrito-descripcion">
                        <p class="carrito-nombre nombre_articulo">${nombre_producto}</p>
                        <p class="carrito-precio precio_articulo">${precio_producto}</p>
                    </div>
                    <div class="carrito-cantidad">
                        <p>Cantidad</p>
                        <span class="cantidad">${cantidad}</span>
                    </div>
                    <div class="carrito-botones">
                        <button class="carrito-boton-comprar">Comprar</button>
                        <button class="carrito-boton-quitar" id="${id}">Quitar</button>
                    </div>
                </article>`

    linea.innerHTML = contenido

    //Boton quitar producto del carrito
    const botonQuitar = linea.querySelector(".carrito-boton-quitar");
    botonQuitar.addEventListener("click", () => {
        const id = botonQuitar.id
        quitarProducto(id).then((respuesta) => {
            console.log(respuesta)}).catch(error => alert("Ocurrio un error"+ error))
        })

    //boton comprar producto del carrito 
    const botonComprar = linea.querySelector(".carrito-boton-comprar");
    botonComprar.addEventListener("click", () => {
        const nombre_producto = linea.querySelector(".nombre_articulo").textContent;
        const imagen_producto = sessionStorage.getItem("imagen_articulo");
        productoComprado(nombre_producto, imagen_producto)
        sessionStorage.removeItem(id)

    })

    return linea
}



const productoComprado = (nombre_producto, imagen_producto) => {
    const carritoCompras = document.getElementById("ventana_carrito-compras");
    const carritoContenedor = carritoCompras.querySelector(".carrito-articulos-compras");

    const lineaProductoComprado = document.createElement("div");
    lineaProductoComprado.classList.add("carrito-articulos-contenedor");

    const contenido = `
        <div class="imagen-producto-comprado">
            <img class="imagen_articulo" src="${imagen_producto}">
        </div>
        <div class="carrito-descripcion-compras">
            <p class="nombre_articulo">${nombre_producto}</p>
            <i class="icono fa-solid fa-check"></i>
        </div>
    `;

    lineaProductoComprado.innerHTML = contenido;
    carritoContenedor.appendChild(lineaProductoComprado);
    
    
    
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
        .then(data => data.forEach(({nombre_producto, precio_producto, id,cantidad}) =>  {
            const nuevoProductoAgregado = productoNuevo(nombre_producto, precio_producto, id,cantidad)
            carritoProducto.appendChild(nuevoProductoAgregado);
        }))
        .catch(error => console.log("Opss" + error));
}

listaDeArticulos()

const AgregarProductoCarrito = (nombre_producto, precio_producto, cantidad, imagen_producto) => {
    return fetch("http://localhost:2000/productos", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({nombre_producto, precio_producto, id:uuid.v4(),imagen_producto, cantidad})
    })
        
}

export const productos = {
    AgregarProductoCarrito,
    listaDeArticulos,
    productoNuevo,
    quitarProducto,
}