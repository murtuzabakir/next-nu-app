export const CourseBuilderTabs = [
  {
    name: "Course settings",
    route: (courseId: string) =>
      `/lms/courses/${courseId}/course-settings`,
  },
  {
    name: "Builder",
    route: (courseId: string) =>
      `/lms/courses/${courseId}/builder`,
  },
  {
    name: "Users",
    route: (courseId: string) =>
      `/lms/courses/${courseId}/users`,
  },
];
