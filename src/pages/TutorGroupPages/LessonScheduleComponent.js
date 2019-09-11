import React from "react";
import styled, { injectGlobal } from "styled-components";
import ReactModal from "react-modal";
import {
  BaseScheduleComponent,
  NDropdownComponent
} from "../ClientRequestPages/BaseLessonSchedule";
import {
  xs,
  Heading,
  Text,
  PrimaryButton,
  CloseButton,
  Icon
} from "../components";
import { color } from "../../design-systems";
import { ModalBody } from "../AboutTutorPage/ExampleModal";
import { Modal } from "../../simple/Modal";

import { AsyncAutoSelect } from "../../simple/AutoSelect";

injectGlobal`
.ReactModal__Overlay {
  z-index: 20000;
  background-color: rgba(0, 0, 0, 0.08)!important;
}
`;

const ConfirmationModalContainer = styled(Modal)`
  max-width: 700px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 0;
  padding-top: 64px;
  padding-bottom: 64px;
  border: none;
`;

const ConfirmationModalBody = styled(ModalBody)`
  text-align: center;

  .close-button {
    outline: none;
  }

  .checkmark-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    margin: 0 auto;
    margin-bottom: 16px;
    border-radius: 50%;
    background-color: ${color.green.faint};
  }

  .heading {
    padding-bottom: 16px;
    max-width: 510px;
    margin: 0 auto;
  }
  .subheading {
    padding-bottom: 16px;
    max-width: 350px;
    margin: 0 auto;
    .asterisk {
      color: #ed6344;
    }
  }
  @media (max-width: ${xs}px) {
    .heading {
      padding-bottom: 32px;
    }
    .subheading {
      padding-bottom: 32px;
    }
  }
`;

export class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({
        showModal: this.props.showModal
      });
    }
  }
  closeModal = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.setState({
      showModal: false
    });
  };
  render() {
    const { showModal } = this.state;
    const { student } = this.props;
    return (
      <ConfirmationModalContainer
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
      >
        <CloseButton
          onClick={() => {
            this.setState({ showModal: false });
          }}
          className="close-button"
        >
          <Icon name="close" fill="#000" />
        </CloseButton>
        <ConfirmationModalBody>
          <div className="checkmark-container">
            <svg
              width="32"
              height="28"
              viewBox="0 0 32 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4801 27.5269L0.833313 17.8781L4.29369 14.4158L10.3136 20.4357L28.1697 0.791687L31.7906 4.0856L10.4801 27.5269Z"
                fill="#36B37E"
              />
            </svg>
          </div>

          <Heading small className="heading">
            An email has been sent to {student} to make payment for the private
            lessons
          </Heading>
          <Text className="subheading">
            <span className="asterisk">*</span>
            Ensure you followup on the {student} to ensure they’ve made payment
          </Text>
          <PrimaryButton onClick={this.closeModal}>Book again</PrimaryButton>
        </ConfirmationModalBody>
      </ConfirmationModalContainer>
    );
  }
}

const ExtraFormStyles = `
    margin-bottom: 32px!important; 
`;
const BaseScheduleCustomStyle = `
.summary-next-button {
    svg {
        display: none;
    }
}
.price-breakdown-component {
    position: absolute;
    left: 0;
    margin-top: 64px;
    .left-section {
      flex: 0 1 200px;

      .help-tip {
        display: none;

        &>p {
          font-weight: normal;
        }
      }
    
      p:first-of-type {
        padding-bottom: 4px;
      }
      #help-text {
        font-size: 14px;
      }
    }
    
    .right-section {
      flex: 1 1 auto;
      justify-content: flex-end;
      display: flex;
      &>h1 {
        font-size: 19px;
      }
    }
    @media (max-width: ${xs}px) {
      position: relative;
      margin-top: 0;
      border: none;
      border-radius: 0;

      .left-section {
        .help-tip {
          display: inline-block;
          padding-left: 4px;
        }
        p:first-of-type {
          padding-bottom: 0;
        }
        #help-text {
          display: none;
        }
      }
    }
}
.proceed-button {
    padding: 0 24px!important;
    svg {
        display: none;
    }
}
.tool-tip {
  position: relative!important;

  @media(max-width: 768px) {
    position: fixed!important;

    .breakdown-section {
      order:1;
    }
    .big-summary-section {
      order: 2;
    }
    .tooltip-content__container {
      order: 3;
    }
    .price-breakdown-component {
      order: 4;
    }
    .summary-next-button__container {
      order: 5;
    }
  }
}
@media(max-width: ${xs}px) {
    .proceed-button {
        display: none!important;
    }
}
`;

export class LessonScheduleComponent extends React.Component {
  state = {
    students: this.props.students || [],
    subjects: [],
    student: this.props.student || ""
  };
  refComp = null;
  getStudentNames = () => {
    return this.state.students.map(x => x.name);
  };
  findInstance = value => {
    return this.state.students.find(
      x => x.name.toLowerCase() === value.toLowerCase()
    );
  };
  createRequestInstance = data => {
    let instance = this.findInstance(data.student);
    let request_instance = {
      request_details: data,
      personal_info: instance.personal_info || {},
      location: instance.location || {}
    };
    return request_instance;
  };
  onSubmit = data => {
    let request_instance = this.createRequestInstance(data);
    this.props.onSubmit(request_instance);
  };
  onStudentSelect = (value, resultSet) => {
    let { display_subjects = true } = this.props;
    if (!!value) {
      let student = this.findInstance(value);
      if (student) {
        this.refComp.updateStates({ student: student.name });
        this.setState(
          { subjects: student.subjects, student: student.name },
          () => {
            if (!display_subjects) {
              this.onSubjectSelect(
                this.props.selected_subject,
                (x, value) => x.skill_name.toLowerCase() === value.toLowerCase()
              );
            }
          }
        );
      }
      // updateState("student", value);
    }
  };
  onSubjectSelect = (
    value,
    condition = (x, value) => x.pk === parseInt(value)
  ) => {
    let subject = this.state.subjects.find(x => condition(x, value));
    if (subject) {
      this.refComp.updateStates({
        tutor_skill: subject.pk,
        time_of_lesson: subject.time,
        hours: subject.hours,
        no_of_weeks: subject.duration,
        days: subject.days,
        per_hour: subject.per_hour,
        earning_rate: subject.earning_rate
      });
    }
  };

  isValidCondition = state => {
    let { request_details = {} } = state;
    return true;
  };

  clearBookings = () => {
    this.setState({ subjects: [], student: "" });
    this.refComp.updateStates({
      tutor_skill: undefined,
      time_of_lesson: undefined,
      hours: 1,
      student: "",
      no_of_weeks: 4,
      days: [],
      earning_rate: 0.7
    });
  };

  dateOptions = () => {
    return [
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM"
    ];
  };
  render() {
    const { display_subjects = true, loading } = this.props;
    return (
      <React.Fragment>
        <BaseScheduleComponent
          ref={node => (this.refComp = node)}
          {...this.props}
          onSubmit={this.onSubmit}
          order="top"
          // isValidCondition={this.isValidCondition}
          date_options={this.dateOptions()}
          css={BaseScheduleCustomStyle}
          heading="Book private lesson"
          description="Schedule a private lesson with student"
          proceedButtonText="Send Confirmation"
          type="tutor-schedule"
          display_discount={false}
          showLoadingButton
          showBreakdown
          showLessonBreakdownSection
          showProceedButton={false}
          loading={loading}
          extraForms={(state, _, updateState) => {
            return (
              <React.Fragment>
                <AsyncAutoSelect
                  label="What is the name of the student?"
                  value={this.state.student}
                  promptText="Type the name or email of student"
                  placeholder="Type the name or email of student"
                  errorStyle="margin-top: 8px !important;"
                  css={
                    ExtraFormStyles // field_name="vicinity"
                  }
                  onChange={this.onStudentSelect}
                  controlled={false}
                  options={this.getStudentNames()}
                />
                {this.state.subjects.length > 0 &&
                  display_subjects &&
                  NDropdownComponent({
                    name: "Select the subject to book?",
                    useDefault: true,
                    defaultText: "Select Subject",
                    css: ExtraFormStyles,
                    top: "100%",
                    options: this.state.subjects.map(x => ({
                      value: x.pk,
                      text: x.skill_name
                    }))
                  })(state.tutor_skill, this.onSubjectSelect)}
              </React.Fragment>
            );
          }}
        />
        <ConfirmationModal
          showModal={this.props.completed}
          student={this.state.student}
          onClick={this.clearBookings}
        />
      </React.Fragment>
    );
  }
}
