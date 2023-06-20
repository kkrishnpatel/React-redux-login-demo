import axios from "axios";
import history from "../../../utils/history";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/user",
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    config.headers.auth = token ? token : " ";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    const resToken = response.data.token;
    if (resToken) {
      localStorage.setItem("token", resToken);
    }
    return response;
  },
  function (error) {
    // const originalRequest = error.config
    if (error.response.status === 401) {
      history.push("/logout");
    }
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true
    //   const refreshToken = localStorageService.getRefreshToken()
    //   return axios
    //     .post('/auth/token', {
    //       refresh_token: refreshToken
    //     })
    //     .then(res => {
    //       if (res.status === 201) {
    //         localStorageService.setToken(res.data)
    //         axios.defaults.headers.common['Authorization'] =
    //           'Bearer ' + localStorageService.getAccessToken()
    //         return axios(originalRequest)
    //       }
    //     })
    // }
    return Promise.reject(error)
  }
);
export default axiosInstance;