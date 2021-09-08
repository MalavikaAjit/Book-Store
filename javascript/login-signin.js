
var err =false;
function validateEmail1() {
    const email = document.getElementById('email1');
    const emailError = document.getElementById('email-error1');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value)){
    emailError.textContent = "";
    err =true;
    }else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail1() { 
    const email = document.getElementById('email1');
    const emailError = document.getElementById('email-error1');
 
    if(email.value == "") emailError.textContent = "choose a gmail address"; 
    else { err = true;  }   
};

function validateEmptyPassword1() {  
    const password1 = document.getElementById('password1');    
    const passwordError1 = document.getElementById('password-error1');
    if(password1.value == "") passwordError1.textContent = "Enter a password";  
    else { err = true;  }
};

function validatePassword1 () {
    const password1 = document.getElementById('password1');
    const passwordError1 = document.getElementById('password-error1');
    let passwordRegex1 = RegExp('^[a-zA-Z0-9]{8,}$');
    if (passwordRegex1.test(password1.value)){
    passwordError1.textContent = "";
      err = true;
    }else passwordError1.textContent = "enter valid password";        
}

/**************** */
function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value)){
    emailError.textContent = "";
    err=true;
    }else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() { 
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if(email.value == "") emailError.textContent = "choose a gmail address"; 
    else { err = true;  }   
};

function validateEmptyPassword() {  
    const password = document.getElementById('password');    
    const passwordError = document.getElementById('password-error');
    if(password.value == "") passwordError.textContent = "Enter a password";  
    else { err = true;  }  
};

function validatePassword () {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    let passwordRegex = RegExp('^[a-zA-Z0-9]{8,}$');
    if (passwordRegex.test(password.value)){
    passwordError.textContent = "";
    err=true;
    }else passwordError.textContent = "enter valid password";        
}
function validateName() { 
    const name1 = document.getElementById('fullname');
   const nameError = document.getElementById('name-error');   
    if(name1.value == "") nameError.textContent = "Enter  name"; 
    else { err = true;  }       
}
function validatePhone () {
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    let phoneRegex = RegExp('^[789]\d{9}$');
    if (phoneRegex.test(phone.value)){
    phoneError.textContent = "";
    err=true;
    }else phoneError.textContent = "enter valid phone no";        
}
function validateEmptyPhone() {  
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    if(phone.value == "") phoneError.textContent = "Enter a phone no"; 
    else { err = true;  }   
};


function validateLogin() {
   
        validateEmail();
        validateEmptyEmail();
       validateEmptyPassword();
       validatePassword(); 
       
}

function validateSignIn(){
       
    validateName()
    validateEmail1();
    validateEmptyEmail1();
    validateEmptyPassword1();
    // validatePassword1();  
    // validatePhone ();
    validateEmptyPhone(); 
    
    let data =
    {
        "fullName": fullname.value,
        "email":email1.value,
        "password":password1.value,
        "phone": phone.value
      }
    //   const baseurl =  "https://new-bookstore-backend.herokuapp.com/bookstore_user/registration";
    // axios.post(baseurl, data, headers)
    postService('/bookstore_user/registration', data, headers)
    .then(res=> {
        console.log(res)
        console.log(res.result._id)               
            localStorage.setItem("token", res.result._id);
})
    
    
    // let data = {

    // }
    // postService('post', '/user/login', data)
    //   .then(result => {

    //     localStorage.setItem("token", result.id);
    //     if (result.id) {
    //     //   window.location.href = 'dashboard.html';
    //       console.log("inside120")
    //     }


    //     return console.log('Success:', result);

    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
 }


//  function loginCheck(inputArr) {
//     inputArr.forEach(input => {
//       if (err == true) {
//         console.log(input, "required");
//       }
//       else {
//         console.log('');
//       }
  
//     });
//   }
//   function  validateSigninnn ()  {
//     loginCheck([phone,password,email,name]); 
//     if(err == true){
//     console.log("yaay");
//     }else{
//         console.log("nope");
//     }
//   }