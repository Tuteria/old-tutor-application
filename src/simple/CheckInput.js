import React from "react";
import styled, { css } from "styled-components";
import globals, { form_field_styling } from "../siteStyle";
import { Text } from "./Text";
import { Label } from "./Form";
const { siteColor } = globals;
const disabledColor = "#7b7b7b";
const borderColor = "#DCE0E0";
const borderWidth = 2;
const CheckInput = styled.label`
  ${css`
    ${props => props.css};
  `};
  display: inline-block !important;
  position: relative;
  font-weight: 500!important;
  /* ${form_field_styling} */
  padding-left: ${props => (props.radio ? 32 : 30)}px;
  padding-top: ${props => (props.radio ? 0 : 3)}px;
  margin-bottom: ${props => (props.radio ? 15 : 15)}px;
  cursor: pointer;
  font-size: 18px;
  & > span {
    display: block;
    //padding-top: 3px;
    font-weight: 500;
    ${props => props.textStyle};
    ${props => props.customTextStyle};
  }
  & input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked ~ .control__indicator {
      background: ${props => (props.radio ? "#fff" : props.backgroundColor)};
      border: ${props =>
        props.radio
          ? borderWidth + "px solid " + props.borderColor
          : borderWidth + "px solid " + props.borderColor};
      border-radius: ${props => (props.radio ? "50%" : "4px")};
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
    top: ${props => (props.radio ? 2 : 2)}px;
    left: 0;
    height: ${props => (props.radio ? 16 : 25)}px;
    width: ${props => (props.radio ? 16 : 25)}px;
    border: ${borderWidth}px solid ${borderColor};
    ${props => props.checkSize}; border-radius: ${props =>
  props.radio ? "50%" : "4px"};
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: ${props => (props.radio ? 3 : 9)}px;
      top: ${props => (props.radio ? 2.5 : 6)}px;
      width: ${props => (props.radio ? 6 : 4)}px;
      height: ${props => (props.radio ? 6 : 8)}px;
      ${props => props.checkStyle} border: ${props =>
  props.radio
    ? borderWidth + "px solid " + props.backgroundColor
    : "solid #fff"};
      border-width: ${props =>
        props.radio
          ? "inherit"
          : "0 " + borderWidth + "px " + borderWidth + "px 0"};
      transform: rotate(45deg);
      border-radius: ${props => (props.radio ? "50%" : "none")};
      background: ${props => (props.radio ? props.backgroundColor : "inherit")};
    }
    &:focus {
      outline: dotted thin;
      outline: -webkit-focus-ring-color auto 5px;
      outline-offset: -2px;
      border: 2px solid #537575 !important;
    }
  }
  &:hover input ~ .control__indicator,
  & input:focus ~ .control__indicator {
  }
  &:hover input:not([disabled]):checked ~ .control__indicator,
  & input:checked:focus ~ .control__indicator {
    background: ${props => (props.radio ? "#fff" : props.backgroundColor)};
    border-radius: ${props => (props.radio ? "50%" : "none")};
  }
  @media(max-width: 768px) {
    padding-top: ${props => (props.radio ? 4 : 6)}px;
  }
`;

export const Checkbox = ({
  text,
  border = borderColor,
  innerColor = siteColor,
  textStyle = ``,
  checkStyle = ``,
  checkSize = ``,
  customTextStyle = ``,
  ...rest
}) => {
  return (
    <CheckInput
      checkSize={css`
        ${checkSize};
      `}
      checkStyle={css`
        ${checkStyle};
      `}
      textStyle={css`
        ${textStyle};
      `}
      customTextStyle={css`
        ${customTextStyle};
      `}
      borderColor={border}
      backgroundColor={innerColor}
    >
      <span tabIndex="0">{text}</span>
      <input type="checkbox" {...rest} />
      <div className="control__indicator" />
    </CheckInput>
  );
};

export const Radio = ({
  text,
  subtext,
  border = borderColor,
  innerColor = siteColor,
  checkStyle = ``,
  labelStyle,
  ...rest
}) => {
  return (
    <CheckInput
      radio
      css={labelStyle}
      checkStyle={css`
        ${checkStyle};
      `}
      borderColor={border}
      backgroundColor={innerColor}
    >
      {/* <Label for={rest.name}> */}
      <span style={{ display: "inline" }}>{text}</span>
      {/* </Label> */}
      {subtext ? <Text small>{subtext}</Text> : null}
      <input type="radio" {...rest} />
      <div className="control__indicator" />
    </CheckInput>
  );
};
