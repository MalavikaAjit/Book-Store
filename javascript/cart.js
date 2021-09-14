var imgArray = ["Image 36.png", "Image 13.png", "Image 12.png", "Image 14.png", "Image 18.png", "Image 10.png", "Image 7.png", "Image 22.png", "Image 18.png", "Image 10.png", "Image 11.png", "Image 36.png", "Image 22.png", "Image 23.png", "Image 7.png", "Image 13.png"];
var path = "../assets/dashboard/";
// var headingArray = ["North Shore Preserve","James Island","Costeterra","Barbuda Ocean Club","Driftwood","Troubadour","Playa Grande","Chileno Bay","The Summit"];
// var tagArray = ["Kaua'i, Hawaii","Southern Gulf Islands","Comporta, Portugal", "Barbuda, West Indies","Austin, Texas","Nashville, Tennessee","Rio San Juan, Dominican Republic","Cabo San Lucas, Mexico","Las Vegas, Nevada"];
// var priceArray = ["rs 15005","rs 157800","rs 21500", "rs 152200","rs 15070","rs 15800","rs 144500","rs 81500","rs 1500a"];
// var arrayOfATags = [];
let detailsHTML = '';




function getBookDetails(){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
    };
    getService('bookstore_user/get/book', headers)
    .then(res=> {
        console.log("res",res.data.result);
        var bookDetails = res.data.result;
        for (var i = 0;i<bookDetails.length;i++){
            detailsHTML +=`<div class="col-lg-3 col-md-4 col-sm-6 pt-3  pb-3 gallery-margin">
            <div class="box1">
                <div class="img-box">
                    <img class="img-fluid" src="`+path + imgArray[i]+`" alt="">
                </div>
                <div class="tags">
                    <h3 class="bookDes">`+bookDetails[i].description+`</h3>
                    <p>`+bookDetails[i].author+`</p>
                    <p class="price">Rs ` +bookDetails[i].price+`</p>
                    <div class="lastBtn">
                        <div class="col-sm-6 addToBagBtn">
                            <button type="button" class="btn btn-primary btn-sm" id="`+bookDetails[i]._id+`" onclick="addToCart(id)">ADD TO BAG</button>
                        </div>
                        <div class="col-sm-6 wishlistBtn">
                            <button type="button" class="btn btn-secondary  btn-sm btnTag2" id="`+bookDetails[i]._id+`" onclick="addToWishlist(id)">WISHLIST</button>
                        </div>
        
                    </div>
                </div>
            </div>
        </div>`
        }
        document.getElementById("bookList").innerHTML = detailsHTML;
    })
}


getBookDetails();
    
function addToCart(id){
    console.log("iddd",id)
    let data =
    {
        "product_id": id,
    }
    //   const baseurl =  "https://new-bookstore-backend.herokuapp.com/bookstore_user/registration";
    // axios.post(baseurl, data, headers)
    const headConfig = {
     headers : {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('accessToken')
    }
}
    // console.log("headers",headers);
    postService(`bookstore_user/add_cart_item/${id}`, data, headConfig)
    // axios.post(baseurl, data, headers)
    .then(res=> {
        console.log(res);
        // console.log(res.result._id)               
            
})

}

function addToWishlist(id){
    console.log("iddd",id)
    let data =
    {
        "product_id": id,
    }
    //   const baseurl =  "https://new-bookstore-backend.herokuapp.com/bookstore_user/registration";
    // axios.post(baseurl, data, headers)
    const headConfig = {
     headers : {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('accessToken')
    }
}
    // console.log("headers",headers);
    postService(`bookstore_user/add_wish_list/${id}`, data, headConfig)
    // axios.post(baseurl, data, headers)
    .then(res=> {
        console.log(res);
        // console.log(res.result._id)               
            
})

}
    


