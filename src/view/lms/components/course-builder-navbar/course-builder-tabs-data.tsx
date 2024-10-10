export const CourseBuilderTabs = [
  {
    name: "Course settings",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/course-settings`,
  },
  {
    name: "Builder",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/builder`,
  },
  {
    name: "Users",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/users`,
  },
];
