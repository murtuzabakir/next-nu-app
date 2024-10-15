import React from 'react';
import { Switch } from '@mui/material';

interface DarkModeToggleProps {
  mode: 'light' | 'dark';
  toggleMode: (newMode: 'light' | 'dark') => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ mode, toggleMode }) => {
  return (
    <Switch checked={mode === 'dark'} onChange={() => toggleMode(mode === 'light' ? 'dark' : 'light')} />
  );
};

export default DarkModeToggle;
