import React, { useState, useEffect } from "react";
import anychart from "anychart";
import { useRouter } from "next/navigation";

// MAKE SURE IT IS /navigation and not /router

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

function SunburstChartContextDynamic({ data }) {
  const [name, setName] = useState("");
  const [chart, setChart] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node

  const router = useRouter();

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  useEffect(() => {
    const handleAction = () => {
      if (name) {
        console.log("Name", name);
        router.push(`/family-member/${name}`);
      }
    };

    if (chart) {
      chart.contextMenu().itemsProvider((e) => {
        // Check if a valid node is selected
        if (selectedNode) {
          const items = {
            "menu-item-1": {
              text: "View Profile",
              action: handleAction,
            },
            // Other menu items...
          };

          return items;
        }
        // else {
        //   // Return an empty context menu if no valid node is selected
        //   return {};
        // }
      });
    }

    return () => {
      if (chart) {
        chart.contextMenu().itemsProvider(null);
      }
    };
  }, [name, router, chart, selectedNode]); // Include selectedNode as a dependency

  const drawChart = (chartData) => {
    const newChart = anychart.sunburst(chartData, "as-tree");

    newChart.interactivity().selectionMode("single-select");
    newChart.tooltip(false);

    newChart.title("Nothing selected");

    newChart.listen("pointClick", (event) => {
      const pointName = event?.point?.get("name");
      if (pointName) {
        newChart.title(pointName);
        setName(pointName);
        setSelectedNode(event.point); // Set selected node
      } else {
        newChart.title("Clicked empty space");
        setName("");
        setSelectedNode(null); // Clear selected node
      }
    });
    newChart.container("container");
    newChart.draw();
    setChart(newChart);

    // const zoomController = anychart.ui.zoom();
    // zoomController.target(newChart);
    // zoomController.render();
  };

  return <div id="container" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default SunburstChartContextDynamic;
