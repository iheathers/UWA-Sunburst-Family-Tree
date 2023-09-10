import React, { useState } from "react";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={styles.login}>
      <div className={styles.centercontainer}>
        <div className={styles.card}>
          <div className={styles.leftside}>
            <h1>Sunburst Family Tree</h1>
            <h3>
              An interactive platform to view and manage your family's
              relationships.
            </h3>
          </div>
          <div className={styles.rightside}>
            <h1 className={styles.loginlabel}>LOGIN</h1>

            <form>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input type="text" id="Email" className={styles.logininput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input
                  type="password"
                  id="Password"
                  className={styles.logininput}
                />
              </div>

              <div className={styles.parentcontainer}>
                <button type="submit" className={styles.btnlogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
