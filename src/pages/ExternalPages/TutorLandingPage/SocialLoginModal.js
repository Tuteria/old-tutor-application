import React from "react";
import styled from "styled-components";
import { PrimaryButton, ButtonWithIcon } from "../../../simple/Button";
import FacebookButton from "../../../compound/FacebookButton";
import GoogleButton from "../../../compound/GoogleButton";
import Divider from "../../../simple/Divider";
import { xs } from "../../../siteStyle";
import { Div } from "../../../primitives/index";
import { BaseModalSection } from "../../../simple/Modal";

const SignUpModal = styled.div`
  padding: 2rem 2.75rem;
  text-align: center;
  // color: #b2b2b2;
  @media (max-width: ${xs}px) {
    padding: 2rem 1rem;
  }
  & form {
    text-align: left;
  }
  & h2 {
    color: #484848;
  }

  & .email {
    background-color: #0064e6;
    color: #fff;
    margin-bottom: 2rem;
  }
  & hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #d8d8d8;
    padding: 0;
  }
  & hr + p {
    margin-top: 2rem;
    color: #484848;
    font-size: 16px;
    & a {
      color: #3eb684;
      cursor: pointer;
    }
  }
  & ${PrimaryButton} {
    margin-bottom: 24px;
    margin-top: 8px;
    & + p {
      margin-bottom: 24px;
      line-height: normal;
    }
  }
`;

export const ReusableModalSection = ({
  header,
  children,
  canSignUp,
  onSignUpLogin,
  overwrite = false,
  onClose,
  css
}) => {
  const text = canSignUp
    ? "Already have a Tuteria account?"
    : "Don’t have an account?";
  const linkText = canSignUp ? " Log in" : "Sign up";
  return (
    <BaseModalSection header={header} onClose={onClose}>
      {overwrite ? (
        children
      ) : (
        <SignUpModal>
          {children}
          <hr />
          <p>
            {text}{" "}
            <a
              onClick={e => {
                e.preventDefault();
                onSignUpLogin("signUp", !canSignUp);
              }}
            >
              {" "}
              {linkText}
            </a>
          </p>
        </SignUpModal>
      )}
    </BaseModalSection>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  & .facebook {
    margin-right: 1rem;
  }
  @media (max-width: ${xs}px) {
    flex-direction: column;
    .facebook {
      margin-bottom: 20px;
    }
  }
`;
export class SocialLogin extends React.Component {
  facebookLogin = () => {};
  googleLogin = () => {};
  render() {
    const {
      fullWidth = false,
      displayEmail = false,
      status,
      onSignUpLogin
    } = this.props;
    const text = status ? "Sign up " : "Login";
    const { facebookUrls, googleUrls } = this.props;
    const facebookProps = {
      validateUrl: facebookUrls.validateUrl,
      redirectUrl: facebookUrls.redirectUrl,
      postLogin: facebookUrls.afterLogin,
      appId: facebookUrls.appId
    };
    const googleProps = {
      validateUrl: googleUrls.validateUrl,
      postLogin: googleUrls.afterLogin,
      client_id: googleUrls.client_id
    };
    return fullWidth ? (
      <div style={{ width: "100%" }}>
        <FacebookButton
          text="Continue with Facebook"
          loadingText="Loading..."
          full_width
          big
          icon="facebook2"
          {...facebookProps}
          css={`
            margin-bottom: 20px;
            margin-top: 32px;
          `}
          iconStyle={{ width: "18px", height: "18px" }}
        />
        <GoogleButton
          full_width
          big
          text="Continue with Google"
          loadingText="Loading..."
          icon="google"
          css={`
            border-width: 2px;
            border-color: #9d9d9d;
          `}
          top="20px"
          iconStyle={{ width: "18px", height: "18px" }}
          {...googleProps}
        />
        <Divider
          css={`
            margin-top: 20px;
          `}
        >
          <p>or</p>
        </Divider>
        {displayEmail ? (
          <ButtonWithIcon
            full_width
            className="email"
            name="email1"
            icon="email1"
            iconStyle={{ width: "18px", height: "18px" }}
            primary
            big
            onClick={() => onSignUpLogin()}
          >
            Sign up with Email
          </ButtonWithIcon>
        ) : null}
      </div>
    ) : (
      <Div>
        <ButtonGroup>
          <FacebookButton
            full_width
            text={` ${text} with Facebook`}
            loadingText="Loading..."
            icon="facebook2"
            top="14px"
            iconStyle={{ width: "14px", height: "16px" }}
            {...facebookProps}
          />
          <GoogleButton
            text={` ${text} with Google`}
            loadingText="Loading..."
            icon="google"
            css={`
              border-width: 2px;
              border-color: #9d9d9d;
            `}
            top="16px"
            iconStyle={{ width: "16px", height: "16px" }}
            transparent
            full_width
            {...googleProps}
          />
        </ButtonGroup>

        <Divider>
          <p>or</p>
        </Divider>
      </Div>
    );
  }
}
