var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
const hideDetails = document.getElementById("hideDetails");
const hideOrder = document.getElementById("hideOrder");
const hideBtn1 = document.querySelector('#placeOrder');
const hideBtn2 = document.querySelector('#continue');
const fullName = document.querySelector('#fullName');
const hideBtn0 = document.querySelector('#placeOrderBtn');
var count = 0;
var bookData;
let cartDetailsHTML = '';
let orderSummaryHTML = '';
let buttonHTML = '';
let cartCountHTML = '';

function getCartDetails() {

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    getService('bookstore_user/get_cart_items', headConfig)
        .then(res => {
            // window.location.href = 'cart.html';
            cartDetailsHTML = '';
            console.log("response ", res)
            bookData = res.data.result;
            console.log("bookData", bookData);
            // cartCountHTML +=`  <div class="myCart" >My cart(`+bookData.length+`)</div>`
            // document.getElementById("addedBooks").remove();
            for (var i = 0; i < bookData.length; i++) {


                cartDetailsHTML += 
                `<div class="border-container">`+
                    `<div class="book_cart_details">` +
                        `<div class="bookimg">` +
                            ` <img src="` + path + imgArray[i] + `" alt="">` +
                         `</div>` +
                        `<div class="bookshipping">` +
                            `<div class="tags">` +
                                ` <h3>` + bookData[i].product_id.bookName + `</h3>` +
                                `<p>` + bookData[i].product_id.author + `</p>` +
                                ` <p class="price">Rs` + bookData[i].product_id.price + `</p>` +
                                    `<div class="addRemoveBtn mt-2" id="buttons_addRemove">` +
                                         ` <span><button class="button button5 btnRemove " id="` + i + `" onclick="decreaseQnty(id) ">-</button></span>` +
                                          ` <span><button class="button  middleBtn" id="bookCount">` + bookData[i].quantityToBuy + `</button></span>` +
                                         ` <span><button class="button button5 btnAdd" id="` + i + `" onclick=" increaseQnty (id);">+</button></span>` +
                                         ` <span class="ml-3"><button class="button removeBtn" id="` + i + `" onclick=" removeItems (id)">Remove</button></span>` +
                                    ` </div>` +
                            ` </div>` +
                        ` </div>` +
                     `</div> ` +
                `</div> `
                


                orderSummaryHTML += `
                <div class="book_cart_details">
                    <div class="bookimg">
                        <img src="`+ path + imgArray[i] + `" alt="">
                     </div>
                    <div class="bookshipping">
                        <div class="tags">
                            <h3>`+ bookData[i].product_id.bookName + `</h3>
                            <p>`+ bookData[i].product_id.author + `</p>
                             <p class="price">Rs`+ bookData[i].product_id.price + `</p>
                        </div>

                    </div>
                </div>
                
                `


            }
            buttonHTML = ` 
            <button type="button" class="btn btn-secondary btnPo" onclick=" orderPlace(${i} )">Checkout</button>`

        
            document.getElementById('cartCount').innerHTML = `My cart(` + bookData.length + `)`
            document.getElementById("addedBooks").innerHTML = cartDetailsHTML;
            document.getElementById("orderSummary").innerHTML = orderSummaryHTML;
            document.getElementById("orderPlaced").innerHTML = buttonHTML;
        
           
          
            if (bookData.length == 0) {
                document.getElementById('countIcon').style.display = "none";
            } else {
                document.getElementById('countIcon').innerHTML = bookData.length;
            }
            // if(bookData =="Order successfully placed!!!"){
            //     bookData.length=0;
            //     document.getElementById('countIcon').innerHTML = bookData.length;
            // }

            removeDiv();

        })
}
getCartDetails();



const increaseQnty = (i) => {

    var selectedItem = bookData[i];
    console.log("iddd", selectedItem)
    console.log("qntyyy", bookData[i].quantityToBuy)
    let data =
    {
        "quantityToBuy": bookData[i].quantityToBuy + 1,
    }

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    putService(`bookstore_user/cart_item_quantity/${selectedItem._id}`, data, headConfig)
        .then(res => {
            console.log(res);
            getCartDetails();
        })
    console.log("quantitynow", data);
}
const decreaseQnty = (i) => {

    var selectedItem = bookData[i];
    var selectedQnty = bookData[i].product_id.quantity;

    console.log("iddd", selectedItem)
    console.log("qntyyy", bookData[i].product_id.quantity)
    let data =
    {
        "quantityToBuy": bookData[i].quantityToBuy - 1,
    }

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }

    if (data.quantityToBuy !== 0) {
        putService(`bookstore_user/cart_item_quantity/${selectedItem._id}`, data, headConfig)
            .then(res => {
                console.log(res);
                getCartDetails();
            })
    }
    console.log("quantitynow", data);
}

const removeItems = (i) => {

    var selectedItem = bookData[i];
    console.log("iddd", selectedItem)
    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }
    deleteService(`bookstore_user/remove_cart_item/${selectedItem._id}`, headConfig)

        .then(res => {
            console.log(res);
            getCartDetails();
            // removeDiv();
            //  document.getElementById("addedBooks").remove();
            //  hideBtn0.style.display = "none";
        })

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

    putService('bookstore_user/edit_user', data, headConfig)

        .then(res => {
            console.log(res);
            showOrder();

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
function removeDiv() {
    if (bookData.length !== 0) {
        hideBtn0.style.display = "flex";
    } else {
        hideBtn0.style.display = "none";
    }
}
function orderPlace(i) {
    var selectedItem = bookData[i];
    console.log("i", i)
    let orderArr = [];
    console.log("iddd", selectedItem)
    for (var j = 0; j < i; j++) {
        let orderObj = {
            "product_id": bookData[j].product_id._id,
            "product_name": bookData[j].product_id.bookName,
            "product_quantity": bookData[j].product_id.quantityToBuy,
            "product_price": bookData[j].product_id.price


        }
        console.log("bookdata value is", bookData[j].product_id)
        orderArr.push(orderObj);
    }
    console.log("orderarr", orderArr);
    console.log("orderarr", orderArr);
    console.log("orderarr", orderArr);
    console.log("orderarr", orderArr);
    let data =
    {
        "orders": orderArr
    }

    const headConfig = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('accessToken')
        }
    }

    postService('bookstore_user/add/order', data, headConfig)

        .then(res => {
            console.log(res);
            // if (res) {
            //    window.location.href = 'order_success.html';
            // }

        })
    console.log("orderData", data);
}
