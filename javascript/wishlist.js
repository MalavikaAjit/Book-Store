var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
const hideDetails = document.getElementById("hideDetails");
const hideOrder = document.getElementById("hideOrder");
const hideBtn1 = document.querySelector('#placeOrder');
const hideBtn2 = document.querySelector('#continue');
const fullName = document.querySelector('#fullName');
const hideBtn0 = document.querySelector('#placeOrderBtn');

var bookData;

let orderSummaryHTML = '';
// let mycartBooksHTML =` <div class="myCart" id="cartCount" ></div>`
function getWishlistDetails() {
    // console.log("itemadded",item)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    getService('bookstore_user/get_wishlist_items', headConfig)
        .then(res => {
            // window.location.href = 'cart.html';
            console.log("response ", res)
            bookData = res.data.result;
            console.log("res", bookData);
            // displayCart(bookData);


            // addedBookDetails = res.data.result;
            for (var i = 0; i < bookData.length; i++) {

                orderSummaryHTML += `
                <div class="book_cart_details">
                    <div class="bookimg">
                        <img src="`+ path + imgArray[i] + `" alt="">
                     </div>
                    <div class="bookshipping">
                        <div class="tags">
                            <h3>`+ bookData[i].product_id.description + `</h3>
                            <p>`+ bookData[i].product_id.author + `</p>
                             <p class="price">`+ bookData[i].product_id.price + `</p>
                        </div>

                    </div>
                </div>
                
                `
            }
            document.getElementById('cartCount').innerHTML = `My wishlist (${bookData.length})`
            
            document.getElementById("orderSummary").innerHTML = orderSummaryHTML;
            // if (bookData.length !== 0) {
            //     hideBtn0.style.display = "flex";
            // } else {
            //     hideBtn0.style.display = "none";
            // }


        })
}
getWishlistDetails();