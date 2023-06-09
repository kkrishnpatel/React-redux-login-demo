import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/user/";


const getUser = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

export default {
  getUser
};