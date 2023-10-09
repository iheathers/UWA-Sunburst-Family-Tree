"use client";

import axios from "axios";
import anychart from "anychart";

import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";

// THIS CSS IS IMPORTANT FOR CONTEXT MENU
import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

import "./SunburstChart.css";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL;

const familyMemberRoute = process.env.NEXT_PUBLIC_FAMILY_MEMBER_ROUTE;

// FIXME: REFACTOR IF POSSIBLE TO USE CONFIG OBJECT

const SunburstChart = ({ data }) => {
  const treeData = anychart.data?.tree(data, "as-tree");
  const [selectedId, setSelectedId] = useState("");
  const [chart, setChart] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node

  const router = useRouter();

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  const handleViewProfile = () => {
    if (selectedId) {
      router.push(`${familyMemberRoute}/${selectedId}`);
    }
  };

  const handleEditNode = () => {
    if (selectedId) {
      router.push(`${familyMemberRoute}/${selectedId}/edit`);
    }
  };

  useEffect(() => {
    // TODO: CHECK IF CHILDREN IS EMPTY, THEN REMOVE NODE
    // ONE APPROACH . TRY TO FIND ANOTHER EASY APPROACH AS WELL

    if (chart && selectedId) {
      chart.contextMenu().itemsFormatter(function (items) {
        const dataItem = treeData.search("id", selectedId);
        const children = dataItem?.getChildren();

        delete items["full-screen-separator"];
        delete items["share-with"];
        delete items["about"];

        const index = items["save-chart-as"]?.index;

        if (index && selectedNode) {
          items["view-profile"] = {
            text: "View Profile",
            action: handleViewProfile,
            index: index - 0.05,
          };

          items["add-node"] = {
            text: "Add Child",
            action: handleAddChild,
            index: index - 0.04,
          };

          items["edit-node"] = {
            text: "Edit Node",
            action: handleEditNode,
            index: index - 0.03,
          };

          //  if selected node has children, do not allow to remove
          if (children.length === 0) {
            items["remove-node"] = {
              text: "Remove Node",
              action: handleRemoveNode,
              index: index - 0.02,
            };
          }

          items["node-action-seperator"] = {
            index: index - 0.01,
          };
        }

        return items;
      });
    }

    return () => {
      if (chart) {
        chart.contextMenu().itemsProvider(null);
      }
    };
  }, [selectedId, router, chart, selectedNode]); // Include selectedNode as a dependency

  // const filterData = (data, idToRemove) => {
  //   const filteredData = [];

  //   for (const node of data) {
  //     if (node.id !== idToRemove) {
  //       const newNode = { ...node }; // Create a shallow copy of the node

  //       if (node.children && node.children.length > 0) {
  //         // Recursively filter children
  //         newNode.children = filterData(node.children, idToRemove);
  //       }

  //       filteredData.push(newNode);
  //     }
  //   }

  //   return filteredData;
  // };

  const drawChart = (chartData) => {
    if (chart) {
      chart.dispose();
    }

    const stage = anychart.graphics.create("container");
    const newChart = anychart.sunburst(chartData, "as-tree");

    newChart.interactivity().selectionMode("single-select");

    newChart.listen("pointClick", (event) => {
      // TODO: EXTRACT ID INSTEAD
      const selectedId = event?.point?.get("id");

      // TODO: GET CHILDREN FOR SELECTED NODE TO CHECK WHETHER IT CAN BE REMOVED OR NOT
      if (selectedId) {
        setSelectedId(selectedId);
        // setChildren(pointChildren);
        setSelectedNode(event.point); // Set selected node
      } else {
        setSelectedId("");
        setSelectedNode(null); // Clear selected node
      }
    });

    newChart.container(stage);
    newChart.draw();
    setChart(newChart);
  };

  const handleAddChild = () => {
    console.log(`Add Child to ${selectedId}`);
    // console.log("Add Child Node");

    router.push(`/family-member/${selectedId}/add`);
  };

  const handleRemoveNode = async () => {
    const dataItem = treeData.search("id", selectedId);
    console.log({ dataItem });

    const children = dataItem.getChildren();

    if (children.length === 0) {
      try {
        const response = await axios.delete(
          `${apiUrl}${familyMemberRoute}/${selectedId}`
        );

        if (!response.data.error) {
          // const parent = dataItem.getParent();
          // parent.removeChild(dataItem);
          // const filteredData = filterData(data, selectedId);
          // const filteredTreeData = anychart.data.tree(filteredData, "as-tree");
          // chart.data(filteredTreeData);
          // chart.draw();
          // FIXME: RERENDER THE PAGE INSTEAD OF RELOADING
          window.location.reload();
        }
      } catch (error) {
        // Handle errors if the data fetching fails
        console.error("Error fetching data:", error);
      }
      return console.log("Remove Node");
    }

    console.log("Cannot Remove Node");
  };

  return <div id="container" className="sunburstChartContainer"></div>;
};

export default SunburstChart;
