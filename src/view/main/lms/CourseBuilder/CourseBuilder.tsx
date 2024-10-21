import React, { useEffect, useState, useRef, useReducer } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "../../../../shared/Components/Button/Button";
import { Box, IconButton, LinearProgress, Menu, MenuItem, OutlinedInput, TextField } from "@mui/material";
import SubNavigation from "../../../../shared/Components/SubNavigation/SubNavigation";
import { NAVIGATION_ACTIONS, NAVIGATION_LINKS } from "./CourseBuilder.config";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../../../shared/Components/StrictModeDrop/StrictModeDrop";
import { CourseBuilderProps, Module, ActionType, Action, InputType, Activity } from "./CourseBuilder.types";
import "./CourseBuilder.scss";
import { SubNavigationLink } from "../../../../shared/Components/SubNavigation/SubNavigation.types";
// import CourseSettings from "../CourseSettings/CourseSettings";
import QuillText from "./QuillText/QuillText";
import FileUpload from "../../../../shared/Components/FileUpload/FileUpload";
import UploadModal from "../../../../shared/Components/UploadModal/UploadModal";
import FileUploadV1 from "../../../../shared/Components/FileUpload/FileUploadV1";
import { Delete } from "@mui/icons-material";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { deleteActivity, fetchFile, FileResponse, getActivities, getActivity, getModules, postActivity, postModule, updateActivity } from "./CourseBuilder.service";
import useRestService from "../rest.service";
import restService from "../rest.service";

const ACCEPTED_FILES_TYPES = ".jpg,.jpeg,.png,.pptx,.pdf";
const PPTX_LINK = "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx";
const DOCX_LINK = "https://calibre-ebook.com/downloads/demos/demo.docx";
const XLSX_LINK = "https://filesamples.com/formats/xlsx#google_vignette";

interface Props {
   courseId: string;
}
// { title, onBackClick, onEditClick, onPublishClick, onCloseClick
const CourseBuilder: React.FC<Props> = ({ courseId }: Props) => {
   const moduleReducer = (state: Module[], action: Action): Module[] => {
      switch (action.type) {
         case ActionType.ADD_MODULE:
            // Filter out any modules that already exist in the state (based on the id)
            const newModules = action.payload.filter((module: Module) => !state.some((existingModule) => existingModule.id === module.id));

            return [
               ...state,
               ...newModules.map((module: Module) => ({
                  id: module.id,
                  module_name: module.module_name,
                  activities: module.activities || [],
               })),
            ];

         case ActionType.ADD_ACTIVITY:
            return state.map((module) =>
               module.id === action.payload.module_id
                  ? {
                       ...module,
                       activities: [
                          ...module.activities,
                          ...action.payload.activities
                             .filter((newActivity) => !module.activities.some((existingActivity) => existingActivity.id === newActivity.id))
                             .map((activity: Activity) => ({
                                id: activity.id,
                                activity_name: activity.activity_name,
                                type: activity.type,
                                module: module.id,
                                serial_number: activity.serial_number,
                                text: activity.text,
                                media_address: activity.media_address,
                                time_limit: activity.time_limit,
                             })),
                       ],
                    }
                  : module
            );

         case ActionType.UPDATE_ACTIVITY:
            return state.map((module) =>
               module.id === action.payload.id
                  ? {
                       ...module,
                       activities: module.activities.map((activity) =>
                          activity.id === action.payload.id
                             ? {
                                  ...activity,
                                  activity_name: action.payload.activity_name || activity.activity_name,
                                  type: action.payload.type || activity.type,
                                  text: action.payload.text || activity.text,
                                  time_limit: action.payload.time_limit || activity.time_limit,
                                  media_address: action.payload.media_address || activity.media_address,
                               }
                             : activity
                       ),
                    }
                  : module
            );

         case ActionType.DELETE_MODULE:
            return state.filter((module) => module.id !== action.payload.id);

         case ActionType.DELETE_ACTIVITY:
            return state.map((module) =>
               module.id === action.payload.module_id
                  ? {
                       ...module,
                       activities: module.activities.filter((item) => item.id !== action.payload.activity_id),
                    }
                  : module
            );

         case ActionType.REORDER_MODULES:
            return action.payload;

         default:
            return state;
      }
   };
   const [modules, dispatch] = useReducer(moduleReducer, []);
   const [moduleName, setModuleName] = useState("");
   const [activityName, setActivityName] = useState("");
   const [isAddModuleInput, setIsAddModuleInput] = useState(false);
   const [activityType, setActivityType] = useState<InputType.LESSON | InputType.ASSIGNMENT | null>(null);

   const [activeModule, setActiveModule] = useState<Module>({} as Module);
   const [activeLink, setActiveLink] = useState<SubNavigationLink>({ id: 2, name: "Course settings", link: "settings" });
   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
   const [selectedActivity, setSelectedActivity] = useState<Activity>({} as Activity);

   const courseOverviewRef = useRef<HTMLDivElement>(null);
   const [editorHeight, setEditorHeight] = useState<string>("");
   const [isModuleLoading, setModuleLoading] = useState<boolean>(false);

   useEffect(() => {
      const setContainerHeight = () => {
         if (courseOverviewRef.current) setEditorHeight(`calc(100vh - ${courseOverviewRef.current.offsetTop}px)`);
      };
      setContainerHeight();
      window.addEventListener("resize", setContainerHeight);
      return () => window.removeEventListener("resize", setContainerHeight);
   }, []);

   useEffect(() => {
      fetchModules();
   }, []);

   const fetchModules = async () => {
      try {
         if (!(modules.length > 0)) {
            let response = await getModules(courseId, setModuleLoading);
            dispatch({ type: ActionType.ADD_MODULE, payload: response.data });
         }
      } catch {}
   };

   const onDragEnd = (result: any) => {
      if (!result.destination) return;
      const { source, destination } = result;
      if (source.droppableId === destination.droppableId) {
         // Check if dragging within the same module
         const moduleId = source.droppableId; // get the module ID
         const moduleIndex = modules.findIndex((mod) => mod.id === moduleId); // find the module index
         const reorderedItems = reorderItems(modules[moduleIndex].activities, source.index, destination.index);

         // Update the module's items with reordered items
         const updatedModules = [...modules];
         updatedModules[moduleIndex] = {
            ...updatedModules[moduleIndex],
            activities: reorderedItems,
         };
         dispatch({ type: ActionType.REORDER_MODULES, payload: updatedModules });
      }
      // else {
      //     // If dragging between different modules, reorder modules as before
      //     const reorderedModules = reorder(
      //         modules,
      //         source.index,
      //         destination.index
      //     );
      //     dispatch({ type: "REORDER_MODULES", payload: reorderedModules });
      // }
   };

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
   const [fileDocs, setFileDocs] = useState<FileResponse[]>([]);

   const handleMediaUpload = async (files: File[]) => {
      try {
         const updatedObject: Activity = { ...selectedActivity, activity_media: files[0] as File, text: "This is a great description of the lesson : HTML CSS JAVASCRIPT" };
         await handleUpdateActivity(updatedObject);
         const data = await handleGetActivity(selectedActivity);
         const fileUrls = files.map((file) => ({
            uri: data.media_address,
            fileType: file.type,
            fileName: file.name,
         }));
         // setFileDocs(fileUrls); // for DocView Render
         console.log("Very important:", fileUrls);
      } catch (er) {
         console.log("Error", er);
      }
      // setUploadedFiles(fileUrls); // this is for native media render
      // console.log(fileUrls)
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, isModuleInput: boolean) => {
      if (e.key === "Enter") {
         e.preventDefault();
         if (isModuleInput) {
            handleAddModule();
         } else handleAddActivity();
      }
   };

   const handleAddModule = async () => {
      if (moduleName) {
         try {
            const { data, error } = await postModule(
               {
                  course: courseId,
                  module_name: moduleName,
                  id: "",
                  activities: [],
               },
               setModuleLoading
            );
            dispatch({
               type: ActionType.ADD_MODULE,
               payload: [{ module_name: moduleName, id: data.id, activities: [] }],
            });
            setModuleName("");
            setIsAddModuleInput(false);
         } catch (err) {
            console.log(err);
         }
      }
   };

   const handleAddActivity = async () => {
      if (activityName && activityType && activeModule) {
         try {
            const { data, error } = await postActivity({ module: activeModule.id, activity_name: activityName, type: activityType, text: "Sample Description" } as Activity, setModuleLoading);
            dispatch({
               type: ActionType.ADD_ACTIVITY,
               payload: {
                  module_id: activeModule.id,
                  activities: [
                     {
                        id: data.activity_id,
                        activity_name: activityName,
                        type: activityType,
                     },
                  ] as Activity[],
               },
            });
            setActivityName("");
            setActivityType(null);
            setIsAddModuleInput(false);
         } catch (err) {
            console.log(err);
         }
      }
   };

   const handleUpdateActivity = async (activity: Activity) => {
      let formData = new FormData();
      Object.entries(activity).forEach(([key, value]) => {
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
      const response = await updateActivity(formData);
   };

   const handleDeleteActivity = async (activity: Activity) => {
      try {
         const { data, error } = await deleteActivity(activity.id);
         dispatch({
            type: ActionType.DELETE_ACTIVITY,
            payload: {
               module_id: activity.module,
               activity_id: activity.id,
            },
         });
         // setActivityName("");
         // setContentType(null);
         // setIsAddModuleInput(false);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      const fetchDocuments = async () => {
         if (selectedActivity.media_address) {
            const fetchedDocuments = await fetchFile(selectedActivity.media_address);
            setFileDocs(fetchedDocuments);
         }
      };

      fetchDocuments();
   }, [selectedActivity.media_address]);

   const handleContentChange = (newContent: string) => {};

   const handleGetActivity = async (activity: Activity): Promise<Activity> => {
      try {
         const { data, error } = await getActivity(activity.id, setModuleLoading);
         setSelectedActivity(data);
         dispatch({
            type: ActionType.UPDATE_ACTIVITY,
            payload: {
               ...data,
            },
         });
         return data;
      } catch (err) {
         return {} as Activity;
         console.log(err);
      }
   };

   const reorderItems = (items: Module["activities"], startIndex: number, endIndex: number): Module["activities"] => {
      const result = Array.from(items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
   };

   return (
      <>
         {isModuleLoading && <LinearProgress />}

         <div className="course__builder__component">
            <section className="builder__navigation">{/* <SubNavigation links={NAVIGATION_LINKS} actions={NAVIGATION_ACTIONS} onLinkClick={(link) => setActiveLink(link)} /> */}</section>

            <section className="input__details">
               <div className="course__overview" style={{ height: editorHeight }} ref={courseOverviewRef}>
                  <div className="add__modules_button">
                     {isAddModuleInput ? (
                        <TextField
                           label={`Enter ${InputType.MODULE.toLowerCase()} name`}
                           value={moduleName}
                           onChange={(e) => setModuleName(e.target.value)}
                           onKeyDown={(e) => onKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, true)}
                           autoFocus
                        />
                     ) : (
                        <Button label="Add new module" variant="text" icon={<AddIcon />} onClick={() => setIsAddModuleInput(true)} />
                     )}
                  </div>
                  <div className="modules__section__wrapper">
                     <DragDropContext onDragEnd={onDragEnd}>
                        <div className="modules">
                           {modules.map((module) => (
                              <div className="module" key={module.id}>
                                 {/* Name of Module with Action Buttons to add lesson or assignment */}
                                 <div
                                    module-id={module.id}
                                    className={`module__name ${module.id == activeModule.id ? "active" : ""}`}
                                    onClick={async (e) => {
                                       setActiveModule(module);
                                       setSelectedActivity({} as Activity);
                                       setActivityType(null);
                                       const { data } = await getActivities(module.id, setModuleLoading);
                                       dispatch({ type: ActionType.ADD_ACTIVITY, payload: { module_id: module.id, activities: data } });
                                    }}
                                 >
                                    <p>{module.module_name}</p>
                                    <IconButton
                                       onClick={(e) => {
                                          setMenuAnchor(e.currentTarget);
                                       }}
                                    >
                                       <AddIcon />
                                    </IconButton>
                                    {/* Add Lesson Or Assignment Menu  */}
                                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)}>
                                       <MenuItem
                                          onClick={(event) => {
                                             event.stopPropagation();
                                             setActivityType(InputType.LESSON);
                                             setMenuAnchor(null);
                                          }}
                                       >
                                          Add Lesson
                                       </MenuItem>
                                       <MenuItem
                                          onClick={(event) => {
                                             event.stopPropagation();
                                             setActivityType(InputType.ASSIGNMENT);
                                             setMenuAnchor(null);
                                          }}
                                       >
                                          Add Assignment
                                       </MenuItem>
                                    </Menu>
                                 </div>
                                 {module.id == activeModule.id && (
                                    <div className="lessons__assignments_wrapper">
                                       {module.id == activeModule.id && activityType && (
                                          <OutlinedInput
                                             placeholder={`Enter ${activityType.toLowerCase()} name`}
                                             value={activityName}
                                             onChange={(e) => setActivityName(e.target.value)}
                                             onKeyDown={(e) => onKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, false)}
                                             autoFocus
                                          />
                                       )}

                                       {/* Display List of Lessons and Assignments Under the Module */}
                                       <StrictModeDroppable droppableId={module.id}>
                                          {(provided) => (
                                             <div ref={provided.innerRef} {...provided.droppableProps} className="lessons__assignments_list">
                                                {module.activities.map((activity, index) => (
                                                   <Draggable key={activity.id} draggableId={activity.id} index={index}>
                                                      {(provided) => (
                                                         <>
                                                            {/* {false && module.id === activeModule.id && activityType && (
                                                            <TextField
                                                               label={`Enter ${activityType} Name`}
                                                               value={activityName}
                                                               onChange={(e) => setActivityName(e.target.value)}
                                                               onKeyDown={(e) => onKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, false)}
                                                               autoFocus
                                                            />
                                                         )} */}
                                                            {activeModule.id == activity.module && (
                                                               <div
                                                                  className={`item ${activity.id && selectedActivity.id == activity.id ? "active" : ""}`}
                                                                  ref={provided.innerRef}
                                                                  onClick={async () => {
                                                                     const data = await handleGetActivity(activity);
                                                                     setFileDocs([]);
                                                                     setSelectedActivity(data);
                                                                  }}
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                               >
                                                                  <div className="icons-flex">
                                                                     <IconButton onClick={() => handleDeleteActivity(activity)}>
                                                                        <Delete />
                                                                     </IconButton>
                                                                     <IconButton>
                                                                        <DragIndicatorIcon />
                                                                     </IconButton>
                                                                  </div>

                                                                  <p>{activity.activity_name}</p>
                                                               </div>
                                                            )}
                                                         </>
                                                      )}
                                                   </Draggable>
                                                ))}
                                                {provided.placeholder}
                                             </div>
                                          )}
                                       </StrictModeDroppable>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </DragDropContext>
                  </div>
               </div>
               {selectedActivity.id && (
                  <div className="media__editor">
                     <div className="media_display">
                        {fileDocs.length == 0 && !selectedActivity.media_address && (
                           <div className="image__upload">
                              <div className="action_wrapper">
                                 <IconButton onClick={() => setIsModalOpen(true)}>
                                    <AddIcon />
                                 </IconButton>
                                 <p className="add-content-text">Add content</p>
                              </div>
                           </div>
                        )}
                        {/* {uploadedFiles?.length > 0 && <FileUploadV1 files={uploadedFiles} />} */}
                        {fileDocs.length > 0 && <DocViewer documents={fileDocs} pluginRenderers={DocViewerRenderers} />}
                     </div>
                     <div className="editor__input">
                        <QuillText onContentChange={handleContentChange} initialContent={""} />
                        <UploadModal
                           isOpen={isModalOpen}
                           onClose={() => setIsModalOpen(false)}
                           onUpload={handleMediaUpload}
                           maxFiles={1}
                           acceptedFileTypes={ACCEPTED_FILES_TYPES}
                           modalTitle="Media Upload"
                           uploadButtonText="Upload"
                           cancelButtonText="Cancel"
                           supportedFormatsText={`Supports ${ACCEPTED_FILES_TYPES} files`}
                        />
                     </div>
                  </div>
               )}
               {activeModule.id && !selectedActivity.id && (
                  <div className="media__editor activity">
                     <div className="action_wrapper">
                        <IconButton
                           onClick={(e) => {
                              setMenuAnchor(e.currentTarget);
                           }}
                        >
                           <AddIcon />
                        </IconButton>
                        <p className="add-content-text">Click here to add lessons</p>
                     </div>
                  </div>
               )}
               {modules.length == 0 && !activeModule.id && (
                  <div className="media__editor activity">
                     <div className="action_wrapper">
                        <IconButton onClick={() => setIsAddModuleInput(true)}>
                           <AddIcon />
                        </IconButton>
                        <p className="add-content-text">Click here to add modules</p>
                     </div>
                  </div>
               )}
            </section>
         </div>
      </>
   );
};

export default CourseBuilder;

// "application/vnd.openxmlformats-officedocument.presentationml.presentation"
// application/vnd.openxmlformats-officedocument.wordprocessingml.document
// "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
