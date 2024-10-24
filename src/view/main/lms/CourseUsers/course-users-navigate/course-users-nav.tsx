'use client'
import React from "react";
import Tabs from "@/src/components/Tabs/Tabs";
import { USERS_TABS } from "./course-users-nav.data";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header/Header";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { Button } from "@/src/shared/Components/Button/Button";

const CourseUsersNav = ({ id }: { id: string }) => {
   const pathName = usePathname();
   const getIsActive = (route: string) => {
      return pathName.includes(route);
   };
   return (
      <Header
         classnames="nu-ai-center nu-flex"
         // paddingTop={10}
         // paddingBottom={10}
         leftComponent={
            <div className="nu-flex nu-gap-4 h-full">
               {USERS_TABS.map((usersTab) => {
                  return (
                     <div className="nu-f-center h-full" key={usersTab.name}>
                        <Tabs isActive={getIsActive(usersTab.route(id))} route={usersTab.route(id)} title={usersTab.name} />
                     </div>
                  );
               })}
            </div>
         }
         rightComponent={
            <div className="nu-flex nu-ai-center nu-gap-5 nu-py-5">
               <Button label="Filters" color="secondary" variant="text" icon={<FilterAltOutlinedIcon />} onClick={() => {}} />
               <Button label="Assign course" color="secondary" variant="contained" icon={<AssignmentTurnedInOutlinedIcon />} onClick={() => {}} />
            </div>
         }
      />
   );
};

export default CourseUsersNav;
