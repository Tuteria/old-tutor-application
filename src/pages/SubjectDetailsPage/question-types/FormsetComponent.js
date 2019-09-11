//@flow
import React from "react";
import { css } from "styled-components";
import { spacing } from "../../../siteStyle";
import range from "lodash/range";

import {
  DropdownComponent,
  InputComponent,
  Formset,
  TextareaComponent
} from "./components";
import { FormValidationProvider } from "../../../form";
import { FormFieldsContainer } from "../../../layout/SpecialColumn";
import { FormComponent } from "../../../simple";
import { FileUpload } from "../PortfolioPage";

export const PortfolioForm = props => {
  const { validate, state, errors, updateFields, fields, type } = props;
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
        label={fields[0]}
        value={state.title}
        css={`
          // error_message={errors[field]} // showIcon={true}
          margin-bottom: ${spacing.xl};
        `}
        onBlur={val => updateFields("title", val.target.value)}
        field_name="title"
        errorStyle="margin-top: 8px !important;"
        placeholder={`Logo design for Tuteria Inc.`}
      />
      <TextareaComponent
        label={fields[1]}
        value={state.description}
        errorStyle="margin-top: 8px !important;"
        css={`
          // error_message={errors[field]} // showIcon={true}
          margin-bottom: ${spacing.xl};
        `}
        onBlur={val => updateFields("description", val.target.value)}
        field_name="description"
        placeholder={`A short explanation of the project and the problem you solved. Then talk about your approach and how you solved it.`}
      />
      <FormComponent label={fields[2]}>
        <FileUpload
          portfolios={state.images}
          deleteImage={index =>
            updateFields("images", state.images.filter((x, i) => i !== index))
          }
          banner={false}
          addImage={image => {
            if (Boolean(image)) {
              updateFields("images", [...(state.images || []), { image }]);
            }
          }}
          styling={`
          justify-content: left;
          & >div{
              margin-right: ${spacing.s};
          }
          `}
          maxLength={3}
        />
      </FormComponent>
    </FormValidationProvider>
  );
};

export const TrainingForm = props => {
  const { validate, state, errors, updateFields, fields, type } = props;
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
        label={fields[0]}
        value={state.training}
        css={`
          // error_message={errors[field]} // showIcon={true}
          margin-bottom: ${spacing.xl};
        `}
        onBlur={val => updateFields("training", val.target.value)}
        field_name="training"
        errorStyle="margin-top: 8px !important;"
        placeholder={`Name of ${type}`}
      />
      <FormFieldsContainer cssProps={spacing.xl}>
        <InputComponent
          label={fields[1]}
          value={state.organization}
          errorStyle="margin-top: 8px !important;"
          onBlur={val => updateFields("organization", val.target.value)}
          field_name="organization"
          placeholder={`${type.toUpperCase()} organization`}
        />
        <DropdownComponent
          label={fields[2]}
          errorStyle="margin-top: 8px !important;"
          value={state.year || ""}
          height={"52px"}
          onChange={val => updateFields("year", val)}
          field_name="year"
          className="select"
          defaultText="Select Year"
          options={range(1940, new Date().getFullYear())}
          styledButtonCss={css`
            display: flex;
            align-items: center;
            & svg {
              margin-bottom: 0 !important;
            }
          `}
        />
      </FormFieldsContainer>
    </FormValidationProvider>
  );
};

function generateFormsetComponentInstance(
  fields: Array<string> = [
    "Name of training",
    "Name of organization",
    "Year of training"
  ],
  type: string = "training",
  form_fields = ["training", "organization", "year"],
  form_errors = {
    training: ["This field is required"],
    organization: ["This field is required"],
    year: ["This field is required"]
  },
  formElement = TrainingForm,
  validateFunc,
  image = false
) {
  return (formset = [], onChange, render, refFunc) => {
    return (
      <Formset
        ref={refFunc}
        data={formset}
        form_fields={form_fields}
        errors={form_errors}
        onSubmit={data => onChange(data)}
        formProps={{ fields, type }}
        render={render}
        image={image}
        validateFunc={validateFunc}
        addText={`Add another ${type}`}
        formElement={formElement}
      />
    );
  };
}

export { generateFormsetComponentInstance as FormsetComponent };
