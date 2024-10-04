import Header from "@/src/components/Header/Header";
import React from "react";
import { coursesTabsData } from "./data/courses-tabs.data";
import Tabs from "@/src/components/Tabs/Tabs";
import ManageCourseGraph from "./components/manage-courses-graph/ManageCourseGraph";

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
        leftComponent={
          <div className="nu-flex nu-gap-8 h-full">
            {coursesTabsData.map((coursesTab) => {
              return (
                <div className="nu-f-center h-full" key={coursesTab.name}>
                  <Tabs
                    isActive={true}
                    route={coursesTab.route}
                    title={coursesTab.name}
                  />
                </div>
              );
            })}
          </div>
        }
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
