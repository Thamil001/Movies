import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: "/.netlify/functions/omdb",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      const { status, data } = error.response;
      

      errorMessage = data.message || data.error || `Error ${status}: ${error.response.statusText}`;

      if (status === 401) {
        errorMessage = "Session expired. Please login again.";

      }
    } else if (error.request) {
      errorMessage = "Network error. Please check your connection.";
    } else {
      errorMessage = error.message;
    }

    toast.error(errorMessage); 

    return Promise.reject(error);
  }
);

export default api;
