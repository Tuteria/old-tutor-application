import React from "react";
import Icons from "./Icons";
import styled, { css } from "styled-components";
// import "./ionicons.css";
// import "./font-awesome.css";

const Icon = ({ name, kind = "fas", ...rest }) => {
  const CC = Icons[name];
  if (CC) {
    return <CC {...rest} />;
  }
  const ionicons = {
    "check-circle": "ion-checkmark-circled",
    // plus: "ion-plus",
    "cloud-upload": "ion-ios-cloud-upload-outline fa-1-1"
  };
  const ionicClass = ionicons[name];
  if (ionicClass) {
    return <i className={`${ionicClass}`} {...rest} />;
  }
  return <i className={`${kind} fa-${name}`} {...rest} />;
};
const StackedIcons = styled.div`
  display: inline-block;
  color: ${props => props.color};
  & .fa-stack-1x {
    font-size: 1.4em;
  }
  & .fa-stack {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    position: relative;
    width: 2em;
  }
  ${props =>
    props.mode !== 1
      ? `& .fa-stack-1x, .fa-stack-2x {
        bottom: 0;
        left: -1px;
        margin: auto;
        position: absolute;
        right: 0;
        top: 6px;
    }`
      : ""} & .calendar-text {
    font-size: ${props => (props.fontSize ? props.fontSize : "12px")};
    color: ${props => (props.force ? props.color : "white")};
  }
  ${props => props.extraStyle};
`;
export const NumIcon = ({ no }) => (
  <span className="fa-stack">
    <strong className="fa-stack-1x calendar-text">{no}</strong>
  </span>
);
export const NumberIcon = ({
  no,
  icon = "",
  color,
  active = false,
  // fontStyle = "circle-n",
  fontStyle = "circle",
  fontSize,
  fontKind,
  styling = "",
  force = false,
  textColor = "inherit",
  bgColor,
  mode = 1,
  ...rest
}) => {
  let ctColor = active ? bgColor || "#0064e6" : textColor;
  let props =
    mode === 1
      ? {
          kind: active && !force ? "fas" : fontKind,
          name: `${fontStyle} fa-stack-1x`
        }
      : {
          name: "circle-n",
          color: ctColor,
          full: active && !force
        };
  return (
    <StackedIcons
      extraStyle={css`
        ${styling};
      `}
      fontSize={fontSize}
      className="icon-s"
      color={ctColor}
      active={active}
      force={force}
      mode={mode}
      {...rest}
    >
      <span className="fa-stack">
        <Icon {...props} />
        {icon ? (
          <Icon name={`${icon} fa-stack-1x calendar-text`} />
        ) : (
          <strong
            className={`fa-stack-1x calendar-text ${active ? "" : "active-no"}`}
          >
            {no}
          </strong>
        )}
      </span>
    </StackedIcons>
  );
};
export default Icon;
