import React from "react";

import { Navigation } from "./Navigation";
import { css } from "styled-components";
import { Tab, TabItem } from "./Tabs";
import { xs } from "../siteStyle";
import { NumberIcon } from "../simple/Icon";
import { NavigationItem } from "./NavigationItem";
import { brand_color } from "../design-systems";
export { NavigationItem } from "./NavigationItem";
export const ApplicationStepTabs = ({
  tabs,
  transform = text => text,
  activeCondition
}) => (
  <Tab component={Navigation}>
    {tabs.filter(x => x.display && x.text).map((step, index) => {
      const isActive = activeCondition(step);
      return (
        <NavigationItem
          key={"nav " + index}
          active={isActive}
          completed={step.completed || isActive}
          to={step.url}
        >
          {transform(step.text)}
          {/* {step.text} */}
        </NavigationItem>
      );
    })}
  </Tab>
);

const tabStyle = css`
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  justify-content: center;
  & ${TabItem}.tab {
    color: #767676;
    padding: 20px 25px 10px;
    // flex-grow: 1;
    font-size: 16px;
    text-align: left;
    &:first-child {
      padding-left: 0;
    }
  }
  @media (max-width: ${xs}px) {
    display: none;
  }
`;

export class NumberTabs extends React.Component {
  render() {
    const {
      step,
      tabs,
      styling = "",
      left = false,
      number = false,
      bgColor = brand_color.tuteria_blue,
      firstChildPadding = 0,
      fontKind,
      textColor,
      setHeight = false,
      mode = 1
    } = this.props;
    return (
      <Tab
        extraStyle={`
  width: 100%;
  justify-content: ${left ? "left" : "center"};
  & ${TabItem}.tab {
    color: #767676;
    padding: 20px 25px 10px;
    // flex-grow: 1;
    font-size: 16px;
    text-align: left;
    ${setHeight && "height: 70px;"}
    &:first-child {
      padding-left: ${firstChildPadding};
    }
  }
  @media (max-width: ${xs}px) {
    display: none;
  }`}
        css={styling}
      >
        {tabs.map((tab, index) => {
          const isActive = number ? index + 1 <= step : step === index + 1;
          const prev = step > index + 1;
          const icon = index + 1;
          let props = generateProps({
            isActive,
            prev,
            icon,
            number,
            bgColor,
            fontKind,
            textColor
          });
          return (
            <React.Fragment key={index}>
              <TabItem bgColor={bgColor} className="tab" active={isActive}>
                <NumberIcon mode={mode} {...props} />
                <span className={isActive || prev ? "tab-text" : "reg-text"}>
                  {tab}
                </span>
              </TabItem>
            </React.Fragment>
          );
        })}
      </Tab>
    );
  }
}
function generateProps(props) {
  let nProps = {
    no: props.icon,
    styling: "text-align: center; & strong{top: 6px; }",
    bgColor: props.bgColor,
    fontKind: props.fontKind,
    textColor: props.textColor
  };
  if (props.isActive) {
    if (props.number) {
      return {
        ...nProps,
        force: props.prev,
        active: true
      };
    }
    return { icon: "map-marker", active: true };
  }
  if (props.prev) {
    if (props.number) {
      return { ...nProps, active: true };
    }
    return { icon: "check", active: true };
  }
  return nProps;
}
