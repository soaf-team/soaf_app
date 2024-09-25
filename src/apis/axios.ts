import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "http://default-api-service-77559-26019998-ded2c8967f62.kr.lb.naverncp.com:8443/",
  headers: {
    Authorization: "Bearer api_secret_soap",
  },
});
