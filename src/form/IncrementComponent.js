import React from "react";
import { Div } from "../primitives";
import { NumberIcon } from "../simple";
import { brand_color, spacing } from "../design-systems";

export class IncrementComponent extends React.Component {
  state = {
    number: this.props.number || 1
  };
  decrement = () => {
    if (this.state.number > 1) {
      let result = this.state.number - 1;
      this.setState({ number: result > 0 ? result : 0 });
      this.props.decrementCallback();
      return;
    }
    return;
  };
  increment = () => {
    const { maxNumber = 1 } = this.props;
    const { number } = this.props;
    if (number >= maxNumber) {
      return false;
    }
    this.setState({ number: this.state.number + 1 });
    this.props.incrementCallback();
  };
  render() {
    let sharedStyles = {
      styling: `cursor: pointer; height: ${
        spacing.xl
      }; text-align: center; & strong{top: 5px; }`,
      active: true,
      force: true,
      fontKind: "far",
      bgColor: brand_color.tuteria_green,
      fontSize: spacing.m
    };
    let { scale } = this.props;
    return (
      <Div
        css={`
          display: flex;
          align-items: center;
          height: ${spacing.xl};
          .fa-stack {
            ${scale ? `transform: scale(${scale})` : ""};
          }
          .calendar-text {
            font-size: 16px;
          }
          span.number-val {
            font-size: 20px;
            text-align: center;
            display: block;
            margin: 0 auto;
            line-height: 24px;
          }
        `}
      >
        <NumberIcon onClick={this.decrement} {...sharedStyles} no="-" />
        <Div
          css={`
            width: ${spacing.xl};
          `}
        >
          <span className="number-val">{this.state.number}</span>
        </Div>
        <NumberIcon onClick={this.increment} {...sharedStyles} no="+" />
      </Div>
    );
  }
}
