"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./course-setting.module.scss";
import Switch from "@/src/components/switch/Switch";
import { courseTypeOptions } from "./course-settings-data";
import Infotile from "@/src/components/info-tile/Infotile";
import Toggle from "@/src/components/toggle/Toggle";
import { CourseSetting } from "./course-settings.types";
import { Category, useCategories } from "../../Categories";
import { get, update } from "./course-setting.service";
import SelectComponent from "@/src/components/Select/Select";
import { mapSelectedCategories } from "../../components/create-course/CreateCourse.service";
import { detectDataChanges } from "../../ChangeDetector.";
import { LinearProgress } from "@mui/material";
interface Props {
   courseId: string
}

const CourseSettings = ({ courseId }: Props) => {
   const [courseSettings, setCourseSettings] = useState<CourseSetting>({
      course_categories: [],
      course_type: "mandatory",
      start_date: null,
      end_date: null,
      self_enrolment: false,
      due_date_days: 0,
      course_banner: null,
      course_banner_media_address: null,
      certification_downloadable: true,
      course_downloadable: false,
      assign_immediately: true,
      geofence_required: false,
      auto_assign: "no",
      auto_assign_designation: []
   });

   const { categories } = useCategories();
   const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
   const [isLoading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      getSettings();
   }, [])

   useEffect(() => {
      const selectedCategories = mapSelectedCategories(categories, courseSettings.course_categories);
      setSelectedCategories(selectedCategories);
   }, [categories])

   const getSettings = async () => {
      if (courseId) {
         let settings = await get(courseId,setLoading);
         setCourseSettings(settings as CourseSetting)
      }
   }

   const stringSwitchAdapter = (input: string) => {
      if (input == "yes") return true
      else return false
   }

   const booleanSwitchAdapter = (input: boolean) => {
      if (input == true) return "yes"
      else return "no"
   }

   const updateSettings = async (field: string, values: any) => {
      const formData = new FormData();
      formData.append(field, values);
      const settings = await update(courseId, formData, setLoading);
   }
   
  return (
   <>
        {isLoading &&
           <LinearProgress />
        } <div className={styles["course__settings-main-con"]}>

        <SettingComponent
           title="Course category"
           rightComponent={<SelectComponent label="Category"
              options={categories}
              creatable={true}
              field="category_name"
              selectedOptions={selectedCategories}
              placeholder="All"
              isMulti={true}
              onChange={(categories) => {
               const result = detectDataChanges(categories,selectedCategories,{identityFields : ['id']});
               setCourseSettings({ ...courseSettings, course_categories: categories.map(category => category.id) })
              }}  />
           }
        />
      <SettingComponent
        title="Course type"
        rightComponent={
          <Switch
            onClick={(value) => {
              setCourseSettings({
                ...courseSettings,
                course_type: value,
              });
              updateSettings('course_type', value)
            }}
            options={courseTypeOptions}
            selectedOption={courseSettings.course_type}
          />
        }
      />
      <SettingComponent
        title="Assign on & due date"
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-7">
            <Infotile
              title="Immediate"
              rightComponent={
                <Toggle
                  checked={courseSettings.assign_immediately}
                  onChange={(value) => {
                    setCourseSettings({
                      ...courseSettings,
                      assign_immediately: value,
                    });
                     updateSettings('assign_immediately', value)
                  }}
                />
              }
            />
              <SelectComponent label="Due period"
                 options={[
                    { id: 1, label: "1 Week", days: 7 },
                    { id: 2, label: "2 Weeks", days: 14 },
                    { id: 3, label: "3 Weeks", days: 21 },
                    { id: 4, label: "1 Month", days: 30 },  // Assuming 30 days in a month
                    { id: 5, label: "2 Months", days: 60 },
                    { id: 6, label: "3 Months", days: 90 },
                    { id: 7, label: "6 Months", days: 180 },
                    { id: 8, label: "1 Year", days: 365 }
                 ]}
                 field="label"
                 placeholder="All"
                 isMulti={false}
                 onChange={(duration) => {
                    setCourseSettings({
                       ...courseSettings, due_date_days: duration[0].days
                    })
                 }} />
          </div>
        }
      />
      {/* <SettingComponent
        title="Due date"
        rightComponent={<p>period picker comes here</p>}
      /> */}
      <SettingComponent
        title="Self-enrolment"
        rightComponent={
          <Switch
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onClick={(value) => {
              setCourseSettings({ ...courseSettings, self_enrolment: stringSwitchAdapter(value)  });
              updateSettings('self_enrolment', value)
            }}
              selectedOption={booleanSwitchAdapter(courseSettings.self_enrolment)}
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
                checked={courseSettings.certification_downloadable}
                onChange={(value) => {
                  setCourseSettings({
                    ...courseSettings,
                    certification_downloadable: value,
                  });
                  updateSettings('certification_downloadable', value)
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
                course_downloadable: stringSwitchAdapter(value) ,
              });
              updateSettings('course_downloadable', value)
            }}
              selectedOption={booleanSwitchAdapter(courseSettings.course_downloadable)}
          />
        }
      />
         {/* <SettingComponent
        title="Within geofence"
        rightComponent={
          <Infotile
            title="Required"
            rightComponent={
              <Toggle
                checked={courseSettings.geofence_required}
                onChange={(value) => {
                  setCourseSettings({
                    ...courseSettings,
                    geofence_required: value,
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
              setCourseSettings({ ...courseSettings, auto_assign: value });
            }}
            selectedOption={courseSettings.auto_assign}
          />
        }
      /> */}
      </div>
   </>
   
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
