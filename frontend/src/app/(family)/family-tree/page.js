"use client";

import axios from "axios";

import Link from "next/link";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";
import ChartTitle from "@/components/ChartTitle/ChartTitle";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const familyTreeRoute = process.env.NEXT_PUBLIC_FAMILY_TREE_ROUTE;

const FamilyTreePage = () => {
  const [data, setData] = useState(null);
  const [permission, setPermission] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getPermission = async () => {
      try {
        // Get permissions first
        const idToFind = localStorage.getItem("userId");
        if (!idToFind) {
          // Handle the case where "userId" is not set in localStorage
          router.push("/login");
          return;
        }
        const permissionResponse = await axios.get(
          `${apiUrl}/user/permission/${idToFind}`
        );
        const permissionData = permissionResponse.data;

        setPermission(permissionData);
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    getPermission();

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
  }, [apiUrl, router, familyTreeRoute]);

  return (
    <>
      <ChartTitle permission={permission} />
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
            <SunburstChart data={data} permission={permission} />
          )}
        </TransformComponent>
        <ZoomController />
      </TransformWrapper>
    </>
  );
};

export default FamilyTreePage;
