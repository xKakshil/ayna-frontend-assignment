import { store } from "@/store/store";
import { logout } from "@/store/userSlice";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const prodUrl = "https://necessary-festival-60442a7f2f.strapiapp.com/";
const devUrl = "http://localhost:1337";
const hostUrl =  prodUrl ;

const baseURL = `${hostUrl}api`;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

// Request interceptor to set headers
publicClient.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig) => {
    cfg.headers = cfg.headers || {};
    cfg.headers["Content-Type"] = "application/json";
    return cfg;
  },
  (error) => {
    return Promise.reject(error);
  }
);

publicClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("actkn");
      store.dispatch(logout());
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default publicClient;
