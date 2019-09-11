import React from "react";
import { Div } from "../../primitives";
import {
  spacing,
  xs,
  Icon,
  ButtonWithIcon,
  Text
} from "../../pages/components";
import { color } from "../../siteStyle";
import Button from "../../simple/Button";

export class RecommendationComponent extends React.Component {
  state = {
    isOpen: this.props.isOpen || true
  };
  closeRecommendation = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const {
      kind = "success",
      showBreakdown = false,
      icon = "lightbulb-o",
      showCloseButton = false,
      heading,
      width = "100%"
    } = this.props;
    let states = {
      warning: color.orange.primary,
      success: color.green.primary,
      danger: color.red.primary
    };
    let iconSectionBg = states[kind];
    return this.state.isOpen ? (
      <Div
        css={`
          position: relative;
          width: ${width};
        `}
      >
        <Div
          css={`
            border-radius: ${spacing.xs};
            border: 1px solid ${color.gray.ui_03};
            display: flex;
          `}
        >
          <Div
            css={`
              background-color: ${iconSectionBg};
              padding: ${spacing.m};
              ${iconSectionBg !== "#FFFFFF"
                ? `display: flex; align-items: center;`
                : ``};
            `}
          >
            <Icon
              name={icon}
              color={
                iconSectionBg !== "#FFFFFF" ? color.white : color.green.primary
              }
              width="16"
              height="16"
            />
          </Div>
          <Div
            css={`
              background-color: ${color.white};
              padding: ${spacing.s} ${spacing.sm};
              flex: 1;
            `}
          >
            <Text>{heading}</Text>
            {this.props.children}
            {showBreakdown ? (
              <Button
                css={`
                  padding: 0 !important;
                  border: none !important;
                  color: ${color.green.primary};
                  background: transparent;
                  @media (max-width: ${xs}px) {
                    width: 0 !important;
                  }
                `}
              >
                See breakdown >
              </Button>
            ) : null}
          </Div>
        </Div>
        {showCloseButton ? (
          <ButtonWithIcon
            css={`
              position: absolute !important;
              right: ${spacing.m};
              top: 0;
              padding: 0 ${spacing.s}!important;
              border: none !important;
              border-radius: 0;
              background-color: transparent !important;
              @media (max-width: ${xs}px) {
                width: ${spacing.xl}!important;
              }
            `}
            iconStyle={{ fill: color.gray.darker }}
            icon="close"
            onClick={this.closeRecommendation}
          />
        ) : null}
      </Div>
    ) : null;
  }
}
export default RecommendationComponent;
