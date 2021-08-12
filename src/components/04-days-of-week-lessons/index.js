import { Graphic } from "./components/Graphic";
import { Text } from "./components/Text";
import { Count } from "./components/Count"
import styled from "styled-components"

const MainContainer = styled.div`
  display: flex;
`
const DescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
  margin-left: 40px;
`

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`

export const DaysOfWeekLessons04 = () => (
  <MainContainer>
    <CountContainer>
    <Count />
    </CountContainer>
    <Graphic />
    <DescriptionContainer>
      <Text />
    </DescriptionContainer>
  </MainContainer>
);
