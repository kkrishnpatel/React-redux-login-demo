import axios from "axios";

const API_URL = "http://localhost:8000/user/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token",response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const methods = {
  register,
  login,
  logout
}

export default methods;
