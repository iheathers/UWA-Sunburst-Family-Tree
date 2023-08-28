import React from 'react';
import { useEffect } from 'react';
import styles from '../../styles/information.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
    } else {
    }
  }, [isOpen]);

  if (!isOpen) {
    return null; 
  }

  return (
    <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <div className={styles.modal_scrollable_content}>
            {children}
          </div>
        </div>
      </div>

    
  );
};



export default Modal;
