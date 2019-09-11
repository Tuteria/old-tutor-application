import React from "react";
import find from "lodash/find";
import values from "lodash/values";
import styled from "styled-components";
import Media from "react-media";
import {
  DropdownComponent,
  TextareaComponent,
  CheckboxComponent
} from "../../form";
import { MenuItem } from "react-aria-menubutton";
import { SecondaryButton, DefaultButton } from "../../simple/Button";
import { closeMenu } from "react-aria-menubutton";
import { spacing, Text, xs } from "../components";
import { Div } from "../../primitives";
import { color, font_weight } from "../../siteStyle";
import { ClientPageWrapper } from "./ClientPageWrapper";
import Notification from "../../simple/Notification";
import includes from "lodash/includes";
import RecommendationComponent from "./RecommendationComponent";
import {
  MultiselectComponent,
  RadioComponent,
  InputComponent,
  DropdownComponent as NDropdownComponent
} from "../SubjectDetailsPage/question-types";

function getDetails(klass, groups) {
  let section = find(groups.academic, k_group =>
    includes(k_group.groups, klass)
  );
  return {
    ...section,
    purpose: getPurposes(section, groups)
  };
}
function getPurposes(section, groups) {
  return section.purpose.map(x => find(groups.purposes, o => o.id === x));
}
function findPurpose(value, purpose) {
  let result = find(purpose, x => x.value === value);
  if (Boolean(result)) {
    if (Boolean(result.input)) {
      return { input: result.input };
    }
    if (Boolean(result.options)) {
      return { options: result.options, label: result.label };
    }
    return null;
  }
  return result;
}
const StyledMenuItem = styled(MenuItem)`
  padding: ${spacing.s} ${spacing.m};
`;
export const Option = ({ value, ...rest }) => {
  const text = typeof rest.children === "string" ? rest.children : rest.text;
  return <StyledMenuItem tag="li" value={value} text={text} {...rest} />;
};

const OptionsList = ({
  defaultText,
  options,
  onClose,
  selected = [],
  recommendation
}) => {
  let withGroups = options.map(x => x.group).filter(Boolean).length > 0;
  return (
    <React.Fragment>
      <Div
        css={`
          display: none;
          @media (max-width: ${xs}px) {
            display: block;
            padding: ${spacing.m};
            text-align: center;
            border-bottom: 1px solid #eee;
          }
        `}
      >
        {defaultText}
      </Div>
      {options.map(
        (option, index) =>
          withGroups ? (
            <React.Fragment key={index}>
              <Div
                css={`
                  padding: 16px 16px 0px;
                  text-transform: uppercase;
                `}
              >
                {option.group}
              </Div>
              {option.options.map((text, i) => (
                <Option key={i} value={text}>
                  <CheckboxComponent
                    checkboxCss={`margin-left:${spacing.s};`}
                    value={text}
                    checked={includes(selected, text)}
                    text={text}
                  />
                </Option>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <Option value={option}>
                <CheckboxComponent
                  big
                  checkboxCss={`margin-left:${spacing.s};`}
                  value={option}
                  checked={includes(selected, option)}
                  text={option}
                />
              </Option>
            </React.Fragment>
          )
      )}
      <Div
        css={`
          position: sticky;
          bottom: 0;
          padding: ${spacing.s} ${spacing.s} ${spacing.s} ${spacing.m};
          border-top: 1px solid #eee;
          background: white;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          @media (max-width: ${xs}px) {
            //flex-direction: column-reverse;
            padding: ${spacing.l} ${spacing.m};
          }
        `}
      >
        <Div
          css={`
            display: flex;
          `}
        >
          <Media query={`(max-width: ${xs}px)`}>
            {matches =>
              matches ? (
                <DefaultButton
                  css={`
                    width: 30%;
                    margin: 0 ${spacing.s};
                    background: ${color.white};
                    @media (max-width: ${xs}px) {
                      margin-top: ${spacing.s};
                      width: 100%;
                    }
                  `}
                  onClick={onClose}
                >
                  Cancel
                </DefaultButton>
              ) : null
            }
          </Media>
          <SecondaryButton
            css={`
              width: 100%;
              margin: 0 ${spacing.s};
              @media (max-width: ${xs}px) {
                margin-top: ${spacing.s};
              }
            `}
            onClick={onClose}
          >
            Done
          </SecondaryButton>
        </Div>
        {recommendation}
      </Div>
    </React.Fragment>
  );
};

export class DropdownWithCheckbox extends React.Component {
  state = {
    values: this.props.values || []
  };
  onChange = (text, checked) => {
    let { values } = this.state;
    if (checked) {
      values = [...new Set([...values, text])];
      // values.push(text);
    } else {
      values = values.filter(x => x !== text);
    }
    this.setState({ values });
    this.props.onChange(values);
  };
  onSelectChange = options => {
    if (Boolean(options.target)) {
      let text = options.target.value;
      let checked = !options.target.checked;
      this.onChange(text, checked);
    } else {
      this.setState({ values: options });
      this.props.onChange(options);
    }
  };
  renderOptions = () => {
    let { options, onChange, id } = this.props;
    return (
      <OptionsList
        options={options}
        defaultText={`${this.state.values.length} items selected`}
        onClose={e => {
          closeMenu(`holla-${id}`);
          onChange(this.state.values);
          // this.setState({ isOpen: false });
        }}
        selected={this.state.values}
        // recommendation={
        //   <RecommendationComponent kind="warning">
        //     <Text
        //       css={`
        //         font-size: ${spacing.sm};
        //         line-height: ${spacing.ml};
        //       `}
        //     >
        //       Based on the subjects selected, you would need 5 tutors
        //     </Text>
        //   </RecommendationComponent>
        // }
      />
    );
  };
  defaultText = () => {
    let count = this.state.values.length;
    return count > 0 ? `${count} subjects selected` : "Select subjects";
  };
  render() {
    let { label, id } = this.props;
    return (
      <DropdownComponent
        transform
        onChange={this.onSelectChange}
        label={label}
        values={this.state.values}
        multiple
        css={`
          margin-top: 30px;
          label {
            width: 100%;
          }
          @media (max-width: ${xs}px) {
            margin-bottom: ${spacing.l};
            ul {
              height: 100vh !important;
              top: -42px !important;
              max-height: 100vh !important;
              position: fixed !important;
              margin-top: 40px !important;
            }
          }
        `} // error={true}
        closeOnSelection={false}
        output={e => e}
        id={`holla-${id}`}
        defaultText={this.defaultText()}
        OptionComponent={this.renderOptions()}
      />
    );
  }
}

const styles = `
  position: relative;
  border-radius: ${spacing.xs};
  border: 1px solid ${color.gray.ui_03};
  padding: ${spacing.xl};
  margin-bottom: ${spacing.xxl};
  max-width: 920px;
  .class-heading{
    position: absolute;
    top: -12px;
    left: ${spacing.xl};
    background: ${color.white};
    color: ${color.green.primary};
    font-weight: ${font_weight.bold};
  }
  .form-container{
    display: flex;
    justify-content: space-between;
    @media (max-width: ${xs}px) {
      display: block;
    }
  }
  .left-form{
    flex: 1;
      margin-right: ${spacing.xl};
      @media (max-width: ${xs}px) {
        width: 100%;
        margin-right: 0;
      }

  }
`;
export class SelectSubjectComponent extends React.Component {
  constructor(props) {
    super(props);
    let data = this.props.data || {};
    this.state = {
      classes: data.classes || [],
      curriculum: data.curriculum || [],
      gender: "Any gender is fine",
      displayError: false
    };
  }
  getValue(key, index, defaultValue = "", actualObj) {
    let state = this.state.classes[index];
    if (key === "goal") {
      let result = state[key] || defaultValue;
      result =
        typeof result === "string"
          ? { value: result }
          : { value2: null, ...result };
      return result;
    }
    return state[key] || defaultValue;
  }
  validateSection = data => {
    let purposeCheck = Boolean(data.goal)
      ? typeof data.goal === "string"
        ? Boolean(data.goal)
        : values(data.goal).every(Boolean)
      : false;
    let subjectSelectCheck = Boolean(data.subjects)
      ? Array.isArray(data.subjects) && data.subjects.length > 0
      : false;
    return purposeCheck && subjectSelectCheck && Boolean(data.expectation);
  };
  updateState = (key, index, value) => {
    this.setState({
      classes: this.state.classes.map((klass, i) => {
        if (i === index) {
          return { ...klass, [key]: value };
        }
        return klass;
      })
    });
  };
  validateForm = () => {
    let { classes, curriculum } = this.state;
    return (
      classes.map(this.validateSection).every(Boolean) && curriculum.length > 0
    );
  };
  onSubmit = () => {
    if (this.validateForm()) {
      this.props.onSubmit(this.state);
    } else {
      this.setState({ displayError: true });
    }
  };
  render() {
    let { groups = {}, backAction, showBackButton } = this.props;
    return (
      <ClientPageWrapper
        heading="Tell us about your child's need"
        description="What's your goal and what subjects do your kids need help with?"
        css={`
          padding: 0 15px;
        `}
        onSubmit={this.onSubmit}
        loading={this.validateForm() && this.props.loading}
        full_width
        showBackButton={showBackButton}
        backAction={backAction}
      >
        {this.state.classes.map((klass, i) => {
          let childDetails = getDetails(klass.class, groups);
          let value = this.getValue("goal", i, {}, childDetails);
          let secondary = findPurpose(value.value, childDetails.purpose);
          return (
            <Div key={`${klass.class}-${i}`} css={styles}>
              <Text className="class-heading">
                For Child {i + 1} in {klass.class}
              </Text>
              <Div
                css={`
                  display: block;
                `}
              >
                {this.state.displayError && !this.validateSection(klass) ? (
                  <Notification
                    styling={`margin-bottom: ${spacing.xl}`}
                    className="error"
                  >
                    <Text>All fields are required</Text>
                  </Notification>
                ) : null}
              </Div>
              <Div className="form-container">
                <Div className="left-form">
                  {NDropdownComponent(
                    {
                      name: "What's your goal for this child?",
                      useDefault: true,
                      options: childDetails.purpose.map(p => ({
                        text: p.text,
                        value: p.value
                      })),
                      secondary
                    },
                    {
                      isObject: true,
                      direction: "up",
                      defaultText: "Select a goal"
                    }
                  )(Boolean(secondary) ? value : value.value, val => {
                    this.updateState("goal", i, val);
                  })}
                  <DropdownWithCheckbox
                    options={childDetails.subjects}
                    label="What subjects?"
                    id={`${klass.class}-${i}`}
                    values={this.getValue("subjects", i, [])}
                    onChange={val => this.updateState("subjects", i, val)}
                    placeholder="Select Subjects"
                  />
                </Div>
                <TextareaComponent
                  rows={5}
                  placeholder="I need my son to read fluently. He is age 7 and can hardly read a sentence on his own. So I need someone to help improve his reading."
                  label="Tell us a bit about this child"
                  value={this.getValue("expectation", i, "")}
                  updateText={val => this.updateState("expectation", i, val)}
                />
              </Div>
            </Div>
          );
        })}
        {MultiselectComponent({
          name: "What curriculum is used at your child's school?",
          options: this.props.curriculums,
          error_message: "Select at least one curriculum",
          error: this.state.displayError && !(this.state.curriculum.length > 0)
        })(this.state.curriculum, curriculum => this.setState({ curriculum }))}
        {RadioComponent({
          name: "Do you prefer a male or female tutor?",
          options: ["Any gender is fine", "Male", "Female"]
        })(this.state.gender, gender => this.setState({ gender }))}
      </ClientPageWrapper>
    );
  }
}
