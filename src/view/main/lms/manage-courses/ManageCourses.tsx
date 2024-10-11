"use client";
import React, { useEffect, useState } from "react";
import {
  manageCoursesData,
  ManageCoursesDataType,
} from "./manage-courses-data";
import Table from "@/src/components/table/Table";
import CourseInfoTableCell from "./_components/course-info-table-cell/CourseInfoTableCell";
import CreatorTableCell from "./_components/creator-table-cell/CreatorTableCell";
import TotalusersTableCell from "./_components/total-users-table-cell/TotalusersTableCell";
import TotalModulesTableCell from "./_components/total-modules-table-cell/TotalModulesTableCell";
import CompletionTableCell from "./_components/completion-table-cell/CompletionTableCell";
import CompletedTableCell from "./_components/completed-table-cell/CompletedTableCell";
import InProgressTableCell from "./_components/in-progress-table-cell/InProgressTableCell";
import PendingUsersTableCell from "./_components/pending-users-table-cell/PendingUsersTableCell";
import DueOnTableCell from "./_components/due-on-table-cell/DueOnTableCell";
import ActionComponentTableCell from "./_components/action-component-table-cell/ActionComponentTableCell";

const ManageCourses = () => {
  const [courseData, setCourseData] = useState<ManageCoursesDataType[]>([]);

  const getCourseData = () => {
    setCourseData(manageCoursesData);
  };
  useEffect(() => {
    getCourseData();
  }, []);
  return (
    <div>
      <Table
        rows={courseData.map((info, index) => ({
          id: index.toString(),
          cells: [
            {
              component: (
                <CourseInfoTableCell
                  courseCategory={info.category}
                  courseImgUrl={info.courseImgUrl}
                  courseName={info.name}
                  createdOn={info.createdDate}
                />
              ),
            },

            {
              component: <CreatorTableCell createdBy={info.createdBy} />,
            },
            {
              component: (
                <TotalusersTableCell totalUsersCount={info.totalUsers} />
              ),
            },
            {
              component: (
                <TotalModulesTableCell totalModulesCount={info.totalModules} />
              ),
            },
            {
              component: (
                <CompletionTableCell
                  completionPercentage={info.completionPercentage}
                />
              ),
            },
            {
              component: (
                <CompletedTableCell completedCount={info.completedUsers} />
              ),
            },
            {
              component: (
                <InProgressTableCell inprogressCount={info.inProgressUsers} />
              ),
            },
            {
              component: (
                <PendingUsersTableCell pendingUsersCount={info.pendingUsers} />
              ),
            },
            {
              component: <DueOnTableCell dueOnDate={info.dueDate} />,
            },
          ],
          rightComponent: (
            <ActionComponentTableCell
              id={info.id}
              courseType={info.courseType}
            />
          ),
        }))}
      />
    </div>
  );
};

export default ManageCourses;
