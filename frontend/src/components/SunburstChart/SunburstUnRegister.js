import React, { useState, useEffect } from "react";
import anychart from "anychart";
import { useRouter } from "next/navigation";

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

function SunburstUnRegister({ data }) {
  const [name, setName] = useState("");
  const [chart, setChart] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  useEffect(() => {
    // Create a dynamic action handler function
    const handleAction = () => {
      // This function will use the latest 'name' value
      if (name) {
        console.log("Name", name);
        router.push(`/family-member/${name}`);
      }
    };

    if (chart) {
      // Register the dynamic action handler when the chart is available
      chart.contextMenu().itemsProvider((e) => {
        const items = {
          "menu-item-1": {
            text: "Add Child",
            action: handleAction, // Use the dynamic action handler
          },
          // Other menu items...
        };

        return items;
      });
    }

    // Clean up: Unregister the dynamic action handler when the component unmounts
    return () => {
      if (chart) {
        chart.contextMenu().itemsProvider(null);
      }
    };
  }, [name, router, chart]);

  const drawChart = (chartData) => {
    const newChart = anychart.sunburst(chartData, "as-tree");

    newChart.interactivity().selectionMode("single-select");
    newChart.tooltip(false);

    newChart.listen("pointClick", (event) => {
      const pointName = event?.point?.get("name");
      if (pointName) {
        newChart.title(pointName);
        setName(pointName);
      } else {
        newChart.title("Clicked empty space");
        setName(""); // Set name to an empty string when no valid point is clicked
      }
    });

    newChart.container("container");
    newChart.draw();

    setChart(newChart);
  };

  return <div id="container" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default SunburstUnRegister;
