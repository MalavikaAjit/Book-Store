var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
var bookDetails;
// var headingArray = ["North Shore Preserve","James Island","Costeterra","Barbuda Ocean Club","Driftwood","Troubadour","Playa Grande","Chileno Bay","The Summit"];
// var tagArray = ["Kaua'i, Hawaii","Southern Gulf Islands","Comporta, Portugal", "Barbuda, West Indies","Austin, Texas","Nashville, Tennessee","Rio San Juan, Dominican Republic","Cabo San Lucas, Mexico","Las Vegas, Nevada"];
// var priceArray = ["rs 15005","rs 157800","rs 21500", "rs 152200","rs 15070","rs 15800","rs 144500","rs 81500","rs 1500a"];
// var arrayOfATags = [];
let detailsHTML = '';




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
                var lastBtn = "lastBtn" + bookDetails._id;
                var add_item = "addTo" + bookDetails._id;
                var wish = "wishTo" + bookDetails._id;
                detailsHTML += `<div class="col-lg-3 col-md-4 col-sm-6 pt-3  pb-3 gallery-margin">
            <div class="box1">
                <div class="img-box">
                    <img class="img-fluid" src="`+ path + imgArray[i] + `" alt="">
                </div>
                <div class="tags">
                    <h3 class="bookDes">`+ bookDetails[i].description + `</h3>
                    <p>`+ bookDetails[i].author + `</p>
                    <p class="price">Rs ` + bookDetails[i].price + `</p>
                    <div class="lastBtn" id="`+ lastBtn + `">
                        <div class="col-sm-6 addToBagBtn">
                      <button type="button" class="btn btn-primary btn-sm addTo" id="`+ i + `" onclick="addToCart(id);">ADD TO BAG</button>
                        </div>
                        <div class="col-sm-6 wishlistBtn" id="wishlistBtn">
                            <button type="button" class="btn btn-secondary  btn-sm wishTo" id="`+ i + `" onclick="addToWishlist(id)">WISHLIST</button>
                        </div>
        
                    </div>
                    <div class="lastBtnAdd">
                        <div class="col-sm-6 addToBagBtn" id=`+ add_item + ` style="display: none">
                            <button type="button" class="btn btn-primary btn-sm addTo" >ADD TO BAG</button>
                        </div>
                    </div>
                    <div class="lastBtn" id="lastBtn">
                    <div class="col-sm-6 wishlistBtn" id="`+ wish + `" style="display: none">
                        <button type="button" class="btn btn-secondary  btn-sm wishTo" >WISHLIST</button>
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

function addToCart(i) {
    var selectedItem = bookDetails[i];
    console.log("iddd", selectedItem)
    let data =
    {
        "product_id": selectedItem._id,
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
    postService(`bookstore_user/add_cart_item/${selectedItem._id}`, data, headConfig)
        // axios.post(baseurl, data, headers)
        .then(res => {
            console.log(res);
            if(res){                
                    window.location.href = 'cart.html';
                   showPlaceOrder();
            }
                    
                        })
                    
            }
            // if (document.getElementById('lastBtn' + selectedItem._id)) {
            //     if (document.getElementById('lastBtn' + selectedItem._id).style.display = "block") {
            //         document.getElementById('lastBtn' + selectedItem._id).style.display = "none";
            //         //    document.getElementById('addTo'+selectedItem._id).style.display = "block";   
            //     }
            // }

       



function addToWishlist(i) {
    var selectedItem = bookDetails[i];
    console.log("iddd", id)
    let data =
    {
        "product_id": selectedItem._id,
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
    postService(`bookstore_user/add_wish_list/${selectedItem._id}`, data, headConfig)
        // axios.post(baseurl, data, headers)
        .then(res => {
            console.log(res);
            // console.log(res.result._id)               

        })

}
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
            if( window.location.href = 'cart.html'){
            let bookData = res.result;
            console.log("res", bookData);
            displayCart(bookData);
            }
        //     let cartDetailsHTML ='';
        //     // addedBookDetails = res.data.result;
        //     for (var i = 0; i < bookData.length; i++) {
              
        //         cartDetailsHTML += `<div class="bookDetails">
        //         <div class="bookimg">
        //             <img src="../assets/dashboard/Image 12.png" alt="">
        //         </div>
        //         <div class="bookshipping">
        //             <div class="tags">
        //             <h3 class="bookDes">`+ bookData[i].description + `</h3>
        //             <p>`+ bookData[i].author + `</p>
        //             <p class="price">Rs ` + bookData[i].price + `</p>
        //                 <div class="addRemoveBtn mt-2">
        //                     <span><button class="button button5">-</button></span>
        //                     <span><button class="button  middleBtn">1</button></span>
        //                     <span><button class="button button5">+</button></span>
        //                     <span class="ml-3"><button class="button removeBtn">Remove</button></span>
        //                 </div>
        //             </div>

        //         </div>

        //     </div>`
        //     }
        //     document.getElementById('cartCount').innerHTML = `My cart (${bookData.length})`
        //     document.getElementById("addedBooks").innerHTML = cartDetailsHTML;
        //     getCartDetails();
        // }
        })    
}


const displayCart = (bookData) =>{
    let cartDetailsHTML ='';
            // addedBookDetails = res.data.result;
            for (var i = 0; i < bookData.length; i++) {
              
                cartDetailsHTML += `<div class="bookDetails">
                <div class="bookimg">
                    <img src="`+ path + imgArray[i] + `" alt="">
                </div>
                <div class="bookshipping">
                    <div class="tags">
                    <h3 class="bookDes">`+ bookData[i].description + `</h3>
                    <p>`+ bookData[i].author + `</p>
                    <p class="price">Rs ` + bookData[i].price + `</p>
                        <div class="addRemoveBtn mt-2">
                            <span><button class="button button5">-</button></span>
                            <span><button class="button  middleBtn">1</button></span>
                            <span><button class="button button5">+</button></span>
                            <span class="ml-3"><button class="button removeBtn">Remove</button></span>
                        </div>
                    </div>

                </div>

            </div>`
            }
            document.getElementById('cartCount').innerHTML = `My cart (${bookData.length})`
            document.getElementById("addedBooks").innerHTML = cartDetailsHTML;
            
        }
