import React from "react";
import { useGetData } from "../../../hooks/useGetData";
import { scaleTime, scaleLinear, extent, bin, max, timeFormat } from "d3";

export const Graphic = ({carousel}) => {
  const data = useGetData();

  const width = carousel ? 1480 : 560;
  const height = carousel ? 560 : 250;
  const circleRadius = carousel ? 10 : 3;

  const margin = {
    top: 10,
    right: 75,
    bottom: 60,
    left: 95,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const tickOffset = 10;

  const yAxisLabelOffset = 60;
  const xAxisLabelOffset = 50;

  if (!data) {
    return <h1>...Loading</h1>;
  }

  const dateFormat = timeFormat("%Y");

  const xValue = (d) => d.date;
  const yValue = (d) => d.price;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Money spent on Italki
      </h1>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue) => (
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
              <line y2={innerHeight} stroke="gray" opacity="0.2" />
              <text
                style={{ textAnchor: "middle" }}
                dy=".71em"
                y={innerHeight + tickOffset}
              >
                {dateFormat(tickValue)}
              </text>
            </g>
          ))}

          <text
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset}, ${
              innerHeight / 2
            }) rotate(-90)`}
          >
            Money spent (£)
          </text>

          {yScale.ticks().map((tickValue) => (
            <g transform={`translate(0, ${yScale(tickValue)})`}>
              <line x2={innerWidth} stroke="gray" opacity="0.2" />
              <text style={{ textAnchor: "end" }} dy=".32em" x={-tickOffset}>
                {tickValue}
              </text>
            </g>
          ))}
          <text
            textAnchor="middle"
            transform={`translate(${innerWidth / 2}, ${
              innerHeight + xAxisLabelOffset
            })`}
          >
            Year
          </text>

          {data.map((d) => (
            <circle
              cx={xScale(xValue(d))}
              cy={yScale(yValue(d))}
              r={circleRadius}
              opacity={0.4}
              fill="green"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
