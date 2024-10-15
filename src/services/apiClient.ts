import axios from "axios";

const BASE_URL = "https://app.api.nymbleup.com";
const ACCESS_TOKEN =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNDI3MzAxLCJpYXQiOjE3Mjg4MzUzMDEsImp0aSI6IjhmYmZhMzgzOGRhMjQ4NjQ4MmRhMGRhMTlkODdlMzZjIiwidXNlcl9lbWFpbCI6InNpbm9ubmFzQG55bWJsZXVwLmNvbSJ9.vNgLsc-nsJoVOD8Kv4NJ-l8-80KHc8YsVLq4nBMdStU";

export const apiClient = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
   },
});

// apiClient.interceptors.request.use(
//    (config) => {
//       return config;
//    },
//    (error) => {
//       // Handle request errors
//       return Promise.reject(error);
//    }
// );

// apiClient.interceptors.response.use(
//    (response) => response,
//    (error) => {
//       // Handle response errors
//       return Promise.reject(error);
//    }
// );
