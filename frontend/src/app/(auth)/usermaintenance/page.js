"use client";

import UserMaintenance from "@/components/UserMaintenance/UserMaintenance";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;

const UserMaintenancePage = () => {
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

        if (permissionData !== "ADMIN") {
          // If the user is an admin, then proceed to the user maintenance page
          router.push("/family-tree");
        }
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    getPermission();
  }, [apiUrl, router]);

  return (
    <>
      <UserMaintenance />
    </>
  );
};

export default UserMaintenancePage;
