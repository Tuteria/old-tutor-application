// @ts-nocheck
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PageWrapper as Container } from "../src/pages/TutorApplicationUtils";
import VerifyStartPage from "../src/pages/VerifyStartPage";
import IdVerificationPage from "../src/pages/VerificationPage";
import CongratulationsPage from "../src/pages/CongratulationsPage";
import { ButtonWithIcon } from "../src/simple/Button";
import {
  PhoneComponent,
  EmailComponent,
  GuarantorSection,
  SocialAccount,
  SocialButton,
  OfflineIdSection
} from "../src/pages/VerificationPage";

import francis from "./francis.png";
const steps = [
  {
    text: "Select Subject",
    display: false
  }
];
storiesOf("Verification Flow Pages", module)
  .add("VerifyStartPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <VerifyStartPage nextPage={action("Next Page")} />
    </Container>
  ))
  .add("VerificationPage", () => (
    <Container
      steps={steps}
      navProps={{ inverse: true }}
      current="personal-info"
    >
      <IdVerificationPage
        verifications={[]}
        userInfo={{
          first_name: "Godwin",
          last_name: "Benson",
          email: "godwinbenson@gmail.com",
          phone_number: {
            primary: true,
            number: "2348035209976",
            verified: true
          },
          location: {
            state: "Lagos",
            country: "Nigeria"
          },
          profile_pic: "/static/img/profile/francis.png",
          socialNetworks: [
            {
              name: "facebook",
              verified: false,
              link: ""
            },
            {
              name: "google",
              verified: false,
              link: ""
            },
            {
              name: "linkedin",
              verified: false
            }
          ],
          email_verified: false
        }}
        socialCredentials={{
          accountKitClientId: "1113079532095710",
          googleUrls: {
            client_id:
              "527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com",
            //client_id: process.env.REACT_APP_CLIENT_ID,
            validateUrl: "http://localhost:8000/google/validate/",
            redirectUrl: "http://localhost:8000/facebook/redirect-view/"
          },
          linkedinUrl: {
            credentials: {}
          },
          facebookUrls: {
            credentials: {
              appId: "1113079532095710",
              validateUrl: "http://localhost:8000/facebook/validate/",
              redirectUrl: "http://localhost:8000/facebook/redirect-view/"
            },
            appId: "1113079532095710",
            //appId: process.env.REACT_APP_APP_ID,
            validateUrl: "http://localhost:8000/facebook/validate/",
            redirectUrl: "http://localhost:8000/facebook/redirect-view/",
            afterLogin: data => {
              /*window.location.href = `http://localhost:8000/redirect_user/${
                          data.response.email
                        }/`;*/
              console.log(data);
              //this.verifyNetwork("facebook", data);
            }
          }
        }}
        first_name="Godwin"
        last_name="Benson"
        image="/static/img/profile/francis.png"
        offlineId={false}
        percentageCompleted={0}
        isAcademics={true}
        socialNetworks={[
          {
            name: "facebook",
            verified: false,
            extra_data: null
          },
          {
            name: "google",
            verified: false,
            extra_data: {
              link: "https://google.com"
            }
          },
          {
            name: "linkedin",
            verified: false,
            extra_data: {
              link: "https://linkedin.com"
            }
          }
        ]}
        phoneNumber={
          [
            {
              primary: true,
              number: "2348035209976",
              verified: true
            }
          ][0]
        }
        location={{
          state: "Lagos",
          country: "Nigeria",
          vicinity: "Lagos"
        }}
        data={{ link: "" }}
        emailVerified={true}
      />
    </Container>
  ))
  .add("CongratulationsPage", () => (
    <CongratulationsPage
      nextPage={action("Next Page")}
      user={{ first_name: "Godwin", profile_pic: francis }}
    />
  ))
  .add("PhoneComponent", () => (
    <React.Fragment>
      <PhoneComponent
        verifyCode={() => {}}
        phoneNumber={[
          {
            primary: true,
            number: "2348035209976",
            verified: false
          },
          {
            primary: false,
            number: "2348035209976",
            verified: false
          }
        ].find(number => number.primary)}
        phoneNumberVerified={true}
        verifyPhoneNumber={() => {}}
        toggleNotification={() => {}}
      />
      <PhoneComponent
        verifyCode={() => {}}
        phoneNumber={[
          {
            primary: true,
            number: "2348035209976",
            verified: false
          },
          {
            primary: false,
            number: "2348035209976",
            verified: false
          }
        ].find(number => number.primary)}
        phoneNumberVerified={false}
        verifyPhoneNumber={() => {}}
        toggleNotification={() => {}}
      />
    </React.Fragment>
  ))
  .add("EmailComponent", () => (
    <EmailComponent
      email={"james@example.com"}
      verifyEmail={value => !value}
      emailVerified={false}
    />
  ))
  .add("Guarantor section", () => <GuarantorSection showSection={true} />)
  .add("Social Button", () => (
    <SocialButton
      redirect_url="http://localhost:3000/redirect.html"
      network="linkedin"
      render={(data, onClick) => {
        return (
          <ButtonWithIcon
            icon="linkedIn"
            iconStyle={{
              width: 28,
              height: 28
            }}
            outline
            onClick={onClick}
            css={`
              width: 30%;
              border: 1px solid #dce0e0;
              background-color: #fafafa;
              border-radius: 2px;
            `}
            connectColor={"#36C98E"}
          >
            Connect LinkedIn
          </ButtonWithIcon>
        );
      }}
    />
  ))
  .add("Offline Id section", () => (
    <React.Fragment>
      <OfflineIdSection
        offlineId={true}
        afterVerification={value => !value}
        profile_pic={"static/img/profile/francis.png"}
      />
      <OfflineIdSection
        offlineId={false}
        afterVerification={value => !value}
        profile_pic={"static/img/profile/francis.png"}
      />
    </React.Fragment>
  ))
  .add("SocialAccount section", () => (
    <SocialAccount
      socialNetworks={[
        {
          name: "facebook",
          verified: false
        },
        {
          name: "google",
          verified: false
        },
        {
          name: "linkedin",
          verified: false
        }
      ]}
      facebookUrls={{ credentials: {} }}
      linkedinUrl={{ credentials: {} }}
      googleUrls={{
        //client_id: "527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com",
        client_id: process.env.REACT_APP_CLIENT_ID,
        validateUrl: "http://localhost:8000/google/validate/",
        redirectUrl: "http://localhost:8000/facebook/redirect-view/"
      }}
    />
  ));
