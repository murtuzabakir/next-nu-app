import { apiClient } from "./../../../../../services/apiClient";
import { CourseSetting } from "./course-settings.types";

export const get = async (courseId: string): Promise<CourseSetting | null> => {
   try {
      const endpoint = `/api/v1/lms/course/${courseId}/get-course-details/`;
      const response = await apiClient.get<CourseSetting>(endpoint);
      return response.data;
   } catch (error) {
      console.error(`Error fetching course details for course ID ${courseId}:`, error);
      return null;
   }
};

export const update = async (courseId: string, courseSettings: CourseSetting): Promise<CourseSetting | null> => {
   try {
      const endpoint = `/api/v1/lms/course/${courseId}/update-course/`;
      const response = await apiClient.put<CourseSetting>(endpoint, courseSettings);
      return response.data;
   } catch (error) {
      console.error(`Error updating course details for course ID ${courseId}:`, error);
      return null;
   }
};
