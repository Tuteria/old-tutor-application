import React from "react";
import globals from "../siteStyle";
import styled, { css } from "styled-components";

const { siteText } = globals;
export const Div = styled.div`
  //border-bottom: 2px solid #e6e8eb;
  display: flex;
  ${props => props.extraStyle};
  ${props =>
    css`
      ${props.css};
    `};
`;

export class Tab extends React.Component {
  render() {
    const { children, component, extraStyle = "", ...rest } = this.props;
    const cchildren = React.Children.map(children, child =>
      React.cloneElement(child, { width: children.length })
    );
    const Component = component || Div;
    return (
      <Component
        extraStyle={css`
          ${extraStyle};
        `}
        {...rest}
      >
        {cchildren}
      </Component>
    );
  }
}

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  ${siteText} font-size: 18px;
  border-bottom: ${props =>
    props.active ? `3px solid ${props.bgColor || "#0064E6"}` : "none"};
  width: calc(${props => 100 / props.width}%);
  color: ${props => (props.active ? "#0064E6" : "inherit")};
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;
