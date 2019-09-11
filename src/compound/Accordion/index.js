import React from "react";
import styled, { css } from "styled-components";

import Icon from "../../simple/Icon";

const DropdownContainter2 = styled.div`
  // display: flex;
  color: #484848;
  position: relative;
  border: 1px solid #dce0e0;
  .chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: "";
    display: inline-block;
    height: 0.45em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    // transform: rotate(-45deg);
    vertical-align: top;
    width: 0.45em;
  }
  & > svg {
    margin-right: 1.3rem;
  }

  label {
    position: relative;
    width: 100%;
    font-weight: bold;
    display: block;
    padding: 1.3rem 0 1.3rem 1em;
    cursor: pointer;
    font-size: 1.1rem;
    margin-bottom: 0;
    border-left: 1;
    transition: border-left 0.35s;
    & + .chevron {
      position: absolute;
      right: 0;
      margin: 1.3rem 1.3rem;
      top: 0;
      transform: rotate(135deg);
      transition: all 0.35s linear;
    }
  }
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
    &[type="checkbox"] {
      &:checked + label {
        border-left: 4px solid #36b37e;
        color: #36b37e;
        transition: border-left 0.35s;
      }
      &:checked + label + .chevron {
        top: 0;
        transform: rotate(315deg);
      }
    }
    &[type="radio"] {
      & + label::after {
        content: "+";
      }
      &:checked + label::after {
        transform: rotateX(180deg);
      }
    }
  }
  .children {
    color: #484848;
    cursor: pointer;
    margin: 0 auto;
    border-left: 0;
    max-height: 0;
    transition: all 350ms;
    text-align: left;

    overflow: hidden;
    padding-left: 1.3rem;
    padding-right: 2rem;
    p {
      margin: 1em;
    }
  }

  input:checked ~ .children {
    max-height: 12em;
    opacity: 1;
    border-left: 4px solid #36b37e;
  }
`;

export const Accordion3 = ({ label, children }) => (
  <DropdownContainter2>
    <input id={`tab-${label}`} type="checkbox" name="tabs" />
    <label htmlFor={`tab-${label}`}>{label}</label>
    <span class="chevron top" />
    <div className="children">{children}</div>
  </DropdownContainter2>
);

const DropdownContainter = styled.div`
  display: flex;
  margin-left: 1.3rem;
  color: #484848;
  margin-right: 1.3rem;
  padding-bottom: 1.3rem;
  padding-top: 1.3rem;
  & > svg {
    margin-right: 1.3rem;
  }
  & > label {
    padding-left: 46px;
  }
  & .text {
    position: relative;
    width: 100%;
    font-weight: bold;
    color: ${props => (props.opened ? "#36B37E" : "inherit")};
    & > p {
      font-size: 1.1rem;
      margin-bottom: 0;
    }

    & > svg {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;
const Base = styled.div`
  color: #484848;
  cursor: pointer;
  border: 1px solid #dce0e0;
  padding-bottom: ${props => (props.opened ? "1.5rem" : "")};
  margin: 0 auto;
  height: ${props => (props.opened ? "auto" : "4rem")};
  border-left: ${props => (props.opened ? "4px solid #36B37E" : "")};
  transition: all 250ms ease-in-out;
  & .children {
    padding-left: 1.3rem;
    padding-right: 2rem;
    opacity: ${props => (props.opened ? 1 : 0)};
    display: ${props => (props.opened ? "block" : "none")};
    transform: translateY(${props => (props.opened ? 0 : -20)}px);
    transition: all 250ms ease-in-out;
  }
  ${props =>
    css`
      ${props.css};
    `};
`;
const BaseContainer = styled.div`
  //height: ${props => (props.opened ? "auto" : props.totalHeight)};
  transition: height 0.25s ease-in-out;
`;

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.childNode = null;
    this.state = {
      opened: this.props.opened,
      height: 0
      //totalHeight: 64
    };
  }
  componentDidMount() {
    let height = this.node.clientHeight;
  }
  toggleState = () => {
    this.setState(state => {
      return {
        ...state,
        opened: !state.opened
        //totalHeight: !!!state.opened ? 64 + state.height : 64
      };
    });
  };
  toggleHeight = height => {
    this.setState({ height });
  };

  render() {
    return (
      <Base
        css={this.props.css}
        className={this.props.className}
        opened={this.state.opened}
      >
        <BaseContainer
          opened={this.props.opened}
          //totalHeight={`${this.state.totalHeight}px`}
        >
          <DropdownContainter
            onClick={this.toggleState}
            opened={this.state.opened}
          >
            <div className="text">
              <p>{this.props.label}</p>
              <Icon name={this.state.opened ? "chevron-up" : "chevron-down"} />
            </div>
          </DropdownContainter>
          <div ref={node => (this.node = node)} className="children">
            {this.state.opened ? this.props.children : null}
          </div>
        </BaseContainer>
      </Base>
    );
  }
}

export default Accordion;
