import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import globals from "../siteStyle";

const IconWithText = styled.div`
  line-height: 19px;
  color: ${props => colors[props.color] || colors.green};
  margin-top: ${props => props.marginTop + "px" || "inherit"};

  & i {
    font-size: 17px;
    font-weight: 500;
  }
  & span {
    font-size: 15px;
    font-weight: 300;
    margin-left: 8px;
  }
`;
const colors = {
  green: "#63AB62",
  blue: globals.siteColor
};
export default ({ icon = "check", children, ...rest }) => (
  <IconWithText {...rest}>
    <Icon name={`${icon}-circle`} />
    {children}
  </IconWithText>
);
