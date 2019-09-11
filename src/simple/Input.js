import React from "react";
import styled, { css } from "styled-components";
// import {glamor}
import globals, { xs, form_field } from "../siteStyle";
import Icon from "./Icon";
import { spacing } from "../design-systems/spacing";
const { placeholderColor, formComponentStyle, formTextPaddingLeft } = globals;
function getBorder(props) {
  if (props.error) {
    return "2px solid #E9411B";
  }
  return "1px solid #C9CACD";
}
export const styling = css`
  /* ${formComponentStyle} 
  border: ${props => getBorder(props)}; */
  box-sizing: border-box;
  width: ${props => (props.width ? props.width : 100)}%;
  @media (max-width: ${xs}px) {
    width: -webkit-fill-available;
  }
  &::placeholder {
    color: ${placeholderColor};
  }
  /* &:disabled,
  &:hover {
    ${form_field.hover};
  } */
  /* &:focus {
    ${form_field.active};
  } */
  & + i {
    margin-bottom: 16px;
    margin-right: 9px;
    bottom: 0;
    margin-top: 17px;
  }

  &.add-on__input {
    border: 0;
    border-radius: 0;
    border-left: 1px solid #dce0e0;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  width: -webkit-fill-available;
`;
const Input = styled.input`
 :focus{
   outline:none;
 }
 ${props =>
   props.small
     ? `padding-top: ${spacing.s} !important; padding-bottom: ${
         spacing.s
       } !important;`
     : ``}
 ${props => props.inputCss}
  /* ${styling}; */
`;
export const CompactInput = styled(Input)`
  & ~ i {
    margin-top: 13px;
  }
  padding: 9px ${formTextPaddingLeft}px;
`;
const Div = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 0;
    padding: ${spacing.inset.right_icon};
  }
`;
export const InputWithIcon = ({ icon_name, ...rest }) => (
  <Div>
    <Input {...rest} />
    {icon_name ? <Icon name={icon_name} /> : null}
  </Div>
);
export default Input;
