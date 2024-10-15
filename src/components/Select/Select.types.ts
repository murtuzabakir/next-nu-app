export interface SelectOption {
    [key: string]: any; // Generic object to accept any fields
}

export interface SelectProps {
    label: string;
    options: SelectOption[];
    field: string; // Field to read the value to be displayed
    isMulti?: boolean;
    placeholder?: string;
    selectedOptions?: SelectOption[];
    onChange: (selected: SelectOption[]) => void;
    creatable?: boolean;
    loading?: boolean; // Optional loading state
}