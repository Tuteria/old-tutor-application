import React from "react";
import styled from "styled-components";

import { Div } from "../components";
import { OptionStyle, SuccessBadge } from "./components.js";
import { ButtonWithIcon } from "../../simple/Button";
import { TestContentStyle } from "../../layout/ContentStyle";
import { xs, spacing } from "../../siteStyle";

export const SubjectListStyle = styled(TestContentStyle)`
  margin-bottom: 40px;
  margin-top: 13px;
  width: 93%;
  @media (max-width: ${xs}px) {
    padding: 19px 5px 0;
  }
  & .choice-section {
    display: flex;
    width: 100%;

    @media (max-width: ${xs}px) {
      flex-direction: column;
      position: relative;
    }

    & .left {
      width: 7%;
      font-size: 17px;
      font-weight: 500;
      color: #36b37e;

      @media (max-width: ${xs}px) {
        display: none;
      }
    }

    & .right {
      width: 93%;

      @media (max-width: ${xs}px) {
        width: 100%;
        border-top: 2px dashed #f0f0f0;
        padding-top: 0;
        padding-bottom: 24px;
      }
    }

    & .right.type_one {
      border-top: 0;
      margin-top: 0;
      padding-top: 0;
    }

    & .right.type2 {
      width: 55%;
      @media (max-width: ${xs}px) {
        width: 100%;
        order: 2;
        margin-top: 3px;
        border-top: 0;
        padding-top: 24px;
      }
    }

    & .has-image {
      width: 40%;
      margin-left: 27px;

      @media (max-width: ${xs}px) {
        width: 100%;
        margin-left: 0;
        order: 1;
        // margin-top: 37px;
      }

      & img {
        width: 100%;
      }
    }
  }
  }
`;

const TestQuestion = styled.div`
  & > div {
    color: #484848;
    line-height: 32px;
    font-size: 18px;
    text-align: justify;
    margin-bottom: 17px;
  }

  span {
    @media (max-width: ${xs}px) {
      font-size: 14px;
    }
  }

  & hr {
    border: 2px dashed #f0f0f0;
    margin: 30px 0 45px 0;
    height: 0;
  }

  ${SuccessBadge} {
    padding: 5px;
    color: #fff;
    font-size: 14px;
    line-height: 18px;

    @media (max-width: ${xs}px) {
      font-size: 11px;
      padding: 2px 8px;
      letter-spacing: 1px;
    }
  }
`;

const QuestionPassage = ({ badge, passage }) => (
  <TestQuestion>
    <div>
      {badge}
      <span>{passage}</span>
    </div>
    <hr />
  </TestQuestion>
);

export class QuestionPage extends React.Component {
  render() {
    const q = this.props.question;
    const isSubmit =
      this.props.no === this.props.lastQuestion ? (
        <ButtonWithIcon
          primary
          right
          icon="angle-right"
          big
          onClick={this.props.nextQuestion}
        >
          Submit Quiz
        </ButtonWithIcon>
      ) : (
        <ButtonWithIcon
          primary
          right
          icon="angle-right"
          big
          onClick={this.props.nextQuestion}
        >
          Next Question
        </ButtonWithIcon>
      );
    return (
      <React.Fragment>
        {this.props.timerComponent()}
        <SubjectListStyle>
          {q.comprehension && (
            <QuestionPassage
              badge={<SuccessBadge inverse>PASSAGE</SuccessBadge>}
              passage={q.comprehension.passage}
            />
          )}

          <OptionStyle
            no={this.props.no}
            type_one={q.display_format === "A"}
            onAnswerClick={this.props.selectAnswer}
            isSelected={val => val === this.props.currentAnswer}
            answers={q.answers}
            question={q.content}
            image={q.figure}
          />

          <Div
            css={`
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              justify-content: space-between;
              align-self: flex-start;
              color: #0064e6;
              margin-top: ${spacing.xxxl};
              width: 100%;
              font-size: 17px;
              & button {
                width: 25%;
                @media (max-width: ${xs}px) {
                  width: 100%;
                  margin-bottom: ${spacing.m};
                }
              }
              // & i {
              //   font-size: 21px;
              //   margin-right: 8.5px;
              // }
              @media (max-width: ${xs}px) {
                width: 100%;
                align-self: center;
                margin-bottom: 58px;
                text-align: center;
                flex-direction: column-reverse;
              }
            `}
            className="add-subject"
          >
            {isSubmit}
            {this.props.no === 1 ? null : (
              <ButtonWithIcon
                big
                outline
                left
                icon="angle-left"
                onClick={this.props.previousQuestion}
              >
                Previous
              </ButtonWithIcon>
            )}
          </Div>
        </SubjectListStyle>
      </React.Fragment>
    );
  }
}

export default QuestionPage;
