import React from "react";
import {
  DangerBadge,
  PrimaryButton,
  SuccessBadge,
  TestContentStyle
} from "./components";

import { Div, Text } from "../components";

import { xs, spacing } from "../../siteStyle";
import styled from "styled-components";
const BASE_PATH = "/static/";
const TestResultContentStyle = styled(TestContentStyle)`
  width: 60%;
  @media (max-width: ${xs}px) {
    width: 90%;
  }
`;

export const HeadingStyle = styled.div`
  text-align: center;
  margin-bottom: ${props => props.mb || "43px"};

  @media (max-width: ${xs}px) {
    width: 100%;
    margin-bottom: 30px;
  }

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${xs}px) {
      flex-direction: column-reverse;
    }
  }
  & h3 {
    display: inline-block;
    font-size: 36px;
    margin-top: 0;
    margin-bottom: 0;
    color: #484848;
    @media (max-width: ${xs}px) {
      font-size: 28px;
      margin-bottom: 8px;
    }
  }
  & b {
    color: #0064e6;
  }
  & img {
    margin-left: 20.5px;
    width: 54px;
    @media (max-width: ${xs}px) {
      margin-left: 0;
      margin-bottom: 8px;
    }
  }
  & p {
    font-size: 24px;
    margin-top: 20px;

    @media (max-width: ${xs}px) {
      font-size: 18px;
    }
  }

  .sub-header {
    color: #484848;
    font-weight: 500;
  }
`;

const HeaderContent = ({ heading, caption, children, icon }) => (
  <div>
    <HeadingStyle>
      <div>
        {heading && <h3>{heading}</h3>}
        <img src={`${BASE_PATH}img/skills/${icon}.png`} alt="" />
      </div>
      <p>{caption || children}</p>
    </HeadingStyle>
  </div>
);

export class ResultComponent extends React.Component {
  render() {
    const { details } = this.props;
    const resultInfo = [
      {
        category: "Test taken",
        heading: {
          detail: details.name
        },
        detail: <i>{details.description}</i>
      },
      {
        category: (
          <React.Fragment>
            Score
            <Div
              css={`
                margin-left: ${spacing.s};
                @media (max-width: ${xs}px) {
                  margin-left: 0;
                }
              `}
            >
              {" "}
              (out of 100%)
            </Div>
          </React.Fragment>
        ),
        heading: {
          detail: `${this.props.percentage_score}%`,
          badge: this.props.didPassTest ? (
            <SuccessBadge inverse>Top {details.percentile}%</SuccessBadge>
          ) : (
            <DangerBadge inverse>Below Average</DangerBadge>
          )
        },
        detail: ""
      },

      {
        category: "Rank",
        heading: { detail: details.position },
        detail: ""
      },
      {
        category: "Time to complete",
        heading: {
          detail: details.timeToComply
        },
        detail: ""
      }
    ];
    const passedStatus = {
      icon: this.props.didPassTest ? "fist-icon@2x" : "sad-icon@2x",
      content1: this.props.didPassTest ? "Fantastic" : "Oops",
      content2: `You ${
        this.props.didPassTest ? "Passed" : "didn't pass"
      } the test`
    };

    return (
      <React.Fragment>
        <TestResultContentStyle>
          <HeaderContent icon={passedStatus.icon}>
            <p>
              <b>{passedStatus.content1}!</b> {passedStatus.content2}
            </p>
          </HeaderContent>

          <Div
            css={`
              justify-content: center;
              width: 65%;
              @media (max-width: ${xs}px) {
                width: 100%;
              }
              & > div {
                @media (max-width: ${xs}px) {
                  width: 100%;
                }
              }
            `}
          >
            <div>
              {resultInfo.map((value, index) => (
                <Div
                  css={`
                    display: flex;
                    margin-bottom: ${spacing.l};
                    margin-left: 10px;
                    @media (max-width: ${xs}px) {
                      margin-left: 0;
                    }
                  `}
                  key={index}
                >
                  <Div
                    css={`
                      width: 40%;
                      display: flex;
                      @media (max-width: ${xs}px) {
                        flex-direction: column;
                      }
                    `}
                  >
                    {value.category}
                  </Div>
                  <Div
                    css={`
                      width: 60%;
                    `}
                    className="details"
                  >
                    <Text
                      big
                      css={`font-weight: bold;span{
                                margin-left: ${spacing.m}}`}
                    >
                      {value.heading.detail} <span>{value.heading.badge}</span>
                    </Text>
                    {value.detail && <Text>{value.detail}</Text>}
                  </Div>
                </Div>
              ))}
            </div>
          </Div>
          <PrimaryButton
            css={`
              @media (max-width: ${xs}px) {
                width: 100% !important;
              }
            `}
            big
            onClick={this.props.afterTest}
          >
            Continue to next step
          </PrimaryButton>
        </TestResultContentStyle>
      </React.Fragment>
    );
  }
}

export default ResultComponent;
