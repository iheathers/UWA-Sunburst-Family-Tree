// import React, { Component } from "react";
// import anychart from "anychart";

// THIS IS IMPORTANT FOR CONTEXT MENU
import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

// class SunburstChartTest1 extends Component {
//   componentDidMount() {
//     // create data
//     const data = [
//       {
//         name: "Company A",
//         children: [
//           {
//             name: "Technical",
//             children: [
//               { name: "Team Leaders" },
//               { name: "Architects" },
//               { name: "Developers" },
//               {
//                 name: "Testers",
//                 children: [{ name: "Automation" }, { name: "Manual" }],
//               },
//             ],
//           },
//           {
//             name: "Sales",
//             children: [
//               { name: "Analysts" },
//               {
//                 name: "Executives",
//                 children: [
//                   {
//                     name: "Technical",
//                     children: [
//                       { name: "Team Leaders" },
//                       { name: "Architects" },
//                       { name: "Developers" },
//                       { name: "Testers" },
//                     ],
//                   },
//                   {
//                     name: "Sales",
//                     children: [{ name: "Analysts" }, { name: "Executives" }],
//                   },
//                   { name: "HR" },
//                   { name: "Management" },
//                 ],
//               },
//             ],
//           },
//           { name: "HR" },
//           { name: "Management" },
//         ],
//       },
//     ];

//     // create a chart and set the data
//     const chart = anychart.sunburst(data, "as-tree");

//     // set the chart title
//     // chart.title().useHtml(true);
//     // chart.title(
//     //   "Sunburst: Basic Sample<br><br>" +
//     //     "<span style='font-size:12; font-style:italic'>" +
//     //     "Corporate Structure</span>"
//     // );

//     // set the container id
//     chart.container("container");

//     // initiate drawing the chart
//     chart.draw();
//   }

//   render() {
//     return (
//       <div id="container" style={{ width: "100vw", height: "100vh" }}></div>
//     );
//   }
// }

// export default SunburstChartTest1;

import React, { Component } from "react";
import anychart from "anychart";

class SunburstChartTest1 extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  drawChart() {
    const { data } = this.props;

    const chart = anychart.sunburst(data, "as-tree");

    // chart.contextMenu().itemsProvider(function () {
    //   const items = {
    //     "menu-item-1": {
    //       text: "Add child",
    //       action: function () {
    //         chart.print();
    //       },
    //     },
    //     "menu-item-2": {
    //       text: "Remove Child",
    //       action: function () {
    //         chart.saveAsPng();
    //       },
    //     },
    //     "menu-item-3": {
    //       text: "Go to my page",
    //       href: "http://docs.anychart.com",
    //       target: "_blank",
    //     },
    //   };

    //   return items;
    // });

    // chart.contextMenu().itemsProvider(function (e) {
    //   // Get the selected node's data
    //   //   const selectedData = e.item.getData();

    //   console.log({ e });

    //   const items = {
    //     "menu-item-1": {
    //       text: "Add chilD",
    //       action: function (e) {
    //         // console.log({ e });
    //         console.log("Add child");
    //         // Print the ID of the selected node
    //         // alert("Selected Node ID: " + selectedData.id);
    //         // alert("Selected Node ID: ");
    //       },
    //     },
    //     "menu-item-2": {
    //       text: "Remove Child",
    //       action: function () {
    //         chart.saveAsPng();
    //       },
    //     },
    //     "menu-item-3": {
    //       text: "Go to my page",
    //       href: "http://docs.anychart.com",
    //       target: "_blank",
    //     },
    //   };

    //   return items;
    // });

    chart.container("container");
    chart.draw();
  }

  render() {
    return (
      <div id="container" style={{ width: "100vw", height: "100vh" }}></div>
    );
  }
}

export default SunburstChartTest1;
