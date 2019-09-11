import React from "react";
import styled from "styled-components";
import globals from "../../../siteStyle";
const { siteColor } = globals;
const disabledColor = "#7b7b7b";
const borderColor = "#DCE0E0";
const borderWidth = 2;
const CheckInput = styled.label`
  display: block;
  position: relative;
  padding-left: ${props => (props.radio ? 24 : 35)}px;
  padding-top: ${props => (props.radio ? 4 : 3)}px;
  margin-bottom: ${props => (props.radio ? 15 : 15)}px;
  cursor: pointer;
  font-size: 18px;

  & input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked ~ .control__indicator {
      background: ${props => (props.radio ? "#fff" : siteColor)};
      border: ${props =>
        props.radio
          ? borderWidth + "px solid " + siteColor
          : borderWidth + "px solid " + siteColor};
    }
    &:checked ~ .control__indicator:after {
      display: block;
    }
    &:disabled ~ .control__indicator {
      opacity: 0.6;
      pointer-events: none;
    }
    &:disabled ~ .control__indicator:after {
      border-color: ${props => (props.radio ? "inherit" : disabledColor)};
      background: ${props => (props.radio ? disabledColor : "inherit")};
    }
  }
  & .control__indicator {
    position: absolute;
    top: ${props => (props.radio ? 5 : 2)}px;
    left: 0;
    height: ${props => (props.radio ? 16 : 25)}px;
    width: ${props => (props.radio ? 16 : 25)}px;
    border: ${borderWidth}px solid ${borderColor};
    border-radius: ${props => (props.radio ? "50%" : "4px")};
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: ${props => (props.radio ? 3 : 9)}px;
      top: ${props => (props.radio ? 2.5 : 6)}px;
      width: ${props => (props.radio ? 6 : 4)}px;
      height: ${props => (props.radio ? 6 : 8)}px;
      border: ${props =>
        props.radio ? borderWidth + "px solid " + siteColor : "solid #fff"};
      border-width: ${props =>
        props.radio
          ? "inherit"
          : "0 " + borderWidth + "px " + borderWidth + "px 0"};
      transform: rotate(45deg);
      border-radius: ${props => (props.radio ? "50%" : "none")};
      background: ${props => (props.radio ? siteColor : "inherit")};
    }
  }
  &:hover input ~ .control__indicator,
  & input:focus ~ .control__indicator {
  }
  &:hover input:not([disabled]):checked ~ .control__indicator,
  & input:checked:focus ~ .control__indicator {
    background: ${props => (props.radio ? "#fff" : siteColor)};
  }
`;

export const Checkbox = ({ text, ...rest }) => {
  return (
    <CheckInput>
      {text}
      <input type="checkbox" {...rest} />
      <div className="control__indicator" />
    </CheckInput>
  );
};

export const Radio = ({ text, ...rest }) => {
  return (
    <CheckInput radio>
      {text}
      <input type="radio" {...rest} />
      <div className="control__indicator" />
    </CheckInput>
  );
};
