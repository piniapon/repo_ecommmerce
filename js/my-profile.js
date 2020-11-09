//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {



    let userData = JSON.parse(localStorage.getItem("user-data"))
    mostrarData()


    function mostrarData() {
        if (userData) {
            let displayEdad = document.getElementById("edad");
            let displayNombre = document.getElementById("nombre");
            let displayApellido = document.getElementById("apellido");
            let displayCalle = document.getElementById("calle");
            let displayPuerta = document.getElementById("puerta");
            let displayEsquina = document.getElementById("esquina");
            let displayTelefono = document.getElementById("telefono");
            let displayMail = document.getElementById("mail");

            document.getElementById("inputNombre").value = userData.nombre
            document.getElementById("inputEdad").value = userData.edad
            document.getElementById("inputApellido").value = userData.apellido
            document.getElementById("inputCalle").value = userData.calle
            document.getElementById("inputEsquina").value = userData.esquina
            document.getElementById("inputPuerta").value = userData.puerta
            document.getElementById("inputTelefono").value = userData.telefono
            document.getElementById("inputMail").value = userData.mail


            displayNombre.innerHTML = userData.nombre;
            displayApellido.innerHTML = userData.apellido;
            displayEdad.innerHTML = userData.edad;
            displayCalle.innerHTML = userData.calle;
            displayPuerta.innerHTML = userData.puerta;
            displayEsquina.innerHTML = "esquina " + userData.esquina;
            displayTelefono.innerHTML = userData.telefono;
            displayMail.innerHTML = userData.mail;
        }

    }





    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');

                    if (form.checkValidity() == true) {
                        event.preventDefault();
                        event.stopPropagation();
                        localStorage.setItem("user-data", JSON.stringify({
                            nombre: inputNombre.value,
                            apellido: inputApellido.value,
                            calle: inputCalle.value,
                            edad: inputEdad.value,
                            puerta: inputPuerta.value,
                            esquina: inputEsquina.value,
                            mail: inputMail.value,
                            telefono: inputTelefono.value
                        }))
                        userData = JSON.parse(localStorage.getItem("user-data"))
                        mostrarData()

                    }
                });
            });
        });
    })()

});