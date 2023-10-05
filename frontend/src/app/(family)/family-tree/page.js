"use client";

// Testing

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import data from "@/data/familyTree/farsiSimpleFamilyTree.json";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";

const FamilyTreePage = () => {
  const [data, setData] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
  const familyTreeRoute = process.env.NEXT_PUBLIC_FAMILY_TREE_ROUTE;

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
      <TransformWrapper>
        <TransformComponent>
          {/* TODO: IF API CALL RERENDER EVERY COMPONENT, EXTRACT THE CHART IN SEPARATE FILE */}
          <SunburstChart data={data} />
        </TransformComponent>
        <ZoomController />
      </TransformWrapper>
    </>
  );
};

export default FamilyTreePage;
