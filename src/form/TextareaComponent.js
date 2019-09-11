import React from "react";
import WordCounterComponent from "../compound/WordCounterComponent";
import TextArea from "../simple/TextArea";
import { FormValidationContext } from ".";

export const TextareaComponent = ({
  rows = 4,
  placeholder,
  customOnChange = () => {},
  ...rest
}) => {
  const {
    readOnly = false,
    disabled = false,
    field_name = "",
    errorStyle = "margin-top: 8px !important;",
    ...others
  } = rest;
  return (
    <FormValidationContext.Consumer>
      {({ onError, onSuccess, errors, updateField }) => {
        return (
          <WordCounterComponent
            error={onError(field_name) || rest.error}
            success={onSuccess(field_name)}
            error_message={errors[field_name]}
            errorStyle={errorStyle}
            {...others}
          >
            {({ onChange, ...cProps }) => (
              <TextArea
                rows={rows}
                onChange={e => {
                  onChange(e);
                  customOnChange(e.target.value);
                }}
                placeholder={placeholder}
                {...cProps}
              />
            )}
          </WordCounterComponent>
        );
      }}
    </FormValidationContext.Consumer>
  );
};
