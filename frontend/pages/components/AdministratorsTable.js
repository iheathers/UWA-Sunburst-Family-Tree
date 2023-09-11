import React, { useState, useEffect } from 'react';
import styles from '../../styles/table.module.css'

const Table = ({ data }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        // 根据data的内容来确定选中的行
        const initiallySelectedRows = data
            .map((item, index) => (item.column2 ? index : -1)) // -1表示不选中
            .filter(index => index !== -1); // 过滤掉不选中的行

        setSelectedRows(initiallySelectedRows);
    }, [data]);

    const toggleRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    return (
        <table className={styles['table']}>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Administrator</th>
                    <th>Delete user</th>

                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.column1}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(index)}
                                onChange={() => toggleRow(index)}
                            />
                        </td>
                        <td>
                            <button className={styles.deletebutton}
                                data-delete-id={index}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

