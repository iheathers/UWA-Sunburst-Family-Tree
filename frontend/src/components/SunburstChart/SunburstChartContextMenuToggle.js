import React, { Component } from "react";
import anychart from "anychart";

import "anychart/dist/css/anychart-ui.min.css";
import "anychart/dist/fonts/css/anychart-font.min.css";

class SunburstChartContextMenuToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contextMenuVisible: false, // Initially, the context menu is hidden
    };
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }

  toggleContextMenu = () => {
    this.setState((prevState) => ({
      contextMenuVisible: !prevState.contextMenuVisible,
    }));
  };

  drawChart() {
    const { data } = this.props;

    const chart = anychart.sunburst(data, "as-tree");

    chart.interactivity().selectionMode("single-select");

    chart.listen("pointClick", (event) => {
      const value = event?.point?.get("name");

      if (value) {
        // If a valid point is clicked, show the context menu
        this.setState({ name: value, contextMenuVisible: true });
      } else {
        // If empty space is clicked, hide the context menu
        this.setState({ name: "", contextMenuVisible: false });
      }

      chart.title(value ? event.point.get("name") : "Clicked empty space");
    });

    chart.container("container");
    chart.draw();
  }

  renderContextMenu() {
    const { contextMenuVisible } = this.state;

    if (!contextMenuVisible) {
      return null;
    }

    return (
      <div className="context-menu">
        <ul>
          <li>Add Child</li>
          {/* Add other context menu items as needed */}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderContextMenu()}
        <div id="container" style={{ width: "100vw", height: "100vh" }}></div>
      </div>
    );
  }
}

export default SunburstChartContextMenuToggle;
