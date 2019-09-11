import React from "react";
import styled from "styled-components";
import type { QuestionType } from "./types";
import WordCounterComponent from "../../../compound/WordCounterComponent";
import {
  InputComponent,
  // WordCounterComponent,
  SearchInputComponent,
  Icon,
  AutoSelect,
  xs,
  Div,
  PrimaryBadge,
  defaultErrorMessage,
  spacing
} from "./components";
import includes from "lodash/includes";
import Media from "react-media";

const BadgeStyle = styled(PrimaryBadge)`
  color: #484848;
  font-size: 16px;
  margin-bottom: 5px;
  position: relative;
  padding: 5px 32px 5px 16px;
  @media (max-width: ${xs}px) {
    background-color: #0064e6;
    border-radius: 100px;
    margin-right: 8px;
    padding-top: 2px;
    padding-bottom: 5px;
  }

  & span {
    @media (max-width: ${xs}px) {
      color: #fff;
      font-size: 12px;
      margin: 0;
      padding-top: 6px;
      padding-bottom: 7px;
      line-height: 15px;
    }
  }
  & svg {
    position: absolute;
    margin-left: 10px;
    color: #0260d7;
    right: 10px;
    bottom: 10px;
    @media (max-width: ${xs}px) {
    }
  }
`;

const Badge = ({ text, onClick }) => (
  <BadgeStyle onClick={onClick}>
    <span>{text}</span>
    <Media query={`(max-width: ${xs}px)`}>
      {matches =>
        matches ? (
          <Icon width="8px" fill="#fff" name="close" onClick={onClick} />
        ) : (
          <Icon width="8px" name="close" onClick={onClick} />
        )
      }
    </Media>
  </BadgeStyle>
);

export const SearchComponent = ({
  display_error,
  question,
  placeholder,
  newOnChange,
  saved_list,
  items
}) => {
  return (
    <SearchInputComponent
      error={display_error}
      inputRender={(values, onChangeFunc, error) => (
        <WordCounterComponent
          error={error}
          error_message={defaultErrorMessage}
          label={question.name}
          updateText={() => {}}
          css={`
            margin-bottom: ${spacing.m};
          `}
        >
          {cProps => {
            return (
              <AutoSelect
                value={cProps.value}
                promptText={placeholder}
                placeholder={placeholder}
                onChange={value => {}}
                onSelect={(params, onClear) => {
                  if (params.selectedItem) {
                    newOnChange(params.selectedItem);
                    onClear();
                  } else {
                    if (!!params.inputValue) {
                      let result = params.inputValue.split(",");
                      if (result.length > 1) {
                        newOnChange(result[0]);
                        onClear();
                      }
                    }
                  }
                }}
                items={values}
              />
            );
          }}
        </WordCounterComponent>
      )}
      onChange={newOnChange}
      values={saved_list}
      defaultValue={items}
      render={values => (
        <Div
          css={`
            margin-bottom: ${spacing.xl};
          `}
          className="badge-wrap"
        >
          {items.map((subject, index) => (
            <Badge
              key={index}
              text={subject}
              onClick={() => {
                newOnChange(subject);
              }}
            />
          ))}
        </Div>
      )}
    />
  );
};

function generateQuestionComponentInstance(question: QuestionType) {
  const { extra = {} } = question;
  return (
    items: Array<string> = [],
    onChange: Function,
    toggleQuestionError: Function = () => false,
    prefId
  ) => {
    const { autocomplete, placeholder, saved_list } = extra;
    if (!!autocomplete) {
      const newOnChange = val => {
        let result = items;
        if (includes(result, val)) {
          result = result.filter(x => x !== val);
        } else {
          result.push(val);
        }
        onChange(result);
      };
      return (
        <SearchComponent
          display_error={toggleQuestionError(prefId)}
          question={question}
          placeholder={placeholder}
          newOnChange={newOnChange}
          saved_list={saved_list}
          items={items}
        />
      );
    }
    return (
      <InputComponent
        label={question.name}
        {...question.extra}
        error={toggleQuestionError(prefId)}
        error_message={defaultErrorMessage}
        onChange={(e, value) => {
          if (!!e.target === false) {
            onChange(e);
          }
        }}
        value={items}
      />
    );
  };
}

export { generateQuestionComponentInstance as InputComponent };
