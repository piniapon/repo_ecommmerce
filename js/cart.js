var cartArray = [];
var currency = "UYU"

toggleCurrency();

//agregar calcSubs

function toggleCurrency() {
    document.getElementById("toggleCurrency").addEventListener("click", function () {
        if (currency == "UYU") {
            currency = "USD"
        } else { currency = "UYU" }
        document.getElementsByClassName("currency").innerHTML = currency;
        calc()
    });
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
        document.getElementById("currency" + i).innerHTML = currency;

    }
}

function calcTotal() {
    let total = ""

    for (i = 0; i < cartArray.articles.length; i++) {
        let sub = parseInt(document.getElementById("sub" + i).innerHTML)
        total = total + "+" + sub;
    }
    document.getElementById("total").innerHTML = eval(total) + currency;
}

function calc() {
    calcSubTotal()
    calcTotal()
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
        <td class="currencyCol">  </td> 
        <td id="currency${i}"></td>
      </tr>
        `
    }

    document.getElementById("tableContent").innerHTML = content

}

document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data
            console.log(cartArray)
            showCart(cartArray)
            calc()
        }
    });


});




