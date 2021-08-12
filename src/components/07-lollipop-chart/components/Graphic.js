import {useState} from "react"
import { useGetData } from "../../../hooks/useGetData";
import { sum, max, scaleLinear, scaleBand } from "d3";

const width = 560;
const height = 500;

const margin = {
  top: 15,
  right: 75,
  bottom: 60,
  left: 135,
};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const tickOffset = 10;
const xAxisLabelOffset = 50;

const Mark = ({ xScale, d, yScale, innerWidth, tickOffset }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <g
      key={d.teacher}
      transform={`translate(0, ${yScale(d.teacher)})`}
      fill="black"
    >
      <line x2={xScale(d.total)} stroke="black" />
      <circle cx={xScale(d.total)} cy={0} r={visibility ? 6 : 3} fill="crimson" />
      <rect
        opacity={0}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        x={0}
        y={0}
        width={innerWidth}
        height={yScale.bandwidth()}
      />
      <text
        style={{ textAnchor: "start" }}
        x={xScale(d.total) + tickOffset}
        dy=".32em"
        visibility={visibility ? "visible" : "hidden"}
      >
        {d.total}
      </text>
    </g>
  );
};

export const Graphic = () => {
  const data = useGetData("lessons");

  if (!data) {
    return <h1>...Loading</h1>;
  }
  console.log(data);
  // find all Teachers
  // sum lessons with those teachers
  var buckets = [...new Set(data.map((d) => d.teacherName))];

  const sumTeachers = (() => {
    let array = [];
    buckets.forEach((teacher) => {
      const total = sum(
        data.filter((d) => d.teacherName === teacher),
        () => 1
      );
      array.push({ teacher, total });
    });
    return array;
  })();

  console.log(sumTeachers);

  const xScale = scaleLinear()
    .domain([0, max(sumTeachers, (d) => d.total)])
    .range([0, innerWidth])
    .nice();

  const sortedArray = [...sumTeachers].sort((a, b) => a.total - b.total);

  const yScale = scaleBand()
    .domain(sortedArray.map((d) => d.teacher))
    .range([innerHeight, 0])
    .padding(0.1);

  console.log(yScale.domain());
  console.log(sortedArray);
  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Lollipop Chart showing the number of lessons done per teacher
      </h1>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {sortedArray.map((d) => (
            <Mark
              xScale={xScale}
              d={d}
              yScale={yScale}
              innerWidth={innerWidth}
              tickOffset={tickOffset}
            />
          ))}

          {yScale.domain().map((teacher) => (
            <text
              transform={`translate(0, ${yScale(teacher)})`}
              style={{ textAnchor: "end" }}
              x={-tickOffset}
              dy=".32em"
            >
              {teacher}
            </text>
          ))}

          {xScale.ticks().map((tickValue) => (
            <g transform={`translate(${xScale(tickValue)}, 0)`}>
              <line y2={innerHeight} stroke="gray" opacity="0.2" />

              <text
                y={innerHeight + tickOffset}
                dy=".71em"
                style={{ textAnchor: "middle" }}
              >
                {tickValue}
              </text>
            </g>
          ))}

          <text
            y={innerHeight + xAxisLabelOffset}
            x={innerWidth / 2}
            style={{ textAnchor: "middle" }}
          >
            Number of Lessons
          </text>
        </g>
      </svg>
    </div>
  );
};
