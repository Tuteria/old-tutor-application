// @ts-nocheck
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import {
  PageWrapper as Container,
  SavingContext,
  CurrentApplicationPageContext
} from "../src/pages/TutorApplicationUtils";
import { Heading } from "../src/simple/Text";
import { ApplicationTooltip } from "../src/simple";
import { ProgressContext } from "../src/pages/WizardWrapper";
import isMobilePhone from "validator/lib/isMobilePhone";

import { NotificationContext } from "../src/pages/TutorApplicationUtils/PageWrapper";
import OverviewPage from "../src/pages/SubjectDetailsPage/OverviewPage";
import RequirementsPage from "../src/pages/SubjectDetailsPage/RequirementsPage";
import PortfolioPage from "../src/pages/SubjectDetailsPage/PortfolioPage";
import PricingPage from "../src/pages/SubjectDetailsPage/SubjectPricingPage";
import {
  detailStateToProps,
  mapStateToProps
} from "./ApplicationPages/detail/reducers";
import {
  getPrefix,
  getAcademicSubjectCategory,
  displayCurriculum
} from "./ApplicationPages/detail/utils";
const result = detailStateToProps();
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
    text: "Add Subject Detail & Fee",
    display: true,
    url: "personal-info",
    completed: false,
    category: "subject"
    // multiple: true
  }
];
class SampleOverViewPage extends React.Component {
  state = {
    data: {}
  };
  render() {
    const { data, questions, subject } = this.props;
    return (
      <Container
        steps={steps}
        navProps={{ inverse: true }}
        current="personal-info"
      >
        <OverviewPage
          data={data}
          questions={questions}
          subject={subject}
          allQuestionErrors={result.allQuestionErrors}
          getPrefix={getPrefix}
          // canSubmit={(result.canSubmit)}
          validateAction={(fields, errors) => {
            this.setState({ data: fields });
            return true;
          }}
          // canSubmit={() => false}
          getAcademicSubjectCategory={getAcademicSubjectCategory}
          displayCurriculum={displayCurriculum}
          nextPage={(slug, routes) => path => {}}
          previousPage={(slug, routes) => path => {}}
          examples={[
            example,
            {
              ...example,
              title: "Examples of good description (2 of 2)"
            },
            example1
          ]}
          previousPath="/holla2.0"
        />
      </Container>
    );
  }
}
storiesOf("Subject Details Pages", module)
  .add("OverviewPage Academic", () => {
    let { questions, ...rest } = mapStateToProps({ slug: "handwriting" });
    let dd = {
      ...result,
      ...{ ...rest, questions: { ...questions, portfolio: true } }
    };
    return (
      <SampleOverViewPage
        {...dd}
        data={{
          selectedClasses: [
            "Nursery 1",
            "Nursery 2",
            "Primary 1",
            "Primary 2",
            "Primary 3",
            "Primary 4",
            "Primary 5",
            "Primary 6"
          ],
          questions: {
            "Nursery-1": "No",
            "Nursery-2": 2,
            "Nursery-3": [
              "Nelson Handwriting Style",
              "Peterson Handwriting Style",
              "New American Cursive Style"
            ],
            "Primary-1": "No",
            "Primary-2": []
          },
          title:
            "fjweojewo joweioi wejoiwe jioewjio ewjiowe jiowejio wjeiojweio jwioe jowiej oiwj",
          curriculums: ["American", "Nigerian", "Canadian"],
          description: "fjewojewo jweoi wj"
        }}
      />
    );
  })
  .add("OverviewPage Vocational", () => {
    let dd = {
      ...result,
      ...mapStateToProps({ slug: "sewing-and-tailoring" })
    };
    return <SampleOverViewPage {...dd} />;
  })
  .add("OverviewPage Music", () => {
    let dd = { ...result, ...mapStateToProps({ slug: "voice-training" }) };
    return <SampleOverViewPage {...dd} />;
  })
  .add("OverviewPage Sports", () => {
    let dd = { ...result, ...mapStateToProps({ slug: "swimming" }) };
    return <SampleOverViewPage {...dd} />;
  })
  .add("OverviewPage Language", () => {
    let dd = { ...result, ...mapStateToProps({ slug: "kalabari" }) };
    return <SampleOverViewPage {...dd} />;
  })
  .add("OverviewPage Special Needs", () => {
    let dd = { ...result, ...mapStateToProps({ slug: "dyslexia" }) };
    return <SampleOverViewPage {...dd} />;
  })

  .add("OverviewPage Computer and Software", () => {
    let dd = {
      ...result,
      ...mapStateToProps({ slug: "web-development" }),
      data: {
        selectedClasses: [],
        questions: {
          "1": ["Beginner"],
          "2": ["Children (6-12)", "Teenagers (13-19)"],
          "3": [
            { text: "Creating APIs", level: "Intermediate" },
            { text: "Building Mobile Apps", level: "Advanced" },
            { text: "Building Web Apps", level: "Intermediate" }
          ],
          "4": ["MacOS", "Windows"]
        },
        title: "jfoaj eojaeoi jaioej aioejioe jioaj ",
        description: "ajeoaj eojaeoi jaioej ioaejioj eiojaioj iao"
      }
    };
    return <SampleOverViewPage {...dd} />;
  })

  .add("RequirementsPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <RequirementsPage
        requirements="<h2>Hello world</h2>"
        nextPage={(slug, routes) => path => {}}
        previousPage={(slug, routes) => path => {}}
        nextPath="/hello/world"
        validateAction={data => {
          return true;
        }}
      />
    </Container>
  ))
  .add("PortfolioPage with Form", () => {
    let dd = {
      questions: {},
      portfolio: {
        type: "Portfolio",
        heading: "Upload your Portfolio for [Skill]",
        project: true,
        fields: [
          "Project Title",
          "A little description of what you did",
          "Upload a picture of your work"
        ]
      }
    };
    return (
      <Container
        steps={steps}
        navProps={{ inverse: true }}
        current="personal-info"
      >
        <PortfolioPage
          portfolios={[
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png"
          ]}
          formset={[
            {
              title: "This is sama",
              description: "I struggled to build this application",
              images: [
                "/static/img/profile/exhibit.png",
                "/static/img/profile/exhibit.png"
              ].map(image => ({ image }))
            }
          ]}
          questions={dd}
          nextPage={(slug, routes) => path => {}}
          previousPage={(slug, routes) => path => {}}
          validateAction={data => true}
        />
      </Container>
    );
  })
  .add("PortfolioPage without Form", () => {
    let dd = { questions: {}, portfolio: {} };
    return (
      <Container
        steps={steps}
        navProps={{ inverse: true }}
        current="personal-info"
      >
        <PortfolioPage
          portfolios={[
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png",
            "/static/img/profile/exhibit.png"
          ]}
          questions={dd}
          nextPage={(slug, routes) => path => {}}
          previousPage={(slug, routes) => path => {}}
          validateAction={data => true}
        />
      </Container>
    );
  })
  .add("PricingPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <PricingPage
        toolTip={
          <ApplicationTooltip icon="naira" heading="Price Tip">
            <p>Tutors who teach Adobe Illustrator typically charge:</p>
            <h4 style={{ color: "#36b37e" }}>N3,600/hr</h4>
            <p>
              <span className="asterick">*</span>Be sure to set a fair
              competitive price so clients can pick you.
            </p>
          </ApplicationTooltip>
        }
        data={{
          price: 3000,
          discount: 10,
          adminPercent: 30
        }}
        nextPage={(slug, routes) => path => {
          console.log(slug);
          console.log(routes);
        }}
        validateField={validatePricing}
        previousPage={(slug, routes) => path => {}}
        defaultValidation={false}
        errors={{
          price: ["Please state your charge per hour"],
          discount: ["Please select a discount to apply"]
        }}
        onSubmit={(fields, nextPage) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(fields);
              nextPage();
              resolve({ success: {}, error: null });
            }, 1000);
          });
        }}
      />
    </Container>
  ));

function validatePricing(state, field, err) {
  if (field === "price") {
    return !!state[field] && parseInt(state[field], 10) > 500;
  }
  if (field === "discount") {
    return Number.isInteger(state[field]);
  }
  return !!state[field];
}
