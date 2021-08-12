import { useGetData } from "../../../hooks/useGetData";
import {
  scaleLinear,
  bin,
  scaleTime,
  extent,
  sum,
  timeMonths,
  max,
  timeFormat,
} from "d3";

const formatDate = timeFormat("%Y");

export const Graphic = ({carousel}) => {
  const data = useGetData();

  if (!data) {
    return <h1>...Loading</h1>;
  }

  const width = carousel ? 1480 : 560;
  const height = carousel ? 560 : 250;

  const margin = {
    top: 10,
    right: 75,
    bottom: 60,
    left: 95,
  };
  
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  
  const tickOffset = 10;
  const xLabelAxisOffset = 50;
  const yAxisLabelOffset = 60;

  const xValue = (d) => d.date;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, end] = xScale.domain();
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, end))(data)
    .map((array) => ({
      y: sum(array, (d) => d.price),
      x0: array.x0,
      x1: array.x1,
    }));

  const yValue = (d) => d.y;
  const yScale = scaleLinear()
    .domain([0, max(binnedData, yValue)])
    .range([innerHeight, 0])
    .nice();

  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Histogram of money spent on Italki
      </h1>

      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((d) => {
            return (
              <g key={d} transform={`translate(${xScale(d)}, 0)`}>
                <line y2={innerHeight} stroke="gray" opacity="0.2"  />
                <text
                  style={{ textAnchor: "middle" }}
                  dy=".71em"
                  y={innerHeight + tickOffset}
                >
                  {formatDate(d)}
                </text>
              </g>
            );
          })}
          <text
            x={innerWidth / 2}
            y={innerHeight + xLabelAxisOffset}
            style={{textAnchor: "middle"}}
          >Year</text>

          <text
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2})rotate(-90)`}
            style={{textAnchor: "middle"}}
          >Total spent (£)</text>


          {yScale.ticks().map((d) => (
            <g key={d} transform={`translate(0, ${yScale(d)})`}>
              <line x2={innerWidth} stroke="gray" opacity="0.2"  />
              <text style={{ textAnchor: "end" }} dy=".2em" x={-tickOffset}>
                {d}
              </text>
            </g>
          ))}

          {binnedData.map((d, i) => {
            return (
              <rect
                key={i}
                x={xScale(d.x0)}
                y={yScale(d.y)}
                width={xScale(d.x1) - xScale(d.x0)}
                height={innerHeight - yScale(d.y)}
                opacity={0.6}
                fill="green"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
