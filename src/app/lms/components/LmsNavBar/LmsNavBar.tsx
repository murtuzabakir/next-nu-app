"use client";
import React from "react";
import { subNavbarRoutes } from "../../data/subnavbar-routes.data";
import styles from "./lms-navbar-module.module.scss";
import { usePathname } from "next/navigation";
import Tabs from "@/src/components/Tabs/Tabs";

const LmsNavBar = () => {
  const pathName = usePathname();

  const getIsActive = (string: string): boolean => {
    return pathName.includes(string);
  };

  return (
    <div className={`${styles["lms__navbar-con"]}`}>
      <div className="nu-f-center nu-gap-8 ">
        {subNavbarRoutes.map((ele) => {
          return (
            <Tabs
              isActive={getIsActive(ele.route)}
              route={ele.route}
              title={ele.name}
              key={ele.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "14px 60px" }}>
        <div
          style={{ height: "36px", width: "200px" }}
          className="nu-flex nu-ai-center"
        >
          search box comes here
        </div>
      </div>
    </div>
  );
};

export default LmsNavBar;
