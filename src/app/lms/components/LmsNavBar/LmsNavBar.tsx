"use client";
import React from "react";
import { subNavbarRoutes } from "../../data/subnavbar-routes.data";
import styles from "./lms-navbar-module.module.scss";
import { usePathname } from "next/navigation";
import Tabs from "@/src/components/Tabs/Tabs";
import Button from "@/src/components/Button/Button";
import { DownloadSimple, Plus } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";

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
              isActive={getIsActive(ele.key)}
              route={ele.route}
              title={ele.name}
              key={ele.name}
            />
          );
        })}
      </div>
      <div
        style={{ padding: "14px 60px" }}
        className="nu-flex nu-ai-center nu-gap-4"
      >
        <Button
          onClick={() => {}}
          title="Download"
          prefixIcon={<DownloadSimple size={IconSize.L} />}
        />
        <Button
          onClick={() => {}}
          title="Create"
          prefixIcon={<Plus size={IconSize.L} />}
        />
      </div>
    </div>
  );
};

export default LmsNavBar;
