"use client";

// External Libraries
import React, { Component, useState } from 'react';
import Link from 'next/link';

// Internal Modules (if applicable)
import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.login}>
      <div className={styles.centerContainer}>
        <div className={styles.card}>
          <div className={styles.leftSide}>
            <h1 className={styles.h1Label}>Sunburst Family Tree</h1>
            <h2 className={styles.h2Label}>
              An interactive platform to view and manage your family&apos;s relationships.
            </h2>
          </div>
          <div className={styles.rightSide}>
            <h1 className={styles.loginLabel}>LOGIN</h1>
            <form>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input type="text" id="Email" className={styles.loginInput} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input type="password" id="Password" className={styles.loginInput} />
              </div>
              <div className={styles.loginContainer}>
                <span className={styles.errorText}>Incorrect email or password</span>
              </div>
              <div className={styles.parentContainer}>
                <button type="submit" className={styles.btnLogin}>
                  Login
                </button>
              </div>
              <div className={styles.loginContainer}>
                <span className={styles.registrationText}>New User?</span>
                <Link href="/signup" className={styles.registrationLink}>
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
