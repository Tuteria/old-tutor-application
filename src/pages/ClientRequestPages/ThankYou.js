import React from "react";
import { Div } from "../../primitives";
import {
  spacing,
  Heading,
  Text,
  xs,
  Icon,
  PrimaryButton
} from "../../pages/components";
import { BgWrap, Logo, Avatar, Bitmap } from "../CongratulationsPage";
import bitmap from "./Thank-You.png";
import { TestContentStyle } from "../../layout/ContentStyle";
import { color, font_used } from "../../siteStyle";
import LogoCombined from "../../compound/icons/Logo";

const InfoCardStyle = TestContentStyle.extend`
  max-width: 740px;
  width: unset;
  z-index: 2;
  margin-top: 0;
  border: 0;
  box-shadow: 0 8px 16px 0 rgba(27, 39, 51, 0.08);
  border: 1px solid #e6e8eb;
  border-radius: 4px;
  padding: 40px ${spacing.xxxl};
  align-items: initial;
  @media (max-width: ${xs}px) {
    padding: 0;
  }
`;

export class ClientThankYou extends React.Component {
  render() {
    const steps = [
      {
        heading: "Call from Me",
        text:
          "I'll review your request and give you a call to better understand your needs."
      },
      {
        heading: "Get a list of Tutors",
        text:
          "I'll send you options of tutors who are the best fit for your request."
      },
      {
        heading: "Pay and Begin Lessons",
        text:
          "Once you pick the tutor who meets your standard, you can pay and begin lessons."
      }
    ];
    const { name, email, phone_number, title, link, image_url } = this.props;
    return (
      <BgWrap>
        <Bitmap
          css={`
            background-color: ${color.blue.primary};
            height: 350px;
            background-repeat: no-repeat;
            background-position: center -120px;
            background-size: contain;
            @media (max-width: ${xs}px) {
              height: 180px;
            }
          `}
          bitmap={bitmap}
        />
        <Div
          css={`
            text-align: center;
            z-index: 10;
            padding: ${spacing.xxl} 0;
            svg {
              height: ${spacing.xl};
            }
          `}
        >
          <LogoCombined textColor="white" />
        </Div>
        <InfoCardStyle>
          <Div
            css={`
              display: flex;
              align-items: center;
              border-bottom: 1px solid ${color.gray.ui_03};
              padding-bottom: 40px;
              @media (max-width: ${xs}px) {
                flex-direction: column;
                text-align: center;
              }
            `}
          >
            <Avatar
              css={`
                min-width: 152px;
                min-height: 152px;
                width: 152px;
                height: 152px;
              `}
              image={image_url}
            />
            <Div
              css={`
                margin-left: 40px;
                & > h1 {
                  padding-bottom: ${spacing.xs};
                }
                @media (max-width: ${xs}px) {
                  margin-left: 0;
                  & > h1 {
                    padding-bottom: ${spacing.s};
                  }
                }
              `}
            >
              <Heading
                css={`
                  font-size: ${spacing.l};
                `}
              >
                Thank you for placing a request!
              </Heading>
              <Text big>
                I'm {name}, a Customer Service Agent at Tuteria. I’m here to
                ensure you get the best experience working with us{" "}
              </Text>
            </Div>
          </Div>
          <Heading
            css={`
              text-align: left;
              padding: ${spacing.l} 0;
              font-size: ${spacing.l};
              @media (max-width: ${xs}px) {
                text-align: center;
              }
            `}
          >
            What Next?
          </Heading>
          <Div
            css={`
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid ${color.gray.ui_03};
              padding-bottom: ${spacing.l};

              @media (max-width: ${xs}px) {
                display: block;
              }
              .step {
                width: 32%;
                @media (max-width: ${xs}px) {
                  width: 100%;
                  text-align: center;
                  padding-bottom: ${spacing.m};

                  p {
                    padding: 0 ${spacing.m};
                  }
                }
              }
              .step-count {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid ${color.green.primary};
                width: ${spacing.l};
                height: ${spacing.l};
                margin-bottom: ${spacing.s};
                border-radius: 50%;
                color: ${color.green.primary};
                @media (max-width: ${xs}px) {
                  margin: 0 auto;
                }
              }
            `}
          >
            {steps.map((step, i) => (
              <WhatNextStep
                heading={step.heading}
                text={step.text}
                count={i + 1}
                key={i.toString()}
              />
            ))}
          </Div>
          {/* <Div
            css={`
              display: flex;
              align-items: center;
              padding-top: 24px;
              padding-bottom: 24px;
              border-bottom: 1px solid rgb(221, 221, 221);
            `}
          >
            <Text
              css={`
                padding-right: ${spacing.m};
              `}
            >
              This is required to process your request and get you the best
              tutors closest to you. It's a sign of commitment shown on your
              part.
            </Text>
            {link && (
              <PrimaryButton
                onClick={() => {
                  window.location.href = link;
                }}
              >
                Pay Processing Fee
              </PrimaryButton>
            )}
          </Div> */}
          <Div
            css={`
              padding-top: ${spacing.l};
              padding-bottom: ${spacing.l};
            `}
          >
            <Heading
              css={`
                padding-bottom: ${spacing.s};
                font-size: ${spacing.l};
                @media (max-width: ${xs}px) {
                  text-align: center;
                }
              `}
              medium
            >
              Have questions? Feel free to reach out to me
            </Heading>
            <Div
              css={`
                display: flex;
                align-items: center;
                @media (max-width: ${xs}px) {
                  flex-direction: column;
                }
              `}
            >
              <Div
                css={`
                  display: flex;
                  align-items: center;
                  padding-right: ${spacing.xl};
                  p {
                    padding-left: ${spacing.s};
                  }
                  @media (max-width: ${xs}px) {
                    padding-right: 0;
                  }
                `}
              >
                <Icon name="emailSolid" />
                <Text>{email}</Text>
              </Div>
              <Div
                css={`
                  display: flex;
                  align-items: center;
                  p {
                    padding-left: ${spacing.s};
                  }
                `}
              >
                <Icon name="phoneSolid" primary />
                <Text>{phone_number}</Text>
              </Div>
            </Div>
          </Div>
        </InfoCardStyle>
      </BgWrap>
    );
  }
}

const WhatNextStep = ({ heading, text, count }) => {
  return (
    <Div className="step">
      <Div className="step-count">{count}</Div>
      <Heading
        css={`
          font-size: ${spacing.m};
          @media (max-width: ${xs}px) {
            font-size: 19px !important;
          }
        `}
      >
        {heading}
      </Heading>
      <Text>{text}</Text>
    </Div>
  );
};
