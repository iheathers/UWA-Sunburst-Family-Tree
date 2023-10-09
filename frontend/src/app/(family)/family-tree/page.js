"use client";

// Testing

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import data from "@/data/familyTree/farsiSimpleFamilyTree.json";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";
import Link from "next/link";

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

  const addRootNode = () => {
    console.log("Add Root Node");

    // router.push("family-member/add");

    // as the unique ID for the root node
    // router.push("/edit-family-member/[id]", `/edit-family-member/root`);
  };

  return (
    <>
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
              <button onClick={addRootNode}>
                <Link
                  href={{
                    pathname: "/family-member/root/add",
                    // query: { id: null },
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
