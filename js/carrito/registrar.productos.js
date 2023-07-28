const productoNuevo = (nombre_producto, precio_producto, id_producto) => {
    const templateProducto = document.getElementById("template");
    const fragment = document.createDocumentFragment();
    
    const clonar = templateProducto.content.cloneNode(true);
    clonar.querySelector(".nombre_articulo").textContent = nombre_producto;
    clonar.querySelector(".precio_articulo").textContent = precio_producto;
    fragment.appendChild(clonar);
    valorTotalProducto()
    return fragment;
}

const carritoProducto = document.getElementById("ventana_carrito");

const valorTotalProducto = () => {
    const footerCarritoTotal = document.getElementById("footer");
    const footerfragment = document.createDocumentFragment()
    const clonar = footerCarritoTotal.content.cloneNode(true);
    clonar.querySelector(".total").textContent = 0;
    footerfragment.appendChild(clonar);
    return footerfragment;
}


const listaDeArticulos = () => {
    fetch("http://localhost:2000/productos")
        .then(respuesta => respuesta.json())
        .then(data => data.forEach(({nombre_producto, precio_producto, id_producto}) =>  {
            const nuevoProductoAgregado = productoNuevo(nombre_producto, precio_producto, id_producto)
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