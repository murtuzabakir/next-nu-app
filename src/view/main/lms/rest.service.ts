import { AxiosRequestConfig, Method, CanceledError } from "axios";
import { apiClient } from "@/src/services/apiClient";

// Function to handle GET requests
const getData = async <Tr>(endpoint: string, controller: AbortController, requestConfig?: AxiosRequestConfig): Promise<Tr> => {
   const response = await apiClient.get<Tr>(endpoint, {
      signal: controller.signal,
      ...requestConfig,
   });
   return response.data;
};

// Function to handle POST requests
const postData = async <Td, Tr>(endpoint: string, controller: AbortController, requestData?: Td, requestConfig?: AxiosRequestConfig): Promise<Tr> => {
   const response = await apiClient.post<Tr>(endpoint, requestData, {
      signal: controller.signal,
      ...requestConfig,
   });
   return response.data;
};

// Function to handle PUT requests
const putData = async <Td, Tr>(endpoint: string, controller: AbortController, requestData?: Td, requestConfig?: AxiosRequestConfig): Promise<Tr> => {
   const response = await apiClient.put<Tr>(endpoint, requestData, {
      signal: controller.signal,
      ...requestConfig,
   });
   return response.data;
};

// Function to handle DELETE requests
const deleteData = async <Tr>(endpoint: string, controller: AbortController, requestConfig?: AxiosRequestConfig): Promise<Tr> => {
   const response = await apiClient.delete<Tr>(endpoint, {
      signal: controller.signal,
      ...requestConfig,
   });
   return response.data;
};

// Main service function for handling different HTTP methods
const restService = async <Td, Tr>(
   endpoint: string,
   method: Method,
   requestData?: Td,
   requestConfig?: AxiosRequestConfig,
   setLoading?: (loading: boolean) => void // Optional callback to manage loading state
): Promise<{ data: Tr; error: string }> => {
   let data: Tr;
   let error = "";

   const controller = new AbortController();

   const updateLoading = (loading: boolean) => {
      if (setLoading) {
         setLoading(loading); // Call the external loading handler if provided
      }
   };

   try {
      updateLoading(true); // Start loading

      switch (method) {
         case "GET":
            data = await getData<Tr>(endpoint, controller, requestConfig);
            break;
         case "POST":
            data = await postData<Td, Tr>(endpoint, controller, requestData, requestConfig);
            break;
         case "PUT":
            data = await putData<Td, Tr>(endpoint, controller, requestData, requestConfig);
            break;
         case "DELETE":
            data = await deleteData<Tr>(endpoint, controller, requestConfig);
            break;
         default:
            throw new Error(`Unsupported method: ${method}`);
      }
   } catch (err: unknown) {
      if (err instanceof CanceledError) {
         return { data: {} as Tr, error: "Request was cancelled" };
      }

      if (err instanceof Error) {
         error = err.message;
      } else {
         error = "An unknown error occurred";
      }
      data = {} as Tr;
   } finally {
      updateLoading(false); // End loading
   }

   return { data, error };
};

export default restService;
