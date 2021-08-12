import { useGetData } from "../../../hooks/useGetData";
import { scaleLinear, scaleBand, bin, sum, max } from "d3";

const width = 560;
const height = 250;

const margin = {
  top: 10,
  right: 75,
  bottom: 60,
  left: 95,
};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const tickOffset = 10;
const xAxisLabelOffset = 50;

export const Graphic = () => {
  const data = useGetData("lessons");

  if (!data) {
    return <h1>...Loading</h1>;
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  //Sort the data
  const sortData = () => {
    const tempArray = [];
    daysOfWeek.forEach((d) => tempArray.push({ day: d, count: [] }));
    data.forEach((d) => {
      if (d.date.getDay() === 0) {
        tempArray[daysOfWeek.length - 1].count.push(1);
      }
      if (d.date.getDay() === 1) {
        tempArray[0].count.push(1);
      }
      if (d.date.getDay() === 2) {
        tempArray[1].count.push(1);
      }
      if (d.date.getDay() === 3) {
        tempArray[2].count.push(1);
      }
      if (d.date.getDay() === 4) {
        tempArray[3].count.push(1);
      }
      if (d.date.getDay() === 5) {
        tempArray[4].count.push(1);
      }
      if (d.date.getDay() === 6) {
        tempArray[5].count.push(1);
      }
    });

    const array = [];
    daysOfWeek.forEach((d) => array.push({ day: d }));
    tempArray.forEach((d, i) => {
      array[i].count = d.count.length;
    });

    return array;
  };

  const binnedData = sortData();

  const xScale = scaleBand()
    .domain(daysOfWeek)
    .range([0, innerWidth])
    .padding(0.02);

  const yValue = (d) => d.count;
  const yScale = scaleLinear()
    .domain([0, max(binnedData, yValue)])
    .range([innerHeight, 0]);

  // console.log(
  //   (function () {
  //     let count = 0;
  //     countArray.forEach((d) => {
  //       count += d.count.length;
  //     });
  //     return count;
  //   })()
  // );

  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Lessons on Different Days of the Week
      </h1>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.domain().map((d) => {
            return (
              <g key={d} transform={`translate(${xScale(d)}, ${innerHeight})`}>
                <text
                  style={{ textAnchor: "middle" }}
                  dy=".71em"
                  y={tickOffset}
                  x={xScale.bandwidth() / 2}
                >
                  {d}
                </text>
              </g>
            );
          })}
          <text
            transform={`translate(${innerWidth / 2}, ${
              innerHeight + xAxisLabelOffset
            })`}
            style={{ textAnchor: "middle" }}
          >
            Day of Week
          </text>

          {yScale.ticks().map((tickValue) => (
            <g transform={`translate(0, ${yScale(tickValue)})`}>
              <line stroke="gray" opacity="0.2" x2={innerWidth} stroke="gray" />
              <text style={{ textAnchor: "end" }} dy=".32em" x={-tickOffset}>
                {tickValue}
              </text>
            </g>
          ))}

          <text
            transform={`translate(${-xAxisLabelOffset}, ${
              innerHeight / 2
            })rotate(-90)`}
            style={{ textAnchor: "middle" }}
          >
            Number of Lessons
          </text>
          {binnedData.map((d) => (
            <rect
              key={d.day}
              x={xScale(d.day)}
              y={yScale(d.count)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(d.count)}
              fill="red"
              opacity={0.6}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
