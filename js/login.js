var usuarios = [];

const userURL = "https://danielk2020.github.io/biblioteca/usuarios.json";

const fields = document.getElementsByTagName("input");

function validateUser(m, p, arr) {
    let i;
    for (i = 0; i < arr.length; i++) {

        if (arr[i].email === m && arr[i].password === p) {
            return true
        }

    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    let userData = localStorage.getItem("user-data");

    var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);


    for (const field of fields) {
        field.addEventListener("click", function (event) {
            this.classList.remove("is-invalid")
        });
    }


    getJSONData(userURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            usuarios = resultObj.data;
        }
    });

    document.getElementById("submit").addEventListener("click", function () {


        var email = document.getElementById("inputEmail").value;
        var password = document.getElementById("inputPassword").value;
        var validUser = validateUser(email, password, usuarios)

        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var mensaje = "";

        if (password == "" || email == "") {
            if (password == "") {
                document.getElementById("inputPassword").classList.add("is-invalid")
                mensaje += "el campo password no puede estar vacio";

            }

            if (email == "") {
                document.getElementById("inputEmail").classList.add("is-invalid");
                mensaje += "el campo mail no puede quedar vacio"

            }
        } else if (password.length < 5 || !(re.test(String(email).toLowerCase()))) {

            if (password.length < 5) {

                mensaje += "la contraseña no puede contener menos de 5 caracteres";


            } if (!(re.test(String(email).toLowerCase()))) {
                mensaje += "ingresaste un email invalido"
            }
        } else {

            if (validUser) {
                window.location.href = "inicio.html"
                localStorage.setItem("User-Logged", JSON.stringify({ email: inputEmail.value }))

            } else {
                mensaje += "el usuario no concuerda con los registros"
            }

        }

        if (mensaje != "") {
            alert(mensaje)
        }

    });

})

