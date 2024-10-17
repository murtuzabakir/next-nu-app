import React, { useEffect, useState, useRef, useReducer } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "../../../../shared/Components/Button/Button";
import { IconButton, Menu, MenuItem, OutlinedInput, TextField } from "@mui/material";
import SubNavigation from "../../../../shared/Components/SubNavigation/SubNavigation";
import { NAVIGATION_ACTIONS, NAVIGATION_LINKS } from "./CourseBuilder.config";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../../../shared/Components/StrictModeDrop/StrictModeDrop";
import { CourseBuilderProps, Module, ActionType, Action, InputType } from "./CourseBuilder.types";
import "./CourseBuilder.scss";
import { SubNavigationLink } from "../../../../shared/Components/SubNavigation/SubNavigation.types";
// import CourseSettings from "../CourseSettings/CourseSettings";
import QuillText from "./QuillText/QuillText";
import FileUpload from "../../../../shared/Components/FileUpload/FileUpload";
import UploadModal from "../../../../shared/Components/UploadModal/UploadModal";
import FileUploadV1 from "../../../../shared/Components/FileUpload/FileUploadV1";
import { Delete } from "@mui/icons-material";
import DocViewer, { DocViewerRenderers, PDFRenderer, PNGRenderer } from "react-doc-viewer";
import { getModules, postModule } from "./CourseBuilder.service";
import useRestService from "../rest.service";
import restService from "../rest.service";
const ACCEPTED_FILES_TYPES = ".jpg,.jpeg,.png,.pptx,.docx,.xlsx,.mp4,.mkv"
const PPTX_LINK = "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx"
const DOCX_LINK = "https://calibre-ebook.com/downloads/demos/demo.docx"
const XLSX_LINK = "https://filesamples.com/formats/xlsx#google_vignette"

interface Props {
   courseId: string;
}
// { title, onBackClick, onEditClick, onPublishClick, onCloseClick 
const CourseBuilder: React.FC<Props> = ({ courseId }: Props) => {
   const moduleReducer = (state: Module[], action: Action): Module[] => {
      switch (action.type) {
         case ActionType.ADD_MODULE:
            // Filter out any modules that already exist in the state (based on the id)
            const newModules = action.payload.filter(
               (module: Module) => !state.some((existingModule) => existingModule.id === module.id)
            );

            return [
               ...state,
               ...newModules.map((module: Module) => ({
                  id: module.id,
                  module_name: module.module_name,
                  activities: module.activities || [],
               })),
            ];

         case ActionType.ADD_ITEM:
            return state.map((module) =>
               module.id === action.payload.moduleId
                  ? {
                     ...module,
                     activities: [
                        ...module.activities,
                        {
                           id: `${module.activities.length + 1}`, // Generating a new ID for the activity
                           name: action.payload.name,
                           type: action.payload.itemType,
                        },
                     ],
                  }
                  : module
            );

         case ActionType.DELETE_MODULE:
            return state.filter((module) => module.id !== action.payload.id);

         case ActionType.DELETE_ITEM:
            return state.map((module) =>
               module.id === action.payload.moduleId
                  ? {
                     ...module,
                     activities: module.activities.filter(
                        (item) => item.id !== action.payload.itemId
                     ),
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
   const [contentName, setContentName] = useState("");
   const [isAddModuleInput, setIsAddModuleInput] = useState(false);
   const [contentType, setContentType] = useState<InputType.LESSON | InputType.ASSIGNMENT | null>(null);

   const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
   const [activeLink, setActiveLink] = useState<SubNavigationLink>({ id: 2, name: "Course settings", link: "settings" });

   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

   const courseOverviewRef = useRef<HTMLDivElement>(null);
   const [editorHeight, setEditorHeight] = useState<string>("");

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
            let response = await getModules(courseId);
            dispatch({ type: ActionType.ADD_MODULE, payload: response.data });
         }
      } catch {
      }
   }

   const onMenuOpen = (event: React.MouseEvent<HTMLElement>, moduleId: string) => {
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
   const [fileDocs, setFileDocs] = useState<{ uri: string }[]>([]);

   const handleUpload = (files: File[]) => {
      setUploadedFiles(files);
      console.log(files)
      const fileUrls = files.map((file) => ({
         uri: XLSX_LINK,
         fileType: file.type
      }));
      setFileDocs(fileUrls);
      // "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      // application/vnd.openxmlformats-officedocument.wordprocessingml.document
      // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, isModuleInput: boolean) => {
      if (e.key === "Enter") {
         e.preventDefault();
         if (isModuleInput) handleAddModule();
         else handleAddContent();
      }
   };

   const handleMenuClose = () => {
      setMenuAnchor(null);
   };

   const handleAddModule = async () => {
      if (moduleName) {
         try {
            const { data, error, isLoading } = await postModule({
               course: courseId, module_name: moduleName, id: '', activities: []
            });
            dispatch({
               type: ActionType.ADD_MODULE,
               payload: [{ module_name: moduleName, id: data.id, activities: [] }]
            });
            setModuleName("");
            setIsAddModuleInput(false);
         } catch (err) {
            console.log(err)
         }
      }
   };

   const handleAddContent = () => {
      if (contentName && contentType && activeModuleId) {
         dispatch({
            type: ActionType.ADD_ITEM,
            payload: {
               moduleId: activeModuleId,
               name: contentName,
               itemType: contentType,
            },
         });
         setContentName("");
         setContentType(null);
         setIsAddModuleInput(false);
         handleMenuClose();
      }
   };

   const handleContentChange = (newContent: string) => {
      console.log("Content updated:", newContent);
   };

   const reorderItems = (items: Module["activities"], startIndex: number, endIndex: number): Module["activities"] => {
      const result = Array.from(items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
   };

   return (
      <div className="course__builder__component">
         <section className="builder__navigation">
            {/* <SubNavigation links={NAVIGATION_LINKS} actions={NAVIGATION_ACTIONS} onLinkClick={(link) => setActiveLink(link)} /> */}
         </section>

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
                           <div className="module" key={module.id} onClick={() => setActiveModuleId(module.id)}>
                              {/* Name of Module with Action Buttons to add lesson or assignment */}
                              <div className={`module__name ${module.id == activeModuleId ? "active" : ""}`}>
                                 <p>{module.module_name}</p>
                                 <IconButton onClick={(e) => onMenuOpen(e, module.id)}>
                                    <AddIcon />
                                 </IconButton>
                                 {/* Add Lesson Or Assignment Menu  */}
                                 <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)}>
                                    <MenuItem
                                       onClick={() => {
                                          setContentType(InputType.LESSON);
                                          handleMenuClose();
                                       }}
                                    >
                                       Add Lesson
                                    </MenuItem>
                                    <MenuItem
                                       onClick={() => {
                                          setContentType(InputType.ASSIGNMENT);
                                          handleMenuClose();
                                       }}
                                    >
                                       Add Assignment
                                    </MenuItem>
                                 </Menu>
                              </div>
                              <div className="lessons__assignments_wrapper">
                                 {module.id === activeModuleId && contentType && (
                                    <OutlinedInput
                                       placeholder={`Enter ${contentType.toLowerCase()} name`}
                                       value={contentName}
                                       onChange={(e) => setContentName(e.target.value)}
                                       onKeyDown={(e) => onKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, false)}
                                       autoFocus
                                    />
                                 )}

                                 {/* Display List of Lessons and Assignments Under the Module */}
                                 <StrictModeDroppable droppableId={module.id}>
                                    {(provided) => (
                                       <div ref={provided.innerRef} {...provided.droppableProps} className="lessons__assignments_list">
                                          {module.activities.map((item, index) => (
                                             <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                   <>
                                                      {module.id === activeModuleId && contentType && (
                                                         <TextField
                                                            label={`Enter ${contentType} Name`}
                                                            value={contentName}
                                                            onChange={(e) => setContentName(e.target.value)}
                                                            // onKeyDown={(e) => onKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, false)}
                                                            autoFocus
                                                         />
                                                      )}
                                                      {true && (
                                                         <div className="item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <IconButton
                                                               onClick={() =>
                                                                  dispatch({
                                                                     type: ActionType.DELETE_ITEM,
                                                                     payload: {
                                                                        moduleId: module.id, // The ID of the module the item belongs to
                                                                        itemId: item.id, // The ID of the item you want to delete
                                                                     },
                                                                  })
                                                               }
                                                            >
                                                               <Delete />
                                                            </IconButton>
                                                            <IconButton>
                                                               <DragIndicatorIcon />
                                                            </IconButton>
                                                            <p>{item.name}</p>
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
                           </div>
                        ))}
                     </div>
                  </DragDropContext>
               </div>
            </div>
            <div className="media__editor">
               <div className="media_display">
                  {/* {uploadedFiles?.length > 0 && <FileUploadV1 files={uploadedFiles} />} */}
                  {uploadedFiles?.length == 0 && <div className="image__upload">
                     <div className="action_wrapper">
                        <IconButton onClick={() => setIsModalOpen(true)}>
                           <AddIcon />
                        </IconButton>
                        <p>Add content</p>
                     </div>
                  </div>}

                  {fileDocs.length > 0 && (
                     <DocViewer
                        documents={fileDocs}
                        pluginRenderers={DocViewerRenderers}
                     />
                  )}
               </div>
               <div className="editor__input">
                  <QuillText onContentChange={handleContentChange} initialContent={""} />
                  <UploadModal
                     isOpen={isModalOpen}
                     onClose={() => setIsModalOpen(false)}
                     onUpload={handleUpload}
                     maxFiles={1}
                     acceptedFileTypes={ACCEPTED_FILES_TYPES}
                     modalTitle="Media Upload"
                     uploadButtonText="Upload"
                     cancelButtonText="Cancel"
                     supportedFormatsText={`Supports ${ACCEPTED_FILES_TYPES} files`}
                  />
               </div>
            </div>
         </section>
      </div>
   );
};

export default CourseBuilder;