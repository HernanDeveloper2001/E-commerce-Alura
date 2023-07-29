import { productos } from "./registrar.productos.js";


function init() {
    // boton para agregar al carrito
    const botonCarrito = document.querySelector(".boton_compra");
    if(botonCarrito){
        botonCarrito.addEventListener("click", (event) => {
            event.preventDefault();


            //Contenedor de imagen y descripcion de la seccion
            const contenedorSeccionArticulos = event.target.closest(".seccion__articulo");

            //Toda la descripcion del articulo
            const imagenArticulo = contenedorSeccionArticulos.querySelector(".imagen_articulo").src;
            const nombreArticulo = contenedorSeccionArticulos.querySelector(".articulo_nombre").textContent;
            const precioArticulo = contenedorSeccionArticulos.querySelector(".articulo_precio").textContent;
            const cantidadArticulo = 1;
            // Utilizar nombres de variables correctos al guardar en sessionStorage
            sessionStorage.setItem("nombre_articulo", nombreArticulo);
            sessionStorage.setItem("precio_articulo", precioArticulo);
            sessionStorage.setItem("cantidad_articulo", cantidadArticulo);
            sessionStorage.setItem("imagen_articulo", imagenArticulo);

            productos.AgregarProductoCarrito(nombreArticulo,precioArticulo,cantidadArticulo,imagenArticulo)
                .then(()=> {
                    window.location.href = "carrito_compras.html";
                }).catch(error => console.log("Opss" + error))
            
        });
    }

}


document.addEventListener("DOMContentLoaded", init)

