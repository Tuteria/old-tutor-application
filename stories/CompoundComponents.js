import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import Accordion from "../src/compound/Accordion";
import { NoticeAction as ImageNotice } from "../src/simple/ImageNotice";
import { Div } from "../src/primitives/index";
import Notification from "../src/simple/Notification";
import { ApplicationTooltip, Icon } from "../src/simple";
import { Text } from "../src/simple/Text";
import { ViewExample, ExampleModal } from "../src/pages/AboutTutorPage";
import { Notifier } from "../src/pages/TutorApplicationUtils/PageWrapper";
import { ApplicationStepTabs, NumberTabs } from "../src/compound/SupportedTabs";
import { Badge } from "../src/pages/SubjectSelectPage";
import {
  ButtonDatePicker,
  TargetScoreComponent
} from "../src/pages/ExamRequestPages/ExamExpectationComponent";

import includes from "lodash/includes";
import { NavBar } from "../src/compound/Navigation";
const steps = [
  {
    text: "Step 1: Personal Details",
    display: true,
    url: "personal-info",
    completed: false
  },
  {
    display: true,
    text: "Step 2: Credentials & Education",
    url: "qualifications",
    completed: false
  },
  {
    text: "Step 3: Tutor Profile",
    display: true,
    url: "about-tutor",
    completed: false
  },
  {
    text: "Step 4: Create Subjects",
    display: true,
    url: "",
    completed: false
  }
];
const NewDiv = styled(Div)`
  display: flex;
  justify-content: space-around;
`;
let example1 = {
  title: "Examples of good title",
  kind: "title",
  content: [
    "Experienced Fashion Design Trainer for More than 10 Years",
    "Expert Software Developer and Python Programmer",
    "Classical Piano Tutor (ABRSM, MUSON) with more than 5 years' experience",
    "Learn the art of speaking and writing German like a German"
  ]
};
let example = {
  title: "Examples of good description (1 of 2)",
  kind: "description",
  content: [
    `I am a very experienced IELTS and IGCSE tutor who uses highly systematic
        and result-oriented approach to help students score very high mark. I
        specialize in teaching the Speaking, Reading, Listening and Writing
        skills to those aiming at Band score of at least 8.0`,
    `By experience, I have taught those who scored in the 9 point range, and
        those who scored in the 7-8 point range. My ideal students are those who
        don't just want to pass the exam, but who are aiming for a high score,
        typically 8.0 and above. That way, we would be able to derive the best
        value from our time together.`,
    `I normally assess each student for their individual needs. I believe in
        making my students feel comfortable and creating an environment good for
        learning by using interesting, challenging and engaging material. One of
        my students, Emem, scored 8.0 overall - 8.5 in Listening, 8.5 in
        Reading, 7.0 in Speaking and 7.0 in Writing. Subsequently, I have taught
        clients who have scored overall band between 8.5 and 9.0.`
  ]
};

class DebugNotification extends React.Component {
  state = {
    display: true
  };
  render() {
    return (
      <Notification className="warning" style={{ width: "100%" }}>
        Hello world
        <Icon
          name="close"
          onClick={action("e")}
          fill={"#E9411B"}
          style={{ float: "right", cursor: "pointer" }}
        />
      </Notification>
    );
  }
}
storiesOf("Compound Components", module)
  .add("Accordion", () => (
    <NewDiv>
      <Accordion
        css={`
          width: 100%;
        `}
        label="Who can teach on Tuteria?"
        className="flex-item"
      >
        <p>
          Anyone above 18 with some experience teaching people either formally
          or informally and track record of producing results.{" "}
          <strong>If teaching is your thing, then join us!</strong>
        </p>
      </Accordion>
    </NewDiv>
  ))
  .add("ImageNotice", () => (
    <NewDiv>
      <ImageNotice buttonText={"Hello"}>
        <p>Hello HeloHeloHeloHeloHeloHeloHeloHeloHeloHelo</p>
      </ImageNotice>
    </NewDiv>
  ))
  .add("Notification", () => (
    <NewDiv>
      <Notifier text="Hello world" type="error" />
      <Notification
        icon={true}
        customIcon={false ? "check-circle" : "exclamation-circle"}
        className={false ? "success" : "error"}
        style={{
          fontSize: 18,
          paddingLeft: 15,
          textAlign: "left",
          display: "flex"
        }}
      >
        <span style={{ color: "#484848" }}>This is a demo message</span>
      </Notification>
    </NewDiv>
  ))
  .add("Application Tooltip", () => (
    <ApplicationTooltip
      style={{
        width: 300,
        height: "auto",
        position: "absolute",
        marginLeft: 20,
        top: 0
      }}
      heading="Keep it short and descriptive"
    >
      <Text className="last">
        The best titles give a strong sense of your qualification and expertise
        in an instant!
      </Text>
      <ViewExample
        css={`
          margin-bottom: 0 !important;
          padding-top: 16px;
          display: block;
        `}
        onClick={() => this.openModal(1)}
      >
        See Example
      </ViewExample>
    </ApplicationTooltip>
  ))
  .add("Applicatin Tooltip Description", () => (
    <ApplicationTooltip
      style={{
        width: 300,
        height: "auto",
        position: "absolute",
        marginLeft: 20,
        top: 0
      }}
      heading="Tell clients how good you are!"
    >
      <Text>Talk about these 4 things:</Text>
      <Text>
        <b>1.</b> Emphasize your level of experience, qualifications or relevant
        awards.
      </Text>
      <Text>
        <b>2. </b>
        Explain how you teach, areas you cover and what clients should expect.
      </Text>
      <Text style={{ textAlign: "justify" }}>
        <b>3. </b> Talk about past results with people you’ve taught. Be
        specific!
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
        onClick={() => this.openModal(1)}
      >
        See Example
      </ViewExample>
    </ApplicationTooltip>
  ))
  .add("Example Modal Description", () => {
    return (
      <React.Fragment>
        <ExampleModal
          showModal={true}
          kind="description"
          data={[
            example,
            {
              ...example,
              title: "Examples of good description (2 of 2)"
            },
            example1
          ]}
        />
      </React.Fragment>
    );
  })
  .add("Example Modal Title", () => (
    <React.Fragment>
      <ExampleModal
        showModal={true}
        kind="title"
        data={[
          example,
          example1,
          {
            ...example,
            title: "Examples of good description (2 of 2)"
          }
        ]}
      />
    </React.Fragment>
  ))
  .add("Tabs", () => (
    <Div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <Div
        css={`
          margin-bottom: 20px;
        `}
      >
        <NumberTabs
          step={2}
          tabs={[
            "Overview",
            "Set Subject Pricing",
            "Gallery/Portfolio",
            "Requirements"
          ]}
        />
      </Div>

      <ApplicationStepTabs activeCondition={step => false} tabs={steps} />
      <ApplicationStepTabs
        activeCondition={step =>
          includes(["personal-info", "qualifications"], step.url)
        }
        tabs={steps}
      />
    </Div>
  ))
  .add("Badge", () => (
    <Div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <Div
        css={`
          & > div {
            display: inline-block;
          }
        `}
      >
        <Badge text={"English Language"} onClick={action("onSelect")} />
        <Badge text={"French Language"} onClick={action("onSelect")} />
        <Badge text={"German Language"} onClick={action("onSelect")} />
      </Div>
      <Div
        css={`
          margin-top: 10px;
          & > div {
            display: inline-block;
          }
        `}
      >
        <Badge fixed text={"English Language"} onClick={action("onSelect")} />
        <Badge fixed text={"French Language"} onClick={action("onSelect")} />
        <Badge fixed text={"German Language"} onClick={action("onSelect")} />
      </Div>
    </Div>
  ))
  .add("Button datepicker component", () => (
    <ButtonDatePicker title="Expected exam date" buttonText="Select date" />
  ))
  .add("Target Score component", () => (
    <TargetScoreComponent
      title="Target score"
      buttonText="Add scores"
      exam_sections={[
        { section: "Writing", score: "" },
        { section: "Reading", score: "" },
        { section: "Speaking", score: "" },
        { section: "Listening", score: "" }
      ]}
      updateSection={values => console.log(values)}
    />
  ))
  .add("Navbar", () => <NavBar />);
