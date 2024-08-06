import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IP } from "./Ip.js";

const axiosClient = axios.create({
  baseURL: `${IP}`
});

axiosClient.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem("token");

  if (token) {
    config.headers['token'] = token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;