import React from "react";
import FormGroup from "./FormGroup";
import styled from "styled-components";
import ErrorBlock from "./ErrorBlock";
import { form_label_text } from "../siteStyle";
export const Label = styled.label`
  ${form_label_text};
`;
const FormComponent = ({
  noColumn = false,
  success = false,
  showIcon = false,
  error = false,
  LabelRightNode,
  errorStyle = "",
  label,
  children,
  error_message,
  className = "",
  errorMarginTop = 10,
  labelStyle = {},
  ...rest
}) => {
  let attributes = {
    error,
    success,
    showIcon,
    className,
    ...rest
  };
  if (noColumn) {
    attributes = { ...attributes, noColumn };
  }
  const LabelSection = LabelRightNode ? (
    [
      <label key="label**" style={{ ...labelStyle, display: "inline-block" }}>
        {label}
      </label>,
      <LabelRightNode key="hwes" />
    ]
  ) : (
    <label key="label**" style={{ ...labelStyle, display: "inline-block" }}>
      {label}
    </label>
  );

  return (
    <FormGroup {...attributes}>
      {label ? LabelSection : null}
      {children}
      {error ? (
        <ErrorBlock overide={errorStyle}>{error_message}</ErrorBlock>
      ) : null}
    </FormGroup>
  );
};

export default FormComponent;
