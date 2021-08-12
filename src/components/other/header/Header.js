import { scaleBand, extent, scaleLinear } from "d3";

const width = window.innerWidth;
const height = 75;

const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const columns = new Array(250).fill(0).map((d, i) => i);
const rows = new Array(10).fill(0).map((d, i) => i);

export const Header = () => {
  const produceData = () => {
    const data = [];

    columns.forEach((group) => {
      rows.forEach((variable) => {
        let value = Math.floor(Math.random() * 100) + 1;
        const random = Math.floor(Math.random() * 100) + 1;
        if (random > 50){
            value = Math.floor(Math.random() * 10) + 1;
        }
        data.push({ group, variable, value });
      });
    });
    return data;
  };

  const data = produceData();
  const xValue = (d) => d.group;
  const xScale = scaleBand()
    .domain(data.map((d) => xValue(d)))
    .range([0, innerWidth])
    .padding(0.01);

  const yValue = (d) => d.variable;
  const yScale = scaleBand()
    .domain(data.map((d) => yValue(d)))
    .range([innerHeight, 0])
    .padding(0.01);

  const colorValue = (d) => d.value;
  const myColor = scaleLinear().range(["white", "#69b3a2"]).domain([1, 100]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => {
          return (
            <g>
              <rect
                x={xScale(xValue(d))}
                y={yScale(yValue(d))}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                fill={myColor(colorValue(d))}
              />
            </g>
          );
        })}

        <text
          style={{ textAnchor: "beginning" }}
          dy="0.36em"
          fontSize="2em"
          fill="white"
          y={innerHeight / 2}
        >
          D3
        </text>
      </g>
    </svg>
  );
};
