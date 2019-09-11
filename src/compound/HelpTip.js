import React from "react";
import styled, { css } from "styled-components";
import { Div } from "../primitives";
import Icon from "../simple/Icon";
import { Text } from "../simple/Text";
import { text_color } from "../siteStyle";

const shared = css`
  transform: scale(1) translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
  transition: opacity 200ms ease-in-out, visibility 200ms ease-in-out;
  transition: opacity 0.3s ease-in-out, transform 0.6s cubic-bezier(0, 0, 0, 1),
    visibility 0.3s ease-in-out;
`;
const HelpContainer = styled.div`
  position: relative;
  display: inline-block;
  & div {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.9) translate3d(0, 0, 0);
    ${props => (props.open ? shared : "")};
  }
  &:hover {
    cursor: pointer;
    ${props =>
      props.hover
        ? `& div{
      ${shared}
    }`
        : ""};
  }
`;
export class HelpTip extends React.Component {
  state = {
    open: false
  };
  onClick = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { position, icon, iconProps, direction = "right" } = this.props;
    return (
      <HelpContainer
        onClick={this.onClick}
        open={this.state.open}
        className="help-tip"
      >
        {Boolean(icon) ? <Icon name={icon} {...iconProps} /> : null}
        {this.props.children}
        <Div
          css={`
          position: absolute;
          z-index: 1070;
          ${position === "top" ? "bottom: 40px;" : ""}
          ${position === "bottom" ? "top: 40px;" : ""}
          ${direction === "right" ? "right: -16px;" : "left: -16px"};
          padding: 16px;
          width: 232px;
            background: #ffffff;
            border: 1px solid #f2f2f2;
            border-radius: 2px;
            color: ${text_color.secondary};

            &:before {
              content: "";
              display: block;
              position: absolute;
              width: 0;
              height: 0;
              border-color: transparent;
              border-width: 12px;
              border-style: solid;
              ${position === "top" ? "top: 100%;" : ""}
              ${position === "bottom" ? "bottom: 100%;" : ""}
              ${position === "top" ? "border-top-color: #fff;" : ""}
              ${position === "bottom" ? "border-bottom-color: #fff;" : ""}
              ${position === "top" ? "border-bottom: 0;" : ""}
              ${position === "bottom" ? "border-top: 0;" : ""}
              ${direction === "left" ? `right: 83%;` : `left: 90%;`}
              margin-left: -12px;
          }
          `}
        >
          <Text
            css={`
              color: #000000;
            `}
          >
            {this.props.content}
          </Text>
        </Div>
      </HelpContainer>
    );
  }
}
