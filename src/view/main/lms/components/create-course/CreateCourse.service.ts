import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = "https://app.api.nymbleup.com";
const ACCESS_TOKEN =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNDI3MzAxLCJpYXQiOjE3Mjg4MzUzMDEsImp0aSI6IjhmYmZhMzgzOGRhMjQ4NjQ4MmRhMGRhMTlkODdlMzZjIiwidXNlcl9lbWFpbCI6InNpbm9ubmFzQG55bWJsZXVwLmNvbSJ9.vNgLsc-nsJoVOD8Kv4NJ-l8-80KHc8YsVLq4nBMdStU";

const apiClient = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
   },
});

export const post = async <T>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<any> => {
   try {
      const response = await apiClient.post(endpoint, data, config);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

export const get = async <T>(courseId: string, config?: AxiosRequestConfig): Promise<T | undefined> => {
   try {
      const endpoint = `/api/v1/lms/course/${courseId}/get-course-details/`;
      const response = await apiClient.get<T>(endpoint, config);
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

const handleError = (error: unknown) => {
   if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Error:", axiosError.response?.data || axiosError.message);
   } else {
      console.error("Unexpected Error:", error);
   }
};
