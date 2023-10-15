"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeTimeFromDate } from "./dateUtils";

import styles from "./EditFamilyMember.module.css";

// EXTRACT URL IN .env.development file
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

const EditFamilyMember = ({ id }) => {
  const router = useRouter();

  // get the data of the family member

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    location: "",
    occupation: "",
    about: "",
  });

  // TODO: THE FOLLOWING STATE IS NOT BEING USED. REMOVE IT IF NOT NEEDED
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}${familyMemberRoute}/${id}`);
        const data = response.data;

        if (!data.error) {
          // Update the artistData state with the fetched data
          setFormData(data);

          setFormData({
            name: data.name,
            birthDate: removeTimeFromDate(data.birthDate),
            deathDate: removeTimeFromDate(data.deathDate),
            location: data.location,
            occupation: data.occupation,
            about: data.about,
          });
        } else {
          setError(data.error);
        }

        setIsLoading(false);
      } catch (error) {
        // Handle errors if the data fetching fails
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [apiUrl, familyMemberRoute, id]);

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

    console.log(formData);
    const patchUrl = `${apiUrl}${familyMemberRoute}/${id}/edit`;
    console.log("Patch URL:", patchUrl);

    try {
      const response = await axios.patch(
        `${apiUrl}${familyMemberRoute}/${id}/edit`, // Using the API URL obtained from the .env.development file
        {
          name,
          birthDate,
          deathDate,
          location,
          occupation,
          about,
        }
      );

      if (response.status === 200) {
        // Redirect to the family tree page
        router.push("/family-tree");
      } else {
        alert("Error");
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error("Error edit:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.singleline}>
        <div className={styles.title}>
          <h1>Edit the Family Member</h1>
        </div>
        <div className={styles.titlebuttons}>
          <button className={styles.returnbutton} onClick={handleBack}>
            Go Back
          </button>
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
              className={styles.editinput}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className={styles.label}>Birth</label>
            <input
              type="text"
              className={styles.editinput}
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            <label className={styles.label}>Death</label>
            <input
              type="text"
              className={styles.editinput}
              id="deathDate"
              name="deathDate"
              value={formData.deathDate}
              onChange={handleChange}
            />
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className={styles.editinput}
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <label className={styles.label}>Occupation</label>
            <input
              type="text"
              className={styles.editinput}
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            <label className={styles.label}>About</label>
            <textarea
              className={styles.editinput}
              id="about"
              name="about"
              rows="4"
              cols="50"
              onChange={handleChange}
              value={formData.about}
            ></textarea>
            <button className={styles.editbutton}>Edit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFamilyMember;
