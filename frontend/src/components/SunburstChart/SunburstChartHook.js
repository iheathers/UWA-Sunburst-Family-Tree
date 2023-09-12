// import React, { useState, useEffect } from "react";
// import anychart from "anychart";

// import { useRouter } from "next/navigation";

// import "anychart/dist/css/anychart-ui.min.css";
// import "anychart/dist/fonts/css/anychart-font.min.css";
// // import Router from "next/router";

// function SunburstChartContextMenuHook({ data }) {
//   const [name, setName] = useState("");
//   const [chart, setChart] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     if (data) {
//       drawChart(data);
//     }
//   }, [data, name]);

//   const drawChart = (chartData) => {
//     const newChart = anychart.sunburst(chartData, "as-tree");

//     console.log("Rendered");

//     console.log("anme", name);

//     newChart.contextMenu().itemsProvider(() => {
//       const items = {
//         "menu-item-1": {
//           text: "Add Child",
//           href: `/family-member/${name}`,
//           action: () => {
//             console.log("name in context menu", name);
//             if (name) {
//               console.log("Name", name);
//               router.push(`/family-member/${name}`);
//             }
//           },
//         },
//         // Other menu items...
//       };

//       return items;
//     });

//     newChart.interactivity().selectionMode("single-select");
//     newChart.tooltip(false);

//     // newChart.listen("pointClick", (event) => {
//     //   const name = event?.point?.get("name");
//     //   newChart.title(name ? event.point.get("name") : "Clicked empty space");
//     //   setName(name);
//     // });

//     newChart.listen("pointClick", (event) => {
//       const pointName = event?.point?.get("name");
//       if (pointName) {
//         newChart.title(pointName);
//         setName(pointName);
//       } else {
//         newChart.title("Clicked empty space");
//         setName(""); // Set name to empty string when no valid point is clicked
//       }
//     });

//     newChart.container("container");
//     newChart.draw();

//     setChart(newChart);
//   };

//   return <div id="container" style={{ width: "100vw", height: "100vh" }}></div>;
// }

// export default SunburstChartContextMenuHook;

import React, { useState, useEffect } from "react";
import anychart from "anychart";
import { useRouter } from "next/navigation";

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

function SunburstChartContextMenuHook({ data }) {
  const [name, setName] = useState("");
  const [chart, setChart] = useState(null);

  const router = useRouter();

  // Listen for changes in the 'name' state
  useEffect(() => {
    // Use the updated 'name' value here
    console.log("name in context menu", name);
    if (name) {
      console.log("Name", name);
      router.push(`/family-member/${name}`);
    }
  }, [name, router]);

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (chartData) => {
    const newChart = anychart.sunburst(chartData, "as-tree");

    newChart.contextMenu().itemsProvider((e) => {
      const items = {
        "menu-item-1": {
          text: "Add Child",
          action: () => {
            // The 'name' state is correctly updated in the outer useEffect
            // This function will use the latest 'name' value
            setName(name);
          },
        },
        // Other menu items...
      };

      return items;
    });

    newChart.interactivity().selectionMode("single-select");
    newChart.tooltip(false);

    newChart.listen("pointClick", (event) => {
      const pointName = event?.point?.get("name");
      if (pointName) {
        newChart.title(pointName);
        setName(pointName);
      } else {
        newChart.title("Clicked empty space");
        setName(""); // Set name to empty string when no valid point is clicked
      }
    });

    newChart.container("container");
    newChart.draw();

    setChart(newChart);
  };

  return <div id="container" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default SunburstChartContextMenuHook;
