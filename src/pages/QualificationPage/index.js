// @flow
import React from "react";
import styled, { css } from "styled-components";
import Media from "react-media";
import ToggleSwitch from "../../simple/ToggleSwitch";
import {
  InputComponent,
  DropdownComponent,
  CountryComponent,
  FormColumn,
  WizardWrapper,
  Formset
} from "../components";
import {
  FormHeading,
  CheckboxComponent,
  FormValidationProvider
} from "../../form";

import { FormFieldsContainer } from "../../layout/SpecialColumn";
import { spacing } from "../../siteStyle";

const lightWeight = "300";
const xs = 1024;
export const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;

  & p {
    color: #47525d;
    font-size: 17px;
    font-weight: ${lightWeight};
    padding-right: 33px;
    margin: 0;
  }
  & .toggle-group {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const WorkExperienceForm = props => {
  const { validate, state, errors, updateFields } = props;
  return (
    <FormValidationProvider
      {...{
        onError: key => {
          return validate && !props.validateField(state, key, errors);
        },
        onSuccess: key => validate && props.validateField(state, key, errors),
        errors
      }}
    >
      <InputComponent
        label="Name of company"
        value={state.name}
        css={`
          margin-bottom: ${spacing.xl};
        `}
        errorStyle="margin-top: 8px !important;"
        field_name="name"
        updateText={val => updateFields("name", val)}
        placeholder="Delloitte Nigeria Limited"
      />
      <InputComponent
        label="Your role"
        css={`
          margin-bottom: ${spacing.xl};
        `}
        field_name="role"
        errorStyle="margin-top: 8px !important;"
        value={state.role}
        updateText={val => updateFields("role", val)}
        placeholder="Data Scientist"
      />
      <CheckboxComponent
        checked={state.currently_work}
        onChange={e => {
          updateFields("currently_work", e.target.checked);
        }}
        field_name="currently_work"
        css={`
          margin-bottom: ${spacing.xl};
          & label > span {
            font-size: 17px;
          }
        `}
        text="I currently work here"
      />
      <ShareContainer>
        <p>Share this work experience with clients</p>
        <ToggleSwitch
          defaultChecked={!state.is_private}
          // checked={!state.is_private}
          onChange={e => {
            updateFields("is_private", !e.target.checked);
          }}
        />
      </ShareContainer>
    </FormValidationProvider>
  );
};
export const EducationForm = props => {
  const { validate, state, errors, updateFields, countries, degrees } = props;
  const customErrorMessage = () => {
    if (!!state.degree === false && !!state.country === false) {
      return errors.combined;
    }
    if (!!state.degree === false) {
      return errors.degree;
    }
    if (!!state.country === false) {
      return errors.country;
    }
  };
  return (
    <FormValidationProvider
      {...{
        onError: key => {
          return validate && !props.validateField(state, key, errors);
        },
        onSuccess: key => validate && props.validateField(state, key, errors),
        errors
      }}
    >
      <InputComponent
        label="Name of School"
        value={state.school}
        css={`
          // error_message={errors[field]} // showIcon={true}
          margin-bottom: ${spacing.xl};
        `}
        onBlur={val => updateFields("school", val.target.value)}
        field_name="school"
        errorStyle="margin-top: 8px !important;"
        placeholder="Name of School e.g University of Lagos"
      />
      <InputComponent
        label="Course of Study"
        value={state.course}
        errorStyle="margin-top: 0 !important;"
        css={`
          // error_message={errors[field]} // showIcon={true}
          margin-bottom: ${spacing.xl};
        `}
        errorStyle="margin-top: 8px !important;"
        onBlur={val => updateFields("course", val.target.value)}
        field_name="course"
        placeholder="Course of Study"
      />
      <FormFieldsContainer
        condition={
          validate && !!state.degree === false && !!state.country === false
        }
        extraCss={` + div.c-errmessage {
                margin-top: -24px;
              }`}
        custom_error_message={customErrorMessage()}
        cssProps={spacing.xl}
      >
        <DropdownComponent
          label="Degree"
          uncontrolled
          errorStyle="margin-top: 8px !important;"
          value={state.degree || ""}
          onChange={val => updateFields("degree", val)}
          field_name="degree"
          className="select"
          defaultText="Select Degree"
          options={degrees}
        />
        <CountryComponent
          errorStyle="margin-top: 0 !important;"
          field_name="country"
          onChange={val => updateFields("country", val)}
          value={state.country || ""}
          countries={countries}
        />
      </FormFieldsContainer>
    </FormValidationProvider>
  );
};
class QualificationPage extends React.Component<Props> {
  state = {
    educations: [],
    workExperiences: [],
    loading: false
  };
  previousPage = () => {
    this.props.navigateTo(1, "", "location");
  };
  nextPage = () => {
    const educations = this.educationNode.handleSubmit();
    const workExperiences = this.workeExperienceNode.handleSubmit();
    if (!!educations && !!workExperiences) {
      this.setState({ loading: true });
      this.props.onSubmit({ educations, workExperiences });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      data: { educations = [], workExperiences = [] },
      progress,
      validateField,
      form_fields,
      degrees = [],
      countries = [],
      errors,
      ...rest
    } = this.props;
    return (
      <WizardWrapper
        nextButtonText="Next"
        showPreviousScreen={true}
        showNextScreen={false}
        goToNextScreen={this.nextPage}
        loading={this.props.loading}
        previousPageFunc={this.props.previousPage}
        goToPreviousScreen={this.props.previousPage}
        title={this.props.title}
        progress={this.props.progress}
        {...rest}
      >
        <FormColumn>
          <FormHeading heading="Education">
            Enter your highest educational qualification or credentials, whether
            in-view or completed
          </FormHeading>
          <div>
            <Formset
              ref={node => (this.educationNode = node)}
              data={educations}
              form_fields={form_fields.educations}
              errors={errors.educations}
              onSubmit={data => data}
              formProps={{ degrees, countries }}
              render={formset => {
                let text = degrees.find(x => x.value === formset.degree);
                let country = countries.find(x => x.locale === formset.country);
                return this.props.educationDisplay(text, country, formset);
              }}
              addText="Add another School"
              formElement={EducationForm}
            />
          </div>

          {/* Work on experience starts here */}
          <div>
            <FormHeading
              heading="Work Experience"
              css={`
                margin-top: ${spacing.xl};
              `}
            >
              Adding the work experiences you've had will add more credibility
              to your profile and helps establish your enterprise
            </FormHeading>
          </div>
          <Formset
            ref={node => (this.workeExperienceNode = node)}
            data={workExperiences}
            form_fields={form_fields.workExperiences}
            errors={errors.workExperiences}
            onCreate={{ is_private: false, currently_work: false }}
            onSubmit={data => {
              return data;
            }}
            // validateFunc={fields => ['name','role'].reduce()}
            render={formset => this.props.workExperienceDisplay(formset)}
            addText="Add another Work Experience"
            formElement={WorkExperienceForm}
          />
        </FormColumn>
      </WizardWrapper>
    );
  }
}

export const DragIcon = () => (
  <Media query={`(max-width: ${xs}px)`}>
    {matches =>
      matches ? null : (
        <div className="board-drag">
          <i className="fa fa-arrows-v fa-2x" />
        </div>
      )
    }
  </Media>
);

export default QualificationPage;
