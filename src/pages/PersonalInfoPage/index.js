// @ts-check
import React from "react";
import PhoneNumberSet from "./CountryAndPhoneNumber";
import {
  InputComponent,
  WizardWrapper,
  globals,
  FormColumn
} from "../components";
import { FormContainer } from "../../layout/FormContainer";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import isMobilePhone from "validator/lib/isMobilePhone";
import {
  RadioComponent,
  DateWithStateComponent as DDateComponent,
  FormHeading,
  FormValidationProvider
} from "../../form";
import { spacing } from "../../siteStyle";
const { xs } = globals;
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
type Props = {
  data: {
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    dob: string,
    country: string,
    validateField: Function,
    phone_numbers: Array<{
      number: string,
      primary: boolean
    }>
  },
  countries: Array<{
    text: string,
    locale: string,
    code: string
  }>
};

export class PersonalInfoPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      display_error: false
    };
  }
  validateDate(date) {
    return (
      !!date && !isNaN(new Date(date).getTime()) && typeof date === "string"
    );
  }
  localValidation = fields => {
    let stringNotEmpty = [
      "first_name",
      "last_name",
      "email",
      "gender",
      "country"
    ].map(x => {
      return (fields[x] || "").length > 0;
    });
    let valideDate = this.validateDate(fields.dob);
    let validPhoneNumbers = (fields.phone_numbers || []).map(x => {
      return isMobilePhone(x.number, "en-NG");
    });
    let singlePhoneNumber = (fields.phone_numbers || []).length > 0;
    return [
      ...stringNotEmpty,
      valideDate,
      ...validPhoneNumbers,
      singlePhoneNumber
    ].reduce((p, c) => p && c, true);
  };
  validateForm = fields => {
    const { localValidation = this.localValidation } = this.props;
    let validationResult = localValidation(fields);
    return validationResult;
  };

  render() {
    const {
      countries,
      data,
      title = "Step 1: Personal Info",
      progress,
      validateField,
      ...rest
    } = this.props;
    const state = {};
    return (
      <FormContainer
        displayButton={false}
        details={this.props.data}
        customValidation={this.props.customValidation || this.validateForm}
        submitFormToServer={this.props.onSubmit}
        resetError={false}
        loading={this.props.loading}
        {...rest}
      >
        {(data, updateFields, onSubmitForm, ...others) => {
          const { fields, validate, errors } = data;
          const state = !!fields.gender ? fields : { ...fields, gender: "M" };
          return (
            <FormValidationProvider
              {...{
                onError: key => {
                  return validate && !validateField(state, key, errors);
                },
                onSuccess: key => validate && validateField(state, key, errors),
                errors
              }}
            >
              <WizardWrapper
                nextButtonText="Next"
                goToNextScreen={onSubmitForm}
                loading={this.props.loading}
                showPreviousScreen={false}
                showNextScreen={false}
                title={title}
                section={this.props.section}
                fetchNextPage={() => {}}
              >
                <FormColumn>
                  <FormHeading heading="Let's add your personal details">
                    Make sure you enter all details correctly. All your details
                    are safe with us and will never be shared with anyone.
                  </FormHeading>
                  <React.Fragment>
                    <FormFieldsContainer
                      field_name="combined"
                      cssProps={spacing.xl}
                      extraCss={` + div.c-errmessage {
                margin-top: -24px;
              }`}
                    >
                      {["first_name", "last_name"].map((field, index) => (
                        <InputComponent
                          key={index}
                          noColumn
                          errorStyle="margin-top: 0 !important;"
                          label={field
                            .split("_")
                            .map(x => toTitleCase(x))
                            .join(" ")}
                          // showIcon={true}
                          field_name={field}
                          value={state[field]}
                          updateText={val => updateFields(field, val)}
                          placeholder={field
                            .split("_")
                            .map(x => toTitleCase(x))
                            .join(" ")}
                        />
                      ))}
                    </FormFieldsContainer>
                    <InputComponent
                      label="Email Address"
                      disabled={
                        true // error_message={errors[field]} // showIcon={true}
                      }
                      css={`
                        margin-bottom: ${spacing.xl};
                      `}
                      errorStyle="margin-top: 8px !important;"
                      error={false}
                      value={state.email}
                      placeholder="Email Address"
                    />
                    <RadioComponent
                      label="Gender"
                      inline
                      errorStyle="margin-top: 8px !important;"
                      value={state.gender}
                      field_name="gender"
                      onChange={val => updateFields("gender", val)}
                      css={`
                        margin-bottom: ${spacing.xl};
                      `}
                      options={[
                        { value: "M", text: "Male" },
                        { value: "F", text: "Female" }
                      ]}
                    />
                    <DDateComponent
                      onChange={val => {
                        updateFields("dob", val);
                      }}
                      field_name="dob"
                      value={state.dob}
                      cssProps={spacing.xl}
                      label="Birth Date"
                      extraCss={` + div.c-errmessage {
                margin-top: -16px;
              }`}
                    />

                    <PhoneNumberSet
                      errorMessageForField={() => {
                        return [];
                      }}
                      fieldHasError={() => {
                        return true;
                      }}
                      customErrorMessages={() => {}}
                      countries={this.props.countries}
                      display_error={this.state.display_error}
                      value={{
                        country: state.country,
                        phone_numbers: state.phone_numbers
                      }}
                      whereYouHeardOptions={this.props.whereYouHeardOptions}
                      updateGlobalData={data22 => {
                        others.slice(-1)[0](data22);
                        // updateFields("country", data22.country);
                        // updateFields("phone_numbers", data22.phone_numbers);
                      }}
                    />
                  </React.Fragment>
                </FormColumn>
                {/* <LinkedinImport /> */}
              </WizardWrapper>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export default PersonalInfoPage;
