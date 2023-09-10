import Link from "next/link";
import React, { useState } from "react";

import styles from "../styles/registration.module.css";

function RegistrationForm() {
  return (
    <div className={styles.registration}>
      <div className={styles.centercontainer}>
        <div className={styles.card}>
          <div className={styles.leftside}>
            <h1 className={styles.h1label}>Sunburst Family Tree</h1>
            <h2 className={styles.h2label}>
              An interactive platform to view and manage your family's
              relationships.
            </h2>
          </div>
          <div className={styles.rightside}>
            <h1 className={styles.registrationlabel}>REGISTRATION</h1>
            <form>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input
                  type="text"
                  id="Email"
                  className={styles.registrationinput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input
                  type="password"
                  id="Password"
                  className={styles.registrationinput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>ConfirmPassword</label>
                <br />
                <input
                  type="password"
                  id="ConfirmPassword"
                  className={styles.registrationinput}
                />
              </div>

              <div className={styles.logincontainer}>
                <span className={styles.errortxt}>Passwords do not match</span>
              </div>

              <div className={styles.parentcontainer}>
                <button type="submit" className={styles.btnregistration}>
                  register
                </button>
              </div>

              <div className={styles.logincontainer}>
                <span className={styles.logintext}>Already Have Account?</span>
                <Link href="/login" className={styles.loginlink}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
