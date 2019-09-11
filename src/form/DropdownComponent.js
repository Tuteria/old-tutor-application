import React from "react";
import find from "lodash/find";
import { Select, Option } from "../simple/Select";
import FormComponent from "../simple/FormComponent";
import { InputAddonWrapper } from "./InputAddonWrapper";
import SFlag from "../simple/Flag";
import { FormValidationContext } from ".";
export const DropdownComponent = ({
  value,
  defaultText = "Select",
  onChange,
  uncontrolled = false,
  addonComponent,
  output,
  options = [],
  height,
  styledButtonCss,
  direction = "up",
  // direction = "down",
  top = "-200px",
  field_name = "",
  closeOnSelection = true,
  OptionComponent,
  multiple = false,
  values = [],
  transform = false,
  id,
  ...rest
}) => {
  // let transformedOptions = options.map(x => {
  //   if (typeof x === "string") {
  //     return { text: x, value: x };
  //   }
  //   return x;
  // });
  let transformedOptions = transform
    ? options
    : options.map(
        x =>
          (!!x.value || x.value === 0) && !!x.text ? x : { text: x, value: x }
      );
  let defaultOutput = result => {
    if (!!result || result === 0) {
      const finder = find(
        transformedOptions,
        x => x.value.toString() === result.toString()
      );
      return !!finder ? finder.text : finder;
    }
    return "";
  };
  const { errorStyle = "margin-top: 8px !important;", ...others } = rest;
  let optionRender = OptionComponent || (
    <OptionsList defaultText={defaultText} options={transformedOptions} />
  );
  return (
    <FormValidationContext.Consumer>
      {({ onSuccess, onError, errors }) => {
        const error = onError(field_name) || !!rest.error;
        return (
          <FormComponent
            success={onSuccess(field_name)}
            error={error}
            error_message={errors[field_name]}
            errorStyle={errorStyle}
            {...others}
          >
            <InputAddonWrapper error={error} addonComponent={addonComponent}>
              <Select
                defaultText={defaultText}
                className="select"
                noColumn
                direction={direction}
                height={height}
                styledButtonCss={styledButtonCss}
                top={top}
                uncontrolled={Boolean(uncontrolled)}
                value={value}
                error={onError(field_name) || rest.error}
                onChange={onChange}
                output={output || defaultOutput}
                closeOnSelection={closeOnSelection}
                multiple={multiple}
                values={values}
                id={id}
              >
                {optionRender}
                {/* <Option value={null}>{defaultText}</Option>
                {transformedOptions.map((option, index) => (
                  <Option key={index} value={option.value}>
                    {option.text}
                  </Option>
                ))} */}
              </Select>
            </InputAddonWrapper>
          </FormComponent>
        );
      }}
    </FormValidationContext.Consumer>
  );
};
const OptionsList = ({ defaultText, options }) => {
  return (
    <React.Fragment>
      {Boolean(defaultText.text) ? null : (
        <Option value={null}>{defaultText}</Option>
      )}
      {options.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.text}
        </Option>
      ))}
    </React.Fragment>
  );
};
export const CountryComponent = ({
  label = "Country",
  onChange,
  countries,
  value,
  field_name = "country",
  ...rest
}) => (
  <DropdownComponent
    label={label}
    field_name={field_name}
    onChange={onChange}
    defaultText="Select Country"
    value={value}
    addonComponent={<SFlag name={value} />}
    options={countries.map(x => ({ text: x.text, value: x.locale }))}
    {...rest}
  />
);
