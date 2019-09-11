import React from "react";
import styled from "styled-components";
import globals from "../siteStyle";
const { siteText } = globals;
const ToggleSelectContainer = styled.div`
  height: 50px;
  display: flex;
  ${siteText} border-radius: 2px 2px 0 0;
`;

const Option = styled.div`
  width: 50%;
  font-weight: ${props => (props.active ? 500 : 300)};
  background-color: ${props => (props.active ? "#0064E6" : "#ffffff")};
  color: ${props => (props.active ? "#FFFFFF" : "#47525D")};
  border: 1px solid ${props => (props.active ? "#94BDF2" : "#E6E8EB")};
  padding-top: 14px;
  text-align: center;
  & img {
    height: 20px;
    & ~ span {
      margin-left: 8px;
    }
  }
  & span {
    vertical-align: middle;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const ToggleOption = ({ children, icon, active }) => (
  <Option active={active}>
    {icon} <span>{children}</span>
  </Option>
);

const ToggleSelect = ({ children }) => (
  <ToggleSelectContainer>{children}</ToggleSelectContainer>
);

export default ToggleSelect;
