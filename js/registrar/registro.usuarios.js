
const usuarioNuevoLinea = (nombre, correo , id) => {
    const template = document.getElementById("template");
    const fragment = document.createDocumentFragment()
    const clone = template.content.cloneNode(true);
    clone.getElementById("nombre_usuario").textContent = nombre;
    clone.getElementById("correo_usuario").textContent = correo;
    fragment.appendChild(clone);
    return fragment;
}

const contenedor = document.getElementById("seccion_usuarios");

const listarUsuarios= () => {
    fetch("http://localhost:3000/registro")
    .then((respuesta) => respuesta.json())
    .then(data => data.forEach(({nombre, correo, id}) => {
        const nuevaLineaUsuario = usuarioNuevoLinea(nombre, correo , id) 
        contenedor.appendChild(nuevaLineaUsuario)
    }))
    .catch(error => console.log("Ops.." + error))

}

listarUsuarios()


const crearUsuario = (nombre, correo) =>{
    return fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({nombre, correo, id:uuid.v4()}),
    })
}

export const utilidades = {
    crearUsuario,
    listarUsuarios
}