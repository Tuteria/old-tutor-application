import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import Divider from "../src/simple/Divider";
import TemplateWrapper, {
  Header,
  StateHolder
} from "../src/pages/ExternalPages/TutorLandingPage/TemplateWrapper";
import Home, {
  TutorSection
} from "../src/pages/ExternalPages/TutorLandingPage/Home";
import { TopPriceSection } from "../src/pages/ExternalPages/TutorLandingPage/TopSection";
import Modal from "../src/simple/Modal";
import { Div } from "../src/primitives/index";
import { xs, spacing } from "../src/siteStyle";
import {
  SocialLogin,
  ReusableModalSection
} from "../src/pages/ExternalPages/TutorLandingPage/SocialLoginModal";
import { ResetPasswordContainer } from "../src/pages/ExternalPages/TutorLandingPage/ModalForm";
import {
  SignupForm,
  LoginForm
} from "../src/pages/ExternalPages/TutorLandingPage/SignupForm";
import { TutorDetailModal } from "../src/pages/ExternalPages/TutorLandingPage/TutorDetailModal";
import Carousel from "../src/pages/ExternalPages/TutorLandingPage/Carousel/ScrollableCarousel";
import TutorLandingPage from "../src/pages/ExternalPages/TutorLandingPage";
import ScrollableCarousel from "../src/pages/ExternalPages/TutorLandingPage/Carousel/ScrollableCarousel";
import siteText from "../src/data.json";
import ScrollLogicContainer from "../src/pages/ExternalPages/TutorLandingPage/ScrollLogicContainer";
import isEmail from "validator/lib/isEmail";
import { Heading, Text } from "../src/simple/Text";
import { DefaultCarousel } from "../src/pages/ExternalPages/TutorLandingPage/Carousel/DefaultCarousel";
import { SSRCarouselWrapper } from "../src/pages/ExternalPages/TutorLandingPage/SSRversion";
import includes from "lodash/includes";

const NewDiv = styled(Div)`
  display: flex;
  width: 70%;
  justify-content: space-around;
  ${props =>
    css`
      ${props.css};
    `};
`;
const facebookUrls = {
  // appId: "1113079532095710",
  appId: "1113079532095710",
  validateUrl: "http://localhost:8000/facebook/validate/",
  redirectUrl: "http://localhost:8000/facebook/redirect-view/",
  afterLogin(data) {
    window.location.href = `http://localhost:8000/redirect_user/${data.response.email}/`;
  }
};
const googleUrls = {
  // client_id:
  //   "527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com",
  client_id:
    "527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com",
  validateUrl: "http://localhost:8000/google/validate/",
  afterLogin(data) {
    window.location.href = `http://localhost:8000/redirect_user/${data.email}/`;
  }
};
const saveUserAction = (fields, callback) => {
  return new Promise((resolve, reject) => {
    resolve({
      error: {
        dob: ["You won't be able to become a tutor on tuteria"],
        day: ["This field is required"],
        first_name: ["This field is required"],
        last_name: ["This field is required"],
        email: ["This email already exist"],
        combined: ["both firsjeo wjeo jwoew"],
        password: ["Your password is week."]
      }
    });
  });
};

function simpleValidation(fields) {
  let results = Object.keys(fields).map(x => {
    if (typeof fields[x] === "string") {
      return fields[x].trim().length > 0;
    }
    return (
      Object.values(fields[x]).filter(x => x.toString().length === 0).length ===
      0
    );
  });
  let oo = [...new Set(results)];
  return oo.length === 1 && !!oo[0];
}
const customValidation = (state, field, errors) => {
  if (field === "combined") {
    return !!state.first_name && !!state.last_name;
  }
  if (field === "email") {
    // return false;
    return isEmail(state.email || "");
  }
  if (includes(["first_name", "last_name", "password"], field)) {
    return !!state[field];
  }
  if (includes(["day", "month", "year", "dob"], field)) {
    if (typeof state.dob !== "string") {
      if (field !== "dob") {
        let dob = state.dob || {};
        let missing_fields = Object.keys(dob).filter(x => !!dob[x] === false);
        if (missing_fields.length > 0) {
          errors.dob = "Some date fields are missing.";
        }
        return !!dob[field];
      }
    }
    return !!state.dob && Object.keys(state.dob).length === 3;
  }
  return true;
};
storiesOf("Tutor Landing Page", module)
  .add("default", () => (
    <TutorLandingPage
      saveUserAction={saveUserAction}
      facebookUrls={facebookUrls}
      loginUserAction={saveUserAction}
      resetPasswordAction={fields =>
        new Promise((resolve, reject) => resolve(true))
      }
      loginErrors={{
        first_name: ["This field is required"],
        password: ["This password is invalid"]
      }}
      signUpErrors={{
        first_name: ["Your first/last name is blank, please fill it out"],
        email: ["Err. looks like you forgot your email"],
        last_name: ["Your first/last name is blank, please fill it out"],
        combined: ["Both first name and last name is missing"]
      }}
      customValidation={customValidation}
      googleUrls={googleUrls}
      siteText={siteText}
      CarouselComponent={DefaultCarousel}
      CarouselComponent={ScrollableCarousel}
      ScrollLogicContainer={ScrollLogicContainer}
      loggedInLogic={handleOpenModal => (
        <a onClick={() => handleOpenModal(false, true)}>Log in</a>
      )}
      render={(props, children) => (
        // <React.Fragment>
        //   <SSRCarouselWrapper
        //     headerProps={{
        //       loggedIn: siteText.nextUrl,
        //       loggedInText: siteText.loggedInText,
        //       nextUrl: siteText.nextUrl,
        //       linkRender: handleOpenModal => (
        //         <a onClick={() => handleOpenModal(false, true)}>Log in</a>
        //       )
        //     }}
        //     sectionProps={{
        //       siteText: siteText,
        //       loggedIn: siteText.nextUrl,
        //       loggedInText: siteText.loggedInText,
        //       nextUrl: siteText.nextUrl
        //     }}
        //     {...{
        //       loggedIn: siteText.nextUrl,
        //       loggedInText: siteText.loggedInText,
        //       nextUrl: siteText.nextUrl,
        //       images: siteText.carousel_images,
        //       image: siteText.carousel_images[0],
        //       siteText
        //     }}
        //   />
        //   {props.children}
        // </React.Fragment>
        <StateHolder
          {...props}
          loggedInLogic={handleOpenModal => (
            <a onClick={() => handleOpenModal(false, true)}>Log in</a>
          )}
        />
      )}
    />
  ))
  .add("Signing Modal", () => (
    <NewDiv
      css={`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 1em;
        margin-left: auto;
        width: 83%;
        margin-right: auto;
        & > div {
          width: 100%;
        }
        @media (max-width: 768px) {
          width: 100%;
          grid-template-columns: 1fr;
        }
      `}
    >
      <NewDiv
        css={`
          border: 1px solid black;
          // width: 500px;
        `}
      >
        <ReusableModalSection
          onSignUpLogin={action("onsignup")}
          canSignUp={true}
          header={false ? "Sign up to start earning as a tutor" : ""}
        >
          {/* {true ? <h2>Sign up to start earning as a tutor</h2> : null} */}
          <SocialLogin
            fullWidth={!true}
            status={true}
            displayEmail={true}
            onSignUpLogin={action("onsignup")}
            facebookUrls={facebookUrls}
            googleUrls={googleUrls}
          />
          <SignupForm
            terms="hello"
            policies="holla"
            details={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              dob: {},
              confirm: true
            }}
            errors={{
              first_name: ["This field is required"],
              email: ["This email already exists"]
            }}
            saveUser={saveUserAction}
            customValidation={data => {
              console.log(data);
              return true;
            }}
          />
        </ReusableModalSection>
      </NewDiv>
      <NewDiv
        css={`
          border: 1px solid black;
        `}
      >
        <ReusableModalSection
          onSignUpLogin={action("onsignup")}
          canSignUp={false}
          header={false ? "Sign up to start earning as a tutor" : ""}
        >
          {false ? <h2>Sign up to start earning as a tutor</h2> : null}
          <SocialLogin
            fullWidth={!true}
            status={false}
            displayEmail={true}
            onSignUpLogin={action("onsignup")}
            facebookUrls={facebookUrls}
            googleUrls={googleUrls}
          />
          <LoginForm
            details={{
              email: "",
              password: ""
            }}
            errors={{
              email: ["This field is required"],
              password: ["This password is invalid"]
            }}
            saveUser={saveUserAction}
          />
        </ReusableModalSection>
      </NewDiv>
      <NewDiv
        css={`
          // width: 50%;
          border: 1px solid black;
        `}
      >
        <ReusableModalSection
          onSignUpLogin={action("onsignup")}
          canSignUp={false}
          header={true ? "Sign up to start earning as a tutor" : ""}
        >
          {false ? <h2>Sign up to start earning as a tutor</h2> : null}
          <SocialLogin
            fullWidth={true}
            status={true}
            displayEmail={true}
            onSignUpLogin={action("onsignup")}
            facebookUrls={facebookUrls}
            googleUrls={googleUrls}
          />
        </ReusableModalSection>
      </NewDiv>
      <NewDiv
        css={`
          border: 1px solid black;
        `}
      >
        <ReusableModalSection
          overwrite
          onSignUpLogin={action("onsignup")}
          canSignUp={false}
          header={false ? "Sign up to start earning as a tutor" : ""}
        >
          <ResetPasswordContainer
            resetPasswordAction={fields =>
              new Promise((resolve, reject) => resolve({ hello }))
            }
            returnToLogin={action("Social media button")}
            customValidation={customValidation}
          />
        </ReusableModalSection>
      </NewDiv>
    </NewDiv>
  ))
  .add("Tutor Modal", () => (
    <NewDiv
      css={`
        margin-left: auto;
        margin-right: auto;
        @media (max-width: ${xs}px) {
          width: 100%;
        }
      `}
    >
      <TutorDetailModal
        modal_content={{
          content: ` "Working with beads and creating superb jewellery designs have been
            something I really enjoyed. With Tuteria, I get to make extra cash
            teaching people what I love to do best! Nothing beats this, it's just
            awesome!”`,
          name: "Haleemah Abdulrazaq",
          description: `Top rated tutor, completed 230 lessons`,
          image: "/static/img/tutors/Chinasa-Math-English-Tutor-Tuteria.jpg",
          img: "/static/img/tutors/Chinasa-Math-English-Tutor-Tuteria.jpg"
        }}
        handleCloseModal={action("e")}
        showModal={true}
      />
    </NewDiv>
  ))
  .add("Tutor list section", () => {
    return (
      <NewDiv
        css={`
          margin-left: auto;
          margin-right: auto;
        `}
      >
        <TutorSection
          content={siteText.tutor_list_section}
          onClick={action("on click")}
        />
        ;
      </NewDiv>
    );
  })
  .add("Price Calculator Section", () => {
    let subjects = [];
    return (
      <NewDiv
        css={`
          margin-left: auto;
          margin-right: auto;
        `}
      >
        <TopPriceSection
          siteText={siteText}
          getPrice={()=>{}}
          states={siteText.states}
          skills={siteText.skills}
          content={siteText.intro_section}
        />
      </NewDiv>
    );
  })
  .add("Carousel Design", () => {
    let images = []
    return (
      <Carousel scroll={true} images={images}>
        {/* <Header {...{ facebookUrls, googleUrls }} />
      <TopPriceSection siteText={siteText} /> */}
      </Carousel>
    );
  });
