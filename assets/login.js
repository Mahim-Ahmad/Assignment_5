const form = document.getElementById("loginForm")

form.addEventListener("submit", function(e){

e.preventDefault()

const username =document.getElementById("username").value

const password =document.getElementById("password").value

if(username === "admin" && password === "admin123"){

window.location.href = "dashboard.html"

}

else{

alert("Invalid Credentials")

}

})