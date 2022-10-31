const passwordInput = document.getElementById("password")
const emailInput = document.getElementById("email")
const nameInput = document.getElementById("name")

const user = JSON.parse(localStorage.getItem("user"))

emailInput.value = user.email
nameInput.value = user.name
passwordInput.value = user.password