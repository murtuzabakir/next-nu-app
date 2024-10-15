import React, { useEffect, useState, useRef, useReducer } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "../../../../shared/Components/Button/Button";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import SubNavigation from "../../../../shared/Components/SubNavigation/SubNavigation.tsx";
import {
    NAVIGATION_ACTIONS,
    NAVIGATION_LINKS,
} from "./CourseBuilder.config.tsx";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
    DragDropContext,
    Draggable,
    DroppableProvided,
    DroppableStateSnapshot,
} from "react-beautiful-dnd";
import StrictModeDroppable from "../../../../shared/Components/StrictModeDrop/StrictModeDrop.tsx";
import { CourseBuilderProps, Module } from "./CourseBuilder.types.ts";
import "./CourseBuilder.scss";

// Function to reorder the list on drag end
const reorder = (
    list: Module[],
    startIndex: number,
    endIndex: number
): Module[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const CourseBuilder: React.FC<CourseBuilderProps> = ({
    title,
    onBackClick,
    onEditClick,
    onPublishClick,
    onCloseClick,
}) => {
    type Action =
        | { type: "ADD_MODULE"; payload: { name: string } }
        | {
              type: "ADD_ITEM";
              payload: {
                  moduleId: string;
                  name: string;
                  itemType: "lesson" | "assignment";
              };
          }
        | { type: "DELETE_MODULE"; payload: { id: string } }
        | { type: "DELETE_ITEM"; payload: { moduleId: string; itemId: string } }
        | { type: "REORDER_MODULES"; payload: Module[] };

    const moduleReducer = (state: Module[], action: Action): Module[] => {
        switch (action.type) {
            case "ADD_MODULE":
                return [
                    ...state,
                    {
                        id: `${state.length + 1}`,
                        name: action.payload.name,
                        items: [],
                    },
                ];
            case "ADD_ITEM":
                return state.map((module) =>
                    module.id === action.payload.moduleId
                        ? {
                              ...module,
                              items: [
                                  ...module.items,
                                  {
                                      id: `${module.items.length + 1}`,
                                      name: action.payload.name,
                                      type: action.payload.itemType,
                                  },
                              ],
                          }
                        : module
                );
            case "DELETE_MODULE":
                return state.filter(
                    (module) => module.id !== action.payload.id
                );
            case "DELETE_ITEM":
                return state.map((module) =>
                    module.id === action.payload.moduleId
                        ? {
                              ...module,
                              items: module.items.filter(
                                  (item) => item.id !== action.payload.itemId
                              ),
                          }
                        : module
                );
            case "REORDER_MODULES":
                return action.payload;
            default:
                return state;
        }
    };

    const inputDetailsRef = useRef<HTMLDivElement>(null);
    const [editorHeight, setEditorHeight] = useState<string>("");
    const [modules, dispatch] = useReducer(moduleReducer, []);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [newModuleName, setNewModuleName] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
        null
    );
    const [itemType, setItemType] = useState<"lesson" | "assignment" | null>(
        null
    );

    useEffect(() => {
        const setContainerHeight = () => {
            if (inputDetailsRef.current) {
                setEditorHeight(
                    `calc(100vh - ${inputDetailsRef.current.offsetTop}px)`
                );
            }
        };
        setContainerHeight();
        window.addEventListener("resize", setContainerHeight);
        return () => window.removeEventListener("resize", setContainerHeight);
    }, []);

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>,
        moduleId: string
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedModuleId(moduleId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedModuleId(null);
    };

    const handleAddModule = () => {
        if (newModuleName) {
            dispatch({ type: "ADD_MODULE", payload: { name: newModuleName } });
            setNewModuleName("");
            setInputVisible(false);
        }
    };

    const handleAddItem = () => {
        if (selectedModuleId && newItemName && itemType) {
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    moduleId: selectedModuleId,
                    name: newItemName,
                    itemType,
                },
            });
            setNewItemName("");
            setItemType(null);
        }
        handleMenuClose();
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedModules = reorder(
            modules,
            result.source.index,
            result.destination.index
        );
        dispatch({ type: "REORDER_MODULES", payload: reorderedModules });
    };

    return (
        <div className="course__builder__component">
            <section className="header">
                <div className="left">
                    <div className="icon__backward" onClick={onBackClick}>
                        <IconButton>
                            <KeyboardBackspaceOutlinedIcon />
                        </IconButton>
                    </div>
                    <div className="title">{title}</div>
                    <div className="icon__edit" onClick={onEditClick}>
                        <IconButton>
                            <ModeEditIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="right">
                    <div className="actions">
                        <Button
                            label="Publish"
                            icon={<LaunchOutlinedIcon />}
                            onClick={onPublishClick}
                        />
                        <div className="icon__close" onClick={onCloseClick}>
                            <IconButton>
                                <CloseOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Input field to add a new module */}
            <section className="builder__navigation">
                <SubNavigation
                    links={NAVIGATION_LINKS}
                    actions={NAVIGATION_ACTIONS}
                />
            </section>
            <section
                className="input__details"
                style={{ height: editorHeight }}
                ref={inputDetailsRef}
            >
                <div className="course__overview">
                    <div className="add__modules_button">
                        {inputVisible ? (
                            <TextField
                                label="Module Name"
                                value={newModuleName}
                                onChange={(e) =>
                                    setNewModuleName(e.target.value)
                                }
                                onBlur={handleAddModule}
                                autoFocus
                            />
                        ) : (
                            <Button
                                label="Add new module"
                                variant="text"
                                icon={<AddIcon />}
                                onClick={() => setInputVisible(true)}
                            />
                        )}
                    </div>

                    <div className="module__lesson__list">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <StrictModeDroppable droppableId="modules">
                                {(
                                    provided: DroppableProvided,
                                    snapshot: DroppableStateSnapshot
                                ) => (
                                    <div
                                        className="modules"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {modules.map((module, index) => (
                                            <Draggable
                                                key={module.id}
                                                draggableId={module.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="module"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided
                                                                .draggableProps
                                                                .style,
                                                        }}
                                                    >
                                                        <IconButton>
                                                            <DragIndicatorIcon />
                                                        </IconButton>
                                                        <p>{module.name}</p>

                                                        <IconButton
                                                            onClick={(e) =>
                                                                handleMenuOpen(
                                                                    e,
                                                                    module.id
                                                                )
                                                            }
                                                        >
                                                            <AddIcon />
                                                        </IconButton>

                                                        {/* Menu for adding lesson or assignment */}
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={Boolean(
                                                                anchorEl
                                                            )}
                                                            onClose={
                                                                handleMenuClose
                                                            }
                                                        >
                                                            <MenuItem
                                                                onClick={() =>
                                                                    setItemType(
                                                                        "lesson"
                                                                    )
                                                                }
                                                            >
                                                                Add Lesson
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    setItemType(
                                                                        "assignment"
                                                                    )
                                                                }
                                                            >
                                                                Add Assignment
                                                            </MenuItem>
                                                        </Menu>

                                                        {itemType && (
                                                            <TextField
                                                                label={`Enter ${itemType} Name`}
                                                                value={
                                                                    newItemName
                                                                }
                                                                onChange={(e) =>
                                                                    setNewItemName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                onBlur={
                                                                    handleAddItem
                                                                }
                                                                autoFocus
                                                            />
                                                        )}

                                                        {/* List of items */}
                                                        {module.items.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}{" "}
                                                                    ({item.type}
                                                                    )
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </StrictModeDroppable>
                        </DragDropContext>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseBuilder;
