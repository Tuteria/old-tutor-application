import React from "react";
import styled, { css } from "styled-components";
import { spacingExtensions } from "../siteStyle";
import { Text } from "../simple/Text";
const func = props =>
  css`
    ${props};
  `;
export const DivStyle = styled["div"]`
  ${props =>
    css`
      ${props.css};
    `};
`;
export const Div = ({ css = "", children, ...props }) => {
  let combinedCss = `${css}
  ${spacingExtensions(props)}`;
  return <DivStyle css={combinedCss} children={children} {...props} />;
};

export const Form = styled.form`
  ${props =>
    css`
      ${props.css};
    `};
  ${props => props.extra};
`;

export const Container = styled("div")`
  margin: 0 auto;
  padding-top: 0;
  ${props =>
    css`
      ${props.css};
    `};
`;
