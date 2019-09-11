import React from "react";
import {
  BaseScheduleComponent,
  NRadioComponent
} from "../ClientRequestPages/BaseLessonSchedule";
import { font_used, spacing } from "../../design-systems";

const TutorPreferenceSectionStyle = `
  margin-bottom: 32px!important; 
  label {
    margin-bottom: ${spacing.m}!important;
    span {
      ${font_used.form_label};
      display: inline!important;
      padding-top: 0!important;
      font-weight: bold;
      font-size: 16px;
    }
    .control__indicator {
      top: 4px;
    }
  }
`;
export class LessonScheduleComponent extends React.Component {
  // customPricingCondition = (lessonCount, hourlyRate, state) => {
  //   return lessonCount * hourlyRate ;
  // };
  render() {
    const { data: { exam = "ielts" } = {} } = this.props;
    return (
      <BaseScheduleComponent
        {...this.props}
        order="top"
        onPlan
        extraForms={(state, _, updateState) => (
          <React.Fragment>
            {NRadioComponent(
              {
                name: `Select your tutor preference`,
                options: [
                  {
                    text: `Skilled`,
                    subtext: `Excellent mastery of ${exam.toUpperCase()} and good track record with previous students`,
                    value: "Plan 1"
                  },
                  {
                    text: `Expert`,
                    subtext: `Experienced ${exam.toUpperCase()} tutor with proven track record & consistent high ratings`,
                    value: "Plan 2"
                  },
                  {
                    text: `Professional`,
                    subtext: `Certified Top-rated ${exam.toUpperCase()} tutor. Proven track record with 100% pass rate`,
                    value: "Plan 3"
                  }
                ],
                css: TutorPreferenceSectionStyle
              },
              { direction: "column" }
            )(state.plan, val => updateState("plan", val))}
          </React.Fragment>
        )}
      />
    );
  }
}
