import React from "react";
import { ReusableModalSection, SocialLogin } from "./SocialLoginModal";
import { LoginForm, SignupForm, ResetPasswordForm } from "./SignupForm";

import Modal from "../../../simple/Modal";
import { spacing, xs } from "../../../siteStyle";
import { Heading, Text } from "../../../simple/Text";
import { Div } from "../../../primitives";
export class ModalForm extends React.Component {
  state = {
    resetPassword: false
  };
  render() {
    const {
      showModal,
      handleCloseModal,
      toggleSignUpForm,
      signUp,
      signUpToggle,
      facebookUrls,
      siteText,
      googleUrls,
      signUpErrors,
      customValidation,
      saveUserAction,
      resetPasswordAction,
      loginErrors,
      loginUserAction
    } = this.props;
    return (
      <Modal
        width={36.5}
        gutter={4}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.75)"
      >
        <ReusableModalSection
          overwrite={this.state.resetPassword}
          onClose={handleCloseModal}
          onSignUpLogin={toggleSignUpForm}
          canSignUp={signUp}
          header={signUp && !signUpToggle ? "" : ""}
        >
          {/* {this.state.signUp && this.state.signUpToggle ? (
                <h2>Sign up to start earning as a tutor</h2>
              ) : null} */}
          {this.state.resetPassword ? (
            <ResetPasswordContainer
              resetPasswordAction={resetPasswordAction}
              customValidation={customValidation}
              errors={loginErrors}
              returnToLogin={() => this.setState({ resetPassword: false })}
            />
          ) : (
            <React.Fragment>
              <SocialLogin
                fullWidth={!signUpToggle}
                status={signUp}
                displayEmail={signUp}
                onSignUpLogin={toggleSignUpForm}
                facebookUrls={facebookUrls}
                googleUrls={googleUrls}
              />
              {signUp ? (
                signUpToggle ? (
                  <SignupForm
                    terms={siteText.footer_section.terms_link}
                    policies={siteText.footer_section.privacy_link}
                    errors={signUpErrors}
                    customValidation={customValidation}
                    saveUser={saveUserAction}
                  />
                ) : null
              ) : (
                <LoginForm
                  errors={loginErrors}
                  customValidation={customValidation}
                  saveUser={loginUserAction}
                  toggleResetPassword={e => {
                    e.preventDefault();
                    this.setState({ resetPassword: true });
                  }}
                />
              )}
            </React.Fragment>
          )}
        </ReusableModalSection>
      </Modal>
    );
  }
}
export class ResetPasswordContainer extends React.Component {
  state = {
    emailSent: false,
    text: ""
  };
  resetPasswordAction = (fields, callback) => {
    return new Promise((resolve, reject) => {
      this.props
        .resetPasswordAction(fields)
        .then(() => {
          this.setState({
            emailSent: true,
            text: "Your email has been successfully sent"
          });
          resolve({});
        })
        .catch(e => {
          this.setState({
            emailSent: true,
            text: "There was trouble sending your email"
          });
          resolve({});
        });
    });
  };
  render() {
    const props = this.props;
    return (
      <Div
        css={`
          padding: 24px 35px;

          & .action-buttons {
            padding-top: 16px;
            width: 50%;
            margin: 0 auto;
            & button {
              width: 100%;
            }
            @media (max-width: ${xs}px) {
              width: 80%;
            }
          }
        `}
      >
        <Heading
          medium
          css={`
            margin-bottom: ${spacing.s};
          `}
        >
          Reset Password
        </Heading>
        <Text
          css={`
            padding-bottom: ${spacing.m};
          `}
        >
          Enter the email address associated with your Tuteria account, and
          we'll email you a link to reset your password
        </Text>
        {this.state.emailSent && (
          <Text
            css={`
              color: #36b37e;
              font-size: 14px;
              padding-bottom: 4px;
            `}
          >
            {this.state.text}
          </Text>
        )}
        <ResetPasswordForm
          resetPasswordAction={this.resetPasswordAction}
          customValidation={props.customValidation}
          buttonProps={{
            style: { width: "40%" }
          }}
          errors={props.errors}
          secondaryAction={props.returnToLogin}
        />
      </Div>
    );
  }
}
export default ModalForm;
