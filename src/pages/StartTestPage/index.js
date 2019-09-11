import React from "react";
import styled from "styled-components";
import { WizardWrapper, FormColumn, Text, Div } from "../components";
import {
  PrimaryButton,
  LoadingButton,
  ButtonWithIcon
} from "../../simple/Button";
import Icon from "../../simple/Icon";
import { TestContentStyle } from "../../layout/ContentStyle";
import globals, { font_size, spacing } from "../../siteStyle";
import { FormHeading } from "../../form";
import { PreviousLink } from "../../compound/AddIcon";
const { xs } = globals;

export const InstructionWrap = styled.div`
  display: flex;
  margin-bottom: 38px;
  margin-left: 10px;
  justify-content: space-between;

  @media (max-width: ${xs}px) {
    justify-content: center;
    padding-left: 14px;
    padding-right: 24px;
    margin-left: 0;
    & > div {
      // flex-grow: 1;
      margin-right: 35px;
    }
    & .details {
      // margin-left: -10px !important;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  & .details {
    margin-left: 20px;
    width: 80%;

    @media (max-width: ${xs}px) {
      width: 60%;
      margin: 0;
    }

    & h4 {
      color: #47525d;
      font-size: 16px;
      margin: 0;

      @media (max-width: ${xs}px) {
        font-size: 14px;
        color: #484848;
      }
    }

    & p {
      color: #7b8994;
      font-size: 16px;
      font-weight: 300;
      margin-bottom: 0;

      @media (max-width: ${xs}px) {
        font-size: 14px;
        color: #848484;
      }
    }
  }
`;

const ExtendedTestContentStyle = styled(TestContentStyle)`
  & > h2 {
    margin-bottom: 36px;
  }
  @media (max-width: ${xs}px) {
    & > h2 {
      margin-bottom: 0;
      font-size: 15px;
      font-weight: bold;
    }
    & .test-wrap {
      background: white;
      width: 100%;
      padding-top: 25px;
      margin-top: 0;
      margin-bottom: 0;
      padding-bottom: 18px;
      border: 1px solid #f0f0f0;
      border-bottom: none;
    }
  }
  & .test-bottom {
    @media (max-width: ${xs}px) {
      background: white;
      border: 1px solid #f0f0f0;
      border-top: none;
    }
    & .icon-wrap {
      font-size: 17px;
      color: #7b8994;
      font-weight: 500;
      cursor: pointer;
    }
    & ${PrimaryButton} {
      & span:last-child {
        display: none;

        @media (max-width: ${xs}px) {
          display: initial;
          float: right;
        }
      }
    }
  }
`;
class StartTestPage extends React.Component {
  previousPage = () => {
    return { base: "subjects", previous: "subject-list" };
    // this.props.navigateTo(0, "start-test", "subject-list");
  };
  nextPage = () => {
    const {
      currentSubject = {
        name: "General Mathematics",
        slug: "general-mathematics"
      }
    } = this.props;
    this.props.navigateTo(0, "start-test", currentSubject.slug, "quiz");
  };
  render() {
    const { currentSubject, duration, retake = false } = this.props;
    let instructions = [
      {
        icon: "watch",
        heading: "Time Limit",
        detail: `${duration} Minutes | Automatic submission`
      }
    ];
    if (retake) {
      instructions.push({
        icon: "refresh",
        heading: "Test Retake",
        detail:
          "In the event you fail the test, you can come back to retake it in 30 Days "
      });
    }
    return (
      <WizardWrapper
        navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
        title="Take Subject Test"
        goToNextScreen={this.props.nextPage}
        hideFooter={true}
        section={this.props.section}
        showPreviousScreen={true}
        previousPageFunc={this.props.previousPage}
        helperStyle={` @media(max-width: ${xs}px) {
                      margin-left: ${spacing.m};
                      margin-right: ${spacing.m};
                    }`}
      >
        <FormColumn full_width>
          <FormHeading
            css={`
              text-align: center;
              h2 {
                color: #0064e6;
                font-size: ${font_size.xl};
                font-weight: bold;
                @media (max-width: ${xs}px) {
                  font-size: ${font_size.l};
                }
              }
              p {
                color: #47525d;
                @media (max-width: ${xs}px) {
                  width: 90%;
                  margin: 0 auto;
                }
              }
            `}
            heading="Take Test"
          >
            <Text>
              Prove your knowledge of {currentSubject.name} and impress
              potential clients by taking our test!
            </Text>
            <Text
              css={`
                @media (max-width: ${xs}px) {
                  display: none;
                }
              `}
            >
              The more relevant tests you pass, the more professional you look
            </Text>
          </FormHeading>
          <ExtendedTestContentStyle>
            <h2>Test Instructions</h2>
            <Div
              css={`
                hr {
                  height: auto !important;
                }
              `}
              className="test-wrap"
            >
              <Div
                css={`
                  width: 50%;
                `}
              >
                {instructions.map(value => (
                  <InstructionWrap key={value.icon}>
                    <div>
                      <Icon name={value.icon} width={40} height={40} />
                    </div>
                    <div className="details">
                      <h4>{value.heading}</h4>
                      <p>{value.detail}</p>
                    </div>
                  </InstructionWrap>
                ))}
              </Div>

              <hr />
              <Div
                className="test-wrap__right"
                css={`
                  width: 60%;
                `}
              >
                <h4>Good to go?</h4>
                <p>
                  <span>
                    Click begin to start the [{currentSubject.name}] Test.
                  </span>
                  <span>Hope you perform well, good luck!</span>
                </p>
                <br />
                <p>
                  <b>or</b> click cancel to go back
                </p>
              </Div>
            </Div>
            <div className="test-bottom">
              {/* <PreviousLink
                text="Back to all tests"
                onClick={this.props.previousPage}
                css={`
                  @media (max-width: ${xs}px) {
                    display: none;
                  }
                `}
              /> */}
              <LoadingButton
                kind={ButtonWithIcon}
                icon="arrow-right"
                primary
                right
                big
                css={`
                  width: 30%;
                  margin: 0 auto;
                  @media (max-width: ${xs}px) {
                    width: 100%;
                    margin: 0 auto;
                  }
                `}
                spanStyle={{ width: "90%" }}
                iconStyle={{ fill: "#ffffff", width: "16px", height: "16px" }}
                buttonStyle={`display:flex!important; align-items:center; min-width: 136px!important`}
                loading={this.props.loading}
                onClick={this.props.nextPage}
              >
                Begin Test
              </LoadingButton>
            </div>
          </ExtendedTestContentStyle>
        </FormColumn>
      </WizardWrapper>
    );
  }
}

export default StartTestPage;
