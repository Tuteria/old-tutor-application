import React from "react";
import styled, { css } from "styled-components";
import { xs } from "../siteStyle";
import range from "lodash/range";
import { SpecialColumn } from "../layout/index";
import FormComponent from "../simple/FormComponent";
import { Option, Select as FormSelect } from "../simple/Select";
import Media from "react-media";
import { Div } from "../primitives/index";
import { FormFieldsContainer } from "../layout/SpecialColumn";
import { Text } from "../simple/Text";
import { FormValidationContext } from ".";

const rootComponent = [
  {
    options: [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    mobile: "MM",
    key: "month",
    text: "Month"
  },
  { options: range(1, 31), key: "day", text: "Day", mobile: "DD" },
  {
    options: range(1940, new Date().getFullYear() - 13),
    key: "year",
    text: "Year",
    mobile: "YYYY"
  }
];
export const DateComponent = ({
  components = rootComponent,
  label,
  error_message,
  fieldHasError = () => false,
  updateDate,
  dob,
  textCss = "",
  field_name = "",
  direction = "down",
  metaLabel,
  ...rest
}) => {
  const mobile = window.matchMedia(`(max-width: ${xs}px)`);
  const monthIndex = (arr, val) => arr.findIndex(x => x === val);
  return (
    <FormValidationContext.Consumer>
      {({ onError, onSuccess, errors = {} }) => {
        const hasError = field => {
          let result = onError(field) || !!(rest.errors || {})[field];
          return result;
        };
        return (
          <FormFieldsContainer
            field_name={field_name}
            condition={onError(field_name) || !!rest.error}
            custom_error_message={
              errors[field_name] || (rest.errors || {})[field_name]
            }
            childWidth={100}
            {...rest}
          >
            <FormComponent
              label={label}
              error_message={errors[field_name] || error_message}
              // error={onError(field_name) || !!rest.error}
              noColumn
            >
              {metaLabel ? (
                <Text
                  small_body
                  css={`
                    margin-bottom: 8px;
                    color: #484848;
                    ${textCss};
                  `}
                >
                  {metaLabel}
                </Text>
              ) : null}

              <Div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  & .select {
                    width: 32.5%;
                    span {
                      width: 86%;
                      width: -webkit-fill-available;
                      @media (max-width: ${xs}px) {
                        width: 75%;
                        width: -webkit-fill-available;
                      }
                    }
                  }
                `}
              >
                {components.map((component, ind) => {
                  const options = component.options.map((m, index) => (
                    <Option
                      key={`${component.key} ${index}`}
                      value={
                        component.key === "month"
                          ? monthIndex(component.options, m) + 1
                          : m
                      }
                    >
                      <Media query={`(max-width: ${xs}px)`}>
                        {matches =>
                          matches
                            ? typeof m === "string"
                              ? m.slice(0, 3).toUpperCase()
                              : m
                            : m
                        }
                      </Media>
                      {/* {mobile.matches
                   ? typeof m === "string" ? m.slice(0, 3).toUpperCase() : m
                   : m} */}
                    </Option>
                  ));
                  const defaultText = (
                    <Media query={`(max-width: ${xs}px`}>
                      {matches =>
                        matches
                          ? component.mobile
                          : `${component.key[0].toUpperCase()}${component.key.slice(
                              1
                            )}`
                      }
                    </Media>
                  );
                  return (
                    <FormSelect
                      error={hasError(component.key)}
                      key={ind}
                      onChange={val => updateDate(val, component.key)}
                      value={dob[component.key]}
                      direction={direction}
                      top="-315px"
                      className="select"
                      defaultText={defaultText}
                      output={e => {
                        if (component.key === "month" && Number.isInteger(e)) {
                          let value = component.options[e - 1];
                          return mobile.matches
                            ? value.slice(0, 3).toUpperCase()
                            : value;
                        } else {
                          return e;
                        }
                      }}
                      getText={value =>
                        mobile.matches
                          ? typeof value === "string"
                            ? value.slice(0, 3).toUpperCase()
                            : value
                          : value
                      }
                      noColumn
                    >
                      <Option value="">{`${mobile.matches ? "" : ""}${
                        component.text
                      }`}</Option>
                      {options}
                    </FormSelect>
                  );
                })}
              </Div>
            </FormComponent>
          </FormFieldsContainer>
        );
      }}
    </FormValidationContext.Consumer>
  );
};

export class DateWithStateComponent extends React.Component {
  constructor(props) {
    super(props);
    let value = {};
    if (!!this.props.value) {
      let dd = new Date(this.props.value);
      (value.year = dd.getFullYear()),
        (value.month = dd.getMonth() + 1),
        (value.day = dd.getDate());
    }
    this.state = value;
  }
  updateDate = (val, text) => {
    const newState = { ...this.state, [text]: val };
    this.setState(newState);
    this.props.onChange(this.getDateAsString(newState));
  };
  getDateAsString({ day, month, year }) {
    if (!!day && !!month && !!year) {
      return `${year}-${month}-${day}`;
    }
    return { year, month, day };
  }
  render() {
    return (
      <DateComponent
        {...this.props}
        dob={this.state}
        updateDate={this.updateDate}
      />
    );
  }
}
