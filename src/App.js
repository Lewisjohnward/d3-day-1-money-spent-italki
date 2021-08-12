import { SpentOnItalki01 } from "./components/01-spent-on-italki/index";
import { BinnedSpent02 } from "./components/02-binned-spent/index";
import { BinnedSpentLine03 } from "./components/03-binned-spent-line/index"
import { DaysOfWeekLessons04 } from "./components/04-days-of-week-lessons/index"
import { DonutChartTeachers05 } from "./components/05-donut-chart-teachers/index"
import { DonutChart06 } from "./components/06-donut-chart/index"
import { LollipopChart07 } from "./components/07-lollipop-chart/index"
import { ChangeViewButton } from "./components/other/changeView/ChangeViewButton";
import { Header } from "./components/other/header/Header"
import { Carousel } from "./pages/Carousel";

import "./styles.css";

export const App = () => (
  <>
  <Header />
  
  <div className="page-container">
    <ChangeViewButton />
    <Carousel />
    <SpentOnItalki01 />
    <BinnedSpent02 />
    <BinnedSpentLine03 />
    <DaysOfWeekLessons04 />
    <DonutChartTeachers05/>
    <DonutChart06 />
    <LollipopChart07 />
  </div>
  </>
);
