import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { PageWrapper as Container } from "../src/pages/TutorApplicationUtils";
// import QuestionPage from "../src/pages/QuizFlowPage";
import QuizComponent, {
  QuestionPage,
  Timer,
  ResultComponent,
  PageWrapper
} from "../src/pages/QuizComponent";
// import Timer from "../src/pages/QuizFlowPage/Timer";
// import ResultComponent from "../src/pages/QuizFlowPage/ResultComponent";
import DATA from "./ApplicationPages/data/data";
const steps = [
  {
    display: false,
    text: "General Mathematics Test"
  }
];
storiesOf("Quiz Flow Page", module)
  // .add("Quiz Page", () => (
  //   <Container>
  //     <QuizPage />
  //   </Container>
  // ))
  .add("Quiz Component 1", () => (
    <Container
      steps={steps}
      navProps={{
        heading: "ACCA Test",
        title: "ACCA Test",
        inverse: true,
        displayBackButton: true
      }}
    >
      <PageWrapper title="ACCA Test">
        <QuestionPage
          currentAnswer=""
          no={1}
          question={DATA.quiz.questions[0]}
          timerComponent={index => (
            <Timer
              newDuration={20000}
              quizCompleted={action("quiz completed")}
              text={`Question 1 of 20`}
            />
          )}
        />
      </PageWrapper>
    </Container>
  ))
  .add("Quiz Component 2", () => (
    <Container
      steps={steps}
      navProps={{
        heading: "Physics Test",
        title: "Physics Test",
        inverse: true
      }}
    >
      <PageWrapper>
        <QuestionPage
          currentAnswer=""
          no={2}
          question={DATA.quiz.questions[1]}
          timerComponent={index => (
            <Timer
              newDuration={20000}
              quizCompleted={action("quiz completed")}
              text={`Question 1 of 20`}
            />
          )}
        />
      </PageWrapper>
    </Container>
  ))
  .add("Quiz Component 3", () => (
    <Container
      steps={steps}
      navProps={{
        heading: "Chemistry Test",
        title: "Chemistry Test",
        inverse: true
      }}
    >
      <PageWrapper>
        <QuestionPage
          currentAnswer=""
          no={3}
          question={DATA.quiz.questions[16]}
          timerComponent={index => (
            <Timer
              newDuration={20000}
              quizCompleted={action("quiz completed")}
              text={`Question 1 of 20`}
            />
          )}
        />
      </PageWrapper>
    </Container>
  ))
  .add("Result Page Failed", () => (
    <Container
      steps={steps}
      navProps={{
        inverse: true,
        heading: "Yoruba Language Test",
        title: "Yoruba Language Test"
      }}
    >
      <PageWrapper>
        <ResultComponent
          {...{
            duration: "35",
            percentage_score: 20,
            didPassTest: false
          }}
          details={{
            name: "GENERAL MATHEMATICS",
            description: `Taken by Bee Sama on June 23rd, 2017`,
            position: "130th out of all 123403 test takers",
            percentile: 10,
            timeToCompile: duration =>
              `${duration} minute(s) (${60} minutes allowed)`
          }}
        />
      </PageWrapper>
    </Container>
  ))
  .add("Result Page Passed", () => (
    <Container steps={steps} navProps={{ inverse: true }}>
      <PageWrapper title="French Language Test">
        <ResultComponent
          {...{
            duration: "35",
            percentage_score: 80,
            didPassTest: true
          }}
          details={{
            name: "GENERAL MATHEMATICS",
            description: `Taken by Bee Sama on June 23rd, 2017`,
            position: "130th out of all 123403 test takers",
            percentile: 10,
            timeToCompile: duration => `${35} minute(s) (${60} minutes allowed)`
          }}
        />
      </PageWrapper>
    </Container>
  ))
  .add("Quiz Component", () => (
    <Container
      steps={steps}
      navProps={{
        inverse: true,
        heading: "English Language Test",
        title: "English Language Test",
        displayBackButton: true,
        onBackClick: () => {}
      }}
    >
      <QuizComponent
        completed={false}
        duration={0.5}
        questions={DATA.quiz.questions}
        processAnswers={(answers, timeElapsed) => {}}
        previousPage={() => {}}
        completedComponent={() => (
          <ResultComponent
            {...{
              duration: "35",
              percentage_score: 80,
              didPassTest: true
            }}
            details={{
              name: "GENERAL MATHEMATICS",
              description: `Taken by Bee Sama on June 23rd, 2017`,
              position: "130th out of all 123403 test takers",
              percentile: 10,
              timeToComply: `${35} minute(s) (${60} minutes allowed)`
            }}
            afterTest={() => {}}
          />
        )}
      />
    </Container>
  ));
