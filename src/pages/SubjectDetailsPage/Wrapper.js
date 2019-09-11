import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { xs, spacing } from "../../siteStyle";
import { genericTestStyle } from "../../layout/ContentStyle";
import { Heading } from "../../simple/Text";
import { WizardWrapper, FormColumn, Div } from "../components";
import { PrimaryButton } from "../../simple/Button";
import { FormContainer } from "../../layout/FormContainer";
import { FormValidationProvider } from "../../form";
import { NumberTabs as SubjectTabs } from "../../compound/SupportedTabs";

export const SubjectDetails = styled.div`
  ${genericTestStyle} padding: 0px;
  width: 100%;
  margin-top: 28px;
  border: 0;
  box-shadow: 0 1px 4px 0 rgba(99, 114, 130, 0.15);
  @media (max-width: ${xs}px) {
    box-shadow: none;
  }
  & .tab-body2 {
    padding: 36px 0 44px;
    width: 74%;
    @media (max-width: ${xs}px) {
      width: 100%;
    }
  }
  & .notice {
    margin-left: 10px;
  }
`;

class SubjectDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: true,
      dialogWidth: 0,
      dialogPosition: 0,
      display_error: false,
      tabIndex: 0,
      textArr: [
        "Overview",
        "Set Subject Pricing",
        "Gallery/Portfolio",
        "Requirements"
      ]
    };
    this.rightColumn = null;
    this.leftColumn = null;
  }
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.rightColumn);
    const leftNode = ReactDOM.findDOMNode(this.leftColumn);
    this.setState(state => ({
      ...state,
      dialogWidth: node.offsetWidth - 350,
      dialogPosition: leftNode.offsetWidth - 120
    }));
  }
  getTabs() {
    const { questions = { portfolio: true } } = this.props;
    return Boolean(questions.portfolio)
      ? this.state.textArr
      : this.state.textArr.filter(x => x !== "Gallery/Portfolio");
  }
  activeIndex = t => {
    this.setState({
      tabIndex: t
    });
  };
  nextPage = path => {
    const { nextPage, subjectSlug, canSubmit = () => true } = this.props;
    if (canSubmit()) {
      nextPage(this.getTabs(), subjectSlug)(path);
    }
  };
  previousPage = path => {
    const { previousPage, subjectSlug } = this.props;
    previousPage(this.getTabs(), subjectSlug)(path);
  };
  handleFormSubmit = (...args) => {
    let { onSubmit } = this.props;
    if (Boolean(onSubmit)) {
      return onSubmit(...args, this.nextPage);
    }
  };
  render() {
    const child = {
      width: this.state.dialogWidth,
      position: this.state.dialogPosition
    };
    const { subject = { name: "General Mathematics" } } = this.props;

    const {
      disableNextScreen = true,
      nextPath,
      previousPath,
      step,
      sideStyle = "",
      validateField
    } = this.props;
    const previousPage = () => {
      this.previousPage(previousPath);
    };
    const nextPage = () => {
      this.nextPage(nextPath);
    };
    return (
      <FormContainer
        displayButton={false}
        errors={this.props.errors}
        details={this.props.data}
        defaultValidation={this.props.defaultValidation}
        customValidation={this.props.customValidation}
        submitFormToServer={this.handleFormSubmit}
      >
        {(data, updateFields, onSubmitForm) => {
          const { fields, validate, errors } = data;
          const state = fields;
          return (
            <FormValidationProvider
              {...{
                onError: key => {
                  return validate && !validateField(state, key, errors);
                },
                onSuccess: key => validate && validateField(state, key, errors),
                errors
              }}
            >
              <WizardWrapper
                navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
                title={this.state.textArr[step - 1]}
                goToNextScreen={nextPage}
                hideFooter={true}
                showPreviousScreen={true}
                goToPreviousScreen={previousPage}
                previousPageFunc={previousPage}
                nextButtonText="I'm Done! Let's Proceed"
                contentStyle="margin-top: 45px;"
                containerStyle={{ position: "relative" }}
                noStyle={true}
                multiple
                helperStyle={`
        max-width: 1300px;`}
                showNextScreen={disableNextScreen}
              >
                <FormColumn
                  css={`
                    @media (min-width: ${xs + 1}px) {
                      max-width: 960px;
                    }
                    @media (max-width: ${xs}px) {
                      padding-left: ${spacing.m};
                      padding-right: ${spacing.m};
                    }
                  `}
                  ref={node => (this.leftColumn = node)}
                >
                  <Div>
                    <Heading medium>Add details for {subject.name}</Heading>
                  </Div>
                  <form method="post">
                    <SubjectDetails customH2>
                      <SubjectTabs
                        step={step}
                        tabs={this.getTabs()}
                        styling={`
                                  justify-content: left;
                                  margin-left: 26%;
                                `}
                      />
                      <div className="tab-body2">
                        {this.props.children({
                          ...child,
                          state,
                          updateFields,
                          subject,
                          previousPage: this.previousPage,
                          nextPage: this.nextPage,
                          onSubmitForm
                        })}
                        <Div
                          css={`
                            display: flex;
                            justify-content: space-between;
                            margin-top: ${spacing.xxxl};
                            @media (max-width: ${xs}px) {
                              margin-top: ${spacing.l};
                              flex-direction: column;
                              button {
                                width: 100% !important;
                              }
                            }
                          `}
                        >
                          <PrimaryButton
                            css={`
                              width: 30%;
                            `}
                            big
                            outline
                            onClick={e => {
                              e.preventDefault();
                              previousPage();
                            }}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            big
                            css={`
                              width: 35%;
                            `}
                            disabled={disableNextScreen}
                            onClick={
                              Boolean(this.props.onSubmit)
                                ? (...args) => onSubmitForm(...args)
                                : function(e) {
                                    e.preventDefault();
                                    nextPage();
                                  }
                            }
                          >
                            <span>Save &amp; Continue</span>
                          </PrimaryButton>
                        </Div>
                      </div>
                    </SubjectDetails>
                  </form>
                </FormColumn>
                <ProfileExamples
                  stylings={css`
                    ${sideStyle};
                  `}
                  hasToolTip={!!this.props.toolTip}
                  innerRef={node => {
                    this.rightColumn = node;
                  }}
                >
                  {this.props.toolTip}
                </ProfileExamples>
              </WizardWrapper>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export default SubjectDetailPage;

const ProfileExamples = styled(FormColumn)`
  display: block;
  ${props =>
    props.hasToolTip
      ? `
  width: 300px;
  position: absolute;
  top: 100px;
  right: -30px;
  `
      : ""}
  @media (max-width: ${xs}px) {
    display: none;
  }
  ${props => props.stylings};
`;
