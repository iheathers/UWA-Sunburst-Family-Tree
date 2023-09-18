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

    // EXTRACT URL IN .env.development file
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL
    const signUpRoute = process.env.NEXT_PUBLIC_SIGNUP_ROUTE

    try {
      const response = await axios.post(
        `${apiUrl}${signUpRoute}`, // Using the API URL obtained from the .env.development file
        {
          email,
          password,
        }
      );
    
      // Check if the registration was successful
      if (response.data.success) {
        // If successful, set the success state to true, clear the error state, and reset the form
        setSuccess(true);
        setError(""); // Clear any previous errors
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else if (response.data.error === "User exists") {
        // If the response indicates "User exists," set the error message accordingly
        setError("User exists");
        setSuccess(false); // Set success to false
      } else {
        // If not successful, set the success state to false and display the error message from the response
        setError(response.data.error); // Use the error message from the response for other cases
        setSuccess(false);
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      if (error.response) {
        // The request was made, but the server responded with a status code other than 2xx
        if (error.response.data.error === "User exists") {
          setError("User exists"); // Handle the specific case where user already exists
        } else {
          setError(`Server Error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made, but no response was received
        setError("Network Error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An error occurred while processing your request.");
      }
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
