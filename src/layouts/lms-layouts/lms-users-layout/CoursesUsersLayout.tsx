import React from "react";
import CourseUsersNav from "@/src/view/main/lms/CourseUsers/course-users-navigate/course-users-nav";

const CoursesUsersLayout = ({ id, children }: { id: string; children: React.ReactNode }) => {
   return (
      <>
         <CourseUsersNav id={id} />
         {children}
      </>
   );
};

export default CoursesUsersLayout;
