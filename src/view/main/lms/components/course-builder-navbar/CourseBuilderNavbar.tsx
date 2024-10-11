"use client";
import React from "react";
import { CourseBuilderTabs } from "./course-builder-tabs-data";
import { usePathname } from "next/navigation";
import Tabs from "@/src/components/tabs/Tabs";

const CourseBuilderNavbar = ({ id }: { id: string }) => {
  const pathName = usePathname();
  const getIsActive = (route: string) => {
    return pathName.includes(route);
  };
  return (
    <div className="nu-flex nu-gap-8 h-full">
      {CourseBuilderTabs.map((coursesTab) => {
        return (
          <div className="nu-f-center h-full" key={coursesTab.name}>
            <Tabs
              isActive={getIsActive(coursesTab.route(id))}
              route={coursesTab.route(id)}
              title={coursesTab.name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CourseBuilderNavbar;
