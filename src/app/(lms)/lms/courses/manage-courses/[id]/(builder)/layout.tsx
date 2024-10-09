import LmsCourseBuilderLayout from "@/src/layouts/lms-layouts/lms-course-builder-layout/LmsCourseBuilderLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <LmsCourseBuilderLayout>{children}</LmsCourseBuilderLayout>;
};

export default layout;
