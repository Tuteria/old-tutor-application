import React from "react";
import styled, { css } from "styled-components";
import {
  font_used,
  responsive_design,
  text_color
} from "../design-systems/index";
import { font_weight } from "../design-systems/font";
import { spacingExtensions } from "../siteStyle";
function getHeadingStyle(props) {
  if (!!props.hero) {
    return font_used.hero_heading;
  }
  if (!!props.big) {
    return font_used.big_heading;
  }
  if (!!props.small) {
    return font_used.small_heading;
  }
  return font_used.regular_heading;
}
function getTextStyle(props, kind = "desktop") {
  if (!!props.big) {
    return font_used.big_body;
  }
  if (!!props.small) {
    return font_used.small_body;
  }
  if (!!props.moderate) {
    return font_used.l;
  }
  if (!!props.caption) {
    return font_used.caption;
  }
  // if(kind !== "desktop"){
  //     return font_used.
  // }
  return font_used.regular_body;
}
const shared = (variable = "") =>
  css`
    ${variable};
  `;
// export const Heading = ({tag='h1',...rest})=>{
//   const Node = styled[tag]`
//   ${props => css`
//       ${getHeadingStyle(props)};`} color: ${props => props.color};
//   ${props => shared(props.css)} ${responsive_design.mobile_only} {
//   `;
//   return <Node {...rest} />
// }
const HeadingStyle = styled.h1`
  margin-bottom: 0;
  ${props =>
    css`
      ${getHeadingStyle(props)};
      ${spacingExtensions(props)};
    `} color: ${props => props.color};
  ${props => shared(props.css)} ${responsive_design.mobile_only} {
    ${props =>
      props.mobile
        ? css`
            ${getTextStyle({ [props.mobile]: true })};
          `
        : css`
            ${getHeadingStyle(props)};
          `}};
  }
`;
export const Heading = ({ tag = "h1", ...props }) => {
  const HeadingComponent = HeadingStyle.withComponent(tag);
  return <HeadingComponent {...props} />;
};
export const TextStyle = styled.p`
  margin-bottom: 0;
  margin-top: ${props => props.marginTop};
  color: ${props => props.color};
  ${props => css`
    ${getTextStyle(props)};
    ${spacingExtensions(props)};
  `} font-weight: ${props =>
  props.bold ? font_weight.bold : font_weight.regular};
  ${responsive_design.mobile_only} {
    ${props => css`
      ${getTextStyle(props, "mobile")};
    `};
    ${props => css`
      ${getTextStyle({ [props.mobile]: true })};
    `};
  }
  ${props => shared(props.css)};
`;

export const Text = ({ tag = "p", ...props }) => {
  const TextComponent = TextStyle.withComponent(tag);
  return <TextComponent {...props} />;
};
