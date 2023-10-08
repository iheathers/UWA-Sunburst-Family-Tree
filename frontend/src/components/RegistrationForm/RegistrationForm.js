"use client";

// External Libraries
import React, { Component, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

// Internal Modules
import styles from "./RegistrationForm.module.css";
import * as httpStatus from "./HttpStatus.util";

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

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
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
    const signUpRoute = process.env.NEXT_PUBLIC_SIGNUP_ROUTE;

    try {
      const response = await axios.post(
        `${apiUrl}${signUpRoute}`, // Using the API URL obtained from the .env.development file
        {
          email,
          password,
        }
      );
      
      // Check if the registration was successful
      if (response.status === httpStatus.CREATED) {
        router.push("/login"); // Redirect to the login page

      } else if (response.data.error) {
        // If the response indicates "User exists," set the error message accordingly
        setError("User exists");
      } else {
        // If not successful, set the success state to false and display the error message from the response
        setError(response.data.error); // Use the error message from the response for other cases
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      if (!error.response) {
        setError(error.request ? "Network Error. Please check your internet connection." : "An error occurred while processing your request.");
      } else {
        const errorMessage = error.response.data.error;
        setError(errorMessage === "User exists" ? "User exists" : `Server Error: ${error.response.status}`);
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
