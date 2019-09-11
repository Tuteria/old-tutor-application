// @flow
import React, { Component } from "react";
import styled from "styled-components";

export const Link = styled.a``;

export { StateHolder, LoginModal, Header } from "./StateHolder";
class TemplateWrapper extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div id="hero-section">
        {this.props.render(this.props, children)}
        {/* <Div>{childrenWithProps}</Div> */}
      </div>
    );
  }
}

export default TemplateWrapper;
