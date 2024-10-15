import React, { useState } from "react";
import { Switch as MuiSwitch } from "@mui/material";
import "./Switch.scss";

interface SwitchProps {
    label: string;
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ label, initialChecked = false, onChange }) => {
    const [checked, setChecked] = useState(initialChecked);
    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        if (onChange) onChange(newChecked);
    };
    return (
        <div className="switch__component">
            <span className="label">
                <span>{label}</span>
                <div className="pipe"></div>
            </span>
            <MuiSwitch checked={checked} size="small" onChange={handleToggle} color="primary" />
        </div>
    );
};

export default Switch;
