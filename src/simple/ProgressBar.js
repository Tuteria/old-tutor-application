import React from "react";
import styled from "styled-components";
import { xs } from "../siteStyle";

export const ProgressBar = styled.div`
  height: ${props => props.height || 8}px;
  background-color: #dce0e0;
  width: ${props => props.width || 90}%;
  & > div {
    background-color: ${props => props.bgColor};
    width: ${props => (props.percentage ? props.percentage : 0)}%;
    height: inherit;
  }
`;
const ProgressContainer = styled.div`
  width: 50%;
  margin-right: auto;
  & ${ProgressBar} {
    margin-top: 8px;
  }
  @media (max-width: ${1024}px) {
    display: none;
  }
`;

export default ({ percentage, bgColor = "#36B37E" }) => (
  <ProgressContainer>
    <span>{percentage}% Complete</span>
    <ProgressBar bgColor={bgColor} percentage={percentage}>
      <div />
    </ProgressBar>
  </ProgressContainer>
);
