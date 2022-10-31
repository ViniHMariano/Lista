const registerInfoValidator = (info) => {
  if (!info.name) {
    return false;
  }
  if (!info.email) {
    return false;
  }
  if (!info.password) {
    return false
  }
  return true;
};

const register = () => {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const infoValid = registerInfoValidator({ name, email, password })
  if (infoValid) {
    const user = {
      name: name,
      email: email,
      password: password,
    }
    localStorage.setItem('user', JSON.stringify(user))
    return true;
  }
  return false;
};
