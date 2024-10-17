export interface CourseBuilderProps {
   title: string;
   onBackClick: () => void;
   onEditClick: () => void;
   onPublishClick: () => void;
   onCloseClick: () => void;
}

export interface Module {
   id: string;
   module_name: string;
   activities: LessonOrAssignment[];
   course?: string;
   company?: string;
   serial_number?: number;
}

export interface LessonOrAssignment {
   id: string;
   type: InputType.LESSON | InputType.ASSIGNMENT;
   name: string;
}

export enum ActionType {
   ADD_MODULE = "ADD_MODULE",
   ADD_ITEM = "ADD_ITEM",
   DELETE_MODULE = "DELETE_MODULE",
   DELETE_ITEM = "DELETE_ITEM",
   REORDER_MODULES = "REORDER_MODULES",
}

export enum InputType {
   MODULE = "MODULE",
   LESSON = "LESSON",
   ASSIGNMENT = "ASSIGNMENT",
}

export type Action =
   | { type: ActionType.ADD_MODULE; payload: Module[]}
   | {
        type: ActionType.ADD_ITEM;
        payload: {
           moduleId: string;
           name: string;
           itemType: InputType.LESSON | InputType.ASSIGNMENT;
        };
     }
   | { type: ActionType.DELETE_MODULE; payload: { id: string } }
   | { type: ActionType.DELETE_ITEM; payload: { moduleId: string; itemId: string } }
   | { type: ActionType.REORDER_MODULES; payload: Module[] };
