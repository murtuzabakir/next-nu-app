import { apiClient } from "./../../../../../services/apiClient";
import { CourseSetting } from "./course-settings.types";

export const get = async (courseId: string, setLoading: (loading: boolean) => void): Promise<CourseSetting | null> => {
   try {
      const endpoint = `/api/v1/lms/course/${courseId}/get-course-details/`;
      setLoading(true);
      const response = await apiClient.get<CourseSetting>(endpoint);
      return response.data;
   } catch (error) {
      console.error(`Error fetching course details for course ID ${courseId}:`, error);
      return null;
   } finally {
      setLoading(false);
   }
};

export const update = async (courseId: string, courseSetting: FormData, setLoading: (loading: boolean) => void): Promise<any> => {
   try {
      const endpoint = `/api/v1/lms/course/${courseId}/update-course/`;
      setLoading(true);
      const response = await apiClient.put(endpoint, courseSetting);
      return response.data;
   } catch (error) {
      console.error(`Error updating course details for course ID ${courseId}:`, error);
      return null;
   } finally {
      setLoading(false);
   }
};
