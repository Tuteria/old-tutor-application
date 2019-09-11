import React from "react";
import values from "lodash/values";
import { Form, Div } from "../primitives/index";
import { PrimaryButton } from "../simple/Button";
import PropTypes from "prop-types";

type Props = {
  details: {},
  errors: {},
  customValidation: Function,
  submitFormToServer: Function,
  displayButton: boolean,
  buttonStyle: string,
  css: string,
  button_text: string,
  render: Function,
  children?: Function,
  defaultValidation?: boolean,
  displayValidation?: boolean,
  resetError?: boolean
};
function simpleValidation(fields) {
  let results = Object.keys(fields).map(x => {
    if (typeof fields[x] === "string") {
      return fields[x].trim().length > 0;
    }
    return (
      values(fields[x]).filter(x => x.toString().length === 0).length === 0
    );
  });
  let oo = [...new Set(results)];
  return oo.length === 1 && !!oo[0];
}

export class FormContainer extends React.Component {
  state = {
    fields: this.props.details || {},
    validate: this.props.displayValidation || false,
    errors: this.props.errors || {},
    clicked: false,
    loading: false
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };

  updateLocalState(key, value) {
    const fields = { ...this.state.fields, [key]: value };
    this.setState({ fields });
    return fields;
  }
  bulkUpdate = data => {
    const fields = { ...this.state.fields, ...data };
    this.setState({ fields });
  };
  externalStateUpdate = values => {
    const fields = { ...this.state.fields, ...values };
    this.setState({ fields });
  };
  allFieldsAreEmpty() {
    return Object.keys(this.state.fields).reduce(
      (acc, x) => !!this.state.fields[x] === false && acc,
      true
    );
  }
  // componentWillReceiveProps(nextProps) {
  //   if (JSON.stringify(nextProps.details) !== this.state.fields) {
  //     this.setState({ fields: nextProps.details });
  //   }
  // }
  allFieldPopulated(value, func) {
    if (!!func) {
      return func(this.state.fields);
    }
    return value.reduce((acc, x) => !!this.state.fields[x] && acc, true);
  }
  updateFields = (key, value) => {
    const { onStateChange = () => {} } = this.props;
    let fields = this.updateLocalState(key, value);
    onStateChange(fields, key, value, this.updateLocalState);
  };
  validateFields() {
    const {
      customValidation = () => true,
      defaultValidation = true
    } = this.props;
    let localValidation = defaultValidation
      ? simpleValidation(this.state.fields)
      : true;
    return localValidation && customValidation(this.state.fields);
  }
  toggleErrorFields() {
    this.setState({ validate: true, clicked: false });
  }
  onSubmitForm = e => {
    e.preventDefault();
    var keyCode = e.keyCode || e.which;
    const { resetError = true } = this.props;
    if (!!this.validateFields()) {
      this.setState({
        errors: resetError ? {} : this.state.errors,
        clicked: true,
        loading: true
      });
      const callback = errors => {
        this.setState({
          errors,
          validate: true,
          clicked: false,
          loading: false
        });
      };
      let rrr = this.props.submitFormToServer(this.state.fields);
      if (Boolean(rrr) && Boolean(rrr.then)) {
        rrr.then((data = {}) => {
          let { success, error } = data;
          this.setState({ clicked: false });
          if (!!error) {
            callback(error);
          }
        });
      }
    } else {
      this.toggleErrorFields();
    }
  };
  render() {
    const {
      displayButton = true,
      buttonStyle = "",
      buttonProps = { big: true, full_width: true }
    } = this.props;
    return (
      <Form css={this.props.css}>
        {this.props.children(
          this.state,
          this.updateFields,
          this.onSubmitForm,
          this.externalStateUpdate,
          this.props.loading,
          this.bulkUpdate
        )}
        {displayButton ? (
          <Div css={buttonStyle}>
            <PrimaryButton
              // disabled={this.validateFields() === false}
              onClick={this.onSubmitForm}
              {...buttonProps}
            >
              {!this.state.clicked ? this.props.button_text : "Loading..."}
            </PrimaryButton>
            {this.props.render()}
          </Div>
        ) : null}
      </Form>
    );
  }
}
FormContainer.propTypes = {
  displayButton: PropTypes.bool,
  children: PropTypes.func.isRequired,
  details: PropTypes.object,
  errors: PropTypes.object,
  clicked: PropTypes.bool,
  submitFormToServer: PropTypes.func,
  customValidation: PropTypes.func,
  resetError: PropTypes.bool
};
