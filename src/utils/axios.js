import axios from "axios";
import { API_BASE_URL } from "./api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
 
});

export default api;
