'use client'
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Button } from "../../../../../shared/Components/Button/Button";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./CreateCourse.scss";
import SelectComponent from "../../../../../shared/Components/Select/Select";
import { post, get } from './CreateCourse.service';
import React from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "../../Categories";

interface Course {
   course_name: string;
   course_id: string;
   course_description: string;
   course_categories: string[];
}

interface Category {
   id: string;
   category_name: string;
}

interface Props {
   id: string
}

const CreateCourse = ({ id: courseId }: Props) => {
   const router = useRouter();

   const [courseData, setCourseData] = useState<Course>({
      course_name: "",
      course_id: "",
      course_description: "",
      course_categories: [],
   });

   const { categories, loading, error } = useCategories();

   useEffect(() => {
      if (courseId && courseId != "create") {
         getCourse();
      }
   }, [])


   const getCourse = async () => {
      const course = await get(courseId);
      setCourseData(course as Course);
   }


   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCourseData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSelectChange = (selectedOptions: any[]) => {
      setCourseData((prevData) => ({
         ...prevData,
         course_categories: selectedOptions.map(option => option.id),
      }));
   };

   const handleSaveCourse = async () => {
      const response = await post('/api/v1/lms/course/create-course/', courseData);
      router.push('/lms/courses/{}/course-settings')
   };

   return (
      <div className="create__course">
         <section className="header">
            <div className="left">
               <div className="icon__backward">
                  <IconButton>
                     <KeyboardBackspaceOutlinedIcon />
                  </IconButton>
               </div>
               <div className="title">Create Course</div>
               <div className="icon__edit">
                  <IconButton>
                     <ModeEditIcon />
                  </IconButton>
               </div>
            </div>
            <div className="right">
               <div className="actions">
                  <div className="icon__close">
                     <IconButton>
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
                  <div className="image">
                     <img src={'/images/course_banner.svg'} alt="an image" />
                  </div>
                  <div className="actions">
                     <h4>Course Banner</h4>
                     <div className="upload__remove__action">
                        <Button icon={<FileUploadOutlinedIcon />} label={"Upload Image"} onClick={() => console.log()} />
                        <Button label={"Remove"} variant="text" onClick={() => console.log()} />
                     </div>
                     <p>We support PNGs and JPEGs under 10MB</p>
                  </div>
               </div>
               <div className="form">
                  <div className="field__block">
                     <div className="block__label">Course Name</div>
                     <div className="input__block">
                        <input
                           type="text"
                           name="course_name"
                           value={courseData.course_name}
                           onChange={handleInputChange}
                        />
                     </div>
                  </div>
                  <div className="field__block">
                     <div className="block__label">Course ID</div>
                     <div className="input__block">
                        <input
                           type="text"
                           name="course_id"
                           value={courseData.course_id}
                           onChange={handleInputChange}
                        />
                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <div className="block__label">Course Description</div>
                     <div className="input__block">
                        <textarea
                           name="course_description"
                           value={courseData.course_description}
                           onChange={handleInputChange}
                        />
                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <div className="block__label">Who is this course for</div>
                     <div className="input__block">
                        <SelectComponent

                           label={"Designation"}
                           options={categories}
                           field={"category_name"}
                           isMulti={true}
                           onChange={(data) => handleSelectChange(data)}
                        />

                     </div>
                  </div>
                  <div className="field__block full__grid">
                     <Button label={ courseId != "create" ? "Update Course" :"Create Course"} onClick={handleSaveCourse} />
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default CreateCourse;
