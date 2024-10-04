"use client";
import React from "react";
import { subNavbarRoutes } from "../../data/subnavbar-routes.data";
import Link from "next/link";
import styles from "./lms-navbar-module.module.scss";
import { cn } from "@/src/utils/class.utils";
import { usePathname } from "next/navigation";

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
            <Link
              key={ele.name}
              href={ele.route}
              className={cn(`${styles["link__con"]}`, {
                [styles["__active"]]: getIsActive(ele.route),
              })}
            >
              <p
                className={cn(`${styles["link__text"]}`, {
                  [styles["__active"]]: getIsActive(ele.route),
                })}
              >
                {ele.name}
              </p>
            </Link>
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
