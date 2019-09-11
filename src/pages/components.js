import React from "react";
import styled, { css } from "styled-components";
import Icon from "../simple/Icon";
import CloseButton from "../simple/CloseButton";
import { Div } from "../primitives";
import Formset from "../compound/FormsetContainer";
import WizardWrapper from "./WizardWrapper"; //3
import BoardWrap from "./BoardWrap"; //3
import {
  DefaultButton,
  PrimaryButton,
  SuccessButton,
  ButtonWithIcon
} from "../simple/Button";
import { Select as FormSelect, Option, StyledMenu } from "../simple/Select";
import Tooltip, { ApplicationTooltip } from "../simple/Tooltip";
import FormComponent from "../simple/FormComponent";
import { Radio, Checkbox } from "../simple/CheckInput";
import ErrorBlock from "../simple/ErrorBlock";
import SpecialColumn from "../layout/SpecialColumn";
import genericTestStyle from "../layout/ContentStyle";
import FormInput from "../simple/Input";
import { NoticeAction } from "../simple/ImageNotice";
import { InputAddon } from "../simple/InputAddon";
import AutoSelect from "../simple/AutoSelect";
import GraphqlAutoSuggest from "../simple/AutoSelect";
import Notification, { StyledNotification } from "../simple/Notification";
import globals, { spacing, font_used, resetStyling, xs } from "../siteStyle";
import Flag from "../simple/Flag";
export {
  DropdownComponent,
  InputComponent,
  RadioComponent,
  TextareaComponent,
  UploadComponent,
  CountryComponent,
  MultiselectComponent,
  SearchInputComponent
} from "../form";
export { PrimaryBadge } from "../simple/Badge";
export { Text, Heading } from "../simple/Text";
export { Div } from "../primitives";
export {
  ApplicationTooltip,
  Tooltip,
  CloseButton,
  DefaultButton,
  PrimaryButton,
  Formset,
  StyledNotification,
  Icon,
  Notification,
  WizardWrapper,
  BoardWrap,
  FormComponent,
  Radio,
  Checkbox,
  SpecialColumn,
  ErrorBlock,
  FormSelect,
  Option,
  StyledMenu,
  FormInput,
  NoticeAction,
  xs,
  globals,
  spacing,
  resetStyling,
  InputAddon,
  AutoSelect,
  GraphqlAutoSuggest,
  SuccessButton,
  ButtonWithIcon,
  Flag,
  genericTestStyle
};

// export { RadioComponent, DropdownComponent, InputComponent, TextareaComponent };
export const FormColumn = styled.div`
  /* margin-top: ${props => props.marginTop || spacing.xxl}; */
  @media (max-width: ${xs}px) {
    margin-top: ${spacing.l};
  }
  ${props =>
    props.full_width
      ? ""
      : `
  @media (min-width: ${xs + 1}px) {
    max-width: 620px;
  }
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: ${xs + 1}px) {
    max-width: 620px;
  }
  `};
  ${props =>
    css`
      ${props.css};
    `};
`;

const elements = resetStyling;
const { siteText } = globals;

export const Div2 = ({ children, newWidth = xs }) => (
  <Div
    css={`
      position: absolute;
      right: 0;
      top: 0;
      width: 300px;
      svg:last-of-type {
        margin-top: 16px;
      }
      @media (max-width: ${newWidth}px) {
        display: none;
      }
    `}
  >
    {children}
  </Div>
);
export const Content = styled.div`
  margin-top: ${spacing.xxl};
  @media (max-width: ${xs}px) {
    margin-top: ${spacing.xl};
  }
  // display: flex;
  ${siteText} & h2 {
    // color: #484848;
    // margin-top: 0;
    // margin-bottom: 0;
  }
  & p {
    // font-size: 15px;
    // line-height: 22px;
    // margin-top: 0;
    // margin-bottom: 13px;
  }
  ${props => props.extraStyle};
`;

export const Footer = styled.div`
  align-items: center;
  position: sticky;
  z-index: 1000;
  padding: 16px 16vw;
  bottom: 0;
  margin-top: 40px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row-reverse;
  & ${DefaultButton} {
    margin-right: 32px;
  }
  & ${PrimaryButton} {
    font-size: 17px;
    line-height: 22px;
    padding-left: 0;
  }
  @media (max-width: ${xs}px) {
    margin-top: 0;
    padding: 0;
    height: auto;
    // margin-left: -15px;
    // margin-right: -15px;
    & ${PrimaryButton} {
      display: block;
      width: 100%;
    }
  }
  ${props =>
    css`
      ${props.css};
    `};
`;
