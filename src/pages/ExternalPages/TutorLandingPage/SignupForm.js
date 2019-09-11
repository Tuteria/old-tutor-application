// @flow
import React from "react";
import FormComponent from "../../../simple/FormGroup";
import { FormFieldsContainer } from "../../../layout/SpecialColumn";
import { color, spacing } from "../../../siteStyle";
import {
  InputComponent,
  DateComponent,
  FormValidationProvider
} from "../../../form";
import { Div } from "../../../primitives/index";
import { FormContainer } from "../../../layout/FormContainer";
import { Text, ButtonWithIcon } from "../../components";

export class SignupForm extends React.Component {
  state = {
    showError: false
  };
  render() {
    return (
      <FormContainer
        button_text="Start Teaching Now"
        details={this.props.details}
        errors={this.props.errors}
        defaultValidation={false}
        submitFormToServer={this.props.saveUser}
        customValidation={(fields, errors) => {
          let stringNotEmpty = [
            "first_name",
            "last_name",
            "email",
            "password"
          ].map(x => (fields[x] || "").length > 0);
          return [
            ...stringNotEmpty,
            Object.keys(fields.dob || {}).length === 3
          ].reduce((p, c) => p && c, true);
        }}
        render={() => (
          <Text
            css={`
              text-align: center;
              font-size: 14px !important;
              & a {
                color: ${color.blue.primary};
                cursor: pointer;
                text-decoration: none;
              }
            `}
          >
            By signing up, you agree to Tuteria's tutoring{" "}
            <a target="_blank" href={this.props.terms}>
              terms
            </a>{" "}
            and{" "}
            <a target="_blank" href={this.props.policies}>
              policies
            </a>
          </Text>
        )}
      >
        {(data, updateFields) => {
          const { fields, validate, errors } = data;
          const state = fields;
          return (
            <FormValidationProvider
              onError={key =>
                validate &&
                !this.props.customValidation(
                  state,
                  key,
                  errors,
                  this.state.showError
                )
              }
              onSuccess={key =>
                validate &&
                this.props.customValidation(
                  state,
                  key,
                  errors,
                  this.state.showError
                )
              }
              errors={errors}
            >
              <Div>
                <FormFieldsContainer
                  // condition={
                  //   validate && (!!errors.first_name || !!errors.last_name)
                  // }
                  // custom_error_message={errors.combined}
                  cssProps={spacing.m}
                  field_name="combined"
                >
                  <InputComponent
                    type="text"
                    noColumn
                    field_name="first_name"
                    // error={validate && !!errors.first_name}
                    // error_message={errors.first_name}
                    onChange={e => {
                      let result = e;
                      if (Boolean(e.target)) {
                        result = e.target.value.trim();
                      }
                      updateFields("first_name", result.trim());
                    }}
                    value={state.first_name}
                    placeholder="First Name"
                  />
                  <InputComponent
                    noColumn
                    field_name="last_name"
                    // error_message={errors.last_name}
                    value={state.last_name}
                    // error={validate && !!errors.last_name}
                    onChange={e => {
                      let result = e;
                      if (Boolean(e.target)) {
                        result = e.target.value.trim();
                      }
                      updateFields("last_name", result.trim());
                    }}
                    type="text"
                    placeholder="Last Name"
                  />
                </FormFieldsContainer>
                <InputComponent
                  css={`
                    .error {
                      margin-bottom: 16px;
                    }
                  `}
                  field_name="email"
                  value={state.email}
                  type="email"
                  // error={validate && !!errors.email}
                  // error_message={errors.email}
                  onChange={e => {
                    let result = e;
                    if (Boolean(e.target)) {
                      result = e.target.value.trim();
                    }
                    updateFields("email", result.trim());
                  }}
                  placeholder="Email Address"
                  style={{ marginBottom: 16 }}
                />
                <InputComponent
                  css={`
                    .error {
                      margin-bottom: 16px;
                    }
                  `}
                  field_name="password"
                  value={state.password}
                  type="password"
                  onChange={e => {
                    let result = e;
                    if (Boolean(e.target)) {
                      result = e.target.value.trim();
                    }
                    updateFields("password", result.trim());
                  }}
                  // error={validate && !!errors.password}
                  // error_message={errors.password}
                  placeholder="Create Password"
                  style={{ marginBottom: 16 }}
                />
                <DateComponent
                  updateDate={(val, text) => {
                    updateFields("dob", {
                      ...state.dob,
                      [text]: val
                    });
                  }}
                  // errors={errors}
                  // error_message={errors.dob}
                  dob={state.dob || {}}
                  // condition={
                  //   !!errors.dob ||
                  //   !!errors.day ||
                  //   !!errors.month ||
                  //   !!errors.year
                  // }
                  field_name="dob"
                  direction="up"
                  style={{ marginBottom: 16 }}
                  textCss={`display: inline-block; margin-left: 10px;`}
                  label="Birthday"
                  metaLabel="(To sign up, you must be 18 or older.)"
                />
                {/* <CheckboxComponent
                checked={state.confirm}
                onChange={() => updateFields("confirm", !state.confirm)}
                text="I’d like to receive marketing and policy communication from Tuteria and it’s partners."
                style={{ marginBottom: 16 }}
              /> */}
              </Div>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export class ResetPasswordForm extends React.Component {
  render() {
    return (
      <FormContainer
        buttonProps={this.props.buttonProps}
        buttonStyle={`
        display:flex;
        flex-direction: row-reverse;
        justify-content: space-between;`}
        button_text="Send Reset Link"
        customValidation={fields => {
          let stringNotEmpty = ["email"].map(x => (fields[x] || "").length > 0);
          return [...stringNotEmpty].reduce((p, c) => p && c, true);
        }}
        render={() => (
          <ButtonWithIcon
            icon="chevron-left"
            outline
            regular
            top="15px"
            onClick={this.props.secondaryAction}
            iconStyle={{ width: "16px", height: "16px" }}
            {...this.props.buttonProps}
          >
            Back to Login
          </ButtonWithIcon>
        )}
        defaultValidation={false}
        submitFormToServer={this.props.resetPasswordAction}
        errors={this.props.errors || { email: "This field is required" }}
        details={{ email: "" }}
      >
        {({ fields, validate, errors }, updateFields) => {
          const state = fields;

          return (
            <FormValidationProvider
              {...{
                onError: key => {
                  return (
                    validate && !this.props.customValidation(state, key, errors)
                  );
                },
                onSuccess: key =>
                  validate && this.props.customValidation(state, key, errors),
                errors
              }}
            >
              <InputComponent
                type="text"
                field_name="email"
                value={
                  state.email // error_message={errors.email} // label="Email Address" // error={validate && !!errors.email}
                }
                placeholder="Email Address"
                style={{ marginBottom: 24 }}
                css={`
                  .error {
                    margin-bottom: 16px;
                  }
                `}
                onChange={e => {
                  let result = e;
                  if (Boolean(e.target)) {
                    result = e.target.value.trim();
                  }
                  updateFields("email", result.trim());
                }}
              />
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export class LoginForm extends React.Component {
  render() {
    return (
      <FormContainer
        button_text="Log in"
        buttonStyle={`margin-top: 8px;`}
        details={{ ...(this.props.details || {}), passwordDisplay: false }}
        errors={this.props.errors}
        defaultValidation={false}
        submitFormToServer={this.props.saveUser}
        render={() => null}
        customValidation={fields => {
          let stringNotEmpty = ["email", "password"].map(
            x => (fields[x] || "").length > 0
          );
          return [...stringNotEmpty].reduce((p, c) => p && c, true);
        }}
        css={`
          a {
            color: #007af6;
            cursor: pointer;
            font-size: 15px;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
          & .password-toggle {
            float: right;
          }
          & button {
            margin-top: 10px;
          }
        `}
      >
        {({ fields, validate, errors }, updateFields) => {
          const state = fields;
          return (
            <FormValidationProvider
              {...{
                onError: key => {
                  return (
                    validate && !this.props.customValidation(state, key, errors)
                  );
                },
                onSuccess: key =>
                  validate && this.props.customValidation(state, key, errors),
                errors
              }}
            >
              <Div>
                <InputComponent // label="Email Address"
                  type="text"
                  field_name="email" // error={validate && !!errors.email}
                  // error_message={errors.email}
                  value={state.email}
                  placeholder="Email Address"
                  style={{ marginBottom: 16 }}
                  css={`
                    .error {
                      margin-bottom: 16px;
                    }
                  `}
                  onChange={e => {
                    let result = e;
                    if (Boolean(e.target)) {
                      result = e.target.value.trim();
                    }
                    updateFields("email", result.trim());
                  }}
                />
                <InputComponent // label="Password"
                  style={{ marginBottom: 16 }}
                  css={`
                    .error {
                      margin-bottom: 16px;
                    }
                  `}
                  field_name="password"
                  value={state.password} // error={validate && !!errors.password}
                  // error_message={errors.password}
                  type={state.passwordDisplay ? "text" : "password"}
                  placeholder="Password"
                  onChange={e => {
                    let result = e;
                    if (Boolean(e.target)) {
                      result = e.target.value.trim();
                    }
                    updateFields("password", result.trim());
                  }}
                />
                <FormComponent
                  css={`
                    margin-top: -8px;
                    margin-bottom: 16px;
                  `}
                  noColumn
                >
                  <a
                    href="#"
                    className=""
                    onClick={this.props.toggleResetPassword}
                  >
                    I forgot my password
                  </a>
                  {/* <a
                  onClick={() => {
                    updateFields("passwordDisplay", !state.passwordDisplay);
                  }}
                  className="password-toggle"
                >
                  {state.passwordDisplay ? "Hide" : "Show"} Password
                </a> */}
                </FormComponent>
              </Div>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}
