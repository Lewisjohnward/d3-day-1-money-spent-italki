import { useGetData } from "../../../hooks/useGetData";
import {pie, arc, bin, cumsum, sum } from "d3";

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
  // find all Teachers
  // sum lessons with those teachers
  var buckets = [...new Set(data.map(d => d.teacherName))];
  
  const sumTeachers = (() => {
    let object = {}
    buckets.forEach(teacher => {
      const total = sum(
        data.filter(d => d.teacherName === teacher)
        , () => 1)
      object[`${teacher}`] = total
    })
    return object
  })()

  const radius = Math.min(innerWidth, innerHeight) / 2 

  let arc1 = arc()
    .innerRadius(50)
    .outerRadius(radius)
    .padAngle(.02)
    .padRadius(100)
	  .cornerRadius(5);

  const pieScale = pie()
    .value(d => d[1])

  const sortedData = pieScale(Object.entries(sumTeachers))
  
  return (
    <div>
      <h1 style={{ marginLeft: margin.left, marginBottom: 0 }}>
        Donut Chart Showing Lessons with Different Teachers 
      </h1>
      <svg height={height} width={width}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>

        {sortedData.map(d => (
          <path d={arc1(d)} fill="red"  stroke="black" opacity={0.6}></path>
        ))}
          
        </g>
      </svg>
    </div>
  );
};
