import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://quote-web-app.onrender.com",
});

export default axiosInstance;
