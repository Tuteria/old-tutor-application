import React from "react";
import hello from "hellojs";
import { WizardWrapper, FormColumn, Div } from "../components";
import { Heading, Text } from "../../simple/Text";
import Icon from "../../simple/Icon";
import { spacing, text_color, xs, color } from "../../siteStyle";
import {
  PrimaryButton,
  SecondaryButton,
  ButtonWithIcon,
  SocialIconButton
} from "../../simple/Button";
import {
  FormValidationProvider,
  InputComponent,
  PhoneNumberComponent
} from "../../form";
import FacebookButton from "../../compound/FacebookButton";
import GoogleButton from "../../compound/GoogleButton";
import { Formset } from "../../compound/FormsetContainer";
import { GuarantorForm } from "../VerificationPage";

export class PhoneComponent extends React.Component {
  state = {
    primaryPhoneNumber: this.props.phoneNumber
  };

  formatPrimaryPhoneNumber = primaryPhoneNumber => {
    return primaryPhoneNumber.substring(3);
  };

  verifyPhoneNumber = number => {
    this.setState({
      primaryPhoneNumber: this.props.updatePhoneNumber(number)
    });
  };

  render() {
    const { primaryPhoneNumber } = this.state;
    return (
      <Div marginTop={"0"}>
        <Heading
          small
          css={`
            color: #484848;
            padding-bottom: ${spacing.s};
          `}
        >
          Phone Verification
        </Heading>
        {primaryPhoneNumber.verified ? (
          <p className="item-desc" style={{ paddingBottom: 30 }}>
            Your phone number has been verified!
          </p>
        ) : (
          <p className="item-desc" style={{ paddingBottom: 30 }}>
            We’ll send you a 4-digit code to verify your phone number. It can
            also serve as a way to secure your account.
          </p>
        )}
        <Div
          css={`
            display: flex;
            justify-content: space-between;
            & .description {
              width: 35%;
            }
            & .action {
              width: 35%;
              display: flex;
              align-items: flex-end;
              justify-content: space-around;
            }
            @media (max-width: ${xs}px) {
              flex-direction: column;
              .description,
              .action {
                width: 100%;
              }
            }
          `}
        >
          <Div
            className="description"
            style={{
              paddingLeft: 0
            }}
          >
            <PhoneNumberComponent
              label="Primary phone number"
              instance="primary_phone_no"
              countryCode={"+234"}
              value={this.formatPrimaryPhoneNumber(primaryPhoneNumber.number)}
            />
          </Div>
          {!primaryPhoneNumber.verified ? (
            <Div className="action" style={{ paddingRight: 0 }}>
              <React.Fragment>
                <SecondaryButton
                  full_width
                  big
                  css={`
                    @media (max-width: ${xs}px) {
                      margin-top: ${spacing.m};
                    }
                  `}
                  onClick={e => this.verifyPhoneNumber(primaryPhoneNumber)}
                >
                  Verify via SMS
                </SecondaryButton>
              </React.Fragment>
            </Div>
          ) : null}
        </Div>
      </Div>
    );
  }
}

export class EmailComponent extends React.Component {
  state = {
    email: this.props.email,
    emailVerified: this.props.emailVerified
  };

  verifyEmail = () => {
    this.setState({
      emailVerified: this.props.verifyEmail(this.state.emailVerified)
    });
  };

  render() {
    return (
      <Div className="PageContent__item" marginTop={"0"}>
        <Heading
          small
          css={`
            color: #484848;
            padding-bottom: ${spacing.s};
          `}
        >
          Email Verification
        </Heading>
        <Div
          css={`
            display: flex;
            align-items: center;
          `}
          className="item-input-wrapper"
        >
          <InputComponent
            label="Your email address"
            value={this.state.email}
            css={``}
            onBlur={val => {}}
            type="email"
            errorStyle="margin-top: 8px !important;"
            placeholder="busybenson@yahoo.com"
            disabled={true}
          />
          <Div
            css={`
              padding-left: ${spacing.l};
              p,
              a {
                position: relative;
                top: ${spacing.m};
                width: 100%;
                text-align: center;
                cursor: pointer;
              }
              a {
                color: ${color.blue.darker}!important;
              }
              &:hover {
                cursor: pointer;
              }
            `}
          >
            {this.state.emailVerified ? (
              <p>Email Verified</p>
            ) : (
              <a onClick={this.verifyEmail}>Resend Confirmation Email</a>
            )}
          </Div>
        </Div>
      </Div>
    );
  }
}

export class GuarantorSection extends React.Component {
  render() {
    return this.props.showSection ? (
      <Div marginTop={"0"}>
        <Heading
          small
          css={`
            color: #484848;
            padding-bottom: ${spacing.s};
          `}
        >
          Guarantors
        </Heading>
        <Text>Why we ask for guarantors</Text>
        <p className="item-desc">
          This is primarily to put your clients at ease, especially parents. If
          you teach students under 18, then please provide two guarantors who
          must be professional references such as a teacher, boss, clergy,
          senior colleague or someone of high repute who can testify of your
          good will.
        </p>
        <Formset
          data={[]}
          form_fields={[
            "full_name",
            "email",
            "phone_number",
            "years_known",
            "place_of_work"
          ]}
          errors={{
            school: ["This field is required"],
            course: ["This field is required"],
            degree: ["This field is required"],
            country: ["This field is required"]
          }}
          onSubmit={data => data}
          formProps={{}}
          render={formset => {
            return (
              <React.Fragment>
                <h2 className="">
                  {formset.full_name} | ({formset.email})
                </h2>
                <p className="">
                  {formset.place_of_work} | {formset.phone_number}
                </p>
              </React.Fragment>
            );
          }}
          addText="Add another guarantor"
          formElement={GuarantorForm}
        />
      </Div>
    ) : null;
  }
}

export class SocialAccount extends React.Component {
  state = {
    networks: this.props.socialNewtorks
  };

  getNetworkStatus = name => {
    return this.state.networks.find(network => network.name === name).verified;
  };

  verifyNetwork = name => {
    let verifiedNetwork = this.state.networks.find(
      network => network.name === name
    );
    let verifiedNetworkId = this.state.networks.findIndex(
      network => network.name === name
    );
    this.setState({
      networks: [
        ...this.state.networks.slice(0, verifiedNetworkId),
        {
          ...verifiedNetwork,
          verified: true
        },
        ...this.state.networks.slice(verifiedNetworkId + 1)
      ]
    });
  };

  render() {
    return (
      <div>
        <Div marginTop={"0"}>
          <Heading
            small
            css={`
              color: #484848;
              padding-bottom: ${spacing.s};
            `}
          >
            Connect at least one social account
          </Heading>
          <p className="item-desc">
            Bring your reputation with you! Link at least one accounts from
            these sites to tell us more about you.
          </p>
        </Div>

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
          `}
        >
          <SocialIconButton
            icon="facebook"
            iconStyle={{
              width: 24,
              height: 24,
              fill: this.getNetworkStatus("facebook") ? "#565656" : null
            }}
            outline
            css={`
              width: 30%;
              border: 1px solid #dce0e0;
              background-color: #fafafa;
              border-radius: 2px;
              @media (max-width: ${xs}px) {
                width: 100%;
              }
            `}
            big
            //onClick={onClick}
            onClick={() => this.verifyNetwork("facebook")}
            connectColor={this.getNetworkStatus("facebook") ? "#36B37E" : null}
            disabled={this.getNetworkStatus("facebook")}
          >
            {this.getNetworkStatus("facebook")
              ? `Facebook Connected!`
              : `Connect Facebook`}
          </SocialIconButton>
          <SocialButton
            network="google"
            client_id={this.props.googleUrls.client_id}
            postLogin={this.verifyNetwork}
            render={(data, onClick) => {
              return (
                <SocialIconButton
                  icon="googlePlus"
                  iconStyle={{
                    width: 28,
                    height: 28
                  }}
                  outline
                  //onClick={onClick}
                  onClick={() => this.verifyNetwork("google")}
                  css={`
                    width: 30%;
                    border: 1px solid #dce0e0;
                    background-color: #fafafa;
                    border-radius: 2px;
                  `}
                  connectColor={
                    this.getNetworkStatus("google") ? "#36C98E" : null
                  }
                  big
                  disabled={this.getNetworkStatus("google")}
                >
                  {this.getNetworkStatus("google")
                    ? `Google Connected!`
                    : `Connect Google`}
                </SocialIconButton>
              );
            }}
          />
          <SocialButton
            network="linkedin"
            client_id="77tqqtzsll5sad"
            postLogin={this.verifyNetwork}
            render={(data, onClick) => {
              return (
                <SocialIconButton
                  icon="linkedIn"
                  iconStyle={{
                    width: 28,
                    height: 28
                  }}
                  outline
                  //onClick={onClick}
                  onClick={() => this.verifyNetwork("linkedin")}
                  css={`
                    width: 30%;
                    border: 1px solid #dce0e0;
                    background-color: #fafafa;
                    border-radius: 2px;
                  `}
                  connectColor={
                    this.getNetworkStatus("linkedin") ? "#36C98E" : null
                  }
                  big
                  disabled={this.getNetworkStatus("linkedin")}
                >
                  {this.getNetworkStatus("linkedin")
                    ? `LinkedIn Connected!`
                    : `Connect LinkedIn`}
                </SocialIconButton>
              );
            }}
          />
        </Div>
      </div>
    );
  }
}

export class OfflineIdSection extends React.Component {
  state = {
    offlineId: this.props.offlineId
  };

  toggleOfflineIdStatus = () => {
    this.setState({
      offlineId: this.props.afterVerification(this.state.offlineId)
    });
  };

  render() {
    return (
      <div>
        <Div
          css={`
            display: flex;
            .description {
              width: 58%;
              padding-right: ${spacing.l};
            }
            .action {
              width: 40%;
              padding-left: ${spacing.m};
            }
            @media (max-width: ${xs}px) {
              flex-direction: column;
              .description,
              .action {
                width: 100%;
                margin-bottom: ${spacing.m};
                padding-left: 0;
              }
            }
          `}
        >
          <div className="description">
            <Heading
              small
              css={`
                color: #484848;
                padding-bottom: ${spacing.s};
              `}
            >
              Provide an offline ID
            </Heading>
            <p className="item-desc">
              Take a photo or use your computer webcam to upload a picture of
              your official ID.
            </p>
            <ol>
              {[
                "International Passport",
                "National ID Card",
                "Driver's License"
              ].map((cred, index) => (
                <li key={index}>
                  <p>{cred}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="action">
            <SecondaryButton
              full_width
              css={`
                margin-bottom: ${spacing.m};
              `}
              disabled={this.state.offlineId}
              onClick={this.toggleOfflineIdStatus}
            >
              {this.state.offlineId ? (
                <span>Government Issued ID uploaded</span>
              ) : (
                <span>Upload Government ID</span>
              )}
            </SecondaryButton>
            {!this.state.offlineId ? (
              <div className="info">
                <div>
                  <div className="img-wrapper">
                    <img src={this.props.profile_pic} alt="Profile" />
                    <Icon styled={{ position: "absolute" }} name="checked" />
                  </div>
                </div>
                <div>
                  <h5>Why Verify?</h5>
                  <p>
                    You get a verified badge on your profile once you upload an
                    ID and clients get to trust you more.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </Div>
        <div style={{ display: "flex" }}>
          <Icon name="lock" />
          <p
            style={{
              color: "#36B37E",
              lineHeight: "18px",
              paddingLeft: 10
            }}
          >
            Your ID is safe with us and will not be shared with client.
          </p>
        </div>
      </div>
    );
  }
}

export class SocialButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const {
      redirect_uri = "redirect.html",
      oauth_proxy = "http://social-network.careerlyft.com:4000/proxy",
      client_id,
      network
    } = this.props;
    let credentials = {};
    if (network === "google") credentials = { google: client_id };
    if (network === "linkedin") credentials = { linkedin: client_id };
    this.hello_instance = hello.init(credentials, {
      scope: ["basic", "email"],
      display: "popup",
      redirect_uri,
      oauth_proxy
    });
    this.hello_instance.on("auth.login", this.fetchData.bind(this));
  }

  componentWillUnmount() {
    this.hello_instance.off("auth.login");
  }

  fetchData() {
    this.hello_instance(this.props.network)
      .api("me")
      .then(response => {
        console.log(response);
        this.props.postLogin(this.props.network);
      })
      .catch(error => console.log(error));
  }

  onLogin() {
    this.hello_instance
      .login(this.props.network)
      .then(this.fetchData.bind(this));
  }

  render() {
    return this.props.render(this.state.data, this.onLogin.bind(this));
  }
}
