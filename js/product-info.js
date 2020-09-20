var commentsArray = [];
var carArray = [];
var productsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carArray = resultObj.data
            showCarInfo(carArray)
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data
            showComments(commentsArray);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data
            showRecommended(productsArray, carArray)
        }
    });

});

// si el usuario no esta loggeado no se ve el input de los commentarios.

if (localStorage.getItem("User-Logged")) {
    document.getElementById("commentInput").classList.remove("commentInput");
}


// Quiero aclarar que el nombre del auto si se guarda y por ende no correponde a las imagenes puesto que la idea del obligatorio
// era solo trabajar con un solo auto pero queria aplicar guardar algun identificador del producto 
// (en este caso el nombre, que en un caso real no seria lo mas adecuado) a modo de practica.

function showComments(array) {
    let product = ((JSON.parse(localStorage.getItem("productName")).product));
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let stars = "";


        for (let i = 0; i < 5; i++) {
            if (i < comment.score) {
                stars = stars + `<span class="fa fa-star checked"></span>`
            } else { stars = stars + `<span class="fa fa-star"></span>` }
        }


        htmlContentToAppend += `

            <div class="list-group-item list-group-item-action"; onclick="saveProductName('` + product.name + `');">

              <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                        </div>
                        <p style= class="mb-1">"` + comment.description + `"</p>

                        <p class="mb-1">` + stars + `</p>

                        <p class="mb-1">` + comment.dateTime + `</p>


                    </div>

                </div>

            </div>
            `
    }

    document.getElementById("com-list-container").innerHTML = htmlContentToAppend;
}

// Las imagenes se agregan de forma dinamica en un carrusel de Bootstrap

function showCarInfo(array) {

    let product = ((JSON.parse(localStorage.getItem("productName")).product));
    let carouselSlidesToAppend = "";
    let carDescriptionToAppend = carArray.description;
    let carPriceToAppend = carArray.cost + " " + carArray.currency;
    let carSoldToAppend = carArray.soldCount + " " + "vendidos"


    for (let i = 0; i < array.images.length; i++) {
        let image = array.images[i]

        if (i == 0) {

            carouselSlidesToAppend += `

        <div class="carousel-item active">
        <img class="d-block w-100" src=" ${image} ">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>

            `} else {

            carouselSlidesToAppend += `

                <div class="carousel-item">
                <img class="d-block w-100" src=" ${image} ">
                <div class="carousel-caption d-none d-md-block">
                </div>
              </div>

                    `}

    }


    document.getElementById("car-title").innerHTML = product;
    document.getElementById("car-description").innerHTML = carDescriptionToAppend;
    document.getElementById("carousel-inner").innerHTML = carouselSlidesToAppend;
    document.getElementById("precio").innerHTML = carPriceToAppend;
    document.getElementById("vendidos").innerHTML = carSoldToAppend;

}

function saveComment(array) {
    let commentValue = document.getElementById("commentField").value;
    let rating = Number(document.getElementById("rating-custom-icons").value);
    let d = new Date();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    let comment = {
        score: rating,
        description: commentValue,
        user: JSON.parse(localStorage.getItem("User-Logged")).email,
        dateTime: date + " " + time
    }

    array.push(comment)
    showComments(commentsArray);
    document.getElementById("commentField").value = "";
    document.getElementById("rating-custom-icons").value = 0;
}

function showRecommended(array1, array2) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array1.length; i++) {

        for (let y = 0; y < array2.relatedProducts.length; y++) {

            if (i == array2.relatedProducts[y]) {
                let related = array1[i];
                htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action"; onclick="saveProductName('` + related.name + `');">
                <div class="row">
                    <div class="col-3">
                        <img src="` + related.imgSrc + `" alt="` + related.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ related.name + `</h4>
                            <h4 class="mb-1">`+ related.cost + " " + related.currency + `</h4>
                        </div>
                        <p class="mb-1">` + related.description + `</p>

                        <p class="mb-1">` + related.soldCount + ` vendidos </p>

                    </div>
                </div>
            </a>
            `
            }
        }
    }

    document.getElementById("rel-list-container").innerHTML = htmlContentToAppend;
}