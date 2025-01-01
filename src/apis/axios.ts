import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://api.soaf.me/",
  headers: {
    Authorization: "Bearer api_secret_soap",
  },
});
