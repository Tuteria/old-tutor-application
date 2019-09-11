import React from "react";
import { Div } from "../../primitives";
import {
  ButtonWithIcon,
  spacing,
  Heading,
  Text,
  xs,
  Icon,
  ApplicationTooltip
} from "../components";
import { color } from "../../siteStyle";
import Media from "react-media";
import { HelpTip } from "../../compound/HelpTip";
import Button, { LoadingButton } from "../../simple/Button";

const TooltipContent = ({ leftSection, rightSection }) => {
  return (
    <Div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: ${spacing.s};

        svg {
          position: relative;
          top: 2px;
          left: ${spacing.xs};
          margin: 0 !important;
        }
      `}
    >
      <Text>{leftSection}</Text>
      <Text>{rightSection}</Text>
    </Div>
  );
};

const HelpTipComponent = ({ text, helpTipText }) => {
  return (
    <React.Fragment>
      <Text
        css={`
          display: inline-block;
        `}
      >
        {text}
      </Text>
      <HelpTip content={helpTipText} position="bottom">
        <Icon
          top
          name="help"
          height="14"
          width="14"
          fillColor={color.gray.primary}
        />
      </HelpTip>
    </React.Fragment>
  );
};

export class UpSellTooltip extends React.Component {
  state = {
    isOpen: false
  };
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isOpen } = this.state;
    const { type } = this.props;
    const isMobile = window.matchMedia(`(max-width:${xs}px)`).matches;
    return (
      <Div
        css={`
          border: 1px solid ${color.gray.ui_03};
          padding: ${spacing.l};
          border-radius: ${spacing.xs};
          background: ${color.white};
          @media (max-width: ${xs}px) {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10000;
            border-radius: 0;
            border: none;
            ${isOpen
              ? `top: 0; padding: 0`
              : `display:flex;align-items:center;`};
          }
        `}
      >
        <Media query={`(max-width: ${xs}px`}>
          {matches =>
            matches ? (
              <Div
                css={`
                  padding: ${spacing.m};
                  border-bottom: 1px solid ${color.gray.ui_03};
                  margin-bottom: ${spacing.m};
                  text-align: center;
                `}
              >
                <Heading small>Breakdown</Heading>
                <ButtonWithIcon
                  css={`
                    position: absolute !important;
                    right: ${spacing.m};
                    top: -8px;
                    padding: 0 ${spacing.s}!important;
                    border: none !important;
                    border-radius: 0;
                    background-color: transparent !important;
                    @media (max-width: ${xs}px) {
                      width: ${spacing.xl}!important;
                    }
                  `}
                  iconStyle={{ fill: color.gray.darker, width: "24" }}
                  icon="close"
                  onClick={this.toggleModal}
                />
              </Div>
            ) : null
          }
        </Media>
        <Div
          css={`
            border-bottom: 1px solid ${color.gray.ui_03};
            padding-bottom: ${spacing.l};
            @media (max-width: ${xs}px) {
              ${!isOpen
                ? `flex: 1; border-bottom: none; padding-bottom:0;`
                : `margin: 0 ${spacing.l};`};
            }
          `}
        >
          <Text
            css={`
              margin: 0 !important;
              padding-bottom: ${spacing.s};
              @media (max-width: ${xs}px) {
                padding-bottom: 0;
              }
            `}
          >
            Total cost
          </Text>
          <Heading
            css={`
              color: ${color.green.primary};
            `}
          >
            N 50,000
          </Heading>
          <Media query={`(max-width: ${xs}px`}>
            {matches =>
              matches ? (
                <Button
                  css={`
                    text-transform: uppercase;
                    color: ${color.green.primary};
                    width: 80% !important;
                    height: 24px !important;
                    font-size: 12px !important;
                    background: transparent;
                    box-shadow: none;
                    border-color: ${color.gray.ui_02};

                    @media (max-width: ${xs}px) {
                      &:after {
                        content: "";
                        display: block;
                        width: 132px;
                        height: 140px;
                        position: absolute;
                        top: 16px;
                        left: 24px;
                      }
                    }
                  `}
                  onClick={this.toggleModal}
                >
                  see details
                </Button>
              ) : null
            }
          </Media>
        </Div>
        {type === "schedule" ? (
          <Div
            css={`
              border-bottom: 1px solid ${color.gray.ui_03};
              padding: ${spacing.l} 0;
              @media (max-width: ${xs}px) {
                display: ${isOpen ? `block` : `none`};
                margin: ${isOpen ? `0 ${spacing.l}` : ``};
              }
            `}
          >
            <TooltipContent
              leftSection={
                <HelpTipComponent
                  text="Hourly rate"
                  helpTipText="This is based on average prices tutors charge in your location assuming you teach 2-hour lessons 3 times a week. How much you actually make may vary with your pricing, location, subjects, demand and other factors."
                />
              }
              rightSection="N2,500/hr"
            />
            <TooltipContent leftSection="Hours/day" rightSection="4hrs" />
            <TooltipContent
              leftSection="Number of lessons"
              rightSection="12 lessons"
            />
          </Div>
        ) : null}
        <Div
          css={`
            border-bottom: 1px solid ${color.gray.ui_03};
            padding: ${spacing.l} 0;
            @media (max-width: ${xs}px) {
              display: ${isOpen ? `block` : `none`};
              margin: ${isOpen ? `0 ${spacing.l}` : ``};
            }
          `}
        >
          <TooltipContent
            leftSection="N2,500 x 4 hrs x 12 lessons"
            rightSection="N47,000"
          />
          <TooltipContent
            leftSection={
              <HelpTipComponent
                text="Service fee"
                helpTipText="This is based on average prices tutors charge in your location assuming you teach 2-hour lessons 3 times a week. How much you actually make may vary with your pricing, location, subjects, demand and other factors."
              />
            }
            rightSection="N3,000"
          />
          <TooltipContent leftSection="Music lesson" rightSection="N4,000" />
        </Div>
        <Div
          css={`
            padding-top: ${spacing.l};
            @media (max-width: ${xs}px) {
              display: ${isOpen ? `block` : `none`};
              margin: ${isOpen ? `0 ${spacing.l}` : ``};
            }
          `}
        >
          <TooltipContent leftSection="Total " rightSection="N50,000" />
        </Div>
        <Div
          css={`
            @media (max-width: ${xs}px) {
              ${!isOpen ? `flex: 1;` : ` margin: 0 ${spacing.l}`};
            }
          `}
        >
          <LoadingButton
            kind={ButtonWithIcon}
            icon={
              isMobile && isOpen
                ? `chevron-right`
                : !isMobile ? `chevron-right` : ``
            }
            primary
            right
            full_width
            iconStyle={{ fill: "#ffffff", width: spacing.m, height: spacing.m }}
            buttonStyle={`
            display:flex!important;
            align-items:center;
            padding-left: 0 !important;
            margin-top: ${spacing.m};
            > span{
              display: block;
              margin: 0 auto;
            }
          svg{
                  margin: 0!important;
              }
                      `}
          >
            {type === "schedule" ? "Place" : "Complete"} Request
          </LoadingButton>
        </Div>
        {type === "schedule" ? (
          <Div
            css={`
              display: flex;
              align-items: center;
              padding-top: ${spacing.m};
              @media (max-width: ${xs}px) {
                display: ${isOpen ? `flex` : `none`};
                margin: ${isOpen ? `0 ${spacing.l}` : ``};
              }
            `}
          >
            <Icon name="fancyIcon" />
            <Text
              css={`
                padding-left: ${spacing.m};
                font-size: 12px;
              `}
            >
              Highly qualified tutors guaranteed for your request
            </Text>
          </Div>
        ) : null}
      </Div>
    );
  }
}
