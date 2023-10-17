"use client";

import EditFamilyMember from "@/components/EditFamilyMember/EditFamilyMember";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;
const permissionRoute = process.env.NEXT_PUBLIC_USER_PERMISSION_ROUTE;

const EditPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [userPermission, setUserPermission] = useState(null);

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
          `${apiUrl}${permissionRoute}/${idToFind}`
        );
        const permissionData = permissionResponse.data;
        setUserPermission(permissionData);

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

  return <>{userPermission === "ADMIN" && <EditFamilyMember id={id} />}</>;
};

export default EditPage;
