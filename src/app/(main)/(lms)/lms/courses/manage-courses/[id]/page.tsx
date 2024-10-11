import CourseDetails from "@/src/view/main/lms/course-details/CourseDetails";
import React from "react";

const page = ({ params }: { params: { id: string | "create" } }) => {
  return <CourseDetails id={params.id} />;
};

export default page;
