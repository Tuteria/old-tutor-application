import React from "react";
import styled from "styled-components";
import globals, { brand_color } from "../siteStyle";
import { Tab } from "./Tabs";
import Logo from "./icons/Logo";
import Icon from "../simple/Icon";
const { siteText } = globals;
const xs = 768;
function backgroundColor(props) {
  let bgColor = "";
  if (Boolean(props.inverse)) {
    bgColor = "#0064E7";
  }
  if (Boolean(props.white)) {
    bgColor = "#fff";
  }
  return bgColor;
}
export const Navigation = styled.div`
  // border-bottom: 2px solid #e6e8eb;
  ${props =>
    props.bgColor ? "" : "border-top: 2px solid #e6e8eb;"} display: flex;
  position: relative;
  background-color: ${props => backgroundColor(props)};
  height: ${props => props.maxHeight || "60px"};
  ${props =>
    props.bgColor
      ? `
  border-bottom: 3px solid ${props.bgColor};`
      : ""} ${siteText} & svg {
    display: block;
    margin: auto;
    height: 30px;
    margin-left: ${props => (props.inverse ? "14px" : "auto")};
    margin-right: ${props => (props.inverse ? "14px" : "auto")};
    @media (max-width: ${xs}px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  & h3 {
    color: ${props => (props.inverse ? "#fff" : "#337AB7")};
    padding-left: 32px;
    border-left: 2px solid #629fee;
    paddint-top: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 20px;
    padding-bottom: 10px;
    font-size: 19px;
    @media (max-width: ${xs}px) {
      display: none;
    }
  }
  ${props => props.css};
  @media (max-width: ${xs}px) {
    width: 100%;
    border-bottom: none;
  }
`;
const SaveIndicatorStyle = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  padding-right: 42px;
  margin-top: 12px;
  & p {
    margin-bottom: 0;
    padding-top: 7px;
    color: ${props => (props.saved ? "#C9C9C9" : "")};
  }
  @media (max-width: ${xs}px) {
    display: none;
  }
`;

export const SaveIndicator = ({
  text = "Saved 30 seconds ago",
  saved = true
}) => (
  <SaveIndicatorStyle saved={saved}>
    <Icon
      name="refresh"
      {...{ stroke: saved ? "#C9C9C9" : undefined }}
      spin={!saved}
    />
    <p>{saved ? text : "Saving..."}</p>
  </SaveIndicatorStyle>
);
export const NavBar = ({
  inverse = false,
  heading,
  children,
  white = false,
  bgColor = true,
  ...rest
}) => (
  <Navigation inverse={inverse} white={white} {...rest} bgColor={bgColor}>
    <Logo
      textColor={
        Boolean(inverse) && !Boolean(white) ? "#fff" : brand_color.tuteria_blue
      }
    />
    {heading ? <h3>{heading}</h3> : null}
    {children}
  </Navigation>
);

export default props => <Tab component={Navigation} {...props} />;
