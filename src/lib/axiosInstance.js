import axios from "axios";
import localStorageService from "./localStorageService";


const apiHost = import.meta.env.VITE_API_REST_API_URL;
const axiosInstance = axios.create({ baseURL: apiHost });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response)
      return Promise.reject(error);
  }
);

export default axiosInstance;