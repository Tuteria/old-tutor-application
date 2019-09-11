import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../primitives";
import Icon from "../simple/Icon";
import globals, { spacing, color } from "../siteStyle";
const { siteText, xs } = globals;

export const IconStyle = styled.div`
  cursor: pointer;
  margin-bottom: 40px;
  ${siteText} font-size: 17px;
  line-height: 22px;
  color: #0064e6;
  display: inline-block;
  & > i {
    font-size: 21px;
    margin-right: 8.5px;
  }
  ${props =>
    css`
      ${props.css};
    `};
`;
export const AddIcon = ({
  text,
  onClick,
  icon = "plus",
  Style = IconStyle,
  styling = ``
}) => (
  <Style css={styling} onClick={onClick}>
    <Icon name={icon} stroke={color.blue.primary} width={20} /> {text}
  </Style>
);

export const PreviousLink = ({ text, onClick, css = `` }) => (
  <AddIcon
    styling={`cursor:pointer;${css} display: flex; align-items: center; svg{margin-right: 12px;}`}
    text={text}
    onClick={onClick}
    icon="chevron-left"
    Style={Div}
  />
);
