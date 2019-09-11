import React from "react";
import {
  MultiselectComponent,
  defaultErrorMessage,
  spacing
} from "./components";
import type { QuestionType } from "./types";
function generateQuestionComponentInstance(
  question: QuestionType,
  type = "row"
) {
  const { options, extra = {}, error_message, error, labelCss, css } = question;
  const { direction = type, levelDisplay = "" } = extra;
  return (
    value = [],
    onChange: Function,
    toggleQuestionError = () => false,
    prefId
  ) => {
    return (
      <MultiselectComponent
        label={`${question.name} ${levelDisplay}`}
        options={options}
        name={`${question.name} ${levelDisplay}`}
        onChange={onChange}
        value={value}
        error={error || toggleQuestionError(prefId)}
        error_message={error_message || defaultErrorMessage}
        direction={direction}
        css={`
          margin-bottom: ${spacing.xl};
          ${css} label {
            margin-bottom: ${spacing.m}!important;
            ${labelCss};
          }
          .error {
            margin-top: ${spacing.s}!important;
          }
        `}
      />
    );
  };
}

export { generateQuestionComponentInstance as MultiselectComponent };
