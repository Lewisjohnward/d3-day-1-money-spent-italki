import { useState } from "react";
import { SpentOnItalki01 } from "../components/01-spent-on-italki/index";
import { BinnedSpent02 } from "../components/02-binned-spent/index";
import { BinnedSpentLine03 } from "../components/03-binned-spent-line/index";
import { DaysOfWeekLessons04 } from "../components/04-days-of-week-lessons/index";
import { DonutChartTeachers05 } from "../components/05-donut-chart-teachers/index";
import { DonutChart06 } from "../components/06-donut-chart/index";
import { LollipopChart07 } from "../components/07-lollipop-chart/index";
import { ChangeViewButton } from "../components/other/changeView/ChangeViewButton";
import styled from "styled-components";

const height = window.innerWidth;

const Container = styled.div`
  height: ${({ height }) => height}px;
`;

const width = 1480 ;
const graphHeight =  560 ;

export const Carousel = () => {
  const [view, setView] = useState(0);

  const displayArray = [
    <SpentOnItalki01 carousel={true} height ={graphHeight}/>,
    <BinnedSpent02 carousel={true} height ={graphHeight}/>,
    <BinnedSpentLine03 carousel={true} height ={graphHeight}/>,
    <DaysOfWeekLessons04 carousel={true} height ={graphHeight}/>,
    <DonutChartTeachers05 carousel={true} height ={graphHeight}/>,
    <DonutChart06 carousel={true} height ={graphHeight} />,
    <LollipopChart07 carousel={true} height ={graphHeight}/>,
  ];

  const changeView = () => {
    view === displayArray.length - 1 ? setView(0) : setView((prev) => prev + 1);
  };

  return (
    <Container height={height}>
      {displayArray[view]}
      <button onClick={() => changeView()}>Next</button>
    </Container>
  );
};
