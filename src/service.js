import axios from "axios";

const base_url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://racooapp.herokuapp.com/api";

const headers = {
  "Content-Type": "application/json",
  "x-access-token": localStorage.getItem("token")
};

//Servicios de autorizacion
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

//Servicios de alta y consulta de compañias
export const getCompanies = () => {
  return axios
    .get(`${base_url}/company`, { headers })
    .then(res => {
      return {
        error: false,
        companies: res.data.companies,
        msg: `${res.data.companies.length} Compañias encontradas exitosamente`
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const getCompanyId = id => {
  return axios
    .get(`${base_url}/company/${id}`, { headers })
    .then(res => {
      return {
        error: false,
        company: res.data.company,
        msg: "Compañia encontradas exitosamente"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const postCompany = company => {
  console.log(company);
  return axios
    .post(`${base_url}/company`, company, { headers })
    .then(res => {
      console.log(res);
      return {
        error: false,
        company: res.data.company._id,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

//Servicios de alta y consulta de clientes
export const getClients = () => {
  return axios
    .get(`${base_url}/client`, { headers })
    .then(res => {
      return {
        error: false,
        clients: res.data.clients,
        msg: `${res.data.clients.length} Clientes encontrados exitosamente`
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const postClient = client => {
  return axios
    .post(`${base_url}/client`, client, { headers })
    .then(res => {
      return {
        error: false,
        client: res.data.client._id,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const getClientId = id => {
  return axios
    .get(`${base_url}/client/${id}`, { headers })
    .then(res => {
      return {
        error: false,
        client: res.data.client,
        msg: "Cliente encontrado exitosamente"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

//Servicios de alta y consulta de clientes
export const getCalls = () => {
  return axios
    .get(`${base_url}/call`, { headers })
    .then(res => {
      return {
        error: false,
        calls: res.data.calls,
        msg: `${res.data.calls.length} LLamadas encontradas exitosamente`
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const postCall = call => {
  console.log(call);

  return axios
    .post(`${base_url}/call`, call, { headers })
    .then(res => {
      console.log(res);

      return {
        error: false,
        call: res.data.call._id,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};
