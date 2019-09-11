//@flow
import React from "react";
import styled, { css } from "styled-components";
import {
  Checkbox as CheckboxInput,
  ApplicationTooltip,
  NoticeAction,
  FormColumn,
  FormComponent,
  InputComponent as IInputComponent,
  TextareaComponent as TTextareaComponent,
  DropdownComponent as DDropdownComponent
} from "../components";
import { ExampleModal } from "../AboutTutorPage/ExampleModal";
import {
  MultiselectComponent,
  FormsetComponent,
  getCompontentForQuestion
} from "./question-types";
import Wrapper from "./Wrapper";
import { spacing, xs, color, font_size } from "../../siteStyle";
import { Text } from "../../simple/Text";
import Icon from "../../simple/Icon";
import { OverviewStateType, Props } from "./types";
//import { OVERVIEW_UPDATE_FIELD } from "reducers";
import includes from "lodash/includes";
import type { QuestionType } from "./question-types/types";
const CategoryTabList = styled.ul`
  display: flex;
  position: relative;
  list-style-type: none;
  flex-direction: column;
  width: 33.3%;
  margin: 0;
  padding: 0;
  background-color: #fbf9fb;
  flex-grow: 1;
  &:before {
    content: " ";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 21px 0 122px 1px;
    border-color: #dce0e0;
  }
  & li a {
    display: block;
    color: #484848;
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    padding: 15px 20px 15px 29px;
    text-transform: uppercase;
    border-right: 1px solid #dce0e0;
    cursor: pointer;

    & i,
    .icon-s {
      float: right;
      color: #ffab00;
    }

    &.active {
      background-color: #ffffff;
      border-bottom: 1px solid #dce0e0;
      border-right: none;
    }
    &:hover {
      text-decoration: none;
      cursor: pointer;
    }
  }
  & li:not(:first-child) a.active {
    border-top: 1px solid #dce0e0;
    border-bottom: 1px solid #dce0e0;
  }
  @media (max-width: ${xs}px) {
    flex-direction: row;
    li {
      flex: 1;
      a {
        background-color: #fff;
        border-bottom: 1px solid #dce0e0;
        &.active {
          background-color: transparent;
          border-bottom: 0 !important;
        }
      }
    }
  }
`;
const Note = styled(NoticeAction)`
  & h2 {
    background-color: transparent;
  }
  & div.ind-items {
    align-items: center;
  }
  button.ind-items {
    & svg {
      stroke: "#c9cacd";
    }
    & span {
      padding: 0;
    }
  }
`;
const Tooltip = styled(ApplicationTooltip)`
  &:before {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 17px 21px 17px 0;
    border-color: transparent #f0f0f0 transparent transparent;
    top: 13.75%;
    left: -22px;
  }
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 16px 20px 16px 0;
    border-color: transparent #ffffff transparent transparent;
    top: 14%;
    left: -20px;
  }
`;
const CategoryTabsContent = styled.div``;
const CategoryParent = styled.div`
  display: flex;
  border: 1px solid #dce0e0;
  & ${CategoryTabList} {
    flex-grow: 1;
    width: inherit !important;
  }
  & ${CategoryTabsContent} {
    flex-grow: 3;
    padding: 17px 40px;
  }
  @media (max-width: ${xs}px) {
    flex-direction: column;
  }
`;

class CategoryTab extends React.Component {
  handleTabClick = e => {
    e.preventDefault();
    this.props.onClick(this.props.tabIndex);
  };
  render() {
    return (
      <li>
        <a
          className={`"categories-list" ${this.props.isActive ? "active" : ""}`}
          onClick={this.handleTabClick}
        >
          {this.props.tabName}
          <Icon
            style={{ float: "right" }}
            width={16}
            name={this.props.isActive ? "check-circle" : "plus"}
          />
        </a>
      </li>
    );
  }
}
const Checkbox = ({ updateSelectedClasses, ...props }) => (
  <CheckboxInput
    innerColor="#36B37E"
    border="transparent"
    checkSize={`height: 20px; width: 20px;`}
    checkStyle={`left: 6px; top: 2px; width: 5px; height: 9px;`}
    textStyle={`color:#484848;font-size: 17px; padding-top: 0;`}
    onChange={() => {
      updateSelectedClasses(props.text);
    }}
    {...props}
  />
);

export const Checkboxes = ({
  items,
  selectedClasses,
  updateSelectedClasses,
  updateClasses
}) => {
  let groups = items
    .map((x, index) => (index % 3 === 0 ? items.slice(index, index + 3) : null))
    .filter(e => e);
  let filtered = [...new Set(selectedClasses.filter(x => includes(items, x)))];
  const isChecked =
    [...filtered].sort().toString() === [...items].sort().toString();
  return (
    <FormComponent
      label="Select the classes you intend to teach:"
      labelStyle={{ marginBottom: 16 }}
    >
      <Div
        css={`
          display: flex;
          @media (max-width: ${xs}px) {
          }
        `}
      >
        {new Array(2).fill().map((group, ii) => {
          const allCheckbox = (
            <Checkbox
              text="All Classes"
              key={`All  Classes ${ii}`}
              updateSelectedClasses={() => {
                const ttr =
                  [...new Set(selectedClasses.filter(x => includes(items, x)))]
                    .sort()
                    .toString() === [...items].sort().toString();
                let results = [];
                if (ttr) {
                  results = selectedClasses.filter(
                    x => includes(items, x) === false
                  );
                } else {
                  results = [...selectedClasses, ...items];
                }
                updateClasses(results);
              }}
              checked={isChecked}
            />
          );
          const temp = groups[ii];
          let result = [];
          if (!!temp) {
            result = groups[ii].map(text => (
              <Checkbox
                text={text}
                key={text}
                updateSelectedClasses={updateSelectedClasses}
                checked={selectedClasses.indexOf(text) > -1}
              />
            ));
          }
          if (ii === 0) {
            result.push(allCheckbox);
          }
          return (
            <Div
              css={`
                display: flex;
                flex: 1;
                flex-direction: column;
                margin-bottom: ${spacing.m};
              `}
            >
              {result}
            </Div>
          );
        })}
      </Div>
    </FormComponent>
  );
};
export class Categories extends React.Component {
  state = {
    currentIndex: 0
  };
  currentTabContent = index => {
    return (
      <Checkboxes
        items={this.props.items[index].values}
        selectedClasses={this.props.selectedClasses}
        updateClasses={this.props.updateClasses}
        updateSelectedClasses={this.props.updateSelectedClasses}
      />
    );
  };
  render() {
    return (
      <CategoryParent className="tabs">
        <CategoryTabList>
          {this.props.items.map((item, index) => (
            <CategoryTab
              key={item.name}
              tabName={item.name}
              isActive={this.state.currentIndex === index}
              onClick={() => {
                this.setState({ currentIndex: index });
              }}
            />
          ))}
        </CategoryTabList>
        <CategoryTabsContent>
          {this.currentTabContent(this.state.currentIndex)}
        </CategoryTabsContent>
      </CategoryParent>
    );
  }
}
const NoPaddingColumn = styled(FormColumn)`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const Div = styled.div`
  ${props => props.css};
`;

type FormsetType = {
  name: string,
  company: string,
  year: string
};

type State = {
  +loaded: boolean,
  +certifications: Array<FormsetType>,
  +displayCurriculum: boolean,
  +display_error: boolean,
  +fields: OverviewStateType,
  +errors: {
    title: boolean,
    description: boolean,
    certifications: boolean,
    selectedClasses: boolean,
    curriculums: boolean
  }
};
export const ViewExample = styled.a`
  display: none;
  color: ${color.blue.primary};
  cursor: pointer;
  font-size: ${font_size.s};
  @media (max-width: ${xs}px) {
    display: inline-block;
    float: right;
  }
  ${props =>
    css`
      ${props.css};
    `};
`;

class OverviewPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      kind: "title",
      fields: {
        title: "",
        description: "",
        certifications: [],
        questions: {},
        curriculums: [],
        selectedClasses: []
      },
      displayCurriculum: false,
      dependants: {},
      display_error: false,
      errors: {
        certifications: false,
        title: true,
        description: true,
        curriculums: false,
        selectedClasses: false
      },
      addCertifications: false,
      loaded: false
    };
  }
  getComponentForQuestion = (
    question: QuestionType,
    index,
    depends,
    prefix = ""
  ) => {
    const func = getCompontentForQuestion(
      this,
      this.setState.bind(this),
      this.formsetRef
    );
    return func(question, index, depends, prefix);
  };
  formsetRef = {
    training: null,
    award: null
  };

  updateSelectedClasses = classLevel => {
    const {
      fields: { selectedClasses }
    } = this.state;
    let result = [];
    let index = selectedClasses.indexOf(classLevel);
    if (index > -1) {
      result = selectedClasses.filter(x => x !== classLevel);
    } else {
      result = [...new Set([...selectedClasses, classLevel])];
    }
    this.updateClasses(result);
  };

  updateClasses = (selectedClasses: Array<string>) => {
    const subjects = [...new Set(selectedClasses)];
    const levels = this.getCategoryLevels(subjects);
    let questions = this.state.fields.questions;
    const invalid = Object.keys(questions).filter(x => {
      let split = x.split("-")[0];
      return includes(levels, split);
    });
    invalid.forEach(x => {
      delete questions[x];
    });
    this.setState(state => ({
      ...state,
      fields: {
        ...state.fields,
        selectedClasses: subjects,
        questions
      },
      displayCurriculum: this.toggleCurriculumDisplay(subjects)
    }));
  };
  updateField = (
    field: string,
    text: string | Array<string>,
    isArray: boolean = false
  ) => {
    this.setState((state: State) => {
      let fields = { ...state.fields, [field]: text };
      const evaluation = isArray ? text.length === 0 : !!text === false;
      let errors = { ...state.errors, [field]: evaluation };
      return { ...state, fields, errors };
    });
  };

  getFormset = () => {
    return FormsetComponent(
      ["Certificate Name", "Issuing Company Name", "Year obtained"],
      "training",
      TrainingForm,
      "Add another training",
      "Add you trainings",
      `border-bottom: 1px solid #D8D8D8; padding-bottom: ${
        spacing.s
      }; margin-bottom: ${spacing.xxl}`
    )(
      this.state.fields.certifications,
      this.state.loaded,
      data =>
        this.setState({
          fields: { ...this.state.fields, certifications: data }
        }),
      this.state.errors.certifications,
      status =>
        this.setState({
          errors: {
            ...this.state.errors,
            certficiations: status
          }
        })
    );
  };
  getCategoryLevels = classes => {
    const {
      questions: { levelClassification }
    } = this.props;
    return levelClassification(classes);
  };
  academicClasses = levels2 => {
    return this.props.getAcademicSubjectCategory(levels2);
  };
  toggleCurriculumDisplay(selectedClasses: Array<string>) {
    let { questions, displayCurriculum } = this.props;
    return displayCurriculum(selectedClasses, questions);
  }
  componentDidMount() {
    let { data = {} } = this.props;
    if (!!data.selectedClasses === false) {
      data.selectedClasses = [];
    }
    if (!!data.questions === false) {
      data.questions = [];
    }
    this.setState(state => {
      return {
        ...state,
        fields: data,
        displayCurriculum: this.toggleCurriculumDisplay(
          state.fields.selectedClasses
        ),
        errors: {
          ...state.errors,
          title: !Boolean(data.title),
          description: !Boolean(data.description)
        }
      };
    });
  }
  generateQuestionComponent(questions, level, qq) {
    const dependant = questions
      .filter(x => !!x.depended_on)
      .map(x => ({ id: x.id, depends: x.depended_on }));

    return questions.map((x, index) => {
      if (!!x.depended_on) {
        let placeholder = this.props.getPrefix(level, index);
        if (qq[placeholder] !== "Yes") {
          return null;
        }
      }
      let depend2 = dependant.find(y => y.depends === x.id);
      return (
        <div key={index}>
          {this.getComponentForQuestion(x, index, depend2, level)}
        </div>
      );
    });
  }
  getQuestionForLevel = (level, ind, qq) => {
    const {
      questions: { levels, questions = [] }
    } = this.props;
    console.log(this.props);
    const selectedLevel = levels.find(x => x.name === level);
    let IQ = selectedLevel.questions || [];
    if (ind === 0) {
      IQ = IQ.concat(questions);
    }
    return (
      <div key={`${level}-ind`}>
        {/* {this.generateQuestionComponent(lQ.concat(questions), level, qq)} */}
        {this.generateQuestionComponent(IQ, level, qq)}
      </div>
    );
  };
  getQuestions = q => {
    const {
      questions: { levels, questions, subcategoryQuestions }
    } = this.props;
    if (!!levels) {
      return this.getCategoryLevels(this.state.fields.selectedClasses).map(
        (x, ind) => this.getQuestionForLevel(x, ind, q)
      );
    }
    let allQ = subcategoryQuestions.concat(questions);
    return this.generateQuestionComponent(allQ, null, q);
  };
  academicSubjectClassification = () => {
    const {
      questions: { levels = [] }
    } = this.props;
    const levels2 = levels.map(x => x.classes);
    return this.academicClasses(levels2);
  };
  previousPage = () => {
    return { base: "subjects", previous: "subject-list" };
    // this.props.toSubjectListPage();
  };

  validateForm = () => {
    if (Boolean(this.formsetRef.training)) {
      this.formsetRef.training.handleSubmit();
    }
    if (Boolean(this.formsetRef.award)) {
      this.formsetRef.award.handleSubmit();
    }
    let localErrors = [...new Set(Object.values(this.state.errors))];

    let result = this.props.validateAction(this.state.fields, localErrors);
    if (!!result) {
      this.setState({ display_error: true });
    } else {
      return true;
    }
  };

  displayError = (field: string) => {
    return this.state.display_error && this.state.errors[field];
  };

  closeModal = () => {
    this.setState(state => ({ ...state, showModal: false }));
  };
  openModal = kind => {
    this.setState({ showModal: true, kind });
  };

  render() {
    const {
      questions: { curriculum },
      data
    } = this.props;
    const rows = this.academicSubjectClassification();
    const curriculumForm = MultiselectComponent({
      name: "What curriculum(s) can you teach?",
      options: curriculum
    })(
      this.state.fields.curriculums,
      curriculums => this.updateField("curriculums", curriculums, true),
      this.displayError,
      "curriculums"
    );
    return (
      <Wrapper
        step={1}
        disableNextScreen={false}
        {...this.props}
        canSubmit={() => this.validateForm()}
      >
        {({ width, position }) => {
          const toolTipStyle = {
            width: width,
            height: "auto",
            position: "absolute",
            marginLeft: position,
            top: 0
          };

          return (
            <div>
              <ExampleModal
                showModal={this.state.showModal}
                handleCloseModal={this.closeModal}
                data={this.props.examples}
                kind={this.state.kind}
              />
              <IInputComponent
                updateText={text => this.updateField("title", text)}
                value={data.title}
                error={this.displayError("title")}
                error_message="This field is required"
                maxValue={80}
                css={`
                  margin-bottom: ${spacing.xl};
                `}
                label="Subject headline"
                LabelRightNode={({ ...rest }) => (
                  <ViewExample
                    {...rest}
                    onClick={() => this.openModal("title")}
                  >
                    See Example
                  </ViewExample>
                )}
                tooltip={
                  <ApplicationTooltip
                    style={toolTipStyle}
                    heading="Keep it short and descriptive"
                  >
                    <Text className="last">
                      The best titles give a strong sense of your qualification
                      and expertise in an instant!
                    </Text>
                    <Text
                      css={`
                        margin-bottom: 0 !important;
                        padding-top: 16px;
                      `}
                    />
                    <ViewExample
                      css={`
                        margin-bottom: 0 !important;
                        padding-top: 16px;
                        display: block;
                      `}
                      onClick={() => this.openModal("title")}
                    >
                      See Example
                    </ViewExample>
                  </ApplicationTooltip>
                  // <Tooltip
                  //   style={
                  //     toolTipStyle // error={this.state.display_error} // error_message={this.renderErrors(0)}
                  //   }
                  //   heading="Summarize your expertise in General Mathematics."
                  // >
                  //   <span>
                  //     {` Please don't make any errors, only use alphabets and
                  //     numbers, avoid unnecessary punctuations and write in full,
                  //     NO ABBREVIATIONS.`}
                  //   </span>
                  // </Tooltip>
                }
                placeholder="Subject Headline"
              />
              {rows.length > 0 ? (
                <FormComponent
                  label={
                    rows.length > 1 && "What category can you teach?" // noColumn // RootComponent={rows.length > 1 ? NoPaddingColumn : Column}
                  }
                  error={
                    this.state.display_error &&
                    this.state.fields.selectedClasses.length === 0
                  }
                  error_message="This field is required"
                  errorStyle={"margin-top: 8px !important;"}
                  css={`
                    margin-bottom: ${spacing.m};
                  `}
                >
                  {rows.length === 1 ? (
                    <Checkboxes
                      // RootComponent={NoPaddingColumn}
                      items={rows[0].values}
                      updateClasses={this.updateClasses}
                      selectedClasses={this.state.fields.selectedClasses}
                      updateSelectedClasses={this.updateSelectedClasses}
                    />
                  ) : (
                    <Categories
                      updateSelectedClasses={this.updateSelectedClasses}
                      selectedClasses={this.state.fields.selectedClasses}
                      updateClasses={this.updateClasses}
                      items={rows}
                    />
                  )}
                </FormComponent>
              ) : null}
              {this.state.displayCurriculum ? curriculumForm : null}

              {this.getQuestions(this.state.fields.questions)}

              <TTextareaComponent
                updateText={text => this.updateField("description", text)}
                value={data.description}
                error={this.displayError("description")}
                error_message="This field is required"
                maxValue={1800}
                label="Describe your experience & teaching style"
                LabelRightNode={({ ...rest }) => (
                  <ViewExample
                    {...rest}
                    onClick={() => this.openModal("description")}
                  >
                    See Example
                  </ViewExample>
                )}
                tooltip={
                  <ApplicationTooltip
                    style={toolTipStyle}
                    heading="Tell clients how good you are!"
                  >
                    <Text>Talk about these 4 things:</Text>
                    <Text>
                      <b>1.</b> Emphasize your level of experience,
                      qualifications or relevant awards.
                    </Text>
                    <Text>
                      <b>2. </b>
                      Explain how you teach, areas you cover and what clients
                      should expect.
                    </Text>
                    <Text style={{ textAlign: "justify" }}>
                      <b>3. </b> Talk about past results with people you’ve
                      taught. Be specific!
                    </Text>
                    <Text className="last">
                      <b>4.</b> Ask them to hire you!
                    </Text>
                    <ViewExample
                      css={`
                        margin-bottom: 0 !important;
                        padding-top: 16px;
                        display: block;
                      `}
                      onClick={() => this.openModal("description")}
                    >
                      See Example
                    </ViewExample>
                  </ApplicationTooltip>
                }
                // tooltip={
                //   <Tooltip
                //     style={
                //       toolTipStyle // error={this.state.display_error} // error_message={this.renderErrors(1)}
                //     }
                //     heading="Summarize your expertise in General Mathematics."
                //   >
                //     <span>
                //       {`Please don't make any errors, only use alphabets and
                //     numbers, avoid unnecessary punctuations and write in full,
                //     NO ABBREVIATIONS.`}
                //     </span>
                //   </Tooltip>
                // }
                rows={5}
                placeholder="Why should clients hire you in particular? What makes you the best tutor for them?"
              />

              {/* {!this.state.addCertifications ? (
                <Note
                  style={{ marginBottom: 16 }}
                  bgColor="rgba(255,171,0,0.1)"
                  borderColor="#FFAB00"
                  buttonText=" Add Certifications/Tranings"
                  iconStyle={{
                    width: 24,
                    stroke: "#111111"
                  }}
                  onClick={() =>
                    this.setState({
                      addCertifications: true
                    })
                  }
                  buttonStyle={`
                  justify-content: space-around; 
                  background-color: #ffffff!important;
                  border: 1px solid #c9cacd!important;
                  color: #212529!important;
                  `}
                >
                  <Icon name="bulb" />
                  <div className="notice">
                    <Heading small css={"font-size: 16px;"}>
                      Have Relevant Certifications/Tranings?
                    </Heading>
                    <p>
                      Add more credibility by adding any relevant certification
                      or award you have.
                    </p>
                  </div>
                </Note>
              ) : (
                this.getFormset()
              )} */}
            </div>
          );
        }}
      </Wrapper>
    );
  }
}
export default OverviewPage;
