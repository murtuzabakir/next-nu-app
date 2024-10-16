import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './ErrorShow.module.scss'

interface ErrorShowProps {
   message: string;
}

const ErrorShow: React.FC<ErrorShowProps> = ({ message }) => {
   if (!message) return null;
   return (
      <div className={styles["error"]}>
         <div className={styles["icon"]}>
            <ErrorOutlineIcon />
         </div>
         <p className={styles["message"]}>
            {message}
         </p>
      </div>
   );
};

export default ErrorShow;
