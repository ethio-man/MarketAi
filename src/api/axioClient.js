import axios from "axios";

// 👉 Change this to your actual backend URL
// Example: http://localhost:5000 or your deployed server
const BASE_URL = "https://ai-marketer-rouge.vercel.app/";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If using cookies / sessions
});

// OPTIONAL — request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add token if stored
    const token = localStorage.getItem("auth_token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// OPTIONAL — response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
