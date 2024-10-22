import restService from "../rest.service";
import { Activity, Module } from "./CourseBuilder.types";

export type FileResponse = {
   uri: string;
   fileType: string;
};

export const postModule = async (module: Module, setLoading: (loading: boolean) => void) => {
   const endpoint = `/api/v1/lms/module/create-module/`;
   const { data, error } = await restService<Module, { module_id: string }>(endpoint, "POST", module, undefined, setLoading);
   return { data, error };
};

export const getModules = async (courseId: string, setLoading: (loading: boolean) => void) => {
   const endpoint = `/api/v1/lms/module/list-by-course`;
   const params = { course_id: courseId };
   const { data, error } = await restService<string, Module[]>(endpoint, "GET", undefined, { params }, setLoading);
   return { data, error };
};

export const postActivity = async (activity: Activity, setLoading: (loading: boolean) => void) => {
   const endpoint = `/api/v1/lms/activity/create-activity/`;
   const { data, error } = await restService<any, { activity_id: string; media_address: string }>(endpoint, "POST", activity, undefined, setLoading);
   return { data, error };
};

export const deleteActivity = async (activityId: string) => {
   const endpoint = `/api/v1/lms/activity/${activityId}/delete-activity/`;
   const { data, error } = await restService<any, { message: string }>(endpoint, "DELETE");
   return { data, error };
};

export const getActivity = async (activity_id: string, setLoading: (loading: boolean) => void) => {
   const endpoint = `/api/v1/lms/activity/${activity_id}/get-activity-details/`;
   const { data, error } = await restService<any, Activity>(endpoint, "GET", undefined, undefined, setLoading);
   return { data, error };
};

export const getActivities = async (module_id: string, setLoading: (loading: boolean) => void) => {
   const endpoint = `/api/v1/lms/activity/list-activities/`;
   const { data, error } = await restService<any, Activity[]>(endpoint, "POST", { module_id }, undefined, setLoading);
   return { data, error };
};

export const updateActivity = async (activity: FormData) => {
   const endpoint = `/api/v1/lms/activity/${activity.get("id")}/update-activity/`;
   const { data, error } = await restService(endpoint, "PUT", activity, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
   return { data, error };
};

export async function fetchFile(url: string): Promise<FileResponse[]> {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const fileType = await determineFileType(blob);
      return [{ uri: url, fileType }];
   } catch (error) {
      console.error("Error fetching file:", error);
      return [];
   }
}

async function determineFileType(blob: Blob): Promise<string> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
         const arrayBuffer = reader.result as ArrayBuffer;
         const bytes = new Uint8Array(arrayBuffer);

         // Check magic numbers for file type detection
         const magicNumbers: { [key: string]: number[] } = {
            pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
            jpg: [0xff, 0xd8, 0xff], // JPEG
            jpeg: [0xff, 0xd8, 0xff], // JPEG (also catches jpg)
            png: [0x89, 0x50, 0x4e, 0x47], // PNG
            pptx: [0x50, 0x4b, 0x03, 0x04], // PK (common for PPTX files)
            xlsx: [0x50, 0x4b, 0x03, 0x04], // PK (common for XLSX files)
         };

         for (const [type, bytesArray] of Object.entries(magicNumbers)) {
            // PPTX and XLSX start with PK but need to check the structure to differentiate
            if (type === "pptx" || type === "xlsx") {
               // Check the additional bytes specific to PPTX and XLSX
               const isPPTX = bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04 && bytes[4] === 0x14; // The specific header for PPTX starts with "PK" followed by additional bytes
               const isXLSX = bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04 && bytes[4] === 0x0c; // The specific header for XLSX starts with "PK" followed by additional bytes

               if (isPPTX) {
                  resolve("pptx");
                  return;
               } else if (isXLSX) {
                  resolve("xlsx");
                  return;
               }
            } else if (bytes.slice(0, bytesArray.length).every((b, i) => b === bytesArray[i])) {
               resolve(type);
               return;
            }
         }

         resolve("unknown"); // Fallback if no match found
      };

      reader.onerror = () => reject(new Error("Failed to read file"));

      // Read the blob as an ArrayBuffer
      reader.readAsArrayBuffer(blob);
   });
}
