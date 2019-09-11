import React from "react";
import { DropdownComponent } from "../../form";
import { spacing, Heading, Text, xs, Icon } from "../../pages/components";

import { PriceSummaryComponent } from "./PricingComponent";
import { Div } from "../../primitives";
import { color } from "../../siteStyle";
import { ClientPageWrapper } from "./ClientPageWrapper";
import { SecondaryButton } from "../../simple/Button";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import ImageNotice from "../../simple/ImageNotice";

class LessonComponent extends React.Component {
  state = {
    add: false,
    disabled: false
  };
  addLesson = () => {
    this.setState({
      add: !this.state.add
    });
  };
  onSubjectSelect = () => {
    this.setState({
      disabled: true
    });
  };
  render() {
    return (
      <Div
        css={`
          display: flex;
          border-radius: 4px;
          position: relative;
          border: 1px solid ${color.gray.ui_03};
          @media (max-width: ${xs}px) {
            flex-direction: column;
          }
        `}
      >
        <Div
          css={`
            background-image: url(${this.props.image});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            width: 250px;

            @media (max-width: ${xs}px) {
              width: 100%;
              height: 250px;
            }
          `}
        />
        <Div
          css={`
            background: ${color.white};
            padding: ${spacing.l} ${spacing.xxl};
            @media (max-width: ${xs}px) {
              padding: ${spacing.l};
            }
          `}
        >
          <Heading
            css={`
              padding-bottom: ${spacing.s};
              font-size: 18px;
            `}
          >
            {this.props.text}
          </Heading>
          <Div
            css={`
              display: flex;
              align-items: center;
              justify-content: space-between;

              button {
                margin-right: ${spacing.s};
              }
              div {
                width: 100% !important;
              }
            `}
          >
            <SecondaryButton
              onClick={this.addLesson}
              disabled={this.state.disabled}
              css={`
                &:disabled {
                  cursor: not-allowed;
                  background-color: ${color.gray.ui_03}!important;
                  border-color: ${color.gray.ui_03}!important;
                  color: ${color.white}!important;
                }
              `}
            >
              {this.state.disabled ? "Added" : "Add"}
            </SecondaryButton>
            {this.state.add ? (
              <FormFieldsContainer>
                <DropdownComponent onChange={this.onSubjectSelect} />
              </FormFieldsContainer>
            ) : null}
          </Div>
        </Div>
      </Div>
    );
  }
}

export class UpSellComponent extends React.Component {
  state = {
    lessons: [
      {
        text: "Add 1 day of music lesson per week at N10,000 for 1 month",
        image: "/static/img/profile/francis.png"
      }
    ]
  };
  render() {
    return (
      <ClientPageWrapper
        current={3}
        heading="Recommended for your child"
        description="Most parents who placed request also added these"
        rightSection={
          <PriceSummaryComponent
            className="tool-tip"
            sections={[
              [
                {
                  text: "Hourly rate",
                  value: "₦2,500/hr",
                  summary:
                    "This is based on average prices tutors charge in your location assuming you teach 2-hour lessons 3 times a week. How much you actually make may vary with your pricing, location, subjects, demand and other factors."
                },
                {
                  text: "Hours/day",
                  value: "4hrs"
                },
                {
                  text: "Number of lessons",
                  value: "12 lessons"
                }
              ],
              [{ text: "Total", value: "₦50,000" }]
            ]}
          />
        }
        css={`
          display: flex;
          .tool-tip {
            margin-top: ${spacing.xxl};
            margin-left: ${spacing.xxxl};

            @media (max-width: ${xs}px) {
              display: none;
            }
          }
        `}
      >
        {this.state.lessons.map((lesson, i) => (
          <LessonComponent
            key={i.toString()}
            text={lesson.text}
            image={lesson.image}
          />
        ))}
      </ClientPageWrapper>
    );
  }
}
