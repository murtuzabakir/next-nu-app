"use client";
import React from "react";
import CourseBuilder from "../../../../../../../../view/main/lms/CourseBuilder/CourseBuilder";

interface Props {
   params: { id: string }
}

const page = ({ params: { id } }: Props) => {
   console.log("Id",id)
   return (
      <CourseBuilder courseId={id} />
   );
};

export default page;
