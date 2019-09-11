//@flow
import React from "react";
import { FormsetComponent, TrainingForm } from "./FormsetComponent";
import { RadioComponent, defaultErrorMessage, spacing } from "./components";

import type { QuestionType } from "./types";
type FormsetType = {
  +name: string,
  +company: string,
  +year: string
};
type WrapperStateType = {
  +display: boolean,
  +fields: {
    +question: string,
    +formset: Array<FormsetType>
  },
  +errors: boolean
};
type WrapperPropsType = {
  +question: QuestionType,
  +formset: Array<FormsetType>,
  +value: string,
  +fetched: boolean,
  +GetValidationFunc: Function,
  +onChange: Function,
  +isChecked: Function,
  +options: Array<string>,
  +type: string,
  +error: boolean
};

class ToggleFormsetWrapper extends React.Component<
  WrapperPropsType,
  WrapperStateType
> {
  state = {
    display: false,
    fields: {
      question: "",
      formset: []
    },
    errors: false
  };
  node = null;
  isChecked = val => {
    const isChecked = this.props.isChecked(val);
    const question = this.state.fields.question;
    const parentChecked = question === val;
    return isChecked || parentChecked;
  };
  updateLocalState(props: WrapperPropsType) {
    const { value, formset } = props;
    this.setState({
      fields: {
        question: value,
        formset
      },
      display: value === "Yes"
    });
  }
  componentDidMount() {
    this.updateLocalState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const newState = {
      value: nextProps.value,
      formset: nextProps.formset
    };
    if (JSON.stringify(this.state.fields) !== JSON.stringify(newState)) {
      this.updateLocalState(nextProps);
    }
  }
  onChange = (value: string, checked: boolean) => {
    const newLocal = state => {
      let display = false;
      if (value === "Yes") {
        display = true;
      }
      let fields = { ...state.fields, question: value };
      this.props.onChange(fields, this.node);
      return { ...state, display, fields };
    };

    this.setState(newLocal);
  };
  updateParent = formset => {
    const func = state => {
      let fields = { ...state.fields, formset };
      this.props.onChange(fields);
      return { ...state, fields };
    };

    this.setState(func);
  };
  render() {
    const {
      question,
      options,
      error_message,
      type,
      error,
      refFunc,
      ...rest
    } = this.props;
    return (
      <div>
        <RadioComponent
          label={question.name}
          options={options}
          name={question.name}
          value={this.state.fields.question}
          onChange={this.onChange}
          error={error}
          css={`
            margin-bottom: ${spacing.m};
            ${rest.css};
          `}
          error_message={error_message || defaultErrorMessage}
          isChecked={this.isChecked}
        />
        {rest.value === "Yes"
          ? FormsetComponent(question.fields, type)(
              rest.formset,
              this.updateParent,
              formset => {
                return (
                  <React.Fragment>
                    <h2 className="">{formset.training}</h2>
                    <p className="">
                      {formset.organization} | {formset.year}
                    </p>
                  </React.Fragment>
                );
              },
              // refFunc,
              ref => (this.node = ref),
              this.state.errors,
              (status: boolean) => {
                this.setState({ errors: status });
              },
              error
            )
          : null}
      </div>
    );
  }
}

function generateQuestionComponentInstance(question: QuestionType, ddd) {
  let { ref, ...remaining } = ddd || {};
  let options = question.options || ["Yes", "No"];
  if (!!question.extra) {
    options = options.concat(question.extra);
  }
  let kind = question.kind || "training";
  const int2 = Math.floor(Math.random() * 2);
  return (
    value: string,
    onChange: Function,
    toggleQuestionError = () => false,
    prefId
  ) => {
    if (!!question.fields) {
      return (
        <ToggleFormsetWrapper
          question={question}
          options={options}
          onChange={onChange}
          type={kind}
          ref={ref}
          isChecked={val => val === value}
          value={value}
          error={toggleQuestionError(prefId)}
          form={TrainingForm}
          formAnotherButtonText={"Add another award"}
          formHeading=""
          formHeadingStyle={`margin-bottom: ${spacing.xxl}`}
          css={question.css}
          {...remaining}
        />
      );
    }
    return (
      <RadioComponent
        label={question.name}
        options={options}
        value={value}
        name={`${question.name} ${int2}`}
        onChange={onChange}
        error={toggleQuestionError(prefId)}
        css={`
          margin-bottom: ${spacing.m};
          // label {
          //   margin-bottom: ${spacing.l}!important;
          // }
          ${question.css};
        `}
        error_message={question.error_message || defaultErrorMessage}
        isChecked={val => val === value}
      />
    );
  };
}
export { generateQuestionComponentInstance as RadioComponent };
