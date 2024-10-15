import React, { useState } from "react";
import "./ToggleButton.scss";

export interface Option {
    label: string;
    value: string;
}

export interface ToggleButtonProps {
    options: Option[]; // Array of objects with label and value
    onToggle: (selectedOption: Option) => void;
    defaultSelected?: Option; // Object instead of string
    width?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, onToggle, defaultSelected, width }) => {
    const [selected, setSelected] = useState<Option>(defaultSelected || options[0]);

    const handleToggle = (option: Option) => {
        setSelected(option);
        onToggle(option);
    };

    return (
        <div className="toggle__switch__container" style={{ width: width ? width : "max-content" }}>
            {options.map((option) => (
                <button key={option.value} className={`toggle__button ${selected.value === option.value ? "active" : ""}`} onClick={() => handleToggle(option)}>
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleButton;
