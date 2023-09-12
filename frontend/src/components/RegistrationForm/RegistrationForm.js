"use client"

// External Libraries
import React from 'react';
import { useState } from 'react'; 
import Link from 'next/link';

// Internal Modules
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  return (
    <div className={styles.registration}>
      <div className={styles.centerContainer}>
        <div className={styles.card}>
          <div className={styles.leftSide}>
            <h1 className={styles.h1Label}>Sunburst Family Tree</h1>
            <h2 className={styles.h2Label}>
              An interactive platform to view and manage your family&apos;s relationships.
            </h2>
          </div>
          <div className={styles.rightSide}>
            <h1 className={styles.registrationLabel}>REGISTRATION</h1>
            <form>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input type="text" id="email" className={styles.registrationInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input type="password" id="password" className={styles.registrationInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>ConfirmPassword</label>
                <br />
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.registrationInput}
                />
              </div>
              <div className={styles.loginContainer}>
                <span className={styles.errorText}>Passwords do not match</span>
              </div>
              <div className={styles.parentContainer}>
                <button type="submit" className={styles.btnRegistration}>
                  Register
                </button>
              </div>
              <div className={styles.loginContainer}>
                <span className={styles.loginText}>Already Have Account?</span>
                <Link href="/login" className={styles.loginLink}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
