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
