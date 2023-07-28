function init() {
  const verProducto = document.querySelectorAll(".ver_producto");
  
  if(verProducto){
    verProducto.forEach(item => item.addEventListener("click", (event) => {
      const contenedorVenta = event.target.closest(".ventas");
      const imagen_venta = contenedorVenta.querySelector(".ventas__imagen").getAttribute("data-imagen");
      const nombre_venta = contenedorVenta.querySelector(".venta__detalles-titulo").textContent;
      const precio_venta = contenedorVenta.querySelector(".precio-venta").textContent;
    
      sessionStorage.setItem("nombre_articulo", nombre_venta);
      sessionStorage.setItem("precio_articulo", precio_venta);
      sessionStorage.setItem("imagen_articulo", imagen_venta);
    
      window.location.href = "articulo.html";
      
    }));
  }
}

document.addEventListener("DOMContentLoaded",init);

