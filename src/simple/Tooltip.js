import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import Media from "react-media";
import { LinkedinButton } from "./Button";
import { spacing } from "../siteStyle";
import { Heading } from "./Text";
const CloseButton = styled.button`
  position: absolute;
  right: 16.23px;
  top: 17px;
  border: none;
  background-color: transparent;
  & i {
    font-size: 12px;
    font-weight: 300;
    line-height: 12px;
    color: inherit;
  }
`;
const Tooltip = styled.div`
  border: 1px solid #ececec;
  border-radius: 3px;
  background-color: ${props => (props.bgColor ? props.bgColor : "#FFFFFF")};
  padding: ${spacing.l};
  position: relative;
  & .justify {
    text-align: justify;
    display: inline-block;
  }
  @media (max-width: 1024px) {
    border: 0;
    background: none;
  }
  // change for > to target all i's
  & i,
  svg {
    margin-bottom: 11px;
    color: #00a699;
    font-size: 35px;
    font-weight: 500;
    line-height: 38px;
    text-align: center;
    border: ${props => (props.border ? props.border : "none")};
  }
  & h3 {
    color: #3d464d;
    font-family: "Circular Bold";
    font-size: 17px;
    font-weight: 300;
    line-height: 24px;
    margin-top: 0;
    margin-bottom: 5px;
  }

  ${props => props.stylings};
`;
export const Summary = styled.div`
  color: #777777;
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  & br {
    margin-bottom: 5px;
    + span {
      display: inline-block;
      margin-top: 15px;
      font-weight: 30px;
    }
  }
  & > h3 {
    padding-top: 5px;
    color: #3d464d;
    font-size: 26px !important;
    font-weight: bold !important;
    line-height: 33px !important;
    margin-bottom: 0 !important;
    & i {
      color: #777777;
      font-size: 13px;
      line-height: 13px;
      padding-left: 6.16px;
      margin-bottom: 0px;
      vertical-align: middle;
    }
  }
  & > p {
    color: #777777;
    margin-bottom: 20px;
    &.last {
      margin-bottom: 0;
    }
    & a {
      color: #0064e6;
      &:hover {
        text-decoration: none;
        cursor: pointer;
        color: #0064e6;
      }
    }
  }
  & .asterick {
    color: red;
  }
`;

const SpecialSpan = styled.div`
  margin-left: 21px;
  font-size: 14px;
  line-height: 18px;
  width: 75%;
`;
export const Tooltip2 = ({
  children,
  icon,
  cover,
  defaultIcon,
  stylings = "",
  closeButton = false,
  ...rest
}) => (
  <Tooltip
    stylings={css`
      ${stylings};
    `}
    {...rest}
  >
    {closeButton ? (
      <CloseButton type="button" class="close" aria-label="Close">
        <span aria-hidden="true">
          <Icon name="close" />
        </span>
      </CloseButton>
    ) : null}
    <Media query={`(max-width: 1024px)`}>
      {matches =>
        matches ? (
          <div>
            <div style={{ display: "flex" }}>
              {!defaultIcon ? <Icon name={icon} /> : null}
              <SpecialSpan>{cover}</SpecialSpan>
            </div>
            {children}
          </div>
        ) : (
          <div>
            {!defaultIcon ? <Icon name={icon} /> : null}
            {children}
          </div>
        )
      }
    </Media>
  </Tooltip>
);
export const ApplicationTooltip = ({
  heading,
  children,
  extra = [],
  defaultIcon,
  hasLinkedinButton = false,
  ...rest
}) => (
  <Tooltip2 defaultIcon={defaultIcon} icon="lightbulb-o" {...rest}>
    <Heading
      small
      css={`
        font-size: 16px !important;
        letter-spacing: 0;
      `}
    >
      {heading}
    </Heading>
    <Summary>{children}</Summary>
    {hasLinkedinButton ? (
      <LinkedinButton style={{ marginTop: 15, fontSize: 14 }}>
        Import from LinkedIn{" "}
      </LinkedinButton>
    ) : null}
    {extra}
  </Tooltip2>
);
export default Tooltip;
