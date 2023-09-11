import React, { useState } from 'react';
import styles from '../../sharedStyles/table.module.css'

const Table = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProfileRows, setSelectedProfileRows] = useState([]);

  const toggleRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const toggleProfileRow = (index) => {
    if (selectedProfileRows.includes(index)) {
      setSelectedProfileRows(selectedProfileRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedProfileRows([...selectedProfileRows, index]);
    }
  };

  return (
    
    <table className={styles['table']}>
      <thead>
        <tr>
          <th>User</th>
          <th>Administrator</th>
          <th>View Profile</th>
          <th>Delete User</th>
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
              <input
                type="checkbox"
                checked={selectedProfileRows.includes(index)}
                onChange={() => toggleProfileRow(index)}
              />
            </td>
            <td>
              <button className={styles.deletebutton}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
