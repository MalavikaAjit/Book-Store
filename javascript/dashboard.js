var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
var bookDetails;
let detailsHTML = '';

var bookData = '';


function getBookDetails() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
    };
    getService('bookstore_user/get/book', headers)
        .then(res => {
            console.log("res", res.data.result);
            bookDetails = res.data.result;
            for (var i = 0; i < bookDetails.length; i++) {
                var lastBtn = "lastBtn" + bookDetails[i]._id;
                var add_item = "addTo" + bookDetails[i]._id;
                var wish = "wishTo" + bookDetails[i]._id;
                detailsHTML += `<div class="col-lg-3 col-md-4 col-sm-6 pt-3  pb-3 gallery-margin">
            <div class="box1">
                <div class="img-box">
                    <img class="img-fluid" src="`+ path + imgArray[i] + `" alt="">
                </div>
              <div class="container">
              <div class="tags">
              <h3 class="bookDes">`+ bookDetails[i].bookName + `</h3>
              <p>`+ bookDetails[i].author + `</p>
              <p class="price">Rs ` + bookDetails[i].price + `</p>
              <div class="lastBtn" id="addWish_`+ bookDetails[i]._id + `">
              <div class="row">
                  <div class="col-sm-6 addToBagBtn cartBtn">
                        <button type="button" class="btn btn-primary btn-sm btnWidth" id="`+ bookDetails[i]._id + `" onclick="addToCart(` + i + `,id);">ADD TO BAG</button>
                  </div>
                  <div class="col-sm-6 wishlistBtn cartBtn text-right">
                      <button type="button" class="btn btn-secondary  btn-sm wishTo btnWidth" id="`+ bookDetails[i]._id + `" onclick="addToWishlist(` + i + `,id)">WISHLIST</button>
                  </div>
              </div>
              </div>
             

          </div>
              </div>
                    
                </div>
            </div>
        </div>`
            }
            document.getElementById('bookCount').innerHTML = `Books (${bookDetails.length})`
            document.getElementById("bookList").innerHTML = detailsHTML;

        })
}


getBookDetails();

function addToCart(i, id) {

    console.log("i", i)
    console.log("i", id)
    let data =
    {
        "product_id": id,
    }

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }

    postService(`bookstore_user/add_cart_item/${id}`, data, headConfig)
        .then(res => {
            console.log("add cart id", "addWish_" + id, document.getElementById("addWish_" + id));
            if (document.getElementById(`addWish_${id}`)) {
                document.getElementById(`addWish_${id}`).innerHTML = ` <div class="col-12 addToBagBtn">
                <button type="button" class="btn btn-primary btn-sm addTo" style="width: 100%;">ADDED TO BAG</button>
                  </div>`

            }
            getCartDetails();
        })



}






function addToWishlist(i, id) {
    var selectedItem = bookDetails[i];
    let data =
    {
        "product_id": selectedItem._id,
    }
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    postService(`bookstore_user/add_wish_list/${selectedItem._id}`, data, headConfig)
        .then(res => {
            console.log(res);
            if (document.getElementById(`addWish_${id}`)) {
                document.getElementById(`addWish_${id}`).innerHTML = ` <div class="col-12 wishlistBtn">
                <button type="button" class="btn  btn-sm wishTo" style="width: 100%;">WISHLIST ADDED</button>
                  </div>`
            }
        })

}
function getCartDetails() {
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    getService('bookstore_user/get_cart_items', headConfig)
        .then(res => {

            bookData = res.data.result;

            document.getElementById('countIcon').innerHTML = bookData.length;


            // document.getElementById("addedBooks").innerHTML = cartDetailsHTML;     



        })
}
getCartDetails();

