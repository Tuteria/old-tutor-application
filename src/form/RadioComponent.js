import React from "react";
import styled from "styled-components";
import { Radio } from "../simple/CheckInput";
import FormComponent from "../simple/FormComponent";
import { spacing } from "../siteStyle";
import { FormValidationContext } from ".";

const RadioButton = styled.div`
  display: inline-block;
  & label {
    margin-right: 16px;
    & .control__indicator:checked {
      border: 2px solid #ffffff;
    }
  }
`;
export const RadioButtonContainer = RadioButton.extend`
  display: block;
  ${props =>
    props.inline ? `display: inline-block; margin-left: ${spacing.m}` : ""};
`;

export class RadioComponent extends React.Component {
  state = {
    value: this.props.value
  };
  onChange = e => {
    const value = e.target.value;
    const checked = e.target.checked;
    this.setState({ value: value });
    this.props.onChange(value, checked);
  };
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.value === false) {
      if (this.state.value === "Yes") {
        this.props.onChange(this.state.value, true);
      }
    }
  }
  isChecked = value => {
    const { isChecked } = this.props;
    if (!!isChecked) {
      return isChecked(value);
    }
    return this.state.value === value;
  };
  render() {
    const {
      options = [],
      inline = false,
      onChange,
      name,
      field_name = "",
      ...rest
    } = this.props;
    return (
      <FormValidationContext.Consumer>
        {({ onError, onSuccess, errors }) => {
          return (
            <FormComponent
              success={onSuccess(field_name)}
              error_message={errors[field_name]}
              error={onError(field_name)}
              errorStyle="margin-top: 0!important;"
              {...rest}
            >
              <RadioButtonContainer inline={inline}>
                {options.map((option, index) => {
                  const text = !!option.text ? option.text : option;
                  const subtext = !!option.subtext ? option.subtext : null;
                  const value = !!option.value ? option.value : option;

                  return (
                    <Radio
                      key={`${name} ${index}`}
                      innerColor="#36B37E"
                      onChange={this.onChange}
                      text={text}
                      name={name}
                      value={value}
                      subtext={subtext}
                      checked={this.isChecked(value)}
                    />
                  );
                })}
              </RadioButtonContainer>
            </FormComponent>
          );
        }}
      </FormValidationContext.Consumer>
    );
  }
}
