var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
const hideDetails = document.getElementById("hideDetails");
const hideOrder = document.getElementById("hideOrder");
const hideBtn1 = document.querySelector('#placeOrder');
const hideBtn2 = document.querySelector('#continue');
const fullName = document.querySelector('#fullName');
const hideBtn0 = document.querySelector('#placeOrderBtn');

var bookData;
let cartDetailsHTML = '';
let orderSummaryHTML = '';
// let mycartBooksHTML =` <div class="myCart" id="cartCount" ></div>`
function getCartDetails() {
    // console.log("itemadded",item)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    getService('bookstore_user/get_cart_items', headConfig)
        .then(res => {
            // window.location.href = 'cart.html';
            console.log("response ", res)
            bookData = res.data.result;
            console.log("res", bookData);
            // displayCart(bookData);


            // addedBookDetails = res.data.result;
            for (var i = 0; i < bookData.length; i++) {

                cartDetailsHTML += `             
               
                <div class="book_cart_details">
                            <div class="bookimg">
                                <img src="`+ path + imgArray[i] + `" alt="">
                            </div>
                            <div class="bookshipping">
                                <div class="tags">
                                    <h3>`+ bookData[i].product_id.description + `</h3>
                                    <p>`+ bookData[i].product_id.author + `</p>
                                    <p class="price">`+ bookData[i].product_id.price + `</p>
                                    <div class="addRemoveBtn mt-2" id="buttons_addRemove">
                                        <span><button class="button button5 btnRemove " id="`+ i + `" onclick=" removeItems (id)">-</button></span>
                                        <span><button class="button  middleBtn" id="bookCount"></button></span>
                                        <span><button class="button button5 btnAdd" id="`+ i + `" onclick=" increaseQnty (id)">+</button></span>
                                        <span class="ml-3"><button class="button removeBtn">Remove</button></span>
                                    </div>
                                </div>

                            </div>
                </div>
                `

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
            document.getElementById('cartCount').innerHTML = `My cart (${bookData.length})`
            document.getElementById("addedBooks").innerHTML = cartDetailsHTML;
            document.getElementById("orderSummary").innerHTML = orderSummaryHTML;
            if (bookData.length !== 0) {
                hideBtn0.style.display = "flex";
            } else {
                hideBtn0.style.display = "none";
            }


        })
}
getCartDetails();


const increaseQnty = (i) => {

    var selectedItem = bookData[i];
    console.log("iddd", selectedItem)
    let data =
    {
        "quantityToBuy": 1
    }
    //   const baseurl =  "https://new-bookstore-backend.herokuapp.com/bookstore_user/registration";
    // axios.post(baseurl, data, headers)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    // console.log("headers",headers);
    putService(`bookstore_user/cart_item_quantity/${selectedItem._id}`, data, headConfig)
        // axios.post(baseurl, data, headers)
        .then(res => {
            console.log(res);

            // console.log(res.result._id)               

        })

    document.getElementById('bookCount').innerHTML = bookData.length;
}

const removeItems = (i) => {

    var selectedItem = bookData[i];
    console.log("iddd", selectedItem)

    //   const baseurl =  "https://new-bookstore-backend.herokuapp.com/bookstore_user/registration";
    // axios.post(baseurl, data, headers)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    // console.log("headers",headers);
    deleteService(`bookstore_user/remove_cart_item/${selectedItem._id}`, headConfig)
        // axios.post(baseurl, data, headers)
        .then(res => {
            console.log(res);

            // console.log(res.result._id)               

        })

    document.getElementById('bookCount').innerHTML = bookData.length;
}

const saveCustomerDetails = () => {
    var addressType;
    var ele = document.getElementsByName('type');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            addressType = ele[i].value;
    }

    const address = document.querySelector('#address');
    const city = document.querySelector('#city');
    const state = document.querySelector('#state');
    console.log("type", addressType)
    console.log("addres", address.value)
    console.log("city", city.value)
    console.log("state", state.value)
    // var selectedItem = bookData[i];
    // console.log("iddd", selectedItem)
    let data =
    {
        "addressType": addressType,
        "fullAddress": address.value,
        "city": city.value,
        "state": state.value
    }

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    // console.log("headers",headers);
    putService('bookstore_user/edit_user', data, headConfig)
        // axios.post(baseurl, data, headers)
        .then(res => {
            console.log(res);
            showOrder();

            // console.log(res.result._id)               

        })


}


function showDetails() {
    hideDetails.style.display = "block";
    hideBtn1.style.display = "none";
}

function showOrder() {
    if (fullName.value !== '') {
        hideOrder.style.display = "block";
        hideBtn2.style.display = "none";
    }
}


var count = 0;
var btnAdd = document.querySelector(".btnAdd");
var btnRemove = document.querySelector(".btnRemove");
var disp = document.getElementById("bookCount");
btnAdd.onclick = function () {

    disp.innerHTML = count;
    count++;

}
btnRemove.onclick = function () {
    count--;
    disp.innerHTML = count;
}
