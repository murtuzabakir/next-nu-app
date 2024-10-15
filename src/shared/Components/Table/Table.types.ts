export type CellType =
    | "text"
    | "number"
    | "percentage"
    | "image"
    | "status"
    | "customaction";

// Each column can either define a type or pass a custom rendering function
export interface TableColumn {
    dataKey: string; // Key to access the data in each row
    header?: string; // Optional header for the column
    type?: CellType; // Optional type (text, number, etc.)
    subText?: string; // Optional sub-text for the cell
    customRender?: (
        value: unknown,
        rowData: Record<string, unknown>
    ) => JSX.Element; // Custom cell content
    actions?: (rowData: Record<string, unknown>) => JSX.Element; // Custom actions
}

export interface TableProps {
    columns: TableColumn[]; // Header Config
    data: Record<string, any>[]; // Data
    onRowsSelect?: (selectedRows: Record<string, any>[]) => void;
}
