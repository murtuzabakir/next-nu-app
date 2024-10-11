"use client";
import React, { useState } from "react";
import styles from "./lms-navbar-module.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@/src/components/tabs/Tabs";
import Button from "@/src/components/button/Button";
import { DownloadSimple, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import Input from "@/src/components/input/Input";
import { subNavbarRoutes } from "./subnavbar-routes.data";

const LmsNavBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

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
        <Input
          onChange={(e) => {
            setSearch(e);
          }}
          placeholder="Quick search"
          value={search}
          prefixIcon={<MagnifyingGlass size={IconSize.L} />}
        />
        <Button
          onClick={() => {}}
          title="Download"
          prefixIcon={<DownloadSimple size={IconSize.L} />}
        />
        <Button
          onClick={() => {
            if (pathName.includes("/lms/courses")) {
              router.push("/lms/courses/manage-courses/create");
            } else {
              router.push("/lms/training/create/builder");
            }
          }}
          title="Create"
          prefixIcon={<Plus size={IconSize.L} />}
        />
      </div>
    </div>
  );
};

export default LmsNavBar;
