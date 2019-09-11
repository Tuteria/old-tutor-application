import React from "react";
import Wrapper from "./Wrapper";
import { PricingForm } from "../PricingPage/PricingForm";

class PricingPage extends React.Component {
  state = this.props.pricing || {};
  localValidation = fields => {
    return (
      Object.keys(fields).length > 1 && fields.price > 500 && true
      // Number.isInteger(fields.discount)
    );
  };
  validateForm = fields => {
    return this.props.onSubmit(fields);
  };
  canSubmit = () => {
    const localErrors = [...new Set(Object.values(this.state.errors))];
    return localErrors.length === 1 && localErrors[0] === false;
  };
  render() {
    return (
      <Wrapper
        disableNextScreen={false}
        step={2}
        customValidation={this.localValidation}
        {...this.props}
      >
        {({ width, position, state, updateFields, onSubmitForm }) => {
          return <PricingForm state={state} updateFields={updateFields} />;
        }}
      </Wrapper>
    );
  }
}
export default PricingPage;
