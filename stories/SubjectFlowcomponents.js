// @ts-nocheck
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import SubjectStartPage from "../src/pages/SubjectStartPage";
import {
  Category,
  SelectDropdown,
  SubCategories
} from "../src/pages/SubjectSelectPage/Category";
import {
  mapStateToProps,
  getSubCategories,
  getSubjects
} from "./ApplicationPages/data/SubjectSelect.js";
import { Div } from "../src/primitives";
import { PageWrapper as Container } from "../src/pages/TutorApplicationUtils";
import { RowItem } from "../src/pages/SubjectListPage";
import { SummaryContainer } from "../src/pages/SubjectStartPage/SummaryContainer";
import HeaderContent, { Heading } from "../src/pages/SubjectStartPage/Header";
import palm from "../src/pages/VerifyStartPage/palm@2x.png";
import { SearchComponent } from "../src/pages/SubjectDetailsPage/question-types/InputComponent";
import Icon from "../src/simple/Icon";
import Divider from "../src/simple/Divider";
import {
  Checkboxes,
  Categories
} from "../src/pages/SubjectDetailsPage/OverviewPage";
const steps = [
  {
    text: "Step 4: Create Subject",
    display: false
  }
];
const { selectedSubjects, categories } = mapStateToProps();
const subcategory = getSubCategories(categories[0])[0];
storiesOf("Subject Flow Components", module)
  .add("Category Component", () => (
    <Div>
      <Container
        steps={steps}
        navProps={{ inverse: true }}
        current="personal-info"
      >
        {/* <Page steps={steps}> */}
        <SubjectStartPage />
      </Container>
    </Div>
  ))
  .add("Category Accordion", () => (
    <Div>
      <Category
        canShow={true}
        currentIndex={1}
        onClick={action("On Click")}
        {...categories[0]}
        updateSubjects={action("updateSubjects")}
        getSubCategories={()=>[]}
        selectedSubjects={selectedSubjects}
        active={true}
        />
      <Category
        canShow={false}
        currentIndex={2}
        getSubCategories={()=>[]}
        onClick={action("On Click")}
        {...categories[1]}
        updateSubjects={action("updateSubjects")}
        selectedSubjects={selectedSubjects}
        active={true}
      />
    </Div>
  ))
  .add("SubCategories", () => (
    <Div>
      <SubCategories
        category={categories[0].name}
        updateHeight={action("height")}
        updateHeight={action("update height")}
        updateSubjects={action("updateSubjects")}
        selectedSubjects={selectedSubjects}
        getSubCategories={()=>[]}
        disableClick
        />

      <SubCategories
        category={categories[0].name}
        updateHeight={action("height")}
        updateHeight={action("update height")}
        updateSubjects={action("updateSubjects")}
        selectedSubjects={selectedSubjects}
        getSubCategories={()=>[]}
      />
    </Div>
  ))
  .add("SelectDropdown Accordion", () => (
    <Div>
      <SelectDropdown
        updateSubjects={action("updateSubjects")}
        selectedSubjects={selectedSubjects}
        updateParent={action("update parent")}
        active={true}
        updateHeight={action("update height")}
        icon={subcategory.icon}
        subcategory={subcategory.subcategory}
        subjects={getSubjects(subcategory)}
      />
      <SelectDropdown
        updateSubjects={action("updateSubjects")}
        selectedSubjects={selectedSubjects}
        updateParent={action("update parent")}
        active={true}
        disableClick
        updateHeight={action("update height")}
        icon={subcategory.icon}
        subcategory={subcategory.subcategory}
        subjects={getSubjects(subcategory)}
      />
    </Div>
  ))
  .add("Subject RowItem", () => (
    <Div
      css={`
        width: 96%;
        margin: 0 auto;
      `}
    >
      <RowItem
        removeSubject={action("removeSubject")}
        score={{
          badge: "Top 15%",
          figure: "70%",
          passed: true
        }}
        subject={{
          category: "Academics",
          duration: 10,
          name: "Algebra",
          pass_mark: 45,
          quiz_url: "algebra-quiz",
          slug: "algebra",
          subcategory: "Mathematics",
          testable: true
        }}
        takeTest={action("take Test")}
        taken={true}
        navigateToSubject={action("navigate to subject")}
      />
    </Div>
  ))
  .add("Summary Container", () => (
    <React.Fragment>
      <SummaryContainer
        newTitle="Step 4: Create Subject"
        nextButtonText="Cool! Let's Begin"
        mobileTitle="Back to Set Price"
        nextPage={action("Next page")}
        children={
          <React.Fragment>
            <HeaderContent
              heading="Welldone, Godwin!"
              caption="Let’s now add the subjects you want to teach"
              icon="clap@2x"
            />
            <Divider>
              <p>Here is how it works</p>
            </Divider>
          </React.Fragment>
        }
        data={[
          {
            icon: <Icon name="select" />,
            heading: "1. Choose Subjects",
            caption:
              "Select the subjects you're capable of teaching at the moment"
          },
          {
            icon: <Icon name="document-time" />,
            heading: "2. Take Test",
            caption:
              "Take a short online competency test for the selected subject."
          },
          {
            icon: <Icon name="align-left" />,
            heading: "3. Add Fees & Details",
            caption:
              "Once passed, you can add more details and charge a custom price."
          }
        ]}
      />
    </React.Fragment>
  ))
  .add("Summary Container 2", () => (
    <SummaryContainer
      newTitle="Step 4: Create Subject"
      nextButtonText="I understand! Verify Now"
      mobileTitle="Back to Set Price"
      nextPage={action("Next page")}
      below={false}
      data={[
        {
          icon: <Icon name="handshake" />,
          heading: "Earn more trust",
          caption:
            "Clients can trust you better and feel safe working with you."
        },
        {
          icon: <Icon name="moneybag" />,
          heading: "Make more money",
          caption:
            "Only verified tutors get access to clients and make money on Tuteria"
        },
        {
          icon: <Icon name="shield" />,
          heading: "Verified Badge",
          caption:
            "You get more promotion by getting a verified badge to your profile"
        }
      ]}
      buttonCss={`
      width: 45%;
      margin-top: 24px;`}
      children={
        <React.Fragment>
          <Heading mb="23px">
            <img alt="" src={palm} />
            <h1>High fives!</h1>
            <p className="sub-header">
              You are almost done with publishing your first subject
            </p>
          </Heading>
          <p className="body-text">
            Before you start teaching on Tuteria, the security of your account
            is important to us. Therefore, we require all tutors to verify their
            identity before we can publish their first Subject.
          </p>
        </React.Fragment>
      }
    />
  ))
  .add("Level Picker", () => (
    <Categories
      // RootComponent={NoPaddingColumn}
      items={[
        {
          name: "Nursery Classes",
          values: ["Nursery 1", "Nursery 2"]
        },
        {
          name: "Primary Classes",
          values: [
            "Primary 1",
            "Primary 2",
            "Primary 3",
            "Primary 4",
            "Primary 5",
            "Primary 6"
          ]
        }
      ]}
      updateClasses={action("Update classes")}
      selectedClasses={[]}
      updateSelectedClasses={action("update Selected classes")}
    />
  ))
  .add("SearchComponentForm", () => {
    return (
      <SearchComponent
        display_error={false}
        question={{
          name: "What is the title of the song"
        }}
        newOnChange={action("onChange")}
        saved_list={[]}
        items={[]}
      />
    );
  });
