import React from "react";
import { Checkbox } from "../simple/CheckInput";
import FormComponent from "../simple/FormComponent";

export const CheckboxComponent = ({
  checked = false,
  onChange = e => {},
  children,
  text,
  big,
  checkboxCss = ``,
  ...rest
}) => (
  <FormComponent
    css={`
      label {
        span {
          padding-top: 0;
        }
      }
    `}
    noColumn
    {...rest}
  >
    <Checkbox
      checked={checked}
      innerColor="#36B37E"
      border="transparent"
      value={rest.value}
      checkSize={big ? `` : `height: 16px; width: 16px;`}
      checkStyle={
        big
          ? `    left: 8px;
    top: 2px;
    width: 6px;
    height: 14px;`
          : `left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;`
      }
      textStyle={
        big ? undefined : `color:#484848;font-size: 0.9rem; padding-top: 0;`
      }
      customTextStyle={checkboxCss}
      onChange={onChange}
      text={text}
    />
    {children}
  </FormComponent>
);
