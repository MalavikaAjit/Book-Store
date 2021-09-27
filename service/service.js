/*******service file for axios ******/


const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

const headerss = {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('accessToken')
};



function getService( url, headerss) {
        return new Promise((resol, rej) => {
            var resolved = axios.get(baseUrl + url, headerss);
            resol(resolved);
           })           
        
    }
    
    
 function postService( url, data, headerss) {
       return new Promise((resol, rej) => {
            var resolved = axios.post(baseUrl + url,data, headerss);
            resol(resolved);
        })
    }

    function putService( url, data, headerss) {
       return new Promise((resol, rej) => {
            var resolved = axios.put(baseUrl + url,data, headerss);
            resol(resolved);
        })
    }    

    function deleteService( url, headerss) {
      return new Promise((resol, rej) => {
            var resolved = axios.delete(baseUrl + url, headerss);
            resol(resolved);
           })           
        
    }