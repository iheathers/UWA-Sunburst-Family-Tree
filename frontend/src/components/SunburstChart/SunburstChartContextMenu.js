"use client";

import React, { Component } from "react";
import anychart from "anychart";

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";
// import { redirect } from "next/dist/server/api-utils";

// import redirect from

import Router from "next/router";

class SunburstChartContextMenu extends Component {
  // define state with id='null'
  constructor(props) {
    super(props);
    // Initialize the component's state within the constructor
    this.state = {
      // Define your state properties and their initial values here
      name: "",
    };
  }

  componentDidMount() {
    this.drawChart();
    // this.id
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  drawChart() {
    const { data } = this.props;

    const chart = anychart.sunburst(data, "as-tree");

    // Function to add a child node to the selected node
    // function addChildNode(node) {
    //   const newNode = { name: "New Child" }; // Customize the new child node as needed
    //   if (node && node.dataItem) {
    //     node.dataItem.addChild(newNode);
    //     chart.draw(); // Redraw the chart to reflect the changes
    //   }
    // }

    // Define the context menu items provider
    chart.contextMenu().itemsProvider((e) => {
      // const selectedNode = e.item.getData();

      const items = {
        "menu-item-1": {
          text: "Add Child",
          action: () => {
            // Get field value.
            // open family-member/id page
            // redirect(`/family-member/${id}`);

            console.log("Name", this.state.name);

            // Router.push(`/family-member/${this.state.name}`);

            // redirect to family-member/id page
          },
        },
        // Other menu items...
      };

      return items;
    });

    // chart.s;

    // var interactivity = chart.interactivity();
    // interactivity.selectionMode("singleSelect");
    chart.interactivity().selectionMode("single-select");
    chart.tooltip(false);

    chart.listen("pointClick", (event) => {
      // Get field value.
      var value = event?.point?.get("name");

      this.setState({ name: value });

      // this.setState({ count: this.state.count + 1 });

      chart.title(value ? event.point.get("name") : "Clicked empty space");
    });

    chart.container("container");
    chart.draw();
  }

  render() {
    return (
      <div id="container" style={{ width: "100vw", height: "100vh" }}></div>
    );
  }
}

export default SunburstChartContextMenu;
