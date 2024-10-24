import axios, { AxiosError, AxiosRequestConfig } from "axios";
import z from "zod";
import { Category } from "../../Categories";

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
      const response = await apiClient.post(endpoint, data, {
         ...config,
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      return response.data;
   } catch (error) {
      handleError(error);
   }
};

export const update = async <T>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<any> => {
   try {
      const response = await apiClient.put(endpoint, data, {
         ...config,
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
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

export const mapSelectedCategories = (masterList: Category[], selectedIds: string[]): Category[] => {
   return masterList.filter((category) => selectedIds.includes(category.id.toString()));
};

export const CourseSettingSchema = z.object({
   //  Zod Schema for validation
   course_name: z.string().trim().min(1, "Course name is required").min(3, "Course name should be atleast 3 characters"),
   course_id: z.string().trim().min(1, "Course ID is required").min(3, "Course ID should be atleast 3 characters"),
   course_description: z.string().trim().min(1, "Course description is required").min(25, "Course description should be at least 25 characters long"),
   course_categories: z.array(z.string().trim()).min(1, "At least one category is required"),
   // course_banner: z
   //    .instanceof(File)
   //    .optional()
   //    .refine((file) => file !== undefined, { message: "Please upload course banner" })
   //    .or(z.undefined()), // Allow undefined values
});
