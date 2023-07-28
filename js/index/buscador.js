// buscador a seccion de ventas
let buscador = document.getElementById("buscador");

const seccionErrorProducto = document.querySelector(".seccion-error") 
const templateErroProducto = document.querySelector("#error-contenido");
 


//buscador
buscador.addEventListener("keyup",() =>{
    let venta = document.getElementsByClassName("venta__detalles");
    for (let i = 0; i < venta.length; i++) {
        let titulo = venta[i].querySelector(".venta__detalles-titulo");
        let contenido = titulo.textContent;
        let valorBusqueda = buscador.value;
        
        if (contenido.indexOf(valorBusqueda) === -1) {
            venta[i].parentElement.style.display = "none";

        }
        else {
            venta[i].parentElement.style.display = "";
            titulo.innerHTML = resaltarCoincidencias(contenido, valorBusqueda);

        }
    }
});

function resaltarCoincidencias(contenido, valorBusqueda) {
    let regex = new RegExp(valorBusqueda, 'gi');
    return contenido.replace(regex, '<span class="resaltado">$&</span>');
}
