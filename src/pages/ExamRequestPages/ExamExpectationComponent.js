//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import isEmpty from "lodash/isEmpty";
import { ClientPageWrapper } from "../ClientRequestPages/ClientPageWrapper";
import { MultiselectComponent } from "../SubjectDetailsPage/question-types";
import { NRadioComponent } from "../ClientRequestPages/BaseLessonSchedule";
import { getExamType } from "./index";
import {
  Div,
  InputComponent,
  spacing,
  DefaultButton,
  Heading,
  Text,
  xs,
  TextareaComponent
} from "../components";
import DayPicker from "react-day-picker/DayPicker";
import { datePickerStyles } from "../ClientRequestPages/DatePickerComponent";
import { Icon, PrimaryButton } from "../../simple";
import { color, font_size, font_used } from "../../design-systems";
import { Label } from "../../simple/FormComponent";

class Portal extends React.Component {
  constructor() {
    super();
    this.domNode = document.getElementById("root");
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.domNode);
  }
}

const FullScreenOverlayComponent = ({
  buttonText,
  result,
  children,
  title,
  css,
  showFooter,
  isOpen,
  handleOpen,
  error,
  error_message
}) => {
  return (
    <Div
      css={`
          .fullscreen-overlay {
            height: 100vh;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1500;
            background: #ffffff;
            padding: 0 ${spacing.m};
            overflow-y: auto;
            @media(min-width: ${xs}px) {
              background: rgba(0, 0, 0, 0.75);
            }
          }
          .close-button {
            cursor: pointer;
            display: inline-block
            padding: ${spacing.xl} ${spacing.m};
            @media(min-width: ${xs}px) {
              position: absolute;
              right: 16px;
              top: 0;
            }
          }
          .component-shell {
            display: flex;
            justify-content: space-between;

            button {
              background-color: ${color.white};
              @media(max-width: ${xs}px) {
                width: auto!important;
              }
            }
          }
          .footer {
            display: flex;
            justify-content: space-between;
            position: relative;
            width: 100%;
            top: 0;
            padding-bottom: 80px;
            button {
              width: auto;
            }
            @media(min-width: ${xs}px) {
                background: ${color.white};
                //padding: ${spacing.xl} 0;
                padding-bottom: 0;
                top: unset;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            }
          }
          // .fullscreen-modal {
          //   overflow-y: auto;
          // }
          @media(min-width: ${xs}px) {
            .fullscreen-modal {
              position: relative;
              background: #fff;
              top: 96px;
              width: 640px;
              margin: 0 auto;
              border-radius: 8px;
              padding: 84px ${spacing.xl};
            }
          }
          ${css}
        `}
    >
      <Div className="component-shell">
        <Div>
          <Text
            css={`
              ${font_used.form_label};
              font-weight: 600;
              color: #484848;
            `}
          >
            {title}
          </Text>
          <Text
            css={`
              color: ${color.gray.lighter};
            `}
          >
            {result}
          </Text>
          {error && (
            <Text
              css={`
                color: ${color.red.darker};
                font-size: ${font_size.xxs};
              `}
            >
              {error_message}
            </Text>
          )}
        </Div>
        <DefaultButton onClick={handleOpen}>{buttonText}</DefaultButton>
      </Div>
      {isOpen ? (
        <Div className="fullscreen-overlay">
          <Div className="fullscreen-modal">
            <a onClick={handleOpen} className="close-button">
              <Icon name="close" fill={color.gray.darker} />
            </a>
            {children}
            {showFooter ? (
              <Div className="footer">
                <DefaultButton
                  css={`
                    background-color: ${color.white};
                  `}
                  onClick={handleOpen}
                >
                  Cancel
                </DefaultButton>
                <PrimaryButton onClick={handleOpen}>Save</PrimaryButton>
              </Div>
            ) : null}
          </Div>
        </Div>
      ) : null}
    </Div>
  );
};

export class ButtonDatePicker extends React.Component {
  state = { selectedDay: undefined, isOpen: false };
  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        selectedDay: value
      });
    }
  }
  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  handleDaySelect = day => {
    this.setState({ selectedDay: day });
    this.handleOpen();
    this.props.onSubmit(day);
  };
  formatDate = () => {
    const { selectedDay } = this.state;
    if (selectedDay) {
      const date = new Date(selectedDay);
      return date.toDateString();
    }
  };
  render() {
    return (
      <FullScreenOverlayComponent
        result={this.formatDate() || "No date selected"}
        buttonText={this.props.buttonText}
        title={this.props.title}
        handleOpen={this.handleOpen}
        isOpen={this.state.isOpen}
        error={this.props.error}
        error_message={this.props.error_message}
        css={`
          ${datePickerStyles};
          .DayPicker {
            display: block;

            @media (min-width: ${xs}px) {
              background: white;
              border-radius: 4px;
            }
          }
          .DayPicker-WeekdaysRow, .DayPicker-Week {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            justify-items: center;
          }
          .DayPicker-Month {
            width: 100vw;
            height: 40vh;
            margin: 0;
          }
          .DayPicker-Caption {
            margin-bottom: ${spacing.xl};
            //padding: 0 ${spacing.xl};

            & > div {
              font-size: 22px;
              font-weight: bold;
            }
          }
          .DayPicker-NavButton {
            top: 0;
          }
          .DayPicker-Day {
            display:flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
          }
          .DayPicker-Day--selected {
            height: 38px;
            max-width: 100%;
            width: 42px;
            background-color: #e8f0fd !important;
            color: ${color.blue.darker}!important;
          }
          .DayPicker-Day--disabled {
            color: rgb(191, 192, 194);
          }
        `}
      >
        <DayPicker
          onDayClick={this.handleDaySelect}
          selectedDays={this.state.selectedDay}
          disabledDays={[{ before: new Date() }]}
        />
      </FullScreenOverlayComponent>
    );
  }
}

export class TargetScoreComponent extends React.Component {
  state = {
    isOpen: false
  };
  getScores = () => {
    const { exam_sections } = this.props;
    const scores = Object.keys(exam_sections).filter(s =>
      Boolean(exam_sections[s].score)
    );
    return scores.length;
  };
  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { exam_sections } = this.props;
    return (
      <FullScreenOverlayComponent
        title={this.props.title}
        buttonText={this.props.buttonText}
        result={`${this.getScores() || "No"} scores added`}
        showFooter
        handleOpen={this.handleOpen}
        isOpen={this.state.isOpen}
        error={this.props.error}
        error_message={this.props.error_message}
      >
        <Div
          css={`
            @media (min-width: ${xs}px) {
              background: white;
              border-radius: 4px;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          `}
        >
          <Heading
            css={`
              padding-bottom: ${spacing.l};
            `}
          >
            Set target Score
          </Heading>
          {Object.keys(exam_sections).map((section, i) => (
            <Div
              key={section}
              css={`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: ${spacing.l};
              `}
            >
              <Text big>{section}</Text>
              <InputComponent
                small
                type="number"
                value={exam_sections[section].score}
                placeholder={exam_sections[section].total}
                updateText={value => this.props.updateSection(section, value)}
                style={{ maxWidth: "100px" }}
              />
            </Div>
          ))}
        </Div>
      </FullScreenOverlayComponent>
    );
  }
}

export function isObject(n) {
  if (n == null) return false;
  return Object.prototype.toString.call(n) === "[object Object]";
}
export class ExamExpectationComponent extends React.Component {
  state = {
    fields: this.props.data || {},
    display: false
  };
  onSubmit = () => {
    if (this.isValid()) {
      this.props.onSubmit(this.state.fields);
    } else {
      this.setState({ display: true });
    }
  };
  isValid() {
    let {
      fields: { selections = [], expectation, ...rest }
    } = this.state;
    let keys = ["online_lesson"];
    return selections.length > 0 && keys.every(x => Boolean(rest[x]));
  }
  saveExamDate = day => {
    this.setState({
      fields: {
        ...this.state.fields,
        exam_date: day
      }
    });
  };
  saveExamScores = (section, value) => {
    let { targeted_score } = this.state.fields;
    if (section && value) {
      targeted_score = {
        ...targeted_score,
        [section]: { ...targeted_score[section], score: value }
      };
      this.setState({
        fields: { ...this.state.fields, targeted_score }
      });
    }
  };
  allScore = () => {
    let { selections, targeted_score = {} } = this.state.fields;
    return (
      Object.keys(targeted_score).length === selections.length &&
      Object.values(targeted_score).every(x => x.score > 0)
    );
  };
  updateSelection = selections => {
    let state = this.state.fields;
    let groupData = getExamType(state.exam, this.props.groups);
    let targeted_score = {};
    let s_targeted_score = state.targeted_score || {};
    if (groupData.max_score) {
      let max_score = groupData.max_score(state.exam_type);
      selections.forEach(s => {
        targeted_score[s] = {
          score: (s_targeted_score[s] || { score: 0 }).score,
          total: isObject(max_score) ? max_score[s] : max_score
        };
      });
    }
    let update = { selections, targeted_score };
    this.setState({
      fields: { ...this.state.fields, ...update }
    });
  };
  getSelections = (selections, max_score) => {
    let result = selections.map(selection => ({
      section: selection,
      placeholder: Array.isArray(max_score)
        ? max_score[selection.toLowerCase()]
        : max_score
    }));
    return result;
  };
  formatExamOptions = list => {
    if (list.every(x => typeof x === "string")) {
      return list;
    }
    return list.map(x => x.type);
  };
  getExamOptions = () => {
    let state = this.state.fields;
    let groupData = getExamType(state.exam, this.props.groups);
    let options = [];
    if (!isEmpty(state.exam_type)) {
      let examOptions = groupData.sections(state.exam_type);
      options = this.formatExamOptions(examOptions);
      return options;
    }
    return [];
  };
  render() {
    let state = this.state.fields;
    let groupData = getExamType(state.exam, this.props.groups);
    let options = this.getExamOptions();
    return (
      <ClientPageWrapper
        showLoadingButton
        heading="What's your expectation for this exam?"
        description="Tell us your goal or target score"
        onSubmit={this.onSubmit}
        loading={this.isValid() && this.props.loading}
        showBackButton
        backAction={this.props.backAction}
      >
        <React.Fragment>
          {MultiselectComponent({
            name: `What ${state.exam.toUpperCase()} areas do you need the most help with?`,
            options,
            labelCss: "min-width: 96px;",
            error_message: "Select at least one module",
            error: this.state.display && !(state.selections.length > 0)
          })(state.selections, selections => this.updateSelection(selections))}
          <Div
            css={`
              padding-bottom: ${spacing.xl};
            `}
          >
            <ButtonDatePicker
              value={state.exam_date}
              onSubmit={this.saveExamDate}
              title="Expected exam date"
              buttonText="Select date"
              //error={this.state.display && !Boolean(state.exam_date)}
              //error_message="Please select the date of the exam"
            />
          </Div>
          {!isEmpty(state.targeted_score) &&
            state.selections.length > 0 && (
              <Div
                css={`
                  padding-bottom: ${spacing.xl};
                `}
              >
                <TargetScoreComponent
                  exam_sections={state.targeted_score || {}}
                  updateSection={this.saveExamScores}
                  title="Target score"
                  buttonText="Add scores"
                  error={this.state.display && !this.allScore()}
                  error_message="Enter your target score"
                />
              </Div>
            )}
          <Div
            css={`
              padding-bottom: ${spacing.m};
            `}
          >
            {NRadioComponent(
              {
                name: `Are you open to learning online?`,
                options: [
                  { text: `Sure, I'm open to online lessons`, value: "Yes" },
                  { text: `No, I prefer in-person lessons`, value: "No" }
                ],
                error_message: "Select your preference"
              },
              { direction: "columns" }
            )(
              state.online_lesson,
              online_lesson =>
                this.setState({ fields: { ...state, online_lesson } }),
              () => this.state.display && !Boolean(state.online_lesson)
            )}
          </Div>
          <TextareaComponent
            rows={5}
            placeholder="I have high expectations for this exam, and need a very good teacher to put me through."
            label="Anything else we should know?"
            value={state.expectations}
            //error={this.state.display && !Boolean(state.expectations)}
            //error_message="Other information to note?"
            updateText={expectations =>
              this.setState({ fields: { ...state, expectations } })
            }
          />
        </React.Fragment>
      </ClientPageWrapper>
    );
  }
}
