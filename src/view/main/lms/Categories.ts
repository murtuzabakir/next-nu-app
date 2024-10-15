import { useState, useEffect } from "react";

const ENDPOINT = "https://app.api.nymbleup.com/api/v1/lms/category/get-course-category";
const ACCESS_TOKEN =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNDI3MzAxLCJpYXQiOjE3Mjg4MzUzMDEsImp0aSI6IjhmYmZhMzgzOGRhMjQ4NjQ4MmRhMGRhMTlkODdlMzZjIiwidXNlcl9lbWFpbCI6InNpbm9ubmFzQG55bWJsZXVwLmNvbSJ9.vNgLsc-nsJoVOD8Kv4NJ-l8-80KHc8YsVLq4nBMdStU";

interface Category {
   id: number;
   name: string;
}

interface CategoryResponse {
   total_count: number;
   results: Category[];
}

export const useCategories = () => {
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const getCategories = async () => {
      try {
         const res = await fetch(ENDPOINT, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${ACCESS_TOKEN}`,
            },
         });
         const data: CategoryResponse = await res.json();
         setCategories(data.results || []);
      } catch (err) {
         setError("Failed to fetch categories");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      getCategories();
   }, []);

   return { categories, loading, error };
};
