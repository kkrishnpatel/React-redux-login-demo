import http from "./Axios/http-common";

const register = ({ name, email, password }) => {
  return http.post("register", {
    name,
    email,
    password,
  });
};

const login = ({ email, password }) => {
  return http
    .post("login", {
      email,
      password,
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
