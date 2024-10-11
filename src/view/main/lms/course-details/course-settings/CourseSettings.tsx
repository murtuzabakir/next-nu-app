"use client";
import React, { useState } from "react";
import styles from "./course-setting.module.scss";
import Switch from "@/src/components/switch/Switch";
import { courseTypeOptions } from "./course-settings-data";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";

const CourseSettings = () => {
  const [courseSettings, setCourseSettings] = useState({
    courseType: "mandatory",
    assignImmediately: true,
    selfEnrollment: "yes",
    allowCertificateDownload: true,
    allowCourseDownload: "yes",
    withinGeofence: false,
    autoAssign: "yes",
  });
  return (
    <div className={styles["course__settings-main-con"]}>
      <SettingComponent
        title="Course category"
        rightComponent={<p> here the dropdown will be present</p>}
      />
      <SettingComponent
        title="Course type"
        rightComponent={
          <Switch
            onClick={(value) => {
              setCourseSettings({
                ...courseSettings,
                courseType: value,
              });
            }}
            options={courseTypeOptions}
            selectedOption={courseSettings.courseType}
          />
        }
      />
      <SettingComponent
        title="Assign on"
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-7">
            <Infotile
              title="Immediate"
              rightComponent={
                <Toggle
                  checked={courseSettings.assignImmediately}
                  onChange={(value) => {
                    setCourseSettings({
                      ...courseSettings,
                      assignImmediately: value,
                    });
                  }}
                />
              }
            />
            <p>Date picker comes here</p>
          </div>
        }
      />
      <SettingComponent
        title="Due date"
        rightComponent={<p>period picker comes here</p>}
      />
      <SettingComponent
        title="Self- enrolment"
        rightComponent={
          <Switch
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onClick={(value) => {
              setCourseSettings({ ...courseSettings, selfEnrollment: value });
            }}
            selectedOption={courseSettings.selfEnrollment}
          />
        }
      />
      <SettingComponent
        title="Certification"
        rightComponent={
          <Infotile
            title="Allow certificate download"
            rightComponent={
              <Toggle
                checked={courseSettings.allowCertificateDownload}
                onChange={(value) => {
                  setCourseSettings({
                    ...courseSettings,
                    allowCertificateDownload: value,
                  });
                }}
              />
            }
          />
        }
      />
      <SettingComponent
        title="Allow course download"
        rightComponent={
          <Switch
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onClick={(value) => {
              setCourseSettings({
                ...courseSettings,
                allowCourseDownload: value,
              });
            }}
            selectedOption={courseSettings.allowCourseDownload}
          />
        }
      />
      <SettingComponent
        title="Within geofence"
        rightComponent={
          <Infotile
            title="Required"
            rightComponent={
              <Toggle
                checked={courseSettings.withinGeofence}
                onChange={(value) => {
                  setCourseSettings({
                    ...courseSettings,
                    withinGeofence: value,
                  });
                }}
              />
            }
          />
        }
      />
      <SettingComponent
        title="Auto assign"
        rightComponent={
          <Switch
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onClick={(value) => {
              setCourseSettings({ ...courseSettings, autoAssign: value });
            }}
            selectedOption={courseSettings.autoAssign}
          />
        }
      />
      <SettingComponent
        title="Course completion"
        rightComponent={<p>course completion dropdown comes here</p>}
      />
    </div>
  );
};

const SettingComponent = ({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent?: React.ReactNode;
}) => {
  return (
    <div className={styles["settings__component"]}>
      <div className={styles["settings__left-component"]}>
        <p className={styles["title__text"]}>{title}</p>
      </div>
      <div className={styles["settings__right-component"]}>
        {rightComponent}
      </div>
    </div>
  );
};

export default CourseSettings;
