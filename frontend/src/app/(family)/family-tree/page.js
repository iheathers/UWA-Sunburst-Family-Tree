"use client";

import axios from "axios";

import Link from "next/link";

import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familyTreeRoute = process.env.NEXT_PUBLIC_FAMILY_TREE_ROUTE;

const FamilyTreePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}${familyTreeRoute}`);

        if (!response.data.error) {
          // Update the artistData state with the fetched data
          setData(response.data);
        }
      } catch (error) {
        // Handle errors if the data fetching fails
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [apiUrl, familyTreeRoute]);

  return (
    <>
      <h1
        style={{
          "text-align": "center",
          "font-size": "20px",
          padding: "10px",
          "font-weight": "500",
          "background-color": "white",
        }}
      >
        Family Tree
      </h1>
      <TransformWrapper>
        <TransformComponent>
          {/* TODO: IF API CALL RERENDER EVERY COMPONENT, EXTRACT THE CHART IN SEPARATE FILE */}
          {data && data?.length === 0 ? (
            <div
              style={{
                display: "grid",
                placeItems: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <button>
                <Link
                  href={{
                    pathname: "/family-member/root/add",
                  }}
                >
                  Add Root Node
                </Link>
              </button>
            </div>
          ) : (
            <SunburstChart data={data} />
          )}
        </TransformComponent>
        <ZoomController />
      </TransformWrapper>
    </>
  );
};

export default FamilyTreePage;
