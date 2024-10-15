import { useState } from 'react';
import styles from './Table.module.scss';
import Background from "../../../assets/profile.svg";
import { TableColumn, TableProps } from './Table.types';
import { Checkbox } from '@mui/material';

const Table = ({ columns, data, onRowsSelect }: TableProps) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleSelectRow = (rowIndex: number) => {
        let newSelectedRows = [...selectedRows];
        if (newSelectedRows.includes(rowIndex)) {
            newSelectedRows = newSelectedRows.filter(index => index !== rowIndex);
        } else {
            newSelectedRows.push(rowIndex);
        }
        setSelectedRows(newSelectedRows);
        const selectedData = newSelectedRows.map(index => data[index]);
        if (onRowsSelect) onRowsSelect(selectedData);
    };

    return (
        <div className={styles.tableWrapper}>
            {data.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.tableRow}>
                    <div className={styles.checkboxContainer}>
                        <Checkbox
                            checked={selectedRows.includes(rowIndex)}
                            onChange={() => handleSelectRow(rowIndex)}
                            sx={{
                                color: '#EEEEF2', // Default color
                                '&.Mui-checked': {
                                    color: '#d26300', // Checked color (primary-color)
                                },
                                borderRadius: '4px',
                            }}
                        />
                    </div>

                    {columns.map((column, colIndex) => {
                        const cellValue = row[column.dataKey];
                        return (
                            <div key={colIndex} className={styles.cell}>
                                {column.customRender
                                    ? column.customRender(cellValue, row)
                                    : renderCellContent(column, cellValue, row)}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const renderCellContent = (column: TableColumn, value: any, rowData: any) => {
    const renderSubText = () => (
        column.subText && <div className={styles.subText}>{column.subText}</div>
    );

    const renderText = () => (
        <>
            <div className={styles.mainText}>{value}</div>
            {renderSubText()}
        </>
    );

    const renderPercentage = () => (
        <>
            <div className={styles.mainText}>
                {value}% <span className={styles.entity}>&nbsp;(of users)</span>
            </div>
            {renderSubText()}
        </>
    );

    const renderImage = () => (
        <div className={styles.cellWithImage}>
            <img className={styles.thumbnail} src={Background} alt="Thumbnail" />
            <div className={styles.textWrapper}>
                <span className={styles.mainText}>{value}</span>
                {rowData['createdDate'] && (
                    <div className={[styles.subText, styles.subTextLight].join(' ')}>
                        {rowData['createdDate']}
                        <span className={styles.subText}>
                            <span className={styles.dot}> •</span> {rowData['category']}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    const renderStatus = () => (
        <>
            <div className={`${styles.mainText} ${getStatusClass(column.dataKey)}`}>
                {value} <span className={styles.entity}>&nbsp;(Users)</span>
            </div>
            {renderSubText()}
        </>
    );

    const renderCustomAction = () => (
        <div className={styles.actions}>
            {column.actions ? column.actions(rowData) : null}
        </div>
    );

    switch (column.type) {
        case 'text':
        case 'number':
            return renderText();
        case 'percentage':
            return renderPercentage();
        case 'image':
            return renderImage();
        case 'status':
            return renderStatus();
        case 'customaction':
            return renderCustomAction();
        default:
            return <div className={styles.mainText}>{value}</div>;
    }
};

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completedusers':
            return styles.completedText;
        case 'inprogressusers':
            return styles.inProgressText;
        case 'pendingusers':
            return styles.pendingText;
        default:
            return '';
    }
};

export default Table;
