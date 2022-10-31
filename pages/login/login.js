const loginInfoValidator = (info) => {
    if (!info.email) {
      return false;
    }
    if (!info.password) {
      return false
    }
    return true;
  };
  
  const login = () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email)
    const infoValid = loginInfoValidator({ email, password })
    if (infoValid) {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      if (user.email === email || user.name === email) {
        if (user.password === password) {
          console.log("logged")
          const loginButton = document.getElementsByClassName("login-button")[0]
          loginButton.href = "../home/home.html"
          loginButton.click()
        } else {
          console.log("wrong password")
          return false;
        }
      } else {
        console.log("User doesnt exist")
        return false;
      }
    }
    return false;
  };
  