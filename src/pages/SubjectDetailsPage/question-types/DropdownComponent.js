//@flow
import React from "react";
import { DropdownComponent, defaultErrorMessage, spacing } from "./components";
import { InputComponent } from "./InputComponent";
import type { QuestionType } from "./types";
function range(start = 0, end) {
  return Array.from(new Array(end), (x, i) => i + start);
}

function generateResult(end, suffix) {
  return range(1, end)
    .concat([`${end}+`])
    .map(x => ({
      text: `${x} ${suffix}${x !== 1 ? "s" : ""}`,
      value: x
    }));
}

export class DropdownConditionComponent extends React.Component {
  state = {
    fields: {
      value: "",
      value2: ""
    }
  };
  updateLocalState(props: WrapperPropsType) {
    const { value, value2 } = props;
    this.setState({
      fields: {
        value,
        value2
      }
    });
  }
  componentDidMount() {
    this.updateLocalState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const newState = {
      value: nextProps.value,
      value2: nextProps.value2
    };
    if (JSON.stringify(this.state.fields) !== JSON.stringify(newState)) {
      this.updateLocalState(nextProps);
    }
  }
  onChange = value => {
    const newLocal = state => {
      let fields = { ...state.fields, value };
      this.props.onChange(fields);
      return { ...state, fields };
    };
    this.setState(newLocal);
  };
  updateParent = value2 => {
    const func = state => {
      let fields = { ...state.fields, value2 };
      this.props.onChange(fields);
      return { ...state, fields };
    };

    this.setState(func);
  };
  render() {
    let {
      question,
      defaultText,
      defaultErrorMessage,
      error,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <DropdownComponent
          options={question.options}
          defaultText={defaultText}
          value={this.state.fields.value}
          name={question.name}
          onChange={this.onChange}
          error_message={defaultErrorMessage}
          error={error}
          css={`
            margin-bottom: ${spacing.s};
          `}
        />
        {Boolean(rest.value) || Boolean(this.state.fields.value) ? (
          <React.Fragment>
            {rest.secondary.input ? (
              InputComponent({
                extra: { placeholder: rest.secondary.input }
              })(this.state.fields.value2, this.updateParent)
            ) : (
              <DropdownComponent
                options={question.secondary.options}
                value={this.state.fields.value2}
                defaultText={question.secondary.label}
                onChange={this.updateParent}
                error_message={defaultErrorMessage}
                direction="up"
                error={error}
                css={`
                  margin-bottom: ${spacing.m};
                `}
              />
            )}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

function generateQuestionComponentInstance(
  question: QuestionType,
  remaining = {}
) {
  let defaultText = question.defaultText || question.options[0];
  let { isObject = false, ...rest } = remaining;
  let options = question.useDefault
    ? question.options
    : Number.isInteger(question.options[1])
      ? generateResult(question.options[1], question.options[2])
      : // range(1, question.options[1])
        //   .concat([`${question.options[1]}+`])
        //   .map(x => ({
        //     text: `${x} ${question.options[2]}${x !== 1 ? "s" : ""}`,
        //     value: x
        //   }))
        [{ text: question.options[1], value: 0 }].concat(
          generateResult(question.options[2], question.options[3])
        );
  return (
    value: string,
    onChange: Function,
    toggleQuestionError = () => false,
    prefId
  ) => {
    if (Boolean(question.secondary)) {
      // debugger;
      return (
        <DropdownConditionComponent
          question={question}
          options={options}
          onChange={onChange}
          defaultText={Boolean(isObject) ? defaultText.value : defaultText}
          secondary={question.secondary}
          {...value}
          error_message={remaining.error_message || defaultErrorMessage}
          error={toggleQuestionError(prefId)}
          {...rest}
        />
      );
    }
    return (
      <DropdownComponent
        label={question.name}
        options={options}
        defaultText={Boolean(isObject) ? defaultText.name : defaultText}
        value={value}
        name={question.name}
        onChange={onChange}
        error_message={remaining.error_message || defaultErrorMessage}
        error={toggleQuestionError(prefId)}
        css={question.css}
        top={question.top}
        {...rest}
      />
    );
  };
}
export { generateQuestionComponentInstance as DropdownComponent };
