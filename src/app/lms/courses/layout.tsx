"use client";
import Header from "@/src/components/Header/Header";
import React from "react";
import ManageCourseGraph from "./components/manage-courses-graph/ManageCourseGraph";
import CoursesSubNavBar from "./components/courses-sub-navbar/CoursesSubNavBar";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/types";

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
            style={{ height: "36px", width: "200px" }}
          ></div>
        }
      />
      <ManageCourseGraph />
      <Header
        leftComponent={<CoursesSubNavBar />}
        rightComponent={
          <div className="nu-my-7 nu-gap-5 nu-flex nu-ai-center">
            <SearchBox
              label="Search Course"
              onChange={(e) => {
                console.log(e);
              }}
              value=""
              placeholder="Search courses"
              width={221}
              prefixIcon={<MagnifyingGlass size={IconSize.L} />}
            />
            <Button
              onClick={() => {}}
              buttonType={ButtonType.secondary}
              title="Filters"
              prefixIcon={<Funnel size={IconSize.L} />}
            />
          </div>
        }
      />
      {children}
    </div>
  );
}

export default layout;
