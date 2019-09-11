import React from "react";
import {
  NotificationChangeComponent,
  NotificationContext
} from "../TutorApplicationUtils/PageWrapper";
import styled, { css } from "styled-components";
import { PrimaryButton } from "../../simple/Button";

import { WizardWrapper, FormColumn, Div } from "../components";

import { xs, spacing } from "../../siteStyle";
import ContentStyle from "./ContentStyle";
const StepContainerMobile = styled.div`
  @media (max-width: ${xs}px) {
    padding-left: 24px;
    margin-bottom: 34px;
    & h2 {
      margin-top: 3px !important;
      font-size: 14px !important;
      line-height: 18px;
    }
  }
`;
const Step = styled.div`
  width: 33%;
  text-align: center;

  @media (max-width: ${xs}px) {
    width: 85%;
    display: flex;
    text-align: left;
    &:last-child {
      & ${StepContainerMobile} {
        margin-bottom: 0 !important;
      }
    }}
  }
  & h2 {
    margin-top: 25px;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  & p {
    color: #767676;
    font-size: 15px;
    width: 96%;
    @media(max-width: 768px){
      font-size: 14px;
    }
  }
`;
const Steps = styled.div`
  display: flex;
  margin-bottom: 51px;
  margin-top: 38px;
  align-items: center;

  @media (max-width: ${xs}px) {
    margin-bottom: 60px;
    flex-direction: column;
    margin-top: 30px;
  }
`;

export const SummaryContainer = ({
  newTitle,
  nextPage,
  mobileTitle,
  nextButtonText,
  data = [],
  below = true,
  children,
  buttonCss = ``,
  previousPage
}) => {
  return (
    <NotificationContext.Consumer>
      {({ title, changeTitle }) => {
        return (
          <NotificationChangeComponent
            changeTitle={changeTitle}
            title={newTitle}
          >
            <WizardWrapper
              buttonStyle={{ backgroundColor: "#36B37E" }}
              navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
              hideFooter={true}
              previousPageFunc={previousPage}
              goToPreviousScreen={previousPage}
              displaySubnav={false}
              nextButtonText={nextButtonText}
              title={mobileTitle}
              goToNextScreen={nextPage}
              showNextScreen={false}
              showPreviousScreen={true}
              helperStyle={`@media(max-width:${xs}px){
                  padding-left: ${spacing.m};
                  padding-right: ${spacing.m};
              }`}
            >
              <FormColumn full_width>
                <ContentStyle>
                  {children}
                  <Div
                    css={`
                      display: flex;
                      flex-direction: ${below ? "column" : "column-reverse"};
                    `}
                  >
                    <Steps>
                      {data.map(value => (
                        <Step>
                          {value.icon}
                          <StepContainerMobile>
                            <h2>{value.heading}</h2>
                            <p>{value.caption}</p>
                          </StepContainerMobile>
                        </Step>
                      ))}
                    </Steps>
                    <PrimaryButton
                      big
                      css={`
                        @media (max-width: ${xs}px) {
                          position: fixed;
                          bottom: 0;
                          left: 0;
                          width: 100% !important;
                          margin-left: 0;
                        }
                        ${buttonCss};
                      `}
                      onClick={nextPage}
                    >
                      {nextButtonText}
                    </PrimaryButton>
                  </Div>
                </ContentStyle>
              </FormColumn>
            </WizardWrapper>
          </NotificationChangeComponent>
        );
      }}
    </NotificationContext.Consumer>
  );
};
