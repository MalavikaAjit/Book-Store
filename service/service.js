/*******service file for api get and post services******/


const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

const headerss = {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('accessToken')
};

// function getService(meth, url, data, headerss) {
//     console.log(meth, baseUrl1 + url, data, headerss)
//     return new Promise((resol, rej) => {
//         fetch(baseUrl1 + url, {
//             method: meth,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token')
//               }

//         })
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//              resol(result)

//         })
//         .catch((err)=>{
//         console.log(err)
//         })
//     })
// }


// function postService(meth, url, data, headerss) {
//     console.log(meth, baseUrl1 + url, data, headerss)
//     return new Promise((resol, rej) => {
//         fetch(baseUrl1 + url, {
//             method: meth,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token')
//               },
        
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//              resol(result)

//         })
//         .catch((err)=>{
//                  console.log(err)
//         })
//     })
// }

function getService( url, headerss) {
        // console.log( baseUrl1 + url, data, headerss)
        return new Promise((resol, rej) => {
            var resolved = axios.get(baseUrl + url, headerss);
            resol(resolved);
           })           
        
    }
    
    
 function postService( url, data, headerss) {
        // console.log(meth, baseUrl1 + url, data, headerss)
        return new Promise((resol, rej) => {
            var resolved = axios.post(baseUrl + url,data, headerss);
            resol(resolved);
        })
    }

    function putService( url, data, headerss) {
        // console.log(meth, baseUrl1 + url, data, headerss)
        return new Promise((resol, rej) => {
            var resolved = axios.put(baseUrl + url,data, headerss);
            resol(resolved);
        })
    }    

    function deleteService( url, headerss) {
        // console.log( baseUrl1 + url, data, headerss)
        return new Promise((resol, rej) => {
            var resolved = axios.delete(baseUrl + url, headerss);
            resol(resolved);
           })           
        
    }