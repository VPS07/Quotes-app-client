import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://quote-web-app.onrender.com",
});
