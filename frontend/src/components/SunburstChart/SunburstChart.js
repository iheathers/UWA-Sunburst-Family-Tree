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
  const [selectedId, setSelectedId] = useState("");
  // const [isDeleted, setIsDeleted] = useState(false);
  // const [children, setChildren] = useState([]); // Track children of selected node
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

  useEffect(() => {
    // TODO: CHECK IF CHILDREN IS EMPTY, THEN REMOVE NODE
    // ONE APPROACH . TRY TO FIND ANOTHER EASY APPROACH AS WELL

    if (chart) {
      chart.contextMenu().itemsFormatter(function (items) {
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
            action: () => {
              console.log("Edit Member");
            },
            index: index - 0.03,
          };

          items["remove-node"] = {
            text: "Remove Node",
            action: handleRemoveNode,
            index: index - 0.02,
          };

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

      // there is documention to search the treeData and find children if other methods does not work

      // console.log(event?.point?.get);
      // const pointChildren = event?.point?.get("children");

      // console.log({ pointChildren });

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
    const treeData = anychart.data.tree(data, "as-tree");

    const dataItem = treeData.search("id", selectedId);
    console.log({ dataItem });

    const children = dataItem.getChildren();

    console.log({ children });

    // console.log({ childs });
    if (children.length === 0) {
      try {
        const response = await axios.delete(
          `${apiUrl}${familyMemberRoute}/${selectedId}`
        );

        if (!response.data.error) {
          // var chart = anychart.ganttProject();
          // chart.data(treeData);

          // const parent = dataItem.getParent();
          // parent.removeChild(dataItem);
          // chart.draw();

          // FIXME: RERENDER THE PAGE INSTEAD OF RELOADING
          window.location.reload();

          // console.log({ parent });
          // setIsDeleted(true);
          // dataItem.remove(selectedNode);
          // chart.draw();
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
