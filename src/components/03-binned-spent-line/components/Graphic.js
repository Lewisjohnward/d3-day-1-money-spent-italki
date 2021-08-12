import { useGetData } from "../../../hooks/useGetData";
import {
  scaleLinear,
  max,
  extent,
  scaleTime,
  bin,
  timeMonths,
  sum,
  line,
  curveLinear,
  timeFormat,
  curveStep,
} from "d3";

const width = 560;
const height = 250;

const margin = {
  top: 10,
  right: 75,
  bottom: 60,
  left: 95,
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const yAxisLabelOffset = 60
const xAxisLabelOffset = 50
const tickOffset = 10;

const formatTime = timeFormat("%Y")

export const Graphic = () => {
  const data = useGetData();

  if (!data) {
    return <h1>...Loading</h1>;
  }

  const xValue = (d) => d.date;
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, end] = xScale.domain();

  let total = 0;
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, end))(data)
    .map((array) => {
      const monthTotal = sum(array, (d) => d.price);
      total += monthTotal;
      return {
        y: monthTotal,
        total,
        x0: array.x0,
        x1: array.x1,
      };
    });

  const yValue = (d) => d.total;
  const yScale = scaleLinear()
    .domain([0, max(binnedData, yValue)])
    .range([innerHeight, 0])
    .nice();

  const testValue = (d) => d.x0;

  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Cumulative Line of Money Spent on Italki
      </h1>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            stroke="green"
            fill="none"
            opacity={0.6}
            strokeWidth={2}
            d={line()
              .curve(curveStep)
              .x((d) => xScale(testValue(d)))
              .y((d) => yScale(yValue(d)))(binnedData)}
          />

          {xScale.ticks().map((d) => (
            <g key={d} transform={`translate(${xScale(d)}, 0)`}>
              <line stroke="gray" opacity="0.2"  y2={innerHeight} />
              <text
                style={{textAnchor: "middle"}}
                y={innerHeight + tickOffset}
                dy=".71em"
              >{formatTime(d)}</text>
            </g>
          ))}   

          <text
            transform={`translate(${innerWidth / 2}, ${innerHeight + xAxisLabelOffset})`}
            style={{textAnchor: "middle"}}
          >Year</text>


          {yScale.ticks().map((d) => (
            <g key={d} transform={`translate(0, ${yScale(d)})`}>
              <line stroke="gray" opacity="0.2"  x2={innerWidth} />
              <text
                style={{textAnchor: "end"}}
                x={-tickOffset}
                dy=".32em"
              >{d}</text>
            </g>
          ))}

          <text
            style={{textAnchor: "middle"}}
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2})rotate(-90)`}
          >Total Spent (£)</text>

        

        </g>
      </svg>
    </div>
  );
};
