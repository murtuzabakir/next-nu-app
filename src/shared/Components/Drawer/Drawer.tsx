import React from 'react';
import { Drawer as MuiDrawer, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Drawer.scss';

interface DrawerProps {
    isOpen: boolean; // Controls the drawer visibility
    onClose: () => void; // Function to handle closing the drawer
    header: string; // Header text for the drawer
    content: React.ReactNode; // Content (Component) to render inside
    width: string | number; // Optional width for the drawer
    anchor?: 'left' | 'top' | 'right' | 'bottom'; // Drawer Position
}

const Drawer: React.FC<DrawerProps> = ({
    isOpen: open,
    onClose,
    header,
    content,
    width,
    anchor = 'right'
}) => {
    return (
        <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
            <div className="custom-drawer" style={{ width }}>
                <div className="drawer-header">
                    <Typography variant="h6">{header}</Typography>
                    <IconButton onClick={onClose} aria-label="close drawer">
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider className="drawer-divider" />
                <div className="drawer-content">
                    {content}
                </div>
            </div>
        </MuiDrawer>
    );
};

export default Drawer;
