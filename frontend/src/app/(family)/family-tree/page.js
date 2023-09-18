"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import data from "@/data/familyTree/farsiSimpleFamilyTree.json";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";

const FamilyTreePage = () => {
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
