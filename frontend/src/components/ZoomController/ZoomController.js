import React from "react";

import { useControls } from "react-zoom-pan-pinch";

import styles from "./ZoomController.module.css";

const ZoomController = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className={styles.zoomControllerContainer}>
      <button onClick={() => zoomIn()}>Zoom In</button>
      <button onClick={() => resetTransform()}>Reset</button>
      <button onClick={() => zoomOut()}>Zoom Out</button>
    </div>
  );
};

export default ZoomController;
