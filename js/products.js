//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];
var relevFlag = false;
var min = undefined;
var max = undefined;


function saveProductName(name) {
    localStorage.setItem('productName', JSON.stringify({ product: name }))
}


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action"; onclick="saveProductName('` + product.name + `');">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <h4 class="mb-1">`+ product.cost + " " + product.currency + `</h4>
                        </div>
                        <p class="mb-1">` + product.description + `</p>

                        <p class="mb-1">` + product.soldCount + ` vendidos </p>

                    </div>
                </div>
            </a>
            `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

var icon = document.getElementById("relevIcon");

function ordenar(criterio, array) {


    if (criterio == "precio-ascendiente") {
        let result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
        return result
    }

    if (criterio == "precio-descendiente") {
        let result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
        return result

    }

    if (criterio == "precio-descendiente") {
        let result = array.sort(function (a, b) {
            if (a.precio > b.precio) {
                return -1;
            }
            if (a.precio < b.precio) {
                return 1;
            }
            return 0;
        });
        return result

    }

    if (criterio == "precio-descendiente") {
        let result = array.sort(function (a, b) {
            if (a.precio < b.precio) {
                return -1;
            }
            if (a.precio > b.precio) {
                return 1;
            }
            return 0;
        });
        return result
    }

    if (relevFlag == false && criterio == "relevancia") {
        let result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;
        });
        icon.classList.remove("fa-sort-amount-down");
        icon.classList.add("fa-sort-amount-up");

        relevFlag = true;
        return result;
    } else if (relevFlag == true && criterio == "relevancia") {
        let result = array.sort(function (a, b) {
            if (a.soldCount < b.soldCount) {
                return -1;
            }
            if (a.soldCount > b.soldCount) {
                return 1;
            }
            return 0;
        });
        icon.classList.remove("fa-sort-amount-up");
        icon.classList.add("fa-sort-amount-down");
        relevFlag = false;
        return result;
    }

    if (criterio == "rango-precio") {

        var i;
        result = [];
        for (i = 0; i <= array.length - 1; i++) {
            if (((min == undefined) || (min != undefined && parseInt(array[i].cost) >= min)) &&
                ((max == undefined) || max != undefined && parseInt(array[i].cost) <= max)) {
                result.push(array[i])
            }
        }
        return result
    }

}

//agregue todos los event listeners de los botones con un loop, hice los filtros de manera tal que solo 
// se aplica uno a la vez.

var buttons = document.getElementsByClassName("btn");

for (button of buttons) {
    button.addEventListener("click", function () {

        if (this.id == "sortAsc") {
            showProductsList(ordenar("precio-ascendiente", productsArray));
        }

        if (this.id == "sortDesc") {
            showProductsList(ordenar("precio-descendiente", productsArray));
        }

        if (this.id == "sortByCount") {
            showProductsList(ordenar("relevancia", productsArray));
        }

        if (this.id == "rangeFilterCount") {

            min = document.getElementById("rangeFilterCountMin").value;
            max = document.getElementById("rangeFilterCountMax").value;

            if ((min != undefined) && (min != "") && (min >= 0)) {
                min = parseInt(min);
            } else {
                min = undefined;
            }

            if ((max != undefined) && (max != "") && (max >= 0)) {
                max = parseInt(max);
            } else {
                max = undefined;
            }

            console.log(ordenar("rango-precio", productsArray))
            showProductsList(ordenar("rango-precio", productsArray));
        }

        if (this.id == "clearRangeFilter") {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            showProductsList(productsArray)
        }

    })

}


// esta searchbar puede claramente puede ser mas compleja, tome solo dos test cases a consideracion y esta pensada para recibir
//solo un termino de busqueda pero dicho termino puede encontrarse en la totalidad del string del nombre de cada objeto.

function busqueda(array, word) {
    result = [];
    let a;
    for (a = 0; a < array.length; a++) {

        let nameArr = (array[a].name).split(" ");
        let b;
        for (b = 0; b < nameArr.length; b++) {
            if (word === (nameArr[b]).slice(0, word.length).toLowerCase()) {
                result.push(array[a])
            }
        }

    }
    return result
}


document.getElementById("searchBar").addEventListener("keyup", function () {
    let searchTerm = document.getElementById("searchBar").value;
    if (searchTerm) {
        showProductsList(busqueda(productsArray, searchTerm));
    } else {
        showProductsList(productsArray);
    }
})


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data
            console.log(productsArray)
            showProductsList(productsArray)
        }
    });

});


