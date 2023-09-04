import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data }) => {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null); // 跟踪悬停的节点

  

  useEffect(() => {
    if (!data) return;

    const width = 800;
    const height = 800;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // 使用更多变的颜色方案
    const color = d3.scaleOrdinal(d3.schemeSet3);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data);

    // 计算每个节点的大小
    root.count();

    partition(root);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    // 添加路径元素
    svg.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr('d', arc)
      .style('fill', d => color(d.data.name));

    // 添加文本元素来显示名称
    svg.selectAll('text')
      .data(root.descendants())
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => d.data.name);

    

    // 添加路径元素，设置鼠标事件
    svg.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr('d', arc)
      .style('fill', d => (hoveredNode && hoveredNode.data === d.data) ? 'red' : color(d.data.name)) // 更改颜色
      .on('mouseover', (event, d) => {
        // 鼠标悬停时更新状态以显示祖辈信息和更改颜色
        setHoveredNode(d);
      })
      .on('mouseout', () => {
        // 鼠标移出时清除状态以隐藏祖辈信息和恢复颜色
        setHoveredNode(null);
      });

    // 添加文本元素来显示名称
    svg.selectAll('text')
      .data(root.descendants())
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => d.data.name);

    // ...

  }, [data, hoveredNode]); // 添加hoveredNode到依赖数组以便及时更新


  return (
    <div>
      <svg ref={svgRef} />
      {hoveredNode && (
        <div className="hovered-info">
          <p>悬停的节点信息:</p>
          <pre>{JSON.stringify(hoveredNode.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SunburstChart;
