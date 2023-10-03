"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./UserMaintenance.module.css";

function UserMaintenance() {
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
          <table className={styles.table}>
            <tr>
              <th>User</th>
              <th>Administrators</th>
              <th>Delete user</th>
            </tr>
            <tbody>
              <tr>
                <td>Arlene.McCoy@gmail.com</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <button className={styles.deletebutton}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Cody.Fisher@gmail.com</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <button className={styles.deletebutton}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h4>Other users</h4>
        </div>
      </div>
    </>
  );
}

export default UserMaintenance;
