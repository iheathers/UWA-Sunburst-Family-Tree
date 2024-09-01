"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import styles from "./AddFamilyMember.module.css";
import { useRouter } from "next/navigation";

const CREATED_STATUS_CODE = 201;
const Unprocessable_Content_STATUS_CODE = 422;
const Bad_Request_STATUS_CODE = 400;

// EXTRACT URL IN .env.development file
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familymemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

const AddFamilyMember = ({ params }) => {
  const  id  = params;

  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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

    const { name, birthDate, deathDate, location, occupation, about } =
      formData;

    try {
      const requestData = {
        name,
        parentId: id === "root" ? null : id,
        location,
        occupation,
        about,
      };

      // Check if birthDate is not empty before adding it to the requestData
      if (birthDate) {
        requestData.birthDate = birthDate;
      }

      // Check if deathDate is not empty before adding it to the requestData
      if (deathDate) {
        requestData.deathDate = deathDate;
      }
      const response = await axios.post(
        `${apiUrl}${familymemberRoute}`, // Using the API URL obtained from the .env.development file
        requestData
      );

      if (response.status === CREATED_STATUS_CODE) {
        // Redirect to the family tree page
        router.push("/family-tree");
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error("Error add:", error);
      if (error.response.status === Unprocessable_Content_STATUS_CODE) {
        setError(error.response.data.message);
      } else if (error.response.status === Bad_Request_STATUS_CODE) {
        setError(error.response.data.error);
      } else {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <>
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
              placeholder="yyyy-mm-dd"
            />
            <label className={styles.label}>Death</label>
            <input
              type="text"
              className={styles.addinput}
              id="deathDate"
              name="deathDate"
              onChange={handleChange}
              placeholder="yyyy-mm-dd"
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
