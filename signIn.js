const container = document.getElementById('container');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');



registerbtn.addEventListener('click',()=>{
    container.classList.add("active");
});

loginbtn.addEventListener('click',()=>{
    container.classList.remove("active");
});


let pass1 = document.getElementById('pass1');
let eye1 = document.getElementById('1');
eye1.onclick = function(){
    if( pass1.type == "password" ){
        pass1.type = "text";
        eye1.innerHTML = "<i class='fa-solid fa-eye'></i>"
    }else{
        pass1.type = "password";
        eye1.innerHTML = "<i class='fa-solid fa-eye-slash'></i>"
    }
        
}

let pass2 = document.getElementById('pass2');
let eye2 = document.getElementById('2');
eye2.onclick = function(){
    if( pass2.type == "password" ){
        pass2.type = "text";
        eye2.innerHTML = "<i class='fa-solid fa-eye'></i>"
    }else{
        pass2.type = "password";
        eye2.innerHTML = "<i class='fa-solid fa-eye-slash'></i>"
    }        
}



document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    let storedData = localStorage.getItem('job_applications');

    // Parse the stored data or initialize to an empty array
    let dataArray = storedData ? JSON.parse(storedData) : [];

    // Append the new data
    dataArray.push(formObject);

    // Save the updated data back to localStorage
    localStorage.setItem('job_applications', JSON.stringify(dataArray, null, 2));

    // Optionally, notify the user
    alert('Data saved to localStorage!');
});





// el sign in el sa7
// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');
//     const registerbtn = document.getElementById('register');
//     const loginbtn = document.getElementById('login');

//     // Toggle between login and register forms
//     if (registerbtn && loginbtn) {
//         registerbtn.addEventListener('click', () => container.classList.add("active"));
//         loginbtn.addEventListener('click', () => container.classList.remove("active"));
//     } else {
//         console.error('Register or login button not found');
//     }

//     // Password visibility toggles
//     const togglePasswordVisibility = (inputId, buttonId) => {
//         const passwordInput = document.getElementById(inputId);
//         const toggleButton = document.getElementById(buttonId);

//         if (passwordInput && toggleButton) {
//             toggleButton.onclick = () => {
//                 if (passwordInput.type === "password") {
//                     passwordInput.type = "text";
//                     toggleButton.innerHTML = "<i class='fa-solid fa-eye'></i>";
//                 } else {
//                     passwordInput.type = "password";
//                     toggleButton.innerHTML = "<i class='fa-solid fa-eye-slash'></i>";
//                 }
//             };
//         } else {
//             console.error(`Password or eye icon not found for ${inputId}`);
//         }
//     };

//     togglePasswordVisibility('signup-pass', 'signup-eye');
//     togglePasswordVisibility('signup-pass-con', 'signup-eye-con');
//     togglePasswordVisibility('login-pass', 'login-eye');

//     const registerForm = document.querySelector('.form-sign');
//     const loginForm = document.querySelector('.form-log');

//     // Registration Form Submission
//     if (registerForm) {
//         registerForm.addEventListener('submit', function (event) {
//             event.preventDefault();

//             const formData = new FormData(event.target);
//             const formObject = Object.fromEntries(formData.entries());

//             let storedData = localStorage.getItem('job_applications');
//             let dataArray = storedData ? JSON.parse(storedData) : [];

//             // Check if the email is already registered
//             if (dataArray.some(user => user.email === formObject.email)) {
//                 alert('This email is already registered.');
//             } else {
//                 dataArray.push(formObject);
//                 localStorage.setItem('job_applications', JSON.stringify(dataArray));
//                 event.target.reset();
//                 alert('Registration successful!');
//             }
//         });
//     } else {
//         console.error('Register form not found');
//     }

//     // Login Form Submission
//     if (loginForm) {
//         loginForm.addEventListener('submit', function (event) {
//             event.preventDefault();

//             const formData = new FormData(event.target);
//             const formObject = Object.fromEntries(formData.entries());

//             let storedData = localStorage.getItem('job_applications');
//             let dataArray = storedData ? JSON.parse(storedData) : [];

//             // Logging the stored data and the login attempt data for debugging
//             console.log('Stored Users:', dataArray);
//             console.log('Login Attempt:', formObject);

//             // Find matching user
//             let user = dataArray.find(user => user.email === formObject.email && user.password === formObject.password);

//             if (user) {
//                 localStorage.setItem('loggedIn', 'true');
//                 alert('Login successful!');
//                 // Redirect to the landing page after successful login
//                 window.location.href = 'http://127.0.0.1:5501/LandingPage/landingPage.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         });
//     } else {
//         console.error('Login form not found');
//     }

// });


