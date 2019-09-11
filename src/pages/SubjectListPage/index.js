import React from "react";
import styled from "styled-components";
import { SuccessBadge, DangerBadge } from "../../simple/Badge";
import {
  PrimaryButton,
  SuccessButton,
  ButtonWithIcon
} from "../../simple/Button";
import Icon from "../../simple/Icon";
import { TestContentStyle } from "../../layout/ContentStyle";
import { WizardWrapper, FormColumn, Div } from "../components";
import globals, { spacing } from "../../siteStyle";
import { FormHeading } from "../../form";
import { AddIcon, PreviousLink } from "../../compound/AddIcon";
import SearchBar from "../SubjectSelectPage/SearchBar";

const { xs } = globals;
// import {}
export const SubjectListStyle = styled(TestContentStyle)``;

const ListBottom = styled.div`
  padding: 49px 0px 85px;
  width: 90%;
  font-size: 17px;
  color: #7b8994;
  & span:hover {
    cursor: pointer;
  }
  & i {
    margin-right: 10px;
  }
  @media (max-width: ${xs}px) {
    display: none;
  }
`;

const Header = styled.div`
  // border: 2px solid limegreen;
  width: 100%;
  font-weight: bold;

  display: flex;
  justify-content: space-between;

  & > div {
    // border: 1px solid grey;
    width: 20%;
    padding: 17px 0;
  }

  & .header-subject {
    width: 20%;
  }

  & .header-taken {
    // padding-left: 25px;
    width: 15%;
  }

  & .header-score {
    width: 21%;
  }

  .header-status {
    width: 15%;
    padding-left: 17px;
  }

  & div:last-child {
    // border: 1px solid red;
    width: 17%;
  }

  @media (max-width: ${xs}px) {
    display: none;
  }
`;

const RowRap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  border-top: 1px solid #f0f0f0;
  padding-top: 24px;
  padding-bottom: 24px;
  & .hide-mobile-sec {
    @media (max-width: ${xs}px) {
      display: none;
    }
  }
  & .hide-mobile {
    display: none;
    @media (max-width: ${xs}px) {
      display: inline-block;
      text-transform: uppercase;
      color: #767676;
      font-size: 10px;
    }
  }
  & .body-taken,
  .body-status,
  .score {
    @media (max-width: ${xs}px) {
      display: flex;
      & .hide-mobile {
        width: 50%;
      }
    }
  }
  & ${SuccessBadge}, ${DangerBadge} {
    padding: 4px 6px;
    margin-right: 0;
    font-size: 12px;
  }
  & .status-passed {
    color: #36b37e;
  }

  & .status-fail {
    color: #e9411b;
  }

  @media (max-width: ${xs}px) {
    // border: 1px solid red;
    border: 1px solid #f0f0f0;
    background-color: #ffffff;
    flex-direction: column;
    width: 100%;
    margin-bottom: 18px;
    align-items: flex-end;
    position: relative;
    padding-top: 0;
    margin-bottom: 18px;
    & div:not(:first-child) {
      width: 96% !important;
      font-size: 13px;
      padding-left: 0;
      padding: 12px;
    }
  }

  & > div {
    // border: 1px solid gold;
    width: 20%;

    @media (max-width: ${xs}px) {
      // border: 1px solid red;
    }
  }

  & .body-subject {
    width: 25%;
    /* padding-left: ${spacing.s}; */
    & > i {
      display: none;
    }
    @media (max-width: ${xs}px) {
      width: 92%;
      border: 1px solid #f0f0f0;
      background-color: #f0f0f0;
      padding-left: 15px;
      padding: 14.5px;
      & > i {
        display: inline-block;
      }
    }
  }

  & .body-taken {
    width: 15%;

    &:before {
      @media (max-width: ${xs}px) {
        display: block;
        width: 40%;
        // border: 1px solid green;
        position: absolute;
        left: 0;
        top: 57px;
        padding: 22px 0;
        padding-left: 15px;
        text-transform: uppercase;
        font-size: 10px;
        line-height: 13px;
        font-weight: 500;
        color: #767676;
      }
    }
  }

  & .subject-delete {
    cursor: pointer;
  }

  & .body-status.taken {
    &: before {
      top: 178px;
    }
  }

  & .body-status {
    width: 15%;
    padding-left: 17px;

    &:before {
      @media (max-width: ${xs}px) {
        display: block;
        width: 40%;
        // border: 1px solid green;
        position: absolute;
        left: 0;
        top: 170px;
        padding: 21px 0;
        padding-left: 15px;
        text-transform: uppercase;
        font-size: 10px;
        line-height: 13px;
        font-weight: 500;
        color: #767676;
      }
    }
  }

  & .body-score {
    width: 21%;
    &:before {
      @media (max-width: ${xs}px) {
        display: block;
        width: 40%;
        // border: 1px solid green;
        position: absolute;
        left: 0;
        top: 116px;
        padding: 24px 0;
        padding-left: 15px;
        text-transform: uppercase;
        font-size: 10px;
        line-height: 13px;
        font-weight: 500;
        color: #767676;
      }
    }

    & ${PrimaryButton} {
      @media (max-width: ${xs}px) {
        font-size: 15px;
        line-height: 0;
        // width: 50%;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
      }
    }
  }

  & > div:last-child {
    /* width: 17%; */
    text-align: right;
    padding-right: 10px;

    @media (max-width: ${xs}px) {
      // border: 2px solid red !important;
      width: 97% !important;
      /* padding-left: 15px;
      padding-right: 15px; */
    }

    & ${SuccessButton} {
      @media (max-width: ${xs}px) {
        font-size: 15px;
        line-height: 20px;
        width: 100%;
      }
    }
  }

  .score {
    display: flex;
    align-items: center;

    & span:nth-child(2) {
      & > span {
        margin-right: 10px;
      }
    }
  }

  & .taken-mobile {
    @media (max-width: ${xs}px) {
      // display: none;
      position: absolute;
      top: 2px;
    }
  }
`;

const ScoreSection = ({ taken, score, onClick }) => (
  <div className="score">
    <span className="hide-mobile">Score (100%)</span>
    {taken ? (
      <span>
        <span>{score.figure}</span>
        <span>
          {score.passed ? (
            <SuccessBadge inverse>{score.badge}</SuccessBadge>
          ) : (
            <DangerBadge inverse>{score.badge}</DangerBadge>
          )}
        </span>
      </span>
    ) : (
      <PrimaryButton onClick={onClick}>Take test</PrimaryButton>
    )}
  </div>
);
export const RowItem = ({
  id,
  taken,
  score,
  status,
  takeTest,
  removeSubject,
  navigateToSubject,
  ...rest
}) => {
  const onClick = () => removeSubject(rest);
  const onTakeTest = () => takeTest(rest);
  return (
    <RowRap>
      <div className="body-subject">
        <span>{rest.name || rest.subject.name}</span>
      </div>
      <div className="body-taken">
        <span className="hide-mobile">Test Taken</span>
        {score.passed || !Boolean(rest.testable) ? (
          <Icon
            onClick={onClick}
            style={{ cursor: "pointer", fontSize: 18 }}
            name="delete"
          />
        ) : (
          <span>{rest.testable ? (taken ? "Yes" : "Not yet") : "-"}</span>
        )}
      </div>
      <div className="body-score">
        {rest.testable ? (
          <ScoreSection onClick={onTakeTest} taken={taken} score={score} />
        ) : (
          " Not Testable"
        )}
      </div>
      <div className={taken ? "body-status" : "body-status taken"}>
        <span className="hide-mobile">Status</span>
        <span
          style={{
            color: taken
              ? score.passed ? "rgba( 54,179,126,1 )" : "rgba( 233,65,27,1 )"
              : ""
          }}
        >
          {rest.testable
            ? taken ? (score.passed ? "Passed!" : "Failed!") : "Not Available"
            : "-"}
        </span>
      </div>
      <div
        className={
          taken ? (score.passed ? "" : "hide-mobile-sec") : "taken-mobile"
        }
      >
        {taken || !Boolean(rest.testable) ? (
          score.passed || !Boolean(rest.testable) ? (
            <ButtonWithIcon
              secondary
              small
              onClick={() => navigateToSubject(rest)}
              right
              full_width
              icon="arrow-right"
              iconStyle={{ width: "18px", height: "18px" }}
            >
              Add Details
            </ButtonWithIcon>
          ) : null
        ) : (
          <Icon
            onClick={onClick}
            style={{ cursor: "pointer", fontSize: 18 }}
            name="delete"
          />
        )}
      </div>
    </RowRap>
  );
};
class SubjectListPage extends React.Component {
  state = {
    displaySearch: false
  };

  render() {
    const { selectedSubjects } = this.props;
    return (
      <WizardWrapper
        navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
        title="Select Subjects"
        goToNextScreen={this.nextPage}
        hideFooter={true}
        section={this.props.section}
        showPreviousScreen={true}
        previousPageFunc={this.props.previousPage}
        helperStyle={` @media(max-width: ${xs}px) {
                      margin-left: ${spacing.m};
                      margin-right: ${spacing.m};
                    }`}
      >
        {/* <Column xs={12}> */}
        <FormColumn full_width>
          <FormHeading
            css={`
              text-align: center;
            `}
            heading="Take at least one test to proceed"
          />
          <TestContentStyle>
            <Header>
              <div className="header-subject">Subject</div>
              <div className="header-taken">Test taken?</div>
              <div className="header-score"> Score (out of 100%)</div>
              <div className="header-status">Status</div>
              <div style={{ opacity: 0 }}>Empty</div>
            </Header>

            {selectedSubjects.map((val, index) => (
              <RowItem
                key={index}
                takeTest={this.props.takeTest}
                removeSubject={this.props.deleteSubject}
                navigateToSubject={this.props.goToSubjectDetailPage}
                {...val}
              />
            ))}
            {selectedSubjects.length < this.props.MAX_SUBJECTS ? (
              <Div
                css={`
                  width: 100%;
                `}
              >
                {this.state.displaySearch ? (
                  <SearchBar
                    allSubjects={this.props.allSubjects}
                    selectedSubjects={selectedSubjects}
                    onSelect={this.props.updateSelectedSubjects}
                    afterClick={() => {
                      this.setState({ displaySearch: false });
                    }}
                  />
                ) : (
                  <AddIcon
                    text="Add another subject"
                    onClick={() =>
                      this.setState({
                        displaySearch: true
                      })
                    }
                  />
                )}
              </Div>
            ) : null}
          </TestContentStyle>

          <ListBottom // onClick={this.previousPage}
            style={{ padding: "49px 0 85px" }}
          >
            <PreviousLink
              onClick={this.props.previousPage}
              text="Back to select subjects"
            />
          </ListBottom>
          {/* </Column> */}
        </FormColumn>
      </WizardWrapper>
    );
  }
}
export default SubjectListPage;
