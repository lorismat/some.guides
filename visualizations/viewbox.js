const margin = 10;

let width = 700;
let height = 500;

const svg = d3.select(".dataviz")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `-${margin} -${margin} ${width+2*margin} ${height+2*margin}`)
    .style("border", "2px solid #000")
    .style("overflow", "visible");
