import CourseSettings from "@/src/view/main/lms/course-details/course-settings/CourseSettings";
import React from "react";

interface Props {
   params: { id: string }
}

const page = ({ params }: Props) => {
   return <CourseSettings courseId={params.id} />;
};

export default page;
