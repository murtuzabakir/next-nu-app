"use client";
import React from "react";
import styles from "./course-setting.module.scss";
import Switch from "@/src/components/switch/Switch";
import { courseTypeOptions } from "./course-settings-data";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";

const CourseSettings = () => {
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
            options={courseTypeOptions}
            onClick={() => {}}
            selectedOption={courseTypeOptions[0].value}
          />
        }
      />
      <SettingComponent
        title="Assign on"
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-7">
            <Infotile title="Immediate" rightComponent={<Toggle />} />
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
            onClick={() => {}}
            selectedOption={"yes"}
          />
        }
      />
      <SettingComponent
        title="Certification"
        rightComponent={
          <Infotile
            title="Allow certificate download"
            rightComponent={<Toggle />}
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
            onClick={() => {}}
            selectedOption={"yes"}
          />
        }
      />
      <SettingComponent
        title="Within geofence"
        rightComponent={
          <Infotile title="Required" rightComponent={<Toggle />} />
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
            onClick={() => {}}
            selectedOption={"yes"}
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
