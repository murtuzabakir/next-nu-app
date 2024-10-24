export const USERS_TABS = [
   {
      name: "Enrolled",
      route: (courseId: string) => `/lms/courses/${courseId}/users/enrolled`,
   },
   {
      name: "Not Enrolled",
      route: (courseId: string) => `/lms/courses/${courseId}/users/not-enrolled`,
   },
];
