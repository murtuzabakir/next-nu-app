"use client";
import React from "react";
import CourseUsersNav from "./course-users-navigate/course-users-nav";

const CourseUsers = ({ id }: { id: string }) => {
   return <CourseUsersNav id={id} />;
};

export default CourseUsers;
