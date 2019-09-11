import isMobilePhone from 'validator/lib/isMobilePhone';
import React from 'react';
import { isEmpty } from 'lodash';
import {
  InputComponent,
  DropdownComponent,
  PhoneNumberComponent,
  FormValidationProvider,
} from '../../form';
import { ClientPageWrapper } from '../ClientRequestPages/ClientPageWrapper';
import { FormContainer } from '../../layout/FormContainer';
import { FormFieldsContainer } from '../../layout/SpecialColumn';
import { spacing, xs } from '../../siteStyle';
import { RadioComponent } from '../SubjectDetailsPage/question-types';
import { getExamType } from '../../pages/ExamRequestPages';

export class PersonalInfoPage extends React.Component {
  state = {
    display: false,
  };
  localValidation = fields => {
    let stringNotEmpty = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'exam_type',
    ].map(x => {
      return (fields[x] || '').length > 0;
    });
    let validPhoneNumbers =
      Boolean(fields.phone_number) &&
      isMobilePhone(fields.phone_number, 'en-NG');
    return [...stringNotEmpty, ...validPhoneNumbers].reduce(
      (p, c) => p && c,
      true
    );
  };
  validateForm = fields => {
    const { localValidation = this.localValidation } = this.props;
    let validationResult = localValidation(fields);
    return validationResult;
  };
  render() {
    let {
      validateField,
      data,
      showBackButton,
      backAction,
      whereYouHeardOptions,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
      <FormContainer
        displayButton={false}
        details={data}
        customValidation={this.props.customValidation || this.validateForm}
        submitFormToServer={this.props.onSubmit}
        resetError={false}
        loading={this.props.loading}
        {...rest}
      >
        {(data, updateFields, onSubmitForm, ...others) => {
          const { fields, validate, errors } = data;
          const state = fields;
          return (
            <ClientPageWrapper
              showLoadingButton
              heading="Personal Information"
              description="This is used to contact you about your lessons"
              onSubmit={onSubmitForm}
              loading={this.props.loading}
              showBackButton={showBackButton}
              backAction={backAction}
              css={`margin-top: 60px`}
              loadingButtonText="Submit"
            >
              <FormValidationProvider
                {...{
                  onError: key => {
                    return validate && !validateField(state, key, errors);
                  },
                  onSuccess: key =>
                    validate && validateField(state, key, errors),
                  errors,
                }}
              >
                <FormFieldsContainer
                  field_name="combined"
                  cssProps={spacing.xl}
                >
                  <InputComponent
                    small
                    label="First name"
                    field_name={'first_name'}
                    value={state.first_name}
                    onChange={(e, val) => {
                      if (Boolean(e.target)) {
                        updateFields('first_name', e.target.value);
                      }
                      if (Boolean(val)) {
                        updateFields('first_name', val);
                      }
                    }}
                    updateText={val => {
                      if (Boolean(val)) {
                        updateFields('first_name', val);
                      }
                    }}
                  />
                  <InputComponent
                    label="Last name"
                    field_name="last_name"
                    value={state.last_name}
                    updateText={val => updateFields('last_name', val)}
                  />
                </FormFieldsContainer>
                <InputComponent
                  label="Active Email"
                  css={`
                    margin-bottom: ${spacing.xl};
                  `}
                  type="email"
                  field_name="email"
                  value={state.email}
                  updateText={val => updateFields('email', val)}
                />
                <FormFieldsContainer
                  extraCss={` + div.c-errmessage {
                margin-top: -24px;
              }`}
                  cssProps={spacing.xl}
                  field_name="phone_combined"
                >
                  <PhoneNumberComponent
                    label="Phone Number"
                    countryCode="234"
                    type="number"
                    value={state.phone_number}
                    field_name="phone_number"
                    updateText={val => {
                      updateFields('phone_number', val);
                    }}
                  />
                  <DropdownComponent
                    height="49.5px"
                    label="How did you hear about Tuteria"
                    field_name="how_you_heard"
                    value={state.how_you_heard}
                    options={whereYouHeardOptions}
                    onChange={val => {
                      updateFields('how_you_heard', val);
                    }}
                    defaultText="Select an option"
                    css={`
                      @media (max-width: ${xs}px) {
                        margin-top: ${spacing.m};
                      }
                    `}
                  />
                </FormFieldsContainer>
                {/* {RadioComponent({
                  name: `Which ${state.exam.toUpperCase() ||
                    ''} exam are you writing?`,
                  options: ["Academic", "General Training"],
                  error_message: 'Select an exam type',
                  error: this.state.display && isEmpty(state.exam_type),
                  css: `margin-bottom: ${spacing.xl};`,
                })(
                  state.exam_type,
                  exam_type => {
                    console.log(exam_type)
                    updateFields('exam_type', exam_type);
                  },
                  () => this.state.display && isEmpty(state.exam_type)
                )} */}
              </FormValidationProvider>
            </ClientPageWrapper>
          );
        }}
      </FormContainer>
      </React.Fragment>
    );
  }
}
