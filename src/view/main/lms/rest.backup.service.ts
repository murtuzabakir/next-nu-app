import { useState, useEffect } from "react";
import { AxiosRequestConfig, CanceledError, Method } from "axios";
import { apiClient } from "@/src/services/apiClient";

const useRestService = <Td, Tr>(endpoint: string, method: Method, requestData?: Td, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
   const [data, setData] = useState<Tr | null>(null);
   const [error, setError] = useState<string>("");
   const [isLoading, setLoading] = useState<boolean>(false);

   // Function to handle GET requests
   const fetchData = async (controller: AbortController) => {
      const response = await apiClient.get<Tr>(endpoint, {
         signal: controller.signal,
         ...requestConfig,
      });
      setData(response.data);
   };

   // Function to handle POST requests
   const postData = async (controller: AbortController) => {
      const response = await apiClient.post<Tr>(endpoint, requestData, {
         signal: controller.signal,
         ...requestConfig,
      });
      setData(response.data);
   };

   // Function to handle PUT requests
   const putData = async (controller: AbortController) => {
      const response = await apiClient.put<Tr>(endpoint, requestData, {
         signal: controller.signal,
         ...requestConfig,
      });
      setData(response.data);
   };

   // Function to handle DELETE requests
   const deleteData = async (controller: AbortController) => {
      const response = await apiClient.delete<Tr>(endpoint, {
         signal: controller.signal,
         ...requestConfig,
      });
      setData(response.data);
   };

   useEffect(
      () => {
         const controller = new AbortController();
         setLoading(true);

         const performRequest = async () => {
            try {
               switch (method) {
                  case "GET":
                     await fetchData(controller);
                     break;
                  case "POST":
                     await postData(controller);
                     break;
                  case "PUT":
                     await putData(controller);
                     break;
                  case "DELETE":
                     await deleteData(controller);
                     break;
                  default:
                     throw new Error(`Unsupported method: ${method}`);
               }
            } catch (err: unknown) {
               if (err instanceof CanceledError) return;

               if (err instanceof Error) {
                  setError(err.message);
               } else {
                  setError("An unknown error occurred");
               }
            } finally {
               setLoading(false);
            }
         };

         performRequest();

         return () => controller.abort();
      },
      deps ? [...deps] : []
   );

   return { data, error, isLoading };
};

export default useRestService;
