export default function authHeader() {
  const token = localStorage.getItem("token");
let obj = {}
  if (token) {
    obj = { "auth": token};
  } 
  return obj;
}
