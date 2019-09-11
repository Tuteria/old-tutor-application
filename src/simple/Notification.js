import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import global from "../siteStyle";
const { siteText } = global;
function backgroundColor(cls) {
  if (cls === "warning") {
    return "rgba(255, 170, 0, 0.2)";
  }
  if (cls === "error") {
    return "rgba(233, 65, 27, 0.1)";
  }
  if (cls === "success") {
    return "rgba(25, 145, 94, 0.1)";
  }
}
function Color(cls) {
  if (cls === "warning") {
    return "#1B2733";
  }
  if (cls === "error") {
    return "#E9411B";
  }
  if (cls === "success") {
    return "#36b37e";
  }
}
export const Notification = styled.div`
  background-color: ${props => backgroundColor(props.className)};
  ${siteText} color: ${props => Color(props.className)};
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  padding-top: ${props => props.padding}px;
  padding-bottom: ${props => props.padding}px;
  text-align: center;
  & .fa {
    padding-right: 21px;
    font-size: 19px;
  }
  ${props => props.css}
`;

function getIcon(customIcon, cls) {
  if (cls === "success") {
    return customIcon || "check-circle";
  }
  return customIcon || "warning";
}

export const StyledNotification = styled.div`
  background-color: ${props =>
    props.bgColor ? props.bgColor : "rgba(54, 179, 126, 0.1)"};
  padding: ${props => (props.small ? "21px" : "16px 28px 16px 18px")};
  border-left: 4px solid #36b37e;
  display: flex;
  flex-direction: ${props => (props.small ? "row" : "column")};
  align-items: ${props => (props.small ? "center" : null)};
  & > h2 {
    font-size: 20px;
  }
  & ul {
    padding-left: 16px;
    color: #484848;
    font-size: 13px;
    line-height: 24px;
    & li:before {
      content: "";
      // padding-left: 0px;
    }
  }
  & p {
    margin-bottom: 0;
    font-size: 16px;
    line-height: 21px;
    color: #47525d;
    font-weight: 300;
    & a {
      color: #0064e6;
      font-weight: bold;
      &:hover {
        text-decoration: none;
        cursor: pointer;
        color: #0064e6;
      }
    }
  }
  ${props => props.css};
`;

export default ({
  children,
  icon = false,
  className,
  padding = 8,
  customIcon,
  styling = "",
  ...rest
}) => {
  let theIcon = icon ? <Icon name={getIcon(customIcon, className)} /> : null;
  return (
    <Notification
      css={css`
        ${styling};
      `}
      className={className}
      padding={padding}
      {...rest}
    >
      {theIcon}
      {children}
    </Notification>
  );
};
