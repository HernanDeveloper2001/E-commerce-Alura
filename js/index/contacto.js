const nombreInput = document.querySelector("#nombre-input");


nombreInput.addEventListener("input", () => {
    const nombre = nombreInput.value;
    const caracteres = /^[a-zA-Z]+$/;
    if (nombre.length < 3 || !caracteres.test(nombre)) {
        nombreInput.style.border = "2px solid red";
    } else {
        nombreInput.style.border = "2px solid green";
    }
});