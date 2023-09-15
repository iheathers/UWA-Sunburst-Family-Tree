"use client";

// External Libraries
import React, { Component, useState } from "react";
import Link from "next/link";
import axios from "axios";

// Internal Modules
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: EXTRACT URL IN .env.development file

    // WHAT WAS WRONG? - YOU WERE USING "http://localhost:8080/api/signup", WHICH DOES NOT EXIST
    // THE CORRECT URL IS "http://localhost:8080/api/user/signup"

    // MAKE SURE YOU COMMUNICATE WITH THE BACKEND TEAM TO GET THE CORRECT URL
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        {
          email,
          password,
        }
      );

      // TODO: REMOVE CONSOLE LOG ONCE TESTING IS DONE
      console.log("Registration response:", response.data); // Log the response

      if (response.data.success) {
        setSuccess(true);
        setError("");
      } else {
        setSuccess(false);
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("User exists.");
    }
  };

  return (
    <div className={styles.registration}>
      <div className={styles.centerContainer}>
        <div className={styles.card}>
          <div className={styles.leftSide}>
            <h1 className={styles.h1Label}>Sunburst Family Tree</h1>
            <h2 className={styles.h2Label}>
              An interactive platform to view and manage your family&apos;s
              relationships.
            </h2>
          </div>
          <div className={styles.rightSide}>
            <h1 className={styles.registrationLabel}>REGISTRATION</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.registrationInput}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.registrationInput}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Confirm Password</label>
                <br />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.registrationInput}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className={styles.errorText}>{error}</p>}
              {success && (
                <p className={styles.successText}>Registration successful!</p>
              )}
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
