// testing

import { useEffect } from 'react';


import Sunburst from 'sunburst-chart';
import * as d3 from 'd3'; // Make sure to import D3.js as well


const SunburstChart = ({ data }) => {
    useEffect(() => {
        const color = d3.scaleOrdinal(d3.schemeAccent);

        // 创建一个 Sunburst 实例
        const sunburstInstance = Sunburst()
            .data(data)
            .label("name")
            .size("size")
            .color((d, parent) => color(parent ? parent.data.name : null))
            .tooltipContent((d, node) => `Size: <i>${node.value}</i>`);

        // 在适当的时机调用 sunburst 实例
        sunburstInstance(document.getElementById("chart"));
    }, [data]);

    return <div id="chart"></div>;
};

export default SunburstChart;
