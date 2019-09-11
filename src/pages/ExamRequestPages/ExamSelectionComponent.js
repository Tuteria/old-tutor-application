//@ts-check
import React from "react";
import isEmpty from "lodash/isEmpty";
import { ClientPageWrapper } from "../ClientRequestPages/ClientPageWrapper";
import { IncrementComponent, DropdownComponent } from "../../form";
import { Text } from "../../simple/Text";
import Notification from "../../simple/Notification";
import { spacing, xs, Div } from "../../pages/components";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import {
  MultiselectComponent,
  RadioComponent,
  DropdownComponent as NDropdownComponent
} from "../SubjectDetailsPage/question-types";
import { InputComponent, TextareaComponent } from "../../form";
import { getExamType } from "./index";
// {
//       exam: this.props.exam,
//       student_no: 1,
//       exam_before: false,
//       selections: [],
//       date_of_exam: null,
//       purpose: null,
//       targeted_score: null,
//       expectation: null
//     }

const CustomStyles = `
.exam-type {
  & > label {
    margin-bottom: 8px!important;
  }
}
`;
export class ExamSelectionComponent extends React.Component {
  state = {
    fields: this.props.data || {},
    display: false
  };
  componentDidMount() {
    const { data, groups } = this.props;
    if (!isEmpty(data)) {
      let groupData = getExamType(data.exam, groups);
      let fields = data;
      if (!Array.isArray(groupData.purposes)) {
        fields.purpose = groupData.purposes;
      }
      if (
        Array.isArray(groupData.exam_type) &&
        groupData.or &&
        groupData.exam_type.length === 1
      ) {
        fields.exam_type = groupData.exam_type[0];
      } else {
        fields.exam_type = [];
      }
      this.setState({ fields });
    }
  }
  addChild = () => {
    const { student_no } = this.state.fields;
    if (student_no < 10) {
      this.setState({
        fields: { ...this.state.fields, student_no: student_no + 1 }
      });
    }
  };
  removeChild = () => {
    const { student_no } = this.state.fields;
    if (student_no > 1) {
      this.setState({
        fields: { ...this.state.fields, student_no: student_no - 1 }
      });
    }
  };
  addClass = (val, index) => {
    this.setState({
      classes: this.state.classes.map((klass, ind) => {
        return ind === index ? { class: val } : klass;
      })
    });
  };
  isValid() {
    let { fields } = this.state;
    return fields.exam && !isEmpty(fields.exam_type) && fields.purpose;
  }
  onSubmit = () => {
    if (this.isValid()) {
      this.props.onSubmit(this.state.fields);
    } else {
      this.setState({ display: true });
    }
  };
  render() {
    let state = this.state.fields;
    let groupData = getExamType(state.exam, this.props.groups);
    return (
      <ClientPageWrapper
        showLoadingButton
        heading={`Let’s get you an expert ${state.exam.toUpperCase()} tutor`}
        description="Tell us about your exams"
        onSubmit={this.onSubmit}
        loading={this.isValid() && this.props.loading}
        css={CustomStyles}
      >
        <React.Fragment>
          {/* {this.state.display && !this.isValid() ? (
            <Notification
              styling={`margin-bottom: ${spacing.xl}`}
              className="error"
            >
              <Text>Please Select the subjects for the student.</Text>
            </Notification>
          ) : null} */}

          <Div
            css={`
              display: flex;
              align-items: center;
              label {
                margin-right: ${spacing.xxl};
                margin-bottom: 0;
                display: block;
                font-size: 17px;
                font-weight: 600;
                color: #484848;
              }
              margin-bottom: ${spacing.xl};
              @media (max-width: ${xs}px) {
                justify-content: space-between;
              }
            `}
          >
            <label>How many students need exam prep?</label>
            <IncrementComponent
              number={state.student_no}
              maxNumber={10}
              scale={1.4}
              incrementCallback={this.addChild}
              decrementCallback={this.removeChild}
            />
          </Div>
          <Div
            css={`
              margin-bottom: ${spacing.xl};
              .select {
                max-width: 350px;
              }
            `}
          >
            {Array.isArray(groupData.purposes) &&
              NDropdownComponent(
                {
                  name: `For what purpose?`,
                  options: groupData.purposes,
                  defaultText: "Select purpose",
                  useDefault: true
                },
                {
                  direction: "down",
                  error_message: "Select a purpose from the dropdown"
                }
              )(
                state.purpose,
                purpose =>
                  this.setState({
                    fields: { ...state, purpose }
                  }),
                () => this.state.display && !Boolean(state.purpose)
              )}
          </Div>
          {state.exam &&
          Array.isArray(groupData.exam_type) &&
          groupData.exam_type.length > 1
            ? groupData.or
              ? RadioComponent({
                  name: `Which ${state.exam.toUpperCase() ||
                    ""} exam are you writing?`,
                  options: groupData.exam_type,
                  error_message: "Select an exam type",
                  error: this.state.display && isEmpty(state.exam_type),
                  css: `margin-bottom: ${spacing.xl};`
                })(
                  state.exam_type,
                  exam_type =>
                    this.setState({
                      fields: { ...state, exam_type }
                    }),
                  () => this.state.display && isEmpty(state.exam_type)
                )
              : MultiselectComponent({
                  name: "For what levels?",
                  options: groupData.exam_type,
                  error_message: "Select an exam level",
                  error: this.state.display && isEmpty(state.exam_type)
                })(state.exam_type, exam_type =>
                  this.setState({ fields: { ...state, exam_type } })
                )
            : null}
          {RadioComponent({
            name: "Is this your first attempt?",
            options: ["Yes", "No"],
            css: `margin-bottom: 0;@media(max-width: ${xs}px){max-width: 300px;}`
          })(state.exam_before ? "Yes" : "No", exam =>
            this.setState({
              fields: { ...state, exam_before: exam === "Yes" }
            })
          )}
        </React.Fragment>
      </ClientPageWrapper>
    );
  }
}
