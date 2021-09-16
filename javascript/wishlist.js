var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
const hideDetails = document.getElementById("hideDetails");
const hideOrder = document.getElementById("hideOrder");
const hideBtn1 = document.querySelector('#placeOrder');
const hideBtn2 = document.querySelector('#continue');
const fullName = document.querySelector('#fullName');
const hideBtn0 = document.querySelector('#placeOrderBtn');

var bookData;
let wishlistItemsHTML = '';
function getWishlistDetails() {
  const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    getService('bookstore_user/get_wishlist_items', headConfig)
        .then(res => {
           console.log("response ", res)
            bookData = res.data.result;
            console.log("res", bookData);
           for (var i = 0; i < bookData.length; i++) {

                wishlistItemsHTML += `
                <div class="border-container">
                    <div class="book_cart_details">
                        <div class="bookimg">
                            <img src="`+ path + imgArray[i] + `" alt="">
                        </div>
                        <div class="bookshipping">
                            <div class="tags">
                                <h3>`+ bookData[i].product_id.description + `</h3>
                                 <p>`+ bookData[i].product_id.author + `</p>
                                 <p class="price">Rs `+ bookData[i].product_id.price + `</p>
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="wishlistDeleteBtn">
                                <i class="far fa-trash-alt" id="`+ i + `" onclick="deleteWishlistItems(id)"></i>
                </div>
                
                `
            }
            document.getElementById('cartCount').innerHTML = `My wishlist (${bookData.length})`
            
            document.getElementById("wishlistItems").innerHTML = wishlistItemsHTML;
         
        })
}
getWishlistDetails();


const deleteWishlistItems = (i) => {

    var selectedItem = bookData[i];
    console.log("iddd", bookData[i].product_id._id)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    deleteService(`bookstore_user/remove_wishlist_item/${bookData[i].product_id._id}`, headConfig)

        .then(res => {
            console.log(res);

        })

}