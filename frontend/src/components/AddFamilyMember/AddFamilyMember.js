"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import styles from "./AddFamilyMember.module.css";

const AddFamilyMember = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    parentId: "",
    birthDate: "",
    deathDate: "",
    location: "",
    occupation: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      parentId,
      birthDate,
      deathDate,
      location,
      occupation,
      about,
    } = formData;

    // EXTRACT URL IN .env.development file
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
    const familymemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

    try {
      const response = await axios.post(
        `${apiUrl}${familymemberRoute}`, // Using the API URL obtained from the .env.development file
        {
          name,
          parentId,
          birthDate,
          deathDate,
          location,
          occupation,
          about,
        }
      );

      if (response.status === 201) {
        // Redirect to the family tree page
        router.push("/family-tree");
      } else {
        alert("Error");
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error("Error add:", error);
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <input
        type="hidden"
        name="parentId"
        id="parentId"
        value="650bfc488bb8876071f7682b"
      />
      <div className={styles.singleline}>
        <div className={styles.title}>
          <h1>Add a Family Member</h1>
        </div>
        <div className={styles.titlebuttons}>
          <Link href="/family-tree">
            <button className={styles.returnbutton}>Go Back</button>
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formpart}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              className={styles.addinput}
              id="name"
              name="name"
              onChange={handleChange}
              required
            />

            <label className={styles.label}>Birth</label>
            <input
              type="text"
              className={styles.addinput}
              id="birthDate"
              name="birthDate"
              onChange={handleChange}
              placeholder="yyyy-mm-mm"
            />
            <label className={styles.label}>Death</label>
            <input
              type="text"
              className={styles.addinput}
              id="deathDate"
              name="deathDate"
              onChange={handleChange}
              placeholder="yyyy-mm-mm"
            />
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className={styles.addinput}
              id="location"
              name="location"
              onChange={handleChange}
            />
            <label className={styles.label}>Occupation</label>
            <input
              type="text"
              className={styles.addinput}
              id="occupation"
              name="occupation"
              onChange={handleChange}
            />
            <label className={styles.label}>About</label>
            <textarea
              className={styles.addinput}
              id="about"
              name="about"
              rows="4"
              cols="50"
              onChange={handleChange}
            ></textarea>
            <div className={styles.addContainer}>
              {error && <p className={styles.errorText}>{error}</p>}
            </div>
            <div className={styles.addContainer}>
              <button type="submit" className={styles.addbutton}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFamilyMember;
