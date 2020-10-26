var cartArray = [];
var currency = "UYU"
var delButtons = document.getElementsByClassName("delBtn");
var metodoRadio = document.getElementsByName("metodo");
var creditInput = document.getElementsByClassName("creditInput");
var transInput = document.getElementsByClassName("transInput");



toggleCurrency();



function toggleCurrency() {
    document.getElementById("toggleCurrency").addEventListener("click", function () {
        if (currency == "UYU") {
            currency = "USD"
        } else { currency = "UYU" }
        document.getElementsByClassName("currency").innerHTML = currency;
        document.getElementById("toggleCurrency").innerHTML = currency + `<i class="fas fa-exchange-alt"></i>`
        calc()
    });
}

var envioInputs = document.getElementsByName("envio")

function calcEnvio() {
    let envio = 0;
    let subtotal = parseInt(document.getElementById("total").innerText);
    for (let input of envioInputs) {
        if (input.checked == true && input.value == "standard") {
            envio = eval(subtotal + "*" + "0.05")
        } else if (input.checked == true && input.value == "express") {
            envio = eval(subtotal + "*" + "0.07")
        } else if (input.checked == true && input.value == "premium") {
            envio = eval(subtotal + "*" + "0.15")
        }
    }



    document.getElementById("envioValue").innerHTML = envio
}


function calcSubTotal() {

    for (i = 0; i < cartArray.articles.length; i++) {
        let qty = document.getElementById("count" + i).value;
        let unitC = document.getElementById("unitCost" + i).innerHTML;
        let subtotal = eval(unitC + "*" + qty);

        if (currency == "UYU" && cartArray.articles[i].currency == "USD") {
            subtotal = eval(subtotal + "*" + 40)
        }

        if (currency == "USD" && cartArray.articles[i].currency == "UYU") {
            subtotal = eval(subtotal + "/" + 40)
        }

        document.getElementById("sub" + i).innerHTML = subtotal;

    }
}

function calcTotal() {
    let total = ""

    for (i = 0; i < cartArray.articles.length; i++) {
        let sub = parseInt(document.getElementById("sub" + i).innerHTML)
        total = total + "+" + sub;
    }
    document.getElementById("total").innerHTML = eval(total);

}

function calcFinal() {
    let final = eval(parseInt(document.getElementById("total").innerHTML) + "+" + parseInt(document.getElementById("envioValue").innerHTML));
    document.getElementById("final").innerHTML = final + currency

}

function calc() {

    calcSubTotal()
    calcTotal()
    calcEnvio()
    calcFinal()

}


function showCart(array) {
    let content = "";

    for (let i = 0; i < array.articles.length; i++) {
        let articulo = array.articles[i];

        content += `
        
        <tr>
        <td> ${articulo.name} </td>
        <td><img src="${articulo.src}" alt="">
        </td>
        <td> 
        <div class="number-input md-number-input">
        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown(); calc()" class="minus"></button>
        <input id="count${i}" class="quantity" min="0" name="quantity" value="${articulo.count}" type="number" onchange="calc()">
        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); calc()" class="plus"></button>
      </div>
        </td>
        <td> <span id="unitCost${i}">${articulo.unitCost} </span>${articulo.currency} </td>
        <td> <span class="totals" id="sub${i}"></span> </td> 
        <td><button onClick="del()" class="delBtn" id="${"del" + i}" style="border: 0"><i class="fas fa-trash"></i></button></td>
      </tr>
        `
    }

    document.getElementById("tableContent").innerHTML = content

}


function del() {
    let index = parseInt(this.id);
    cartArray.articles.splice(index, 1)
    showCart(cartArray)
    calc()
}

document.addEventListener("DOMContentLoaded", function (e) {

    for (let i = 0; i < metodoRadio.length; i++) {
        metodoRadio[i].addEventListener("change", function () {
            if (this.value != "credito") {
                document.getElementById("credit").style.display = "none"
                for (let i = 0; i < creditInput.length; i++) {
                    creditInput[i].removeAttribute("required")
                    transInput[i].setAttribute("required", true)

                }
            } else {
                document.getElementById("credit").style.display = "block"
                for (let i = 0; i < transInput.length; i++) {
                    transInput[i].removeAttribute("required")
                    creditInput[i].setAttribute("required", true)

                }
            }

            if (this.value != "transferencia") {
                document.getElementById("transferencia").style.display = "none"
                for (let i = 0; i < transInput.length; i++) {
                    transInput[i].removeAttribute("required")
                    creditInput[i].setAttribute("required", true)
                }
            } else {
                document.getElementById("transferencia").style.display = "block"
                for (let i = 0; i < creditInput.length; i++) {
                    creditInput[i].removeAttribute("required")
                    transInput[i].setAttribute("required", true)
                }
            }
        })
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
                        alert("sent")
                    }
                });
            });
        });
    })();


    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data
            console.log(cartArray)
            showCart(cartArray)
            calc()
        }



    });

});







