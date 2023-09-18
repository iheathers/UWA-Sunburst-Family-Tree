"use client";

// External Libraries
import React, { Component, useState } from 'react';
import Link from 'next/link';

// Internal Modules (if applicable)
import styles from './LoginForm.module.css';

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://uwa-sunburst-chart-api.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      console.log("Login successful!");
      // const { token } = await res.json();

      // Set token to cookie
      // Cookies.set("token", token, { expires: 60 });
      Router.push("/user-access-control-panel");
    } else {
      console.log("Login failed.");
      const error = "Incorrect email or password";
      setError(error);
    }


  };


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
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input type="text" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.loginInput} required/>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input type="password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.loginInput} required />
              </div>

              <div className={styles.loginContainer}>
                {error && (<p className={styles.errorText}>{error}</p>)}
              </div>
              <div className={styles.parentContainer}>
                <button type="submit" className={styles.btnLogin}>
                  Login
                </button>
              </div>
            </form>
            <div className={styles.loginContainer}>
              <span className={styles.registrationText}>New User?</span>
              <Link href="/signup" className={styles.registrationLink}>
                Create an account
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
