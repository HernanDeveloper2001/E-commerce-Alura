import { productos } from "./registrar.productos.js";


function init() {

    // boton para agregar al carrito
    const botonCarrito = document.querySelector(".boton_compra");
    if(botonCarrito){
        botonCarrito.addEventListener("click", (event) => {
            event.preventDefault();
            const contenedorArticulo = event.target.closest(".articulo-contenido-descripcion");
            const nombreArticulo = contenedorArticulo.querySelector(".articulo_nombre").textContent;
            const precioArticulo = contenedorArticulo.querySelector(".articulo_precio").textContent;

            
            sessionStorage.setItem("nombre_articulo", nombreArticulo);
            sessionStorage.setItem("precio_articulo", precioArticulo);

            productos.AgregarProductoCarrito(nombreArticulo,precioArticulo)
                .then(()=> {
                    window.location.href = "carrito_compras.html";
                }).catch(error => console.log("Opss" + error))
        });
    }

    
}


document.addEventListener("DOMContentLoaded", init)

