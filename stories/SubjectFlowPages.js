// @ts-nocheck
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import SubjectStartPage from "../src/pages/SubjectStartPage";
import {
  mapStateToProps as selectStateToProps,
  getCategory as selectGetCategory,
  getSubCategories,
  getSubjects,
  allSubjects,
  subjectListMapStateToProps,
  subjectTestStartMapStateToProps
} from "./ApplicationPages/data/SubjectSelect.js";
import SubjectSelectPage from "../src/pages/SubjectSelectPage";
import SubjectListPage from "../src/pages/SubjectListPage";
import StartTestPage from "../src/pages/StartTestPage";
import {
  PageWrapper as Container,
  SavingContext,
  CurrentApplicationPageContext
} from "../src/pages/TutorApplicationUtils";
import jsonData from "../src/data.json";
import { ApplicationTooltip } from "../src/simple";
import { ProgressContext } from "../src/pages/WizardWrapper";
import isMobilePhone from "validator/lib/isMobilePhone";
import { NotificationContext } from "../src/pages/TutorApplicationUtils/PageWrapper";

const steps = [
  {
    text: "Select Subject",
    display: true,
    url: "select-subject",
    completed: false,
    category: "subject"
  },
  {
    text: "Take Subject Test",
    display: true,
    url: "subject-list",
    completed: false,
    category: "subject"
  },
  {
    text: "Add Details & Set Your Fee",
    display: true,
    url: "personal-info",
    completed: false,
    category: "subject"
  }
];
class TempStore extends React.Component {
  state = {
    selectedSubjects: [
      {
        category: "Academics",
        duration: 10,
        id: 9,
        name: "Differential Equations",
        pass_mark: 45,
        quiz_url: "differential-equations-quiz",
        slug: "differential-equations",
        subcategory: "Undergraduate",
        taken: true,
        testable: true
      }
    ]
  };
  updateState = data => {
    this.setState(data);
  };
  render() {
    return this.props.children(this.state, this.updateState);
  }
}
storiesOf("Subject Flow Pages", module)
  .add("SubjectStartPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true, heading: "Step 2: Create Subject" }}
      current="personal-info"
    >
      {/* <Page steps={steps}> */}
      <SubjectStartPage
        title="Back to previous"
        mobileTitle="BAck to preious"
        previousPage={() => {}}
        nextPage={() => {}}
      />
    </Container>
  ))
  .add("SubjectSelectPage", () => (
    <Container steps={steps} navProps={{ inverse: true }}>
      {/* <Page steps={steps}> */}
      <TempStore>
        {({ selectedSubjects }, updateSelectedSubject) => (
          <SubjectSelectPage
            previousPage={() => {}}
            getCategory={selectGetCategory}
            {...selectStateToProps()}
            selectedSubjects={selectedSubjects}
            updateSelectedSubjects={s =>
              updateSelectedSubject({ selectedSubjects: s })
            }
            getSubCategories={getSubCategories}
            getSubjects={getSubjects}
            allSubjects={allSubjects}
            nextPage={subjects => {}}
            MAX_SUBJECTS={1}
            maxSubjectNotification={() => alert("You can only teach 1 subject")}
            addSingleSubject={subjet => {}} //previously a redux action ADD_SUBJECT
            section="select-subject"
          />
        )}
      </TempStore>
    </Container>
  ))
  .add("SubjectListPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <TempStore>
        {({ selectedSubjects }, updateSelectedSubject) => (
          <SubjectListPage
            {...subjectListMapStateToProps(allSubjects, selectedSubjects)}
            updateSelectedSubjects={s =>
              updateSelectedSubject({ selectedSubjects: s })
            }
            deleteSubject={subject => {}}
            goToSubjectDetailPage={subject => {}}
            takeTest={subject => {}}
            allSubjects={allSubjects}
            section="subject-list"
            MAX_SUBJECTS={10}
          />
        )}
      </TempStore>
    </Container>
  ))
  .add("StartTestPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <StartTestPage
        section="subject-list"
        {...subjectTestStartMapStateToProps()}
      />
    </Container>
  ));
