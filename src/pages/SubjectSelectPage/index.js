import React from "react";
import styled, { css } from "styled-components";
import Input from "../../simple/Input";

import { PrimaryBadge } from "../../simple/Badge";
import Icon from "../../simple/Icon";
import Media from "react-media";
import WizardWrapper from "../WizardWrapper";
import SearchBar from "./SearchBar";
import Sticky from "./Sticky";
import { Category, SubCategories } from "./Category";
import globals, { spacing } from "../../siteStyle";
import { FormColumn } from "../components";
const { xs } = globals;
const SubjectSearch = styled.div`
  margin-bottom: 70px;
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  @media (max-width: ${xs}px) {
    width: 100%;
    margin-top: 45px;
    margin-bottom: 36px;
  }
  & h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 36px;
    color: #484848;
    line-height: 40px;

    @media (max-width: ${xs}px) {
      font-size: 17px;
      font-weight: 500;
      line-height: 22px;
    }
  }
  & ${Input} {
    @media (max-width: ${xs}px) {
    }
  }
  & p {
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  & .badge-wrap {
    @media (max-width: ${xs}px) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  & ${PrimaryBadge} {
    color: #484848;
    margin-right: 16px;
    font-size: 16px;
    margin-top: 5px;
    position: relative;
    padding: 5px 32px 5px 16px;
    @media (max-width: ${xs}px) {
      background-color: #0064e6;
      border-radius: 100px;
      margin-right: 8px;
      padding-top: 2px;
      padding-bottom: 5px;
    }

    & span {
      @media (max-width: ${xs}px) {
        color: #fff;
        font-size: 12px;
        margin: 0;
        padding-top: 6px;
        padding-bottom: 7px;
        line-height: 15px;
      }
    }
    & svg {
      position: absolute;
      margin-left: 10px;
      color: #0260d7;
      right: 10px;
      bottom: 10px;
      @media (max-width: ${xs}px) {
      }
    }
  }
`;
const SubjectSelect = styled.div`
  & > p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 21px;
    color: #47525d;
  }
`;
const SubjectLayer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${xs}px) {
    flex-direction: column;
  }
`;
const withSkill = css`
  padding-right: 48px;
  @media (min-width: ${xs + 1}px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    flex-grow: 1.5;
  }
  @media (max-width: ${xs}px) {
    padding-right: 0;
  }

  flex-basis: 0;
`;
const withoutSkill = css`
  @media (min-width: ${xs + 1}px) {
    min-width: 685px;
    margin-left: 15%;
    margin-right: 15%;
    transition: margin-left 0.25s ease-in-out;
  }
  @media (max-width: ${xs}px) {
    width: 100%;
  }
`;
const CategorySection = styled.div`
  z-index: 10;
  ${withoutSkill} ${props => (props.clicked ? withSkill : null)};
`;
const skillBefore = css`
  min-width: 338px;
  flex-grow: 0;
  overflow: hidden;
  transform: translateX(-120%);
  opacity: 0;
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
`;
const skillAfter = css`
  flex-grow: 1;
  flex-basis: 0;
  overflow: unset;
  opacity: 1;
  transform: none;
`;

const SkillSection = styled.div`
  ${skillBefore} ${props => (props.clicked ? skillAfter : "none")};
  @media (max-width: ${xs}px) {
    display: none;
  }
  & > div {
    top: 0;
  }
`;

export const Badge = ({ text, onClick, fixed = false }) => {
  let props = fixed ? {} : { onClick };
  return (
    <PrimaryBadge {...props}>
      <span>{text}</span>
      <Media query={`(max-width: ${xs}px)`}>
        {matches => {
          let remainingProps = { width: "8px", name: "close", onClick };
          if (matches) {
            remainingProps.fill = "#fff";
          }
          return fixed ? null : <Icon {...remainingProps} />;
        }}
      </Media>
    </PrimaryBadge>
  );
};

class SubjectList extends React.Component {
  render() {
    const { currentIndex, clicked, onClick } = this.props;
    console.log(currentIndex);
    return (
      <SubjectSelect>
        <Media query={`(max-width: ${xs}px)`}>
          {matches =>
            matches ? null : <p>You can also select from the category below</p>
          }
        </Media>

        <SubjectLayer>
          <CategorySection clicked={clicked}>
            {this.props.categories.map((category, index) => (
              <Category
                canShow={currentIndex === index}
                currentIndex={currentIndex}
                onClick={onClick}
                index={index}
                {...category}
                updateSubjects={this.props.updateSubjects}
                getSubjects={this.props.getSubjects}
                selectedSubjects={this.props.selectedSubjects}
                getSubCategories={this.props.getSubCategories}
                active={currentIndex === index}
                key={index}
              />
            ))}
          </CategorySection>

          {currentIndex > -1 ? (
            <SkillSection clicked={clicked} id="subjects-layer">
              <Sticky>
                <div>
                  <SubCategories
                    category={this.props.getCategory(currentIndex)}
                    updateSubjects={this.props.updateSubjects}
                    selectedSubjects={this.props.selectedSubjects}
                    getSubCategories={this.props.getSubCategories}
                    getSubjects={this.props.getSubjects}
                  />
                </div>
              </Sticky>
            </SkillSection>
          ) : null}
        </SubjectLayer>
      </SubjectSelect>
    );
  }
}

export class SubjectSelectPage extends React.Component {
  state = {
    clicked: false,
    currentIndex: -1
  };
  onClick = (index, matches) => {
    this.setState({ clicked: true, currentIndex: index });
  };
  updateSelectedSubjects = selectedSubjects => {
    if (selectedSubjects.length <= this.props.MAX_SUBJECTS) {
      this.props.updateSelectedSubjects(selectedSubjects);
    } else {
      this.props.maxSubjectNotification();
    }
  };
  render() {
    let { selectedSubjects } = this.props;
    return (
      <WizardWrapper
        navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
        title="Select Subjects"
        goToNextScreen={this.props.nextPage}
        section={this.props.section}
        showNextScreen={!(selectedSubjects.length > 0)}
        showPreviousScreen={true}
        loading={this.props.loading}
        previousPageFunc={this.props.previousPage}
        nextButtonText="Next"
        helperStyle={` @media(max-width: ${xs}px) {
                      margin-left: ${spacing.m};
                      margin-right: ${spacing.m};
                    }`}
      >
        <FormColumn full_width>
          <SubjectSearch>
            <React.Fragment>
              <h2>What subject do you want to teach?</h2>
              <SearchBar
                allSubjects={this.props.allSubjects}
                selectedSubjects={selectedSubjects}
                onSelect={this.updateSelectedSubjects}
              />
            </React.Fragment>
            <p>Subjects You Want To Teach ({selectedSubjects.length})</p>
            <div className="badge-wrap">
              {selectedSubjects.map((subject, index) => (
                <Badge
                  key={index}
                  text={subject.name}
                  fixed={subject.taken || subject.details}
                  onClick={() => {
                    this.updateSelectedSubjects(
                      this.props.selectedSubjects.filter(
                        x => x.name !== subject.name
                      )
                    );
                  }}
                />
              ))}
            </div>
          </SubjectSearch>

          <SubjectList
            selectedSubjects={selectedSubjects}
            updateSubjects={this.updateSelectedSubjects}
            categories={this.props.categories}
            onClick={this.onClick}
            currentIndex={this.state.currentIndex}
            clicked={this.state.clicked}
            getSubjects={this.props.getSubjects}
            getSubCategories={this.props.getSubCategories}
            getCategory={this.props.getCategory}
          />
        </FormColumn>
      </WizardWrapper>
    );
  }
}
export default SubjectSelectPage;
