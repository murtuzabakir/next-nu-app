"use client";
import Header from "@/src/components/Header/Header";
import React from "react";
import ManageCourseGraph from "./components/manage-courses-graph/ManageCourseGraph";
import CoursesSubNavBar from "./components/courses-sub-navbar/CoursesSubNavBar";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Button from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/types";
import Dropdown from "@/src/components/Dropdown/Dropdown";
import Input from "@/src/components/input/Input";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div>
      <Header
        paddingBottom={14}
        paddingTop={14}
        leftComponent={
          <div className="nu-f-center h-full">
            <p>Course summary</p>
          </div>
        }
        rightComponent={
          <Dropdown
            isSearchable={true}
            label="Region"
            options={Array.from({ length: 15 }).map((ele, index) => {
              return {
                label: `Testing ${index + 1}`,
                value: `Testing value ${index + 1}`,
              };
            })}
            onChange={() => {}}
            showPlaceholder={true}
            placeholder="search regions"
            value=""
            selectedOption=""
          />
        }
      />
      <ManageCourseGraph />
      <Header
        leftComponent={<CoursesSubNavBar />}
        rightComponent={
          <div className="nu-my-7 nu-gap-5 nu-flex nu-ai-center">
            <Input
              onChange={() => {}}
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
