import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/mainpage.module.css';
import Head from 'next/head';

function Userlist() {

  return (
    <>
      <div className={styles.upside}>

        <h1>User List</h1>
        <h3>Suggestion privilege</h3>
      </div>
      <div className={styles.downside}>
        <div className={styles.downsidecard}>
          <div className={styles.downsidecardtitle}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label>abc@abc</label>
          </div>
          <br></br>
          <div className={styles.downsidecardtitle}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label>abc@abc</label>
          </div>
          <br></br>
          <div className={styles.downsidecardtitle}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label>abc@abc</label>
          </div>
          <br></br>
          <div className={styles.downsidecardtitle}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label>abc@abc</label>
          </div>




          </div>

      </div>
    </>
  );
}


export default Userlist; 