import restService from "../rest.service";
import { Module } from "./CourseBuilder.types";

export const postModule = async (module: Module) => {
   const endpoint = `/api/v1/lms/module/create-module/`;
   const { data, error, isLoading } = await restService<Module, Module>(endpoint, "POST", module);
   return { data, error, isLoading };
};

export const getModules = async (courseId: string) => {
   const endpoint = `/api/v1/lms/module/list-by-course`;
   const params = { course_id: courseId };
   const { data, error, isLoading } = await restService<string, Module[]>(endpoint, "GET", undefined, { params });
   return { data, error, isLoading };
};
