import React from "react";

import AnyChart from "anychart-react";
import anychart from "anychart";

// import "./styles.css";

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

import "./SunburstChart.css";

// import data from "./data";

let data = [
  {
    name: "Company A",
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
        children: [
          {
            name: "Analysts",
            children: [
              { name: "Team Leaders" },
              { name: "Architects" },
              { name: "Developers" },
              { name: "Testers" },
            ],
          },
          { name: "Executives" },
        ],
      },
      { name: "HR" },
      {
        name: "Management",
        children: [
          { name: "Team Leaders" },
          { name: "Architects" },
          { name: "Developers" },
          {
            name: "Testers",
            children: [
              { name: "Team Leaders" },
              { name: "Architects" },
              { name: "Developers" },
              { name: "Testers" },
            ],
          },
        ],
      },
    ],
  },
];

const configObj = {
  data: data,
  type: "sunburst",
  width: "100%",
  height: "100%",
  dataMode: "as-tree",
  calculationMode: "ordinal-from-root",
  contextMenu: {
    itemsProvider: function () {
      var items = {
        "menu-item-1": {
          text: "View",
          action: function () {
            this.chart.print();
          },
        },
        "menu-item-2": {
          text: "ADd",
          action: function () {
            this.chart.saveAsPng();
          },
        },
        "menu-item-3": {
          text: "Go to my page",
          href: "http://docs.anychart.com",
          target: "_blank",
        },
      };

      return items;
    },
  },
};

class SunburstConfigChart extends React.Component {
  // constructor() {
  //   super();
  //   // makes tree from the data for the sample
  //   let dataTree = anychart.data.tree(data, "as-table");

  //   let chart = anychart.sunburst(dataTree);

  //   let stage = anychart.graphics.create("dog");

  //   // set calculation mode
  //   chart.calculationMode("parent-independent");

  //   // set chart title
  //   chart.title("Europe Population");

  //   // set custom palette
  //   chart.palette(["#0288d1", "#d4e157", "#ff6e40", "#f8bbd0"]);

  //   // format chart labels
  //   chart.labels().format("{%Name}\n{%Value}{scale:(1000000)(1)|( mln)}");

  //   // format chart tooltip
  //   chart.tooltip().format("Population: {%Value}{scale:(1000000)(1)|( mln)}");

  //   // the fill specified in the data has priority
  //   // set point fill
  //   chart.fill(function () {
  //     return anychart.color.darken(this.parentColor, 0.15);
  //   });

  //   // var treeData = anychart.data.tree(data, "as-tree");

  //   // create container for all charts
  //   // var stage = anychart.graphics.create('container');

  //   // create a treemap chart and set the data
  //   // treemap = anychart.treeMap(treeData);

  //   // sunburst = anychart.sunburst(treeData);
  //   // set the title
  //   // sunburst.title("Tree Data Model: Quick Start");
  //   // set the container id and draw
  //   chart.container(stage);

  //   // set container id for the chart
  //   // chart.container("container");

  //   // sunburst.container(stage).draw();

  //   // initiate chart drawing
  //   this.state = {
  //     chart: chart.draw()
  //   };
  // }

  render() {
    return (
      <div>
        <AnyChart {...configObj} />
      </div>
    );
  }
}

export default SunburstConfigChart;
