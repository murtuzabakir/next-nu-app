export const CourseBuilderTabs = [
  {
    name: "Builder",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/builder`,
  },
  {
    name: "Course settings",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/course-settings`,
  },
  {
    name: "Users",
    route: (courseId: string) =>
      `/lms/courses/manage-courses/${courseId}/users`,
  },
];
