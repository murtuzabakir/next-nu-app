import React from 'react';
import { Button as MUIButton } from '@mui/material';

type ButtonColor = 'primary' | 'secondary';
type ButtonVariant = 'contained' | 'text';
type IconPosition = 'left' | 'right';

interface ButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    color?: ButtonColor;
    variant?: ButtonVariant;
    disabled?: boolean;
    icon?: React.ReactNode | any;
    iconPosition?: IconPosition;
    size?: 'medium';
}
const Button = ({ label, onClick, color = 'primary', variant = 'contained', disabled = false, icon, iconPosition = 'left', size = 'medium' }: ButtonProps) => {
    return (
        <MUIButton
            onClick={onClick}
            color={color}
            variant={variant}
            disabled={disabled}
            size={size}
            startIcon={iconPosition === 'left' ? icon : undefined}
            endIcon={iconPosition === 'right' ? icon : undefined}
        >
            {label}
        </MUIButton>
    );
};

export { Button };
