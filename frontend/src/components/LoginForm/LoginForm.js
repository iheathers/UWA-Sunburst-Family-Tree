"use client";

// External Libraries
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

// Internal Modules (if applicable)
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // EXTRACT URL IN .env.development file
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
    const loginRoute = process.env.NEXT_PUBLIC_LOGIN_ROUTE;

    try {
      const response = await axios.post(
        `${apiUrl}${loginRoute}`, // Using the API URL obtained from the .env.development file
        {
          email,
          password,
        }
      );

      // // Check if the registration was successful
      if (response.status === SUCCESS_STATUS_CODE) {
        // If successful, set the success state to true and clear the error state
        setError("");
        // Redirect to the family tree page
        router.push("/family-tree");
      } else {
        // If unsuccessful, set the error state to the error message
        const errormessage = "Incorrect email or password";
        setError(errormessage);
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error("Error login:", error);
    }
  };

  return (
    <div className={styles.login}>
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
            <h1 className={styles.loginLabel}>LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <br />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.loginInput}
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
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.loginInput}
                  required
                />
              </div>

              <div className={styles.loginContainer}>
                {error && <p className={styles.errorText}>{error}</p>}
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
