import axios from "axios";

const base_url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://spacio.herokuapp.com/api";

/*const headers = {
  "Content-Type": "multipart/form-data",
  "x-access-token": localStorage.getItem("token")
};*/

export const register = auth => {
  return axios
    .post(`${base_url}/auth/register`, auth)
    .then(() => {
      return {
        error: false,
        msg: "Usuario creado con éxito"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const login = auth => {
  return axios
    .post(`${base_url}/auth/login`, auth)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return {
        error: false,
        msg: "Haz iniciado de sesión correctamente"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};
