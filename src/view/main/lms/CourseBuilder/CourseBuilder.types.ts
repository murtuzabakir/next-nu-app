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
   activities: Activity[];
   course?: string;
   company?: string;
   serial_number?: number;
}

export interface Activity {
   id: string;
   type: InputType.LESSON | InputType.ASSIGNMENT;
   activity_name: string;
   serial_number: number;
   module: string;
   text: string;
   media_address: string;
   time_limit: string;
   activity_media?: File;
}

export enum ActionType {
   ADD_MODULE = "ADD_MODULE",
   ADD_ACTIVITY = "ADD_ITEM",
   DELETE_MODULE = "DELETE_MODULE",
   DELETE_ACTIVITY = "DELETE_ACTIVITY",
   REORDER_MODULES = "REORDER_MODULES",
   UPDATE_ACTIVITY = "UPDATE_ACTIVITY",
}

export enum InputType {
   MODULE = "MODULE",
   LESSON = "lesson",
   ASSIGNMENT = "ASSIGNMENT",
}

export type Action =
   | { type: ActionType.ADD_MODULE; payload: Module[] }
   | {
        type: ActionType.ADD_ACTIVITY;
        payload: { module_id: string; activities: Activity[] };
     }
   | { type: ActionType.DELETE_MODULE; payload: { id: string } }
   | { type: ActionType.DELETE_ACTIVITY; payload: { module_id: string; activity_id: string } }
   | { type: ActionType.REORDER_MODULES; payload: Module[] }
   | { type: ActionType.UPDATE_ACTIVITY; payload: Activity };
