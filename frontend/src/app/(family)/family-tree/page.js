"use client";

// Testing

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import data from "@/data/familyTree/deepNestedFamilyTree.json";

import SunburstChart from "@/components/SunburstChart/SunburstChart";
import ZoomController from "@/components/ZoomController/ZoomController";

const FamilyTreePage = () => {
  return data.length === 0 ? (
    <button onClick={() => console.log("Add root")}>Add Root</button>
  ) : (
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
