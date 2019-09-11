import React from "react";
import SearchInputComponent from "./SearchInputComponent";
import createReactContext, { type Context } from "create-react-context";
import { Div } from "../primitives";
import { Heading, Text } from "../simple/Text";
import { text_color } from "../siteStyle";
export { DropdownComponent, CountryComponent } from "./DropdownComponent";
export { TextareaComponent } from "./TextareaComponent";
export { RadioComponent } from "./RadioComponent";
export { InputComponent, PhoneNumberComponent } from "./InputComponent";
export { MultiselectComponent } from "./MultiselectComponent";
export { UploadComponent } from "./UploadComponent";
export { DateComponent, DateWithStateComponent } from "./DateComponent";
export { CheckboxComponent } from "./CheckboxComponent";
export { SearchInputComponent };
export { IncrementComponent } from "./IncrementComponent";
export { MapFormComponent } from "./MapComponent";
type FormValidationType = {
  onError?: Function,
  onSuccess?: Function,
  errors?: {},
  updateField?: Function
};

export const FormValidationContext: Context<
  FormValidationType
> = createReactContext({
  onError: () => false,
  onSuccess: () => true,
  errors: {},
  updateField: () => {}
});

export class FormValidationProvider extends React.Component {
  state = {
    context: {
      onError: this.props.onError,
      onSuccess: this.props.onSuccess,
      errors: this.props.errors
    }
  };
  render() {
    return (
      // <FormValidationContext.Provider value={this.state.context}>
      <FormValidationContext.Provider
        value={{
          onError: this.props.onError,
          onSuccess: this.props.onSuccess,
          errors: this.props.errors
        }}
      >
        {this.props.children}
      </FormValidationContext.Provider>
    );
  }
}

export const FormHeading = ({ heading, children, small = true, css = "" }) => (
  <Div mb="l" css={css}>
    <Heading tag="h2" mb="m" color={text_color.primary} className="form-heading-title">
      {heading}
    </Heading>
    <Text color={text_color.primary} small className="form-heading-paragraph">
      {children}
    </Text>
  </Div>
);
