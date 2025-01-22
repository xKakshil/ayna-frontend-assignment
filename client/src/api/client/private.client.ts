import { store } from "@/store/store";
import { logout } from "@/store/userSlice";
import axios, { InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const prodUrl = "https://necessary-festival-60442a7f2f.strapiapp.com/";
//const devUrl = "http://localhost:1337";
const hostUrl = prodUrl ;

const baseURL = `${hostUrl}api`;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

// Request interceptor to add authorization token
privateClient.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig) => {
    cfg.headers = cfg.headers || {};
    cfg.headers["Authorization"] = `Bearer ${
      localStorage.getItem("actkn") || ""
    }`;
    cfg.headers["Content-Type"] = "application/json";
    return cfg;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("actkn");
      store.dispatch(logout());
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error Occured: ", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("actkn");
      store.dispatch(logout());
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default privateClient;
