"use client";

// import SunburstChartHookTest from "@/components/SunburstChart/SunburstChartHookTest";
// import SunburstChartTest1 from "@/components/SunburstChart/SunburstChartTest1";
// import SunburstConfigChart from "@/components/SunburstChart/SunburstChartConfig";
// import SunburstChartContextMenu from "@/components/SunburstChart/SunburstChartContextMenu";

// import SunburstChartContextMenuHook from "@/components/SunburstChart/SunburstChartHook";
import SunburstUnRegister from "@/components/SunburstChart/SunburstUnRegister";

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

const FamilyTreePage = () => {
  // return <SunburstChartTest1 data={data} />;
  return <SunburstUnRegister data={data} />;
};

export default FamilyTreePage;
