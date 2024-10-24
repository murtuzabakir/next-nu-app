"use client";
import React, { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import "./CreateCourse.scss";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button } from "../../../../../shared/Components/Button/Button";
import { post, get, CourseSettingSchema, mapSelectedCategories, update } from "./CreateCourse.service";
import { Category, useCategories } from "../../Categories";
import QuillText from "../../CourseBuilder/QuillText/QuillText";
import z from "zod";
import ErrorShow from "@/src/components/Error/ErrorShow";
import SelectComponent from "@/src/components/Select/Select";
import htmlToMarkdown from "@wcj/html-to-markdown";

interface Props {
   id: string;
}

const PLACEHOLDER_BANNER_URL = "/images/course_banner_png.png";

const CreateCourse = ({ id: courseId }: Props) => {
   const router = useRouter();
   const courseBannerRef = useRef<HTMLInputElement>(null);
   const [courseData, setCourseData] = useState<Course>({
      course_name: "",
      course_id: "",
      course_description: "",
      course_categories: [],
      course_banner_media_address: PLACEHOLDER_BANNER_URL,
      course_type: "mandatory",
      assign_immediately: true,
      self_enrolment: false,
      course_downloadable: false,
      certification_downloadable: true,
      start_date: getFormattedDate(),
   });

   type CourseSettingType = z.infer<typeof CourseSettingSchema>;
   type CourseErrors = Partial<Record<keyof CourseSettingType, string>>;

   const { categories, loading, error } = useCategories();
   const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
   const [errors, setErrors] = useState<CourseErrors>({});

   useEffect(() => {
      if (courseId && courseId != "create") {
         getCourse();
      }
   }, []);

   useEffect(() => {
      const mappedCategories = mapSelectedCategories(categories, courseData.course_categories);
      setSelectedCategories(mappedCategories);
   }, [categories]);

   const getCourse = async () => {
      const course = await get(courseId);
      setCourseData(course as Course);
   };

   function getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCourseData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleQuillContentChange = (content: string) => {
      setCourseData((prevData) => ({
         ...prevData,
         course_description: content,
      }));
   };

   const handleSelectChange = (selectedOptions: any[]) => {
      console.log(selectedOptions);
      setCourseData((prevData) => ({
         ...prevData,
         course_categories: selectedOptions.map((option) => option.id),
      }));
   };

   const handleSaveCourse = async () => {
      const isValid = validateAndSetErrors();
      if (!isValid) return;
      let formData = new FormData();
      const descriptionMarkDown = await htmlToMarkdown({ html: courseData.course_description });
      const updatedCourseData: Course = { ...courseData, course_description: descriptionMarkDown };
      // Remove start_date and end_date from updatedCourseData
      delete updatedCourseData.start_date;
      delete updatedCourseData.end_date;
      if (!courseData.course_banner && courseId == "create") {
         const response = await fetch(PLACEHOLDER_BANNER_URL);
         const blob = await response.blob();
         const defaultBannerFile = new File([blob], PLACEHOLDER_BANNER_URL, { type: "image/png" });
         formData.append("course_banner", defaultBannerFile);
      }
      if (courseId != "create" && !(courseData.course_banner instanceof File)) {
         delete updatedCourseData.course_banner;
      }
      setCourseData(updatedCourseData);
      Object.entries(updatedCourseData).forEach(([key, value]) => {
         if (value instanceof File) {
            formData.append(key, value);
         } else if (Array.isArray(value)) {
            value.forEach((item) => {
               formData.append(key, item); // Append each category separately
            });
         } else {
            formData.append(key, value as string);
         }
      });
      if (courseId == "create") {
         //create
         const response: { course_id: string } = await post("/api/v1/lms/course/create-course/", formData);
         router.push(`/lms/courses/${response.course_id}/course-settings`);
      } else {
         // update
         const endpoint = `/api/v1/lms/course/${courseId}/update-course/`;
         await update(endpoint, formData);
      }
   };

   const validateAndSetErrors = (): boolean => {
      const parsedData = CourseSettingSchema.safeParse(courseData);
      if (!parsedData.success) {
         const formattedErrors: { [key: string]: string } = {};
         parsedData.error.errors.forEach((error) => {
            const errorPath = error.path[0] as string;
            if (!formattedErrors[errorPath]) {
               formattedErrors[errorPath] = error.message;
            }
         });
         setErrors(formattedErrors);
         return false;
      } else {
         return true;
      }
   };

   const handleRemoveBanner = () => {
      setCourseData({ ...courseData, course_banner: undefined, course_banner_media_address: PLACEHOLDER_BANNER_URL });
      if (courseBannerRef.current) {
         courseBannerRef.current.value = "";
      }
   };

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const validTypes = ["image/png", "image/jpeg", "image/jpg"];
         if (!validTypes.includes(file.type)) {
            alert("Only PNG, JPEG, and JPG files are allowed.");
            return;
         }
         const maxSize = 10 * 1024 * 1024; // 10MB limit
         if (file.size > maxSize) {
            alert("File size exceeds 10MB.");
            return;
         }
         const fileNativeUrl = URL.createObjectURL(file);
         setCourseData((prevData) => ({
            ...prevData,
            course_banner: file,
            course_banner_media_address: fileNativeUrl,
         }));
      }
   };

   return (
      <div className="create__course">
         <section className="header">
            <div className="left">
               <div className="icon__backward">
                  <IconButton onClick={() => router.back()}>
                     <KeyboardBackspaceOutlinedIcon />
                  </IconButton>
               </div>
               <div className="title">Create Course</div>
            </div>
            <div className="right">
               <div className="actions">
                  <div className="icon__close">
                     <IconButton onClick={() => router.push("/lms/courses")}>
                        <CloseOutlinedIcon />
                     </IconButton>
                  </div>
               </div>
            </div>
         </section>
         <section className="course__metadata">
            <div className="wrapper">
               <h6>Let's create your course</h6>
               <div className="course__banner">
                  <div className="image">{courseData.course_banner_media_address && <img src={courseData.course_banner_media_address} alt="an image" />}</div>
                  <div className="actions">
                     <h4>Course Banner</h4>
                     <div className="upload__remove__action">
                        <Button icon={<FileUploadOutlinedIcon />} label={"Upload Image"} onClick={() => courseBannerRef.current?.click()} />
                        <input type="file" accept=".png, .jpeg, .jpg" ref={courseBannerRef} style={{ display: "none" }} onChange={handleFileUpload} />
                        {/* {errors.course_banner && <ErrorShow message={errors.course_banner} />} */}

                        {courseData.course_banner && <Button label={"Remove"} variant="text" onClick={handleRemoveBanner} />}
                     </div>
                     <p>We support PNGs and JPEGs under 10MB</p>
                  </div>
               </div>
               <div className="form">
                  <div className="field__block">
                     <div className="block__label">Course Name</div>
                     <div className="input__block">
                        <input type="text" name="course_name" value={courseData.course_name} onChange={handleInputChange} />

                        {errors.course_name && <ErrorShow message={errors.course_name} />}
                     </div>
                  </div>
                  <div className="field__block">
                     <div className="block__label">Course ID</div>
                     <div className="input__block">
                        <input type="text" name="course_id" value={courseData.course_id} onChange={handleInputChange} />
                        {errors.course_id && <ErrorShow message={errors.course_id} />}
                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <div className="block__label">Course Description</div>
                     <div className="input__block">
                        <QuillText initialContent={courseData.course_description} onContentChange={(content) => handleQuillContentChange(content)} />
                        {errors.course_description && <ErrorShow message={errors.course_description} />}
                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <div className="block__label">Who is this course for</div>
                     <div className="input__block">
                        <SelectComponent
                           deleteable={true}
                           displayPills={true}
                           label={"Designation"}
                           creatable={true}
                           options={categories}
                           field={"category_name"}
                           isMulti={true}
                           showCountBadge={true}
                           selectedOptions={selectedCategories}
                           onChange={(data) => handleSelectChange(data)}
                        />
                        {errors.course_categories && <ErrorShow message={errors.course_categories} />}
                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <Button label={courseId != "create" ? "Update Course" : "Create Course"} onClick={handleSaveCourse} />
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default CreateCourse;
