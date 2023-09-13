"use client";

// import SunburstChartHookTest from "@/components/SunburstChart/SunburstChartHookTest";
// import SunburstChartTest1 from "@/components/SunburstChart/SunburstChartTest1";
// import SunburstConfigChart from "@/components/SunburstChart/SunburstChartConfig";
// import SunburstChartContextMenu from "@/components/SunburstChart/SunburstChartContextMenu";

// import SunburstChartContextMenuHook from "@/components/SunburstChart/SunburstChartHook";
// import SunburstUnRegister from "@/components/SunburstChart/SunburstUnRegister";

import SunburstChartContextDynamic from "@/components/SunburstChart/SunburstChartContextDynamic";

// const data = [
//   {
//     name: "Company A",
//     children: [
//       {
//         name: "Technical",
//         children: [
//           { name: "Team Leaders" },
//           { name: "Architects" },
//           { name: "Developers" },
//           {
//             name: "Testers",
//             children: [{ name: "Automation" }, { name: "Manual" }],
//           },
//         ],
//       },
//       {
//         name: "Sales",
//         children: [
//           { name: "Analysts" },
//           {
//             name: "Executives",
//             children: [
//               {
//                 name: "Technical",
//                 children: [
//                   { name: "Team Leaders" },
//                   { name: "Architects" },
//                   { name: "Developers" },
//                   { name: "Testers" },
//                 ],
//               },
//               {
//                 name: "Sales",
//                 children: [{ name: "Analysts" }, { name: "Executives" }],
//               },
//               { name: "HR" },
//               { name: "Management" },
//             ],
//           },
//         ],
//       },
//       { name: "HR" },
//       { name: "Management" },
//     ],
//   },
// ];

// const FamilyTreePage = () => {
//   // return <SunburstChartTest1 data={data} />;
//   return <SunburstChartContextDynamic data={data} />;
// };

// export default FamilyTreePage;

import React from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

// import SunburstChart
// import SunburstChart from "./SunburstChart";

const data = [
  {
    name: "Company A",
    children: [
      {
        name: "Technical",
        children: [
          { name: "Team Leaders" },
          { name: "Architects" },
          { name: "Developers" },
          {
            name: "Testers",
            children: [{ name: "Automation" }, { name: "Manual" }],
          },
        ],
      },
      {
        name: "Sales",
        children: [
          { name: "Analysts" },
          {
            name: "Executives",
            children: [
              {
                name: "Technical",
                children: [
                  { name: "Team Leaders" },
                  { name: "Architects" },
                  { name: "Developers" },
                  { name: "Testers" },
                ],
              },
              {
                name: "Sales",
                children: [{ name: "Analysts" }, { name: "Executives" }],
              },
              { name: "HR" },
              { name: "Management" },
            ],
          },
        ],
      },
      { name: "HR" },
      { name: "Management" },
    ],
  },
];

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div style={{ position: "absolute", right: 0, bottom: 0 }}>
      <button onClick={() => zoomIn()}>Zoom In</button>
      <button onClick={() => resetTransform()}>Reset</button>
      <button onClick={() => zoomOut()}>Zoom Out</button>
    </div>
  );
};

const FamilyTreePage = () => {
  return (
    <>
      <TransformWrapper>
        <TransformComponent>
          {/* <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="test"
          width="100%"
        /> */}
          <SunburstChartContextDynamic data={data} />
        </TransformComponent>
        <Controls />
      </TransformWrapper>
    </>
  );
};

export default FamilyTreePage;
