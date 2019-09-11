import React from "react";
import { Div } from "../../primitives";
import styled, { css } from "styled-components";
import {
  ButtonWithIcon,
  spacing,
  Heading,
  Text,
  xs,
  Icon,
  CloseButton
} from "../components";
import { color, font_used } from "../../siteStyle";
import { HelpTip } from "../../compound/HelpTip";
import Button, { LoadingButton } from "../../simple/Button";
import Media from "react-media";
import { ProceedButton } from "./ClientPageWrapper";

export const PriceBreakdownComponent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.l};
  background-color: ${props => props.bgColor};
  border-radius: 8px;
  border: ${props => props.border};
  ${props => props.css};
`;

PriceBreakdownComponent.defaultProps = {
  bgColor: color.white,
  border: "none"
};

export const Currency = ({ children }) => {
  // let options = { naira: "₦" };
  return <span>{children}</span>;
  // return <span>&#8358;{children}</span>;
};
export const Link = styled.a`
  cursor: pointer;
  ${css`
    ${props => props.css};
  `};
`;
const TooltipContent = ({ leftSection, rightSection }) => {
  return (
    <Div
      className="Tooltip-content"
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
      <Text tag="div">{leftSection}</Text>
      <Text tag="div">{rightSection}</Text>
    </Div>
  );
};

const ProceedButtonContainer = ({
  isOpen,
  onSubmit,
  loading,
  disabled,
  buttonText
}) => {
  return (
    <Div
      css={`
        ${isOpen ? `` : `flex: 1 1 auto;`}
        @media (max-width: ${xs}px) {
          margin-left: ${spacing.l};
          margin-right: ${isOpen ? spacing.l : `0`};
          margin-top: ${isOpen ? spacing.l : `0`};
        }
      `}
      className="summary-next-button__container"
    >
      <ProceedButton
        onSubmit={onSubmit}
        loading={loading}
        full_width
        isValid={disabled}
        className="summary-next-button"
      >
        {buttonText}
      </ProceedButton>
    </Div>
  );
};

const HelpTipComponent = ({ text, helpTipText, direction }) => {
  return (
    <React.Fragment>
      <Text
        css={`
          display: inline-block;
        `}
      >
        {text}
      </Text>
      <HelpTip
        content={helpTipText}
        direction={direction}
        position="bottom"
        icon="help"
        iconProps={{
          top: true,
          height: "14",
          width: 14,
          fillColor: color.gray.primary
        }}
      />
    </React.Fragment>
  );
};
const RequestDetail = ({
  data = [],
  isOpen,
  showMobile,
  children,
  noBorder = false
}) => {
  return (
    <Div
      className="tooltip-content__container"
      css={`
        border-bottom: ${noBorder ? "none" : `1px solid ${color.gray.ui_03}`};
        padding: ${spacing.l} 0;
        ${showMobile &&
          `
        @media (max-width: ${xs}px) {
          padding: ${isOpen ? `24px` : ``};
          display: ${isOpen ? `block` : `none`};
        }
        `};
      `}
    >
      {data.map((section, index) => (
        <TooltipContent
          key={index}
          leftSection={
            Boolean(section.summary) ? (
              <HelpTipComponent
                direction="left"
                text={section.text}
                helpTipText={section.summary}
              />
            ) : (
              section.text
            )
          }
          rightSection={section.value}
        />
      ))}
      {children}
    </Div>
  );
};
const LessonDurationComponent = ({ css, start, end }) => {
  return (
    <Div
      css={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid ${color.gray.ui_03};
        padding: ${spacing.m} 0;
        @media (max-width: ${xs}px) {
          padding: ${spacing.m} ${spacing.l};
        }
        ${css};
      `}
    >
      <Text>
        <span style={{ color: color.gray.lighter }}>Lesson starts</span>
        <br />
        {start}
      </Text>
      <Icon name="leftArrow" />
      <Text>
        <span style={{ color: color.gray.lighter }}>Lesson ends</span>
        <br />
        {end}
      </Text>
    </Div>
  );
};
const BigSummaryStyle = styled.div`
  border-bottom: 1px solid ${color.gray.ui_03};
${props =>
  props.noPadding ? `padding-bottom: 0` : `padding-bottom: ${spacing.l};`}
  @media (max-width: ${xs}px) {
    ${props =>
      !props.isOpen
        ? `flex: 1; border-bottom: none; padding-bottom:0;`
        : `padding: 0 ${spacing.l} ${spacing.l};`};}
  }
  ${props => (props.noPadding ? `border-bottom: 0;` : ``)}
  & >p{
    margin: 0 !important;
    padding-bottom: ${spacing.s};
    @media (max-width: ${xs}px) {
      padding-bottom: 0;
    }
  }
  & >h1{
    color: ${color.green.primary};
  }
  & >button{
      display: none;
      @media(max-width: ${xs}px){
        display: block;
        text-transform: uppercase;
        color: ${color.green.primary};
        max-width: 400px!important;
        width: unset;
        height: 24px !important;
        font-size: 12px !important;
        background: transparent;
        box-shadow: none;
        border-color: ${color.gray.ui_02};
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
    }
`;
const BigSummary = ({
  heading,
  noPadding,
  isOpen,
  showMobile,
  price,
  onClick,
  per_hour = true
}) => {
  return (
    <BigSummaryStyle
      {...{ isOpen, noPadding, showMobile }}
      className="big-summary-section"
    >
      <Text> {heading}</Text>
      <Heading
        css={`
          font-size: 40px;
          &:after {
            content: ${per_hour ? "'/hr'" : '""'};
            font-size: 19px;
          }
        `}
      >
        {price}
      </Heading>
      {isOpen
        ? null
        : showMobile && <Button onClick={onClick}>see details</Button>}
    </BigSummaryStyle>
  );
};
export class PriceSummaryComponent extends React.Component {
  state = {
    isOpen: false
  };
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  defaultProceedButton = () => {
    let { isOpen } = this.state;
    let { showProceedButton = true, buttonText = "Place Request" } = this.props;
    return (
      <React.Fragment>
        {showProceedButton ? (
          <Media query={`(max-width: ${xs}px)`}>
            {matches =>
              matches ? (
                <ProceedButtonContainer
                  isOpen={isOpen}
                  onSubmit={this.props.onSubmit}
                  loading={this.props.loading}
                  disabled={this.props.disabled}
                  buttonText={buttonText}
                />
              ) : (
                <ProceedButtonContainer
                  isOpen={isOpen}
                  onSubmit={this.props.onSubmit}
                  loading={this.props.loading}
                  disabled={this.props.disabled}
                  buttonText={buttonText}
                />
              )
            }
          </Media>
        ) : (
          <Media query={`(max-width: ${xs}px)`}>
            {matches =>
              matches ? (
                <ProceedButtonContainer
                  isOpen={isOpen}
                  onSubmit={this.props.onSubmit}
                  loading={this.props.loading}
                  disabled={this.props.disabled}
                  buttonText={buttonText}
                />
              ) : null
            }
          </Media>
        )}
      </React.Fragment>
    );
  };
  mobileCss = () => {
    let { isOpen } = this.state;
    let { position = "fixed", hidden } = this.props;
    return `
    @media (max-width: ${xs}px) {
            position: ${position};
            display: ${hidden ? "none" : "block"};
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10000;
            border-radius: 0;
            border: none;
            visibility: ${hidden ? "hidden" : "visible"};
            padding: ${spacing.m};
            overflow-y: hidden !important;
            box-shadow: 0 7px 16px 0 rgba(84, 89, 94, 0.91);
            ${
              isOpen
                ? `top: 0; padding: 0; display:flex; flex-direction:column;`
                : `display:flex;align-items:center;`
            };
          }
    `;
  };
  render() {
    const { isOpen } = this.state;
    const {
      type,
      sections = [],
      start,
      end,
      price,
      breakdownPrice,
      position = "fixed",
      hidden,
      buttonText = "Place Request",
      showProceedButton = true,
      showBreakdown = false,
      showMobile = true
    } = this.props;
    // const buttonText = `${type === "schedule" ? "Place" : "Complete"} Request`;
    const breakdownDisplay =
      start && end ? <LessonDurationComponent start={start} end={end} /> : null;
    return (
      <Div
        className={this.props.className}
        css={`
          border: 1px solid ${color.gray.ui_03};
          ${
            showMobile
              ? `
          margin: 48px 16px 0 !important;
          `
              : `margin: 48px 0 !important;`
          }
          padding: ${spacing.l};
          border-radius: ${spacing.xs};
          background: ${color.white};
          ${showMobile ? this.mobileCss() : ""}
        `}
      >
        {isOpen && showMobile ? (
          <Media
            query={`(max-width: ${xs}px)`}
            render={() => (
              <Div
                className="breakdown-section"
                css={`
                  padding: ${spacing.m};
                  border-bottom: 1px solid ${color.gray.ui_03};
                  margin-bottom: ${spacing.m};
                  text-align: center;

                  button {
                    height: 28px;
                    width: 42px;
                  }
                `}
              >
                <Heading small>Breakdown</Heading>
                <CloseButton onClick={this.toggleModal}>
                  <Icon
                    name="close"
                    {...{ fill: color.gray.darker, width: "16" }}
                  />
                </CloseButton>
              </Div>
            )}
          />
        ) : null}
        {this.props.is_per_hour ? null : (
          <BigSummary
            heading={this.props.priceHeading}
            isOpen={isOpen}
            showMobile={showMobile}
            price={price}
            noPadding={!showProceedButton}
            onClick={this.toggleModal}
            per_hour={this.props.is_per_hour}
          />
        )}

        {showMobile ? (
          showProceedButton ? (
            <Media query={`(max-width: ${xs}px)`}>
              {matches =>
                matches ? (isOpen ? breakdownDisplay : null) : breakdownDisplay
              }
            </Media>
          ) : null
        ) : (
          breakdownDisplay
        )}
        {sections.map((segment, index) => {
          if (segment.length > 0) {
            return (
              <RequestDetail
                key={index}
                data={segment}
                isOpen={isOpen}
                showMobile={showMobile}
                noBorder={index === sections.length - 1}
              />
            );
          }
          return null;
        })}
        {this.props.func ? this.props.func() : this.defaultProceedButton()}

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
              & > p {
                padding-left: ${spacing.m};
                ${font_used.small_body};
              }
            `}
          >
            <Icon name="fancyIcon" />
            <Text>Highly qualified tutors guaranteed for your request</Text>
          </Div>
        ) : null}

        {showBreakdown && (
          <Media query={`(max-width: ${xs}px)`}>
            {matches => {
              let component = (
                <PriceBreakdownComponent
                  bgColor={color.green.faint}
                  border={`2px dashed ${color.green.disabled}`}
                  className="price-breakdown-component"
                >
                  <div className="left-section">
                    <HelpTipComponent
                      direction="left"
                      text="You'll earn"
                      helpTipText="This is the estimated amount you'll receive after service
                      fees"
                    />
                    <Text id="help-text">
                      This is the estimated amount you'll receive after service
                      fees{" "}
                    </Text>
                  </div>
                  <div className="right-section">
                    <Heading className="tutor-amount" small>
                      {breakdownPrice}
                    </Heading>
                  </div>
                </PriceBreakdownComponent>
              );
              return matches ? isOpen && component : component;
            }}
          </Media>
        )}
      </Div>
    );
  }
}
