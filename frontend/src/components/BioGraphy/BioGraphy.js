"use client";

// External Libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDateToAustralian } from "./dateUtils"; // <-- Import the formatDateToAustralian function
import Link from "next/link";

// Internal Modules
import styles from "./BioGraphy.module.css";

// EXTRACT URL IN .env.development file
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

const BioGraphy = ({ id }) => {
  const [artistData, setArtistData] = useState({
    name: "",
    parentId: "",
    birthDate: "",
    deathDate: "",
    location: "",
    occupation: "",
    about: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}${familyMemberRoute}/${id}`);
        const data = response.data;

        if (!data.error) {
          // Update the artistData state with the fetched data
          setArtistData(data);
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

  return (
    <div className={styles.biography}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.singleline}>
            <h1 className={styles.title}>{artistData.name}</h1>

            <div className={styles.titlebuttons}>
              <Link href="/family-tree">
                <button className={styles.returnbutton}>Go Back</button>
              </Link>
            </div>
          </div>

          <div className={styles.card}>
            <table className={styles.info}>
              <tr>
                <td className={styles.label}>Birth:</td>
                <td className={styles.value}>
                  {formatDateToAustralian(artistData.birthDate)}
                </td>
              </tr>
              <tr>
                <td className={styles.label}>Death:</td>
                <td className={styles.value}>
                  {formatDateToAustralian(artistData.deathDate)}
                </td>
              </tr>
              <tr>
                <td className={styles.label}>Location:</td>
                <td className={styles.value}>{artistData.location}</td>
              </tr>
              <tr>
                <td className={styles.label}>Occupation:</td>
                <td className={styles.value}>{artistData.occupation}</td>
              </tr>
            </table>
          </div>
          <div className={styles.card}>
            <h3>ABOUT {artistData.name}</h3>
            <p>{artistData.about}</p>
          </div>
          {/* ... Additional sections */}
        </>
      )}
    </div>
  );
};

export default BioGraphy;
