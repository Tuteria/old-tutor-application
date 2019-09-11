import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  TopHero,
  TutorImageCard,
  TutorProfileSection,
  MAXWIDTH,
  PricingComponent
} from "../src/pages/ExternalPages/ClientRequestLandingPage/components";
import { getLinkButton } from "../src/simple/Button";
import { Icon } from "../src/simple";
import {
  IELTSContent,
  GMATContent,
  GREContent
} from "../src/pages/ExternalPages/ClientRequestLandingPage/PageContent";
import { Container } from "../src/primitives";

const SecondaryLinkButton = getLinkButton("secondary");
const PrimaryLinkButton = getLinkButton("primary");
storiesOf("External Page Component", module)
  .add("TopHero", () => (
    <TopHero
      linkRender={() => <SecondaryLinkButton>Hello</SecondaryLinkButton>}
    />
  ))
  .add("Tutor Image Card", () => (
    <TutorImageCard
      {...{
        name: "Adebayo",
        rating: "5.0",
        image: "/static/img/tutors/Adewale-GMAT-Tutor-on-Tuteria.jpg"
      }}
    />
  ))
  .add("Tutor Profile Section", () => (
    <Container css={MAXWIDTH}>
      <TutorProfileSection
        {...{
          name: "Adebayo",
          rating: "5.0",
          image: "/static/img/tutors/Adewale-GMAT-Tutor-on-Tuteria.jpg",
          bio:
            "I am well acquainted with the British and American curricula. I have studied this system over the years and can use it to impact knowledge. I can prepare students for Cambridge A'Level Exams, SATs, TOEFL and IELTS. I'm here to ensure you pass your IELTS exams in flying colors. Join my class today"
        }}
      />
    </Container>
  ))
  .add("Pricing component", () => (
    <Container css={MAXWIDTH}>
      <PricingComponent
        {...{
          type: "Quick Prep",
          amount: "40000",
          highlights: [
            "Tuesdays and Thursdays, 10am -2pm",
            "5 Lessons (2 days/week)",
            "1 Free Mock Exam"
          ],
          icon: "orange-arrows",
          description: "Ideal for a quick brush-up before your exam",
          button_text: "Join a class"
        }}
      />
    </Container>
  ));
