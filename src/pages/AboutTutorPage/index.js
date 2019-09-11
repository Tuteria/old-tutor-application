import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import {
  ApplicationTooltip,
  Div,
  WizardWrapper,
  DropdownComponent,
  InputComponent,
  TextareaComponent,
  FormColumn,
  spacing,
  xs,
  Text,
  NoticeAction,
  Heading
} from "../components";
import { ExampleModal } from "./ExampleModal";
import { FormHeading, FormValidationProvider } from "../../form";
import { FormContainer } from "../../layout/FormContainer";
import { color, font_size } from "../../siteStyle";
export { ExampleModal } from "./ExampleModal";
export const ViewExample = styled.a`
  display: none;
  color: ${color.blue.primary};
  cursor: pointer;
  font-size: ${font_size.s};
  @media (max-width: ${xs}px) {
    display: inline-block;
    float: right;
  }
  ${props =>
    css`
      ${props.css};
    `};
`;

class AboutTutorPage extends React.Component {
  state = {
    experience: true,
    dialogWidth: 0,
    dialogPosition: 0,
    display_error: false,
    showModal: false,
    kind: "title"
  };
  rightColumn = null;
  leftColumn = null;
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.rightColumn);
    const leftNode = ReactDOM.findDOMNode(this.leftColumn);
    this.setState(state => ({
      ...state,
      dialogWidth: node.offsetWidth - 700,
      dialogPosition: leftNode.offsetWidth + 30
    }));
  }

  validateForm = fields => {
    return this.props.onSubmit(fields);
  };
  previousPage = () => {
    return {
      base: "steps",
      current: "about-tutor",
      previous: "qualifications",
      display: true
    };
  };
  closeModal = () => {
    this.setState(state => ({ ...state, showModal: false }));
  };
  openModal = kind => {
    this.setState({ showModal: true, kind });
  };

  render() {
    const isMobile = window.matchMedia(`(max-width: ${xs}px)`).matches;
    const descriptionLabel = isMobile
      ? this.props.descriptionLabel.mobile
      : this.props.descriptionLabel.desktop;

    const toolTipStyle = {
      width: this.state.dialogWidth,
      height: "auto",
      position: "absolute",
      marginLeft: this.state.dialogPosition,
      top: 0
    };
    const { validateField } = this.props;
    return (
      <FormContainer
        displayButton={false}
        details={this.props.data}
        defaultValidation={this.props.defaultValidation}
        customValidation={this.props.customValidation}
        submitFormToServer={this.validateForm}
        errors={this.props.errors}
      >
        {(data, updateFields, onSubmitForm) => {
          const { fields, validate, errors } = data;
          const state = fields;
          const onError = key => {
            return validate && !validateField(state, key, errors);
          };
          return (
            <FormValidationProvider
              onError={onError}
              onSuccess={key => validate && validateField(state, key, errors)}
              errors={errors}
            >
              <WizardWrapper
                nextButtonText="Next: Set your profile"
                showNextScreen={false}
                goToNextScreen={onSubmitForm}
                loading={this.props.loading}
                title="Step 3: Tutor Profile"
                showPreviousScreen={true}
                previousPageFunc={this.props.previousPage}
                goToPreviousScreen={this.props.previousPage}
                progress={this.props.progress}
                section={this.props.section}
              >
                <ExampleModal
                  showModal={this.state.showModal}
                  handleCloseModal={this.closeModal}
                  data={this.props.examples}
                  kind={this.state.kind}
                />
                <FormColumn ref={node => (this.leftColumn = node)}>
                  <FormHeading heading="Tell us more about you">
                    This is one of the first things clients will see on your
                    profile, so take out time to make yourself stand out
                  </FormHeading>
                  <div />
                  <form>
                    <DropdownComponent
                      label="How long have you been teaching?"
                      value={state.years_of_experience}
                      onChange={val => {
                        updateFields("years_of_experience", val);
                      }}
                      errorStyle="margin-top: 8px !important;"
                      field_name="years_of_experience"
                      css={`
                        margin-bottom: ${spacing.xl};
                      `}
                      options={[
                        { value: 1, text: "1 Year" },
                        { value: 2, text: "2 Years" },
                        { value: 3, text: "3 Years" },
                        { value: 4, text: "4 Years" },
                        { value: 5, text: "5+ Years" }
                      ]}
                    />

                    <InputComponent
                      updateText={text => updateFields("profile_title", text)}
                      value={state.profile_title}
                      style={isMobile ? { marginBottom: 20 } : {}}
                      maxValue={80}
                      field_name="profile_title"
                      css={`
                        margin-bottom: ${spacing.xl};
                      `}
                      errorStyle="margin-top: 8px !important;"
                      label="Professional Title"
                      LabelRightNode={({ ...rest }) => (
                        <ViewExample
                          {...rest}
                          onClick={() => this.openModal("title")}
                        >
                          See Example
                        </ViewExample>
                      )}
                      tooltip={
                        <ApplicationTooltip
                          style={toolTipStyle}
                          heading="Keep it short and descriptive"
                        >
                          <Text className="last">
                            The best titles give a strong sense of your
                            qualification and expertise in an instant!
                          </Text>
                          <Text
                            css={`
                              margin-bottom: 0 !important;
                              padding-top: 16px;
                            `}
                          />
                          <ViewExample
                            css={`
                              margin-bottom: 0 !important;
                              padding-top: 16px;
                              display: block;
                            `}
                            onClick={() => this.openModal("title")}
                          >
                            See Example
                          </ViewExample>
                        </ApplicationTooltip>
                      }
                      placeholder="EXAMPLE: Extremely Experienced IELTS Tutor"
                    />
                    <TextareaComponent
                      rows={10}
                      placeholder={this.props.proDescription}
                      minValue={120}
                      displayMinValue={!onError("profile_description")}
                      field_name="profile_description"
                      css={`
                        margin-bottom: ${spacing.xl};
                      `}
                      errorStyle="margin-top: 8px !important;"
                      style={{ marginBottom: isMobile ? 20 : 20 }}
                      updateText={text =>
                        updateFields("profile_description", text)
                      }
                      value={state.profile_description}
                      label={descriptionLabel}
                      LabelRightNode={({ ...rest }) => (
                        <ViewExample
                          {...rest}
                          onClick={() => this.openModal("description")}
                        >
                          See Example
                        </ViewExample>
                      )}
                      tooltip={
                        <ApplicationTooltip
                          style={toolTipStyle}
                          heading="Tell clients how good you are!"
                        >
                          <Text>Talk about these 4 things:</Text>
                          <Text>
                            <b>1.</b> Emphasize your level of experience,
                            qualifications or relevant awards.
                          </Text>
                          <Text>
                            <b>2. </b>Explain how you teach, areas you cover and
                            what clients should expect.
                          </Text>
                          <Text style={{ textAlign: "justify" }}>
                            <b>3. </b> Talk about past results with people
                            you’ve taught. Be specific!
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
                            onClick={() => this.openModal("description")}
                          >
                            See Example
                          </ViewExample>
                        </ApplicationTooltip>
                      }
                    />
                    <NoticeAction
                      condition={true}
                      conditionNode={
                        <DropdownComponent
                          className="dd"
                          value={state.how_you_heard}
                          onChange={val => {
                            updateFields("how_you_heard", val);
                          }}
                          defaultText="Select one"
                          direction="up"
                          top="-305px"
                          errorStyle="margin-top: 8px !important;"
                          field_name="how_you_heard"
                          css={`
                            margin-bottom: 0;
                            @media (max-width: ${xs}px) {
                              width: 90%;
                            }
                            & span {
                              padding: 12px 16px !important;
                            }
                          `}
                          options={this.props.whereYouHeardOptions}
                        />
                      }
                      extraStyle={`
                      margin-top: ${spacing.xxxl};
                      & .dd, & .ind-items{
                        width: 50%;
                        @media(max-width: ${xs}px){
                          width: 100%;
                        }
                      }
                      & .dd{
                        & .dd{
                          width: 100%;
                        }
                      }
                        @media(max-width:${xs}px){
                          margin-bottom: 30px;
                        } `}
                    >
                      <div>
                        <Heading tag="h2">
                          {" "}
                          How did you hear about us ?{" "}
                        </Heading>
                        <Text> This is used for data purposes only </Text>
                      </div>
                    </NoticeAction>
                  </form>
                </FormColumn>
                <Div
                  css={`
                    display: block;
                    @media (max-width: ${xs}px) {
                      display: none;
                    }
                  `}
                  innerRef={node => {
                    this.rightColumn = node;
                  }}
                />
              </WizardWrapper>
            </FormValidationProvider>
          );
        }}
      </FormContainer>
    );
  }
}

export default AboutTutorPage;
