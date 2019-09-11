import React from "react";
import styled, { css } from "styled-components";
import { AccountKit, SocialButton } from "./AccountKit";
import { WizardWrapper, FormColumn, Div } from "../components";
import { genericTestStyle } from "../../layout/ContentStyle";
import Modal, { BaseModalSection } from "../../simple/Modal";
import {
  PrimaryButton,
  SecondaryButton,
  ButtonWithIcon,
  SocialIconButton
} from "../../simple/Button";
import Icon from "../../simple/Icon";
import { Heading, Text } from "../../simple/Text";
import { spacing, color } from "../../siteStyle";
import FacebookButton from "../../compound/FacebookButton";
import GoogleButton from "../../compound/GoogleButton";
import {
  NotificationChangeComponent,
  NotificationContext
} from "../TutorApplicationUtils/PageWrapper";
import {
  InputComponent,
  PhoneNumberComponent,
  TextareaComponent
} from "../../form";
import { ModalBody } from "../AboutTutorPage/ExampleModal";
import { FormContainer } from "../../layout/FormContainer";
export { GuarantorSection, SocialButton } from "../VerificationPageComponents";
const xs = 1024;

const PageContent = styled.div`
  ${genericTestStyle} padding: 0px;
  margin-top: 0;
  width: 100%;
  border: 1px solid #dce0e0;
  @media (max-width: ${xs}px) {
    border: 1px solid #dce0e0;
    background: #ffffff;
  }
  & .PageContent__item:last-of-type {
    border-bottom: none;
  }
  & .PageContent__item {
    border-bottom: 1px solid #dce0e0;
    width: 91%;
    padding: ${spacing.xl} 0;
    @media (max-width: 767px) {
      padding: 17px ${spacing.s};
    }
    & .item-heading {
      color: #484848;
      font-size: 22px;
      line-height: 28px;
      margin-top: 0;
      margin-bottom: 10px;
    }
    & .item-desc {
      padding-bottom: 14px;
      color: #484848;
      font-size: 16px;
      line-height: 24px;
    }
    & ol {
      color: #767676;
      font-size: 16px;
      line-height: 24px;
      padding-left: 20px;
      & li {
        padding-left: 10px;
      }
    }
    & .PageContent__item--flexContainer {
      display: flex;
    }
  }
`;

const Ul = styled.ul`
  ${props => props.css};
`;

const Li = styled.li`
  ${css`
    ${props => props.css};
  `};
`;

const VerificationHeading = ({ children }) => {
  return (
    <Heading
      small
      css={`
        color: #484848;
        padding-bottom: ${spacing.s};
      `}
    >
      {children}
    </Heading>
  );
};

const VerificationItem = ({ title, text, icon, show, heading = false }) => {
  return (
    <Li
      css={`
        align-items: center;
        justify-content: space-between;
        display: flex;
        border-right: 1px solid #dce0e0;
        border-left: 1px solid #dce0e0;
        border-bottom: 1px solid #dce0e0;
        padding: 16px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-color: transparent;
        color: #ffffff;
        font-size: 16px;
        line-height: 20px;
        ${heading
          ? `padding-top: 8px; padding-bottom: 8px; background: #0064e6;`
          : `border-top-left-radius: 0;
    border-top-right-radius: 0;`};
        h1 {
          font-size: 14px;
          text-transform: capitalize;
          color: ${heading ? `#ffffff` : `#484848`};
        }
        p {
          color: #848484;
        }
      `}
    >
      <div>
        <Heading small>{title}</Heading>
        {text && <Text small>{text}</Text>}
      </div>
      {icon ? <Icon name={icon} /> : null}
    </Li>
  );
};

export class PhoneComponent extends React.Component {
  render() {
    const { phoneNumber } = this.props;
    return (
      <VerificationSection
        heading="Phone Verification"
        left={
          <React.Fragment>
            <Text
              css={`
                padding-bottom: ${spacing.l};
              `}
            >
              {phoneNumber.verified
                ? "Your phone number has been verified!"
                : `We’ll send you a 4-digit code to verify your phone number. It can
            also serve as a way to secure your account.`}
            </Text>
            <PhoneNumberComponent
              label="Primary phone number"
              instance="primary_phone_no"
              readOnly
              disabled
              countryCode={"+234"}
              value={phoneNumber.number.substring(3)}
            />
          </React.Fragment>
        }
        right={
          <SecondaryButton
            full_width
            big
            css={`
              display: ${Boolean(phoneNumber.verified) ? "none" : ""};
              @media (max-width: ${xs}px) {
                margin-top: ${spacing.m};
              }
            `}
            onClick={this.props.onClick}
          >
            Verify via SMS
          </SecondaryButton>
        }
      />
    );
  }
}

export class EmailComponent extends React.Component {
  render() {
    return (
      <VerificationSection
        heading="Email Verification"
        footer={
          <Div
            css={`
              display: flex;
              align-items: center;
              @media (max-width: 767px) {
                flex-direction: column;
                & div,
                & div:first-child {
                  width: 100% !important;
                }
              }
            `}
          >
            <InputComponent
              label="Your email address"
              value={this.props.email}
              onBlur={val => {}}
              type="email"
              errorStyle="margin-top: 8px !important;"
              placeholder="busybenson@yahoo.com"
              disabled={true}
            />
            <Div
              css={`
                padding-left: ${spacing.l};
                @media (max-width: ${xs}px) {
                  padding-left: 0;
                }
                p,
                a {
                  position: relative;
                  top: ${spacing.m};
                  width: 100%;
                  cursor: pointer;
                  @media (max-width: ${xs}px) {
                    padding-bottom: ${spacing.m};
                  }
                }
                a {
                  color: ${color.blue.darker}!important;
                  &:hover {
                    cursor: pointer;
                  }
                }
              `}
            >
              {this.props.emailVerified ? (
                <p>Email Verified</p>
              ) : (
                <a onClick={this.props.onClick}>Resend Confirmation Email</a>
              )}
            </Div>
          </Div>
        }
      />
    );
  }
}

export class SocialAccount extends React.Component {
  filterForFacebook = () => {
    const facebookData = this.props.socialNetworks.find(
      network => network.name === "facebook"
    );
    return Boolean(facebookData) ? facebookData.extra_data : {};
  };
  state = {
    showModal: false,
    facebookInfo: this.filterForFacebook()
  };
  handleModalOpen = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  getNetworkStatus = name => {
    const network = this.props.socialNetworks.find(
      network => network.name.toLowerCase() === name
    );
    return Boolean(network) ? network.verified : false;
  };

  checkFacebook = () => {
    if (Boolean(this.state.facebookInfo.link)) {
      this.handleModalOpen();
    }
  };

  verifyFacebook = data => {
    this.props.verifyNetwork("facebook", data);
    this.setState({ showModal: false });
  };
  sharedProps = network => {
    let status = this.getNetworkStatus(network);
    return {
      transparent: true,
      full_width: true,
      big: true,
      disabled: status,
      text: status
        ? `${titleCase(network)} Connected!`
        : `Connect ${titleCase(network)}`,
      connectColor: status ? "#36C98E" : null
    };
  };
  render() {
    const {
      facebookUrls,
      googleUrls,
      linkedinUrl,
      toggleNotification
    } = this.props;
    return (
      <VerificationSection
        heading="Connect at least one social account"
        footer={
          <React.Fragment>
            <p className="item-desc">
              Bring your reputation with you! Link at least one accounts from
              these sites to tell us more about you.
            </p>
            <Div
              css={`
                display: flex;
                justify-content: space-between;
                @media (max-width: ${xs}px) {
                  flex-direction: column;
                  button {
                    margin-bottom: ${spacing.m} !important;
                  }
                }
                button {
                  width: 30%;
                  border: 1px solid #dce0e0;
                  background-color: #fafafa;
                  border-radius: 2px;
                  & span {
                    font-size: 16px;
                  }
                  @media (max-width: ${xs}px) {
                    width: 100%;
                  }
                }
              `}
            >
              <FacebookButton
                {...facebookUrls.credentials}
                name={"fbSimple"}
                iconStyle={{
                  width: 18,
                  height: 18,
                  fill: this.getNetworkStatus("facebook") ? "#565656" : null
                }}
                {...this.sharedProps("facebook")}
                toOpenModal={Boolean(
                  this.state.facebookInfo ? this.state.facebookInfo.link : null
                )}
                openModal={this.checkFacebook}
                top="19px"
                icon="facebook"
                postLogin={response => {
                  this.setState({ facebookInfo: response }, () => {
                    this.checkFacebook();
                  });
                  // this.props.verifyNetwork("facebook", response);
                }}
                // connectColor={
                //   this.getNetworkStatus("facebook") ? "#36B37E" : null
                // }
              />
              <GoogleButton
                name={"googlePlus"}
                icon="googlePlus"
                gPlus
                postLogin={response => {
                  this.props.verifyNetwork("google", response);
                }}
                iconStyle={{ width: 28, height: 28 }}
                {...googleUrls.credentials}
                {...this.sharedProps("google")}
              />
              <SocialButton
                postLogin={response => {
                  this.props.verifyNetwork("linkedin", {
                    ...response,
                    link: response.publicProfileUrl
                  });
                }}
                {...linkedinUrl.credentials}
                toggleNotification={toggleNotification}
                render={(data, onClick) => {
                  return (
                    <SocialButtonC
                      icon="linkedIn"
                      iconStyle={{ width: 28, height: 28 }}
                      outline
                      onClick={onClick}
                      {...this.sharedProps("linkedin")}
                    />
                  );
                }}
              />
            </Div>
            <SocialUrlModal
              heading="Enter Your Facebook Profile Url"
              handleModalOpen={this.handleModalOpen}
              showModal={this.state.showModal}
              data={this.state.facebookInfo}
              onSubmit={this.verifyFacebook}
            />
          </React.Fragment>
        }
      />
    );
  }
}
const SocialButtonC = ({ text, ...rest }) => (
  <SocialIconButton {...rest}>{text}</SocialIconButton>
);
//#region social
class SocialUrlModal extends React.Component {
  state = {
    link: "",
    display_error: false
  };
  onSubmitForm = () => {
    this.props.onSubmit({ link: this.state.link });
  };
  render() {
    const { showModal, handleModalOpen } = this.props;
    return (
      <Modal
        width={50}
        gutter={4}
        showModal={showModal}
        handleCloseModal={handleModalOpen}
        backgroundColor="rgba(0, 0, 0, 0.75)"
      >
        <ModalBody>
          <TextareaComponent
            label="Copy the link below and paste it in a new tab in your browser. Once the page has loaded. copy the link from your browser and paste here."
            css={`
              margin-bottom: ${spacing.m};
            `}
            customOnChange={link => this.setState({ link })}
            value={
              this.state.link ||
              (Boolean(this.props.data) ? this.props.data.link : "")
            }
            placeholder="https://www.facebook.com/john.doe"
          />
          <Div>
            <PrimaryButton
              full_width
              disabled={
                (this.props.data ? this.props.data.link : "") ===
                  this.state.link || this.state.link === ""
              }
              // disabled={this.validateFields() === false}
              onClick={this.onSubmitForm}
            >
              Update Link
            </PrimaryButton>
          </Div>
        </ModalBody>
      </Modal>
    );
  }
}
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}
let stylings = `display: flex; align-items: flex-end; .description{ width: 58%; padding-right: ${spacing.l}; } .action { width: 40%; padding-left: ${spacing.m}; } @media (max-width: ${xs}px) { flex-direction: column; .description, .action { width: 100%; margin-bottom: ${spacing.m}; padding-left: 0; } } `;
const VerificationSection = ({ heading, left, right, footer }) => {
  return (
    <React.Fragment>
      <Div css={stylings}>
        <div className="description">
          <VerificationHeading>{heading}</VerificationHeading>
          {left}
        </div>
        <div className="action">{right}</div>
      </Div>
      {footer}
    </React.Fragment>
  );
};
//#endregion social
export class OfflineIdSection extends React.Component {
  file = null;
  onUploadClick = () => {
    this.file.click();
  };
  handleFileUpload = e => {
    var reader = new FileReader();

    reader.onload = es => {
      this.props.afterVerification(es.target.result);
    };
    const files = e.target.files;
    if (files.length > 0) {
      var mimeType = e.target.files[0].type;
      if (mimeType.startsWith("image")) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  render() {
    let identifications = [
      "International Passport",
      "National ID Card",
      "Driver's License"
    ];
    return (
      <VerificationSection
        heading="Provide an offline ID"
        left={
          <React.Fragment>
            <Text
              css={`
                padding-bottom: ${spacing.m};
                color: #484848 !important;
              `}
            >
              Take a photo or use your computer webcam to upload a picture of
              your official ID.
            </Text>
            <ol>
              {identifications.map((cred, index) => (
                <li key={index}>
                  <p>{cred}</p>
                </li>
              ))}
            </ol>
          </React.Fragment>
        }
        right={
          <React.Fragment>
            <SecondaryButton
              full_width
              css={`
                margin-bottom: ${spacing.m};
                & > span {
                  & > input {
                    cursor: inherit;
                    display: block;
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;
                  }
                }
              `}
              disabled={Boolean(this.props.offlineId)}
              htmlFor="file"
              onClick={this.onUploadClick}
            >
              {this.props.offlineId ? (
                <span>Government Issued ID uploaded</span>
              ) : (
                <span>
                  <span>Upload Government ID</span>
                  <input
                    ref={input => (this.file = input)}
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={this.handleFileUpload}
                    name="file"
                  />
                </span>
              )}
            </SecondaryButton>
            {!this.props.offlineId ? (
              <React.Fragment>
                <Div
                  css={`
                    border: 2px dashed #b2b2b2;
                    border-radius: 2px;
                    background-color: #fafafa;
                    color: #484848;
                    padding: 17px;
                    display: flex;
                    & > div:first-child {
                      flex-grow: 1;
                      padding-right: 10px;
                      & .img-wrapper {
                        position: relative;
                        & img {
                          height: 60px;
                          width: 60px;
                          border-radius: 50%;
                          vertical-align: middle;
                          border: 1px solid transparent;
                        }
                        & svg {
                          position: absolute;
                          bottom: 0;
                          left: 69%;
                        }
                      }
                    }
                    & > div:last-child {
                      flex-grow: 2;
                      padding-left: 10px;
                      & h5 {
                        font-size: 11px;
                        line-height: 14px;
                        margin: 0;
                        padding-bottom: 3px;
                      }
                      & p {
                        color: #484848;
                        font-size: 10px;
                        line-height: 14px;
                      }
                    }
                  `}
                >
                  <div>
                    <div className="img-wrapper">
                      <img src={this.props.profile_pic} alt="Profile" />
                      <Icon styled={{ position: "absolute" }} name="checked" />
                    </div>
                  </div>
                  <div>
                    <h5>Why Verify?</h5>
                    <p>
                      You get a verified badge on your profile once you upload
                      an ID and clients get to trust you more.
                    </p>
                  </div>
                </Div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        }
        footer={
          <Div css={" display: flex; align-items: center; "}>
            <Icon name="lock" />
            <Text
              css={`
                color: #36b37e !important;
                padding-left: ${spacing.s};
              `}
            >
              Your ID is safe with us and will not be shared with client.
            </Text>
          </Div>
        }
      />
    );
  }
}

class IdVerificationPage extends React.Component {
  state = {
    showModal: false
  };
  render() {
    const {
      emailVerified,
      socialCredentials: {
        accountKitClientId,
        googleUrls,
        facebookUrls,
        linkedinUrl
      }
    } = this.props;
    let { state, vicinity } = this.props.location;

    return (
      <NotificationContext.Consumer>
        {({ title, changeTitle }) => {
          return (
            <NotificationChangeComponent
              changeTitle={changeTitle}
              title="Final step: ID Verification & Guarantor"
            >
              <WizardWrapper
                navigationItemStyle={{ backgroundColor: "#FAFAFA" }}
                title="Verification Page"
                hideFooter={true}
                showPreviousScreen={true}
                nextButtonText="I'm Done! Let's Proceed"
                contentStyle="margin-top: 60px;"
                helperStyle={`
        max-width: 86%;
        display: flex;
              margin-top: ${spacing.xxl};
        @media(max-width: 768px){
          margin-top: 0 !important;
          max-width: 100%;
        }
        `}
                noStyle={true}
              >
                <FormColumn
                  marginTop={"0"}
                  css={`
                    @media (min-width: ${xs + 1}px) {
                      max-width: 75%;
                    }
                    @media (max-width: 768px) {
                      margin-top: 0;
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                    }
                  `}
                >
                  <Div
                    css={`
                      border: 1px solid #dce0e0;
                      background: #f0f0f0;
                    `}
                  >
                    <Heading
                      css={`
                        padding: ${spacing.l} ${spacing.xxl};
                      `}
                      medium
                    >
                      Verify Your Identity
                    </Heading>
                  </Div>
                  <PageContent>
                    <div className="PageContent__item">
                      <OfflineIdSection
                        offlineId={this.props.offlineId}
                        afterVerification={this.props.verifyOfflineId}
                        profile_pic={this.props.image}
                      />
                    </div>
                    <div className="PageContent__item">
                      <SocialAccount
                        socialNetworks={this.props.socialNetworks}
                        googleUrls={googleUrls}
                        facebookUrls={facebookUrls}
                        linkedinUrl={linkedinUrl}
                        verifyNetwork={this.props.verifyNetwork}
                        onSubmit={this.props.onSubmit}
                        email={this.props.email}
                      />
                    </div>
                    <AccountKit
                      clientId={accountKitClientId}
                      email={this.props.email}
                      phoneNumber={this.props.phoneNumber.number}
                      verifyCode={this.props.verifyCode}
                      render={(emailOnclick, phoneOnClick) => {
                        return (
                          <React.Fragment>
                            <div className="PageContent__item">
                              <PhoneComponent
                                onClick={phoneOnClick}
                                phoneNumber={this.props.phoneNumber}
                              />
                            </div>
                            <Div className="PageContent__item" marginTop={"0"}>
                              <EmailComponent
                                email={this.props.email}
                                onClick={emailOnclick}
                                emailVerified={emailVerified}
                              />
                            </Div>
                          </React.Fragment>
                        );
                      }}
                    />

                    <Div
                      className="PageContent__item"
                      css={`
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        @media (max-width: ${xs}px) {
                          flex-direction: column;
                          & button {
                            width: 100% !important;
                            margin-bottom: ${spacing.m};
                          }
                        }
                      `}
                    >
                      <ButtonWithIcon
                        big
                        outline
                        left
                        icon="chevron-left"
                        css={`
                          width: 30%;
                        `}
                        onClick={this.props.previousPage}
                      >
                        Back
                      </ButtonWithIcon>
                      <PrimaryButton
                        big
                        css={`
                          width: 35%;
                        `}
                        disabled={!this.props.canSubmit}
                        onClick={this.props.onSubmit}
                      >
                        Complete Verification
                      </PrimaryButton>
                    </Div>
                  </PageContent>
                </FormColumn>
                <Div
                  css={`
                    width: 35%;
                    @media (max-width: ${xs}px) {
                      display: none;
                    }
                  `}
                >
                  <Div
                    css={css`
                      width: 93%;
                      float: right;
                      margin: ${spacing.xxl};

                      & .profileDetail {
                        display: flex;
                        flex-direction: column;
                        border: 1px solid #dce0e0;
                        border-radius: 3px;
                        background-color: #ffffff;
                      }
                    `}
                  >
                    <div className="profileDetail">
                      <img
                        style={{ height: "auto", width: "100%" }}
                        src={this.props.image}
                        alt="[Profile]"
                      />
                      <Div
                        css={`
                          text-align: center;
                          padding-top: 9px;
                          padding-bottom: 15px;
                          margin: 0;
                          & p {
                            color: #848484;
                            font-size: 12px;
                            line-height: 15px;
                            margin: 0;
                          }
                        `}
                      >
                        <Heading
                          small
                          css={`
                            color: #484848;
                            font-size: 18px;
                          `}
                        >
                          {this.props.full_name}
                        </Heading>
                        <p>{`${vicinity}, ${state}`}</p>
                      </Div>
                    </div>
                    <Ul
                      css={css`
                        display: flex;
                        flex-direction: column;
                        padding-left: 0;
                        background-color: #ffffff;
                        margin-top: 9px;
                        border: 1px solid #dce0e0;
                      `}
                    >
                      <VerificationItem heading title="Verified ID" />
                      {this.props.verifications.map((verification, index) => (
                        <VerificationItem
                          key={verification.title + ` ${index}`}
                          title={verification.title}
                          text={verification.text}
                          icon={verification.icon}
                        />
                      ))}
                    </Ul>
                  </Div>
                </Div>
              </WizardWrapper>
            </NotificationChangeComponent>
          );
        }}
      </NotificationContext.Consumer>
    );
  }
}

export default IdVerificationPage;
