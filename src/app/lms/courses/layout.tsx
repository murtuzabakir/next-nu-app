import Header from "@/src/components/Header/Header";
import React from "react";
import ManageCourseGraph from "./components/manage-courses-graph/ManageCourseGraph";
import CoursesSubNavBar from "./components/courses-sub-navbar/CoursesSubNavBar";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div>
      <Header
        leftComponent={
          <div className="nu-f-center h-full">
            <p>Course summary</p>
          </div>
        }
        rightComponent={
          <div
            className="nu-my-7"
            style={{ height: "36px", width: "200px", backgroundColor: "red" }}
          ></div>
        }
      />
      <ManageCourseGraph />
      <Header
        leftComponent={<CoursesSubNavBar />}
        rightComponent={
          <div
            className="nu-my-7"
            style={{ height: "36px", width: "200px", backgroundColor: "red" }}
          ></div>
        }
      />
      {children}
    </div>
  );
}

export default layout;
