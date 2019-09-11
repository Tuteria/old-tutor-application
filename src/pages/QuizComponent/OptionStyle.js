import React from "react";
import styled from "styled-components";
import { xs } from "../../siteStyle";
import createReactContext from "create-react-context";
// import { KatexMarkdown } from "./KatexMarkdown";
const ChoiceWrap = styled.div`
  width: 100%;
  margin-bottom: 32px;
  @media (max-width: ${xs}px) {
    margin-bottom: 20px;
    // position: absolute;
    position: ${props => (props.type_one ? null : "relative")};
    top: 0;
  }
  & p {
    color: #484848;
    font-size: 19px;
    font-weight: 500;

    @media (max-width: ${xs}px) {
      font-size: 14px;
      line-height: 29px;
      margin-bottom: 0;
    }
  }
  & span {
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    color: #767676;

    @media (max-width: ${xs}px) {
      display: none;
    }
  }

  & .inner_hint {
    font-size: inherit;
    font-style: italic;

    @media (max-width: ${xs}px) {
      // display: none;
    }
  }
`;

export const Choice = styled.div`
  position: relative;
  display: flex;
  width: ${props => (props.type_one ? "23.6%" : "100%")};
  margin-bottom: ${props => (props.type_one ? "0" : "10px")};
  margin-right: ${props => (props.type_one ? "10px" : "0")};

  @media (max-width: ${xs}px) {
    height: 75px;
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  & label {
    width: 100%;
    border: 4px solid #e6e8eb;
    background-color: #fafafa;
    padding: 17px 10px;
    display: flex;
    align-items: center;
    height: ${props => (props.type_one ? "184px" : "auto")};
    position: relative;
    justify-content: ${props => (props.type_one ? "center" : "flex-start")};

    @media (max-width: ${xs}px) {
      height: auto;
    }
  }

  & label span.option:first-child {
    border: 1px solid #e6e8eb;
    background-color: #ffffff;
    border-radius: 2px;
    padding: 1px 6px;
    text-align: center;
    margin-right: ${props => (props.type_one ? "0" : "32px")};
    margin-left: ${props => (props.type_one ? "0" : "16px")};
    position: ${props => (props.type_one ? "absolute" : "relative")};
    left: ${props => (props.type_one ? "5px" : "auto")};
    bottom: ${props => (props.type_one ? "5px" : "auto")};

    @media (max-width: ${xs}px) {
      margin-right: 14px;
      font-size: 15px;
      color: #7b8994;
      margin-left: 6px;
      position: relative;
      left: auto;
      bottom: auto;
    }
  }

  & label span.option:last-child {
    font-size: ${props => (props.choice_size ? "34px" : "19px")};
    color: #1b2733;
    font-weight: 300;
    line-height: 24px;

    @media (max-width: ${xs}px) {
      font-size: ${props => (props.type_one ? "18px" : "14px")};
      width: 75%;
      // text-align: center;
      flex: ${props => (props.type_one ? "1" : "initial")};
      margin-left: ${props => (props.type_one ? "75px" : "0")};
    }
  }

  & input {
    background: pink;
    // visibility: hidden;
    // opacity: 0;
    position: absolute;
    right: 2px;
    top: -1px;
  }

  & input::after {
    content: "";
    opacity: 1 !important;
    display: flex;
    border: 2px solid #ffffff;
    background-color: #e6e8eb;
    height: 16px;
    width: 16px;
    border-radius: 100px;
    position: absolute;
    right: 7px;
    top: 5px;
    visibility: visible;
    align-self: center;
    margin: 0 auto;
    z-index: 1;
  }

  & input::before {
    content: "";
    opacity: 1;
    height: 28px;
    width: 28px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e6e8eb;
    position: absolute;
    right: 1px;
    top: 0;
    visibility: visible;
    z-index: 1;
  }

  & input + label:hover {
    cursor: pointer;
  }

  & input:checked + label {
    border: 4px solid #36b37e;
  }

  & input:checked::after {
    border: 2px solid #fff;
    background: #36b37e;
  }

  & input:checked::before {
    background: #36b37e;
  }
`;
const RegularMarkdown = ({ text, render }) => {
  return <div dangerouslySetInnerHTML={{ __html: text || "" }} />;
};
export const KatexContext = createReactContext({
  LoadKatext: RegularMarkdown
  // LoadKatext: Div
});
const OptionStyle = styled.div`
  display: flex;
  flex-direction: ${props => (props.type_one ? "row" : "column")};
  flex-wrap: wrap;
  justify-content: space-between;

  & .format-two {
    & label {
      & span:last-child {
        @media (max-width: ${xs}px) {
          font-size: 18px;
          text-align: center;
          color: #1b2733;
        }
      }
    }
  }

  @media (max-width: ${xs}px) {
    flex-direction: column;
  }

  & div:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
`;
const options = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E"
};

const OptionStyle2 = ({
  answers = [],
  choice_size = false,
  type_one = false,
  handleClick,
  isSelected
}) => {
  return (
    <OptionStyle type_one={type_one}>
      {answers.map((val, index) => (
        <Choice
          key={`cio-${index}`}
          type_one={type_one}
          choice_size={choice_size}
        >
          <input
            onChange={e => {
              handleClick(val.option || options[index]);
            }}
            checked={isSelected(val.option || options[index])}
            type="radio"
            name="choice"
            id={`choice${val.option || options[index]}`}
          />
          <label htmlFor={`choice${val.option || options[index]}`}>
            <span className="option">{val.option || options[index]}</span>
            {/* <OptionRender text={val.content} /> */}
            <KatexContext.Consumer>
              {({ LoadKatext }) => {
                return <LoadKatext text={val.content} />;
              }}
            </KatexContext.Consumer>
            {/* <span>{val.content}</span> */}
          </label>
        </Choice>
      ))}
    </OptionStyle>
  );
};
export const Question = ({ question, inner_hint, hint, ...type_one }) => (
  <ChoiceWrap {...type_one}>
    <p>
      {question}{" "}
      {inner_hint && <span className="inner_hint">{inner_hint}</span>}
    </p>
    {hint && <span>{hint}</span>}
  </ChoiceWrap>
);

export default ({
  question,
  no,
  className = "",
  answers,
  hint,
  type_one = false,
  choice_size = false,
  onAnswerClick,
  inner_hint = "",
  isSelected,
  image,
  children
}) => {
  return (
    <div className="choice-section">
      <div className="left">{`${no} →`}</div>
      <div className={`right ${image ? "type2" : ""}`}>
        <ChoiceWrap type_one={type_one}>
          <p>
            <KatexContext.Consumer>
              {({ LoadKatext }) => (
                <LoadKatext
                  render={({ loaded, Component }) => {
                    return loaded ? <Component text={question} /> : null;
                  }}
                />
              )}
            </KatexContext.Consumer>
            {/* <KatexMarkdown text={question} /> */}
            {/* {question} */}
            {image && (
              <span className="inner_hint">(press A - D to answer)</span>
            )}
          </p>
          {hint && (
            <span>
              "Hint: You can also press A - D on your keyboard to answer"
            </span>
          )}
        </ChoiceWrap>
        <OptionStyle2
          type_one={type_one}
          choice_size={choice_size}
          answers={answers}
          handleClick={onAnswerClick}
          isSelected={isSelected}
        />
      </div>
      {image && (
        <div className="has-image">
          <img alt="question" src={image} />
        </div>
      )}
    </div>
  );
};
