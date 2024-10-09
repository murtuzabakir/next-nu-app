import LmsCourseBuilderLayout from "@/src/layouts/lms-layouts/lms-course-builder-layout/LmsCourseBuilderLayout";
import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <LmsCourseBuilderLayout id={params.id}>{children}</LmsCourseBuilderLayout>
  );
};

export default layout;
