"use client";

import React, { useState } from "react";

import styles from "./UserAccessControlPanel.module.css";
import Administrators from '../AdministratorsTable/AdministratorsTable'
import OtherUsers from '../OtherUsersTable/OtherUsersTable'

function UserAccessControlPanel() {

  const data = [
    { column1: 'Arlene.McCoy@gmail.com',
      column2: true },
    { column1: 'Cody.Fisher@gmail.com',
      column2: false },
  ];

  const data2 = [
    { column1: 'Arlene.McCoy@gmail.com' },
    { column1: 'Cody.Fisher@gmail.com' },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.singleline}>
          <div className={styles.title}>
            <h1>User Maintenance</h1>
            <h3>Manage user access and privileges</h3>
          </div>
          <div className={styles.titlebuttons}>
          <button className={styles.gobackbutton}>Save Changes</button>
            <button className={styles.gobackbutton}>Go Back</button>
          </div>
        </div>

        <div className={styles.tablepart}>

          <h4>Administrators</h4>
          <Administrators data={data} />

          <h4>Other users</h4>
          <OtherUsers data={data2} />
        </div>
        
      </div>


    </>
  );
}


export default UserAccessControlPanel;

