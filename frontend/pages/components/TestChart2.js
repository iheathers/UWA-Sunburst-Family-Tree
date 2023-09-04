import Sunburst from "sunburst-chart";
import * as d3 from "d3";
import React, { useEffect } from 'react';

const TestChart2 = ({ data }) => {
  useEffect(() => {
    // 检查是否在客户端环境中执行
    if (typeof window !== 'undefined') {
      const color = d3.scaleOrdinal(d3.schemePaired);

      // 继续执行与sunburst-chart相关的代码
      fetch(data)
        .then((res) => res.json())
        .then((data) => {
          Sunburst()
            .data(data)
            .label('name')
            .size('size')
            .color((d, parent) => color(parent ? parent.data.name : null))
            .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
            (document.getElementById('chart'));
        });
    }
  }, [data]);

  return <div id="chart"></div>;
};

export default TestChart2;

