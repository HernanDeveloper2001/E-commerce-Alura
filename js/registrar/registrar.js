import { utilidades} from './registro.usuarios.js';

function init() {
    const passwordInput = document.getElementById('password-input');
    const emailInput = document.getElementById("email-input");
    const loginForm = document.getElementById("login-form");
    const nombreInput = document.getElementById("nombre-input");
    

    // validacion de datos
    if(loginForm) {
        loginForm.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const nombre = nombreInput.value;
            const correo = emailInput.value;

            const errorForm = document.querySelector("#error");
            
            if (emailInput.checkValidity() && passwordInput.checkValidity() && nombre.length > 0) {
                utilidades.crearUsuario(nombre, correo)
                    .then(()=> {
                        window.location.href = "lista_usuarios.html";
                        loginForm.reset();
                    }).catch(error => console.log("Opss" + error))
            } 
            else {
                errorForm.style.display = "block";
            }
        });
    }

    // Campo de e-mail
    if(emailInput) {
        emailInput.addEventListener("input", () => {
            const email = emailInput.value;
            const validEmail = /^[^\s@]+@[^\s@]+\.(com|es)$/i.test(email);
      
            if (validEmail) {
                emailInput.setCustomValidity("");
                emailInput.style.border = "2px solid green"
            } else {
                emailInput.setCustomValidity("El e-mail debe llevar @ y (.com o .es)")
                emailInput.style.border = "2px solid red"
            }
        });
    }
  
    // Campo de contraseña
    if(passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
      
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasLetterAndNumbers = /^[a-zA-Z0-9]+$/.test(password);
      
            if (hasUpperCase && hasNumber && hasLetterAndNumbers) {
                passwordInput.setCustomValidity("");
                passwordInput.style.border = "2px solid green"
            } else {
                passwordInput.setCustomValidity("La contraseña tiene que contener (minusculas, mayusculas, numeros) maximo 15 caracteres")
                passwordInput.style.border = "2px solid red"
            }
        });
    }

}
  
  // Llama a la función init cuando se haya cargado completamente el DOM
  document.addEventListener("DOMContentLoaded", init);