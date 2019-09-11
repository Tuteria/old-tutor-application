import React from "react";
import WordCounterComponent from "../compound/WordCounterComponent";
import Input from "../simple/Input";
import { InputAddonWrapper } from "./InputAddonWrapper";
import { FormValidationContext } from ".";
export const InputComponent = ({
  placeholder,
  addonComponent,
  addonProps = {},
  style = {},
  type = "text",
  extraInputParams = {},
  inputCss,
  small = false,
  innerRef,
  onClick,
  children,
  onMouseOut = () => {},
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
            {cProps => {
              return (
                <InputAddonWrapper
                  {...addonProps}
                  addonComponent={addonComponent}
                >
                  {children ? (
                    children
                  ) : (
                    <Input
                      innerRef={innerRef}
                      onClick={onClick}
                      type={type}
                      style={style}
                      placeholder={placeholder}
                      readOnly={readOnly}
                      disabled={disabled}
                      inputCss={inputCss}
                      {...extraInputParams}
                      {...cProps}
                      onBlur={rest.onBlur || cProps.onBlur}
                      onMouseOut={onMouseOut}
                    />
                  )}
                </InputAddonWrapper>
              );
            }}
          </WordCounterComponent>
        );
      }}
    </FormValidationContext.Consumer>
  );
};
export class PhoneNumberComponent extends React.Component {
  render() {
    const {
      label,
      instance,
      countryCode,
      value,
      updateText,
      placeholder = "080732322323",
      ...rest
    } = this.props;
    return (
      <InputComponent
        label={label}
        field_name={instance} // showIcon={true}
        className="ind-items"
        addonComponent={<div> {countryCode}</div>}
        errorStyle="margin-top: 0 !important;"
        value={value}
        {...rest}
        updateText={updateText} // onBlur={e => this.updatePhoneNumber(e.target.value, instance)}
        placeholder={placeholder}
      />
    );
  }
}
export { WordCounterComponent };
