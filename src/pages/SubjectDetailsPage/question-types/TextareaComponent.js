import React from "react";
import { TextareaComponent, defaultErrorMessage } from "./components";
import type { QuestionType } from "./types";
function generateQuestionComponentInstance(question: QuestionType) {
  return (
    value: Array<string>,
    onChange: Function,
    toggleQuestionError: Function,
    prefId
  ) => {
    return (
      <TextareaComponent
        label={question.name}
        {...question.extra}
        error={toggleQuestionError(prefId)}
        error_message={defaultErrorMessage}
        onChange={e => {
          if (!!e.target === false) {
            onChange(e);
          }
        }}
        value={value}
      />
    );
  };
}

export { generateQuestionComponentInstance as TextareaComponent };
