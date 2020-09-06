var commentsArray = [];


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data
            showComments(commentsArray);
        }
    });

});


if (localStorage.getItem("User-Logged")) {
    document.getElementById("commentInput").classList.remove("commentInput");
}

function showComments(array) {

    let product = ((JSON.parse(localStorage.getItem("productName")).product));
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let stars = "";


        for (let y = 0; y < 5; y++) {
            if (y < comment.score) {
                stars = stars + `<span class="fa fa-star checked"></span>`
            } else { stars = stars + `<span class="fa fa-star"></span>` }
        }


        htmlContentToAppend += `

            <a href="product-info.html" class="list-group-item list-group-item-action"; onclick="saveProductName('` + product.name + `');">

              <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>

                        <p class="mb-1">` + stars + `</p>

                        <p class="mb-1">` + comment.dateTime + `</p>


                    </div>

                </div>

            </a>
            `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    document.getElementById("comments-title").innerHTML = product;
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