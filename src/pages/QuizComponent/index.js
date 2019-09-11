import React from "react";
import { QuestionPage } from "./QuestionPage";
import { Timer } from "./Timer";
import { xs, spacing } from "../../siteStyle";
import { WizardWrapper, FormColumn } from "../components";
import { NotificationContext } from "../TutorApplicationUtils/PageWrapper";
export const PageWrapper = ({ children }) => (
  <NotificationContext.Consumer>
    {({ title, onBackClick }) => {
      return (
        <WizardWrapper
          navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
          title={title}
          hideFooter={true}
          showPreviousScreen={true}
          previousPageFunc={onBackClick}
          goToPreviousScreen={onBackClick}
          helperStyle={` 
      max-width: 1200px;
      @media(max-width: ${xs}px) {
        margin-left: ${spacing.s};
        margin-right: ${spacing.s};
      }`}
        >
          <FormColumn marginTop="0" full_width>
            {children}
          </FormColumn>
        </WizardWrapper>
      );
    }}
  </NotificationContext.Consumer>
);

export class QuizComponent extends React.Component {
  state = {
    elapsedTime: Date.now(),
    current: 1,
    completed: this.props.completed,
    answers: {}
  };
  nextPage = () => {
    const { questions } = this.props;
    let { current, completed, elapsedTime, answers } = this.state;
    if (this.state.current < questions.length) {
      current += 1;
    } else {
      completed = true;
    }
    this.setState({ current, completed });
    if (completed) {
      this.handleSubmission(answers, elapsedTime);
    }
  };
  getElapsedTime = () => {
    return (Date.now() - this.state.elapsedTime) / 1000;
  };
  handleSubmission(answers, elapsedTime) {
    let timeElapsed = (Date.now() - elapsedTime) / 1000;
    this.props.processAnswers(answers, timeElapsed);
  }
  previousPage = () => {
    if (this.state.current > 1) {
      this.setState({ current: this.state.current - 1 });
    }
  };
  selectAnswer = option => {
    let answers = { ...this.state.answers };
    answers[this.state.current] = option;
    this.setState({ answers });
  };
  quizCompleted = () => {
    this.setState({ completed: !this.state.completed });
    this.handleSubmission(this.state.answers, this.state.elapsedTime);
  };
  render() {
    let { questions = [] } = this.props;
    const currentQuestion = questions[this.state.current - 1];
    return currentQuestion ? (
      <PageWrapper>
        {!this.state.completed ? (
          <QuestionPage
            no={this.state.current}
            question={currentQuestion}
            lastQuestion={questions.length}
            selectAnswer={this.selectAnswer}
            currentAnswer={this.state.answers[this.state.current]}
            nextQuestion={this.nextPage}
            previousQuestion={this.previousPage}
            timerComponent={index => (
              <Timer
                newDuration={this.props.duration * 1000 * 60}
                quizCompleted={this.quizCompleted}
                text={`Question ${this.state.current} of ${questions.length}`}
              />
            )}
          />
        ) : (
          this.props.completedComponent(this.getElapsedTime)
        )}
      </PageWrapper>
    ) : null;
  }
}

export { QuestionPage } from "./QuestionPage";
export { Timer } from "./Timer";
export { ResultComponent } from "./ResultComponent";
export default QuizComponent;
