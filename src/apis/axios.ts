import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://soaf.me/",
  headers: {
    Authorization: "Bearer api_secret_soap",
  },
});
