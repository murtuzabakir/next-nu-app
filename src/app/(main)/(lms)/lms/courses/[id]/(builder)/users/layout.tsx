import React from "react";
import CoursesUsersLayout from "@/src/layouts/lms-layouts/lms-users-layout/CoursesUsersLayout";
const layout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
   return <CoursesUsersLayout id={params.id}>{children}</CoursesUsersLayout>;
};

export default layout;
