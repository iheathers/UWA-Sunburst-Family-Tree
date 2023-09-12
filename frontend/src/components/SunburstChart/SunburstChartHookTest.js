import React, { useEffect, useRef } from "react";
import anychart from "anychart";

const SunburstChartHookTest = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      const chart = anychart.sunburst(data, "as-tree");

      chart.title().useHtml(true);
      chart.title(
        "Sunburst: Basic Sample<br><br>" +
          "<span style='font-size:12; font-style:italic'>" +
          "Corporate Structure</span>"
      );

      chart.container(containerRef.current);
      chart.draw();
    };

    drawChart();
  }, [data]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SunburstChartHookTest;
