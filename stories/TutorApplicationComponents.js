import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import {
  NavigationBar,
  Page,
  PageWrapper as Container
} from "../src/pages/TutorApplicationUtils";
import { ImageModal } from "../src/pages/ProfileUploadPage";
import { Div } from "../src/primitives";
import { NavTabs } from "../src/pages/ClientRequestPages/NavBar";
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
let tabs = [
  "Overview",
  "Set Subject Pricing",
  "Gallery/Portfolio",
  "Requirements"
];
storiesOf("Tutor Application Components", module)
  .add("Navigation Bar", () => (
    <Div
      css={`
        display: flex;
        flex-direction: column;
        & > div {
          margin-bottom: 30px;
        }
      `}
    >
      <NavigationBar />
      <NavigationBar
        heading="Tutor Application"
        title="Personal Info Page"
        displayBackButton
        onBackClick={action("e")}
        inverse
      />
    </Div>
  ))
  .add("Container Wrapper", () => (
    <Container steps={steps}>
      <Div>Hello world</Div>
    </Container>
  ))
  .add("Upload Image Modal", () => (
    <ImageModal
      showModal
      image="/static/img/profile/Rectangle 17 Copy 2@2x.png"
      updateImage={action("e")}
      handleCloseModal={action("e")}
    />
  ))
  .add("Container With Subnav", () => (
    <Container steps={steps} current={"personal-info"}>
      <Div>Hello world</Div>
    </Container>
  ))
  .add("NavBar", () => (
    <Div css={``}>
      <NavTabs tabs={tabs} current={3} />
      <NavTabs tabs={tabs} />
    </Div>
  ));
