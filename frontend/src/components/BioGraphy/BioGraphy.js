"use client";

// External Libraries
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { formatDateToAustralian } from "./dateUtils"; // <-- Import the formatDateToAustralian function

// Internal Modules
import styles from "./BioGraphy.module.css";

// EXTRACT URL IN .env.development file
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;
const userPermissionRoute = process.env.NEXT_PUBLIC_USER_PERMISSION_ROUTE;

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

  const [showDeathRow, setShowDeathRow] = useState(true);
  const [accessEdit, setAccessEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get permissions first
        const idToFind = localStorage.getItem("userId");
        if (!idToFind) {
          // Handle the case where "userId" is not set in localStorage
          router.push("/login");
          return;
        }
        const permissionResponse = await axios.get(
          `${apiUrl}${userPermissionRoute}/${idToFind}`
        );
        const permissionData = permissionResponse.data;

        if (permissionData && !permissionData.includes("VIEW_CHART_ONLY")) {
          // If the user has admin permission, proceed to fetch data
          const response = await axios.get(
            `${apiUrl}${familyMemberRoute}/${id}`
          );
          const data = response.data;

          if (!data.error) {
            // Update the artistData state with the fetched data
            setArtistData(data);
          } else {
            setError(data.error);
          }

          if (permissionData.includes("ADMIN")) {
            setAccessEdit(true);
          }
        } else {
          // If the user doesn't have admin permission, redirect to family-tree
          router.push("/family-tree");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, familyMemberRoute, id, router]);

  const toggleDeathRow = () => {
    setShowDeathRow(!showDeathRow);
    sessionStorage.setItem("showDeathRow", !showDeathRow);
  };

  const handleEdit = () => {
    // Redirect to the edit page
    router.push(`/family-member/${id}/edit`);
  };

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
              <button
                className={styles.toggleDeathRowButton}
                onClick={toggleDeathRow}
              >
                {showDeathRow ? "Hide Death" : "Show Death"}
              </button>
              {accessEdit && (
                <button className={styles.editbutton} onClick={handleEdit}>
                  Edit
                </button>
              )}

              <Link href="/family-tree">
                <button className={styles.returnbutton}>Go Back</button>
              </Link>
            </div>
          </div>

          <div className={styles.card}>
            <table className={styles.info}>
              <tbody>
                <tr>
                  <td className={styles.label}>Birth:</td>
                  <td className={styles.value}>
                    {formatDateToAustralian(artistData.birthDate)}
                  </td>
                </tr>
                {showDeathRow && artistData.deathDate && (
                  <tr>
                    <td className={styles.label}>Death:</td>
                    <td className={styles.value}>
                      {formatDateToAustralian(artistData.deathDate)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className={styles.label}>Location:</td>
                  <td className={styles.value}>{artistData.location}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Occupation:</td>
                  <td className={styles.value}>{artistData.occupation}</td>
                </tr>
              </tbody>
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
