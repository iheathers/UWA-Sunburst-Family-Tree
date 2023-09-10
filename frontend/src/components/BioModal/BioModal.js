import React, { useEffect } from "react";

import styles from "./BioModal.module.css";

const BioModal = ({ isOpen, onClose, children }) => {
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
        <div className={styles.modal_scrollable_content}>{children}</div>
      </div>
    </div>
  );
};

export default BioModal;
