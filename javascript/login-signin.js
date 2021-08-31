function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
    emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() { 
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
 
    if(email.value == "") emailError.textContent = "choose a gmail address";    
};

function validateEmptyPassword() {  
    const password = document.getElementById('password');    
    const passwordError = document.getElementById('password-error');
    if(password.value == "") passwordError.textContent = "Enter a password";    
};

function validatePassword () {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    let passwordRegex = RegExp('^[a-zA-Z0-9]{8,}$');
    if (passwordRegex.test(password.value))
    passwordError.textContent = "";
    else passwordError.textContent = "enter valid password";        
}
function validateName() {
    const name = document.getElementById('full-name');
   const nameError = document.getElementById('name-error');    

    if(name.value == "") nameError.textContent = "Enter  name";        
}

function validator(page_name) {
    console.log(page_name)
    if(page_name==="index") {
        validateEmail();
        validateEmptyEmail();
       validateEmptyPassword();
       validatePassword();
       
    
    }
}