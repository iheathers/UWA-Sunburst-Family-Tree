"use client";

// Testing

import React from "react";
import { useRouter } from 'next/navigation';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import data from "@/data/familyTree/farsiSimpleFamilyTree.json";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";

const FamilyTreePage = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
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
