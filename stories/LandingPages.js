import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  ClientLandingPage,
  ExamLandingPage
} from "../src/pages/ExternalPages/ClientRequestLandingPage";
import { getLinkButton } from "../src/simple/Button";
import { Icon } from "../src/simple";
import {
  IELTSContent,
  GMATContent,
  GREContent
} from "../src/pages/ExternalPages/ClientRequestLandingPage/PageContent";

const SecondaryLinkButton = getLinkButton("secondary");
const PrimaryLinkButton = getLinkButton("primary");
storiesOf("Landing Pages", module)
  .add("Academic Landing Page", () => (
    <ClientLandingPage
      linkRender={(text, props = { big: true }) => (
        <SecondaryLinkButton {...props} href="/">
          {text}
        </SecondaryLinkButton>
      )}
    />
  ))
  .add("IELTS Exam Page", () => (
    <ExamLandingPage
      linkRender={(text, props = { big: true }) => (
        <PrimaryLinkButton {...props} className="exam-page-button" href="/">
          {text} <Icon name="arrow-right" />
        </PrimaryLinkButton>
      )}
      content={IELTSContent}
      buttonText="Get a tutor"
    />
  ))
  .add("GMAT Exam Page", () => (
    <ExamLandingPage
      linkRender={(text, props = { big: true }) => (
        <PrimaryLinkButton {...props} className="exam-page-button" href="/">
          {text} <Icon name="arrow-right" />
        </PrimaryLinkButton>
      )}
      content={GMATContent}
      buttonText="Get a tutor"
    />
  ))
  .add("GRE Exam Page", () => (
    <ExamLandingPage
      linkRender={(text, props = { big: true }) => (
        <PrimaryLinkButton {...props} className="exam-page-button" href="/">
          {text} <Icon name="arrow-right" />
        </PrimaryLinkButton>
      )}
      content={GREContent}
      buttonText="Get a tutor"
    />
  ));
