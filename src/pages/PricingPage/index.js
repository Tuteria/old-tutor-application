import React from "react";

import { WizardWrapper, FormColumn, globals } from "../components";
import { FormContainer } from "../../layout/FormContainer";
import { FormHeading, FormValidationProvider } from "../../form";
import { Div2 } from "../QualificationPage/LinkdedinImport";
import { PricingForm } from "./PricingForm";

class TutorPricingPage extends React.Component {
  earnAmount = amount => {
    const { adminPercent = 30 } = this.props;
    return Math.round(parseFloat(amount) * (100 - adminPercent) / 100);
  };
  localValidation = fields => {
    return (
      Object.keys(fields).length > 2 &&
      fields.price > 500 &&
      Number.isInteger(fields.discount)
    );
  };
  validateForm = fields => {
    return this.props.onSubmit(fields);
  };
  range(start, end, step) {
    var _end = end || start;
    var _start = end ? start : 0;
    var _step = step || 1;
    return Array((_end - _start) / _step)
      .fill(0)
      .map((v, i) => _start + i * _step);
  }
  discountPrice = state => {
    let discount = parseFloat(state.price) * parseFloat(state.discount) / 100;
    return parseFloat(state.price) - discount;
  };
  render() {
    const { validateField } = this.props;
    return (
      <FormContainer
        displayButton={false}
        errors={this.props.errors}
        details={this.props.data}
        defaultValidation={this.props.defaultValidation}
        customValidation={this.props.customValidation || this.localValidation}
        submitFormToServer={this.validateForm}
      >
        {(data, updateFields, onSubmitForm) => {
          const { fields, validate, errors } = data;
          const state = fields;
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
                nextButtonText="Next: Set your profile"
                showNextScreen={false}
                title="Step 3: Tutor Profile"
                goToNextScreen={onSubmitForm}
                loading={this.props.loading}
                showPreviousScreen={true}
                section={this.props.section}
                previousPageFunc={this.props.previousPage}
                goToPreviousScreen={this.props.previousPage}
                progress={this.props.progress}
              >
                <FormColumn>
                  <FormHeading heading="Set hourly price">
                    This is one of the first things clients will see on your
                    profile, so take out time to make yourself stand out
                  </FormHeading>
                  <PricingForm state={state} updateFields={updateFields} />
                </FormColumn>
                <Div2 newWidth={1024}>{this.props.priceTip}</Div2>
              </WizardWrapper>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export default TutorPricingPage;
