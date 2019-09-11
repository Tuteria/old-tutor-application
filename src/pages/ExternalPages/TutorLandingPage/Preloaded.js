import React from "react";

import TemplateWrapper, { Header, StateHolder } from "./TemplateWrapper";
import { WithoutScroll } from "../TutorLandingPage/ScrollLogicContainer/WithoutScroll";
import Home from "./Home";
import { TopPriceSection } from "./TopSection";
import { SSRCarouselWrapper } from "./SSRversion";
import { Div } from "../../../primitives";

const TutorLandingPage = ({
  saveUserAction,
  facebookUrls,
  googleUrls,
  siteText,
  CarouselComponent = null,
  ScrollLogicContainer = WithoutScroll,
  loggedInLogic,
  loginErrors,
  signUpErrors,
  customValidation,
  resetPasswordAction,
  loginUserAction,
  render
}) => {
  return (
    <React.Fragment>
      <TemplateWrapper
        saveUserAction={saveUserAction}
        facebookUrls={facebookUrls}
        googleUrls={googleUrls}
        siteText={siteText}
        images={siteText.carousel_images}
        image={siteText.carousel_images[0]}
        ScrollLogicContainer={ScrollLogicContainer}
        CarouselComponent={CarouselComponent}
        loggedIn={siteText.nextUrl}
        nextUrl={siteText.nextUrl}
        loggedInText={siteText.loggedInText}
        signUpLogic={loggedInLogic}
        signUpErrors={signUpErrors}
        loginErrors={loginErrors}
        customValidation={customValidation}
        resetPasswordAction={resetPasswordAction}
        loginUserAction={loginUserAction}
        render={render}
      />
      <Home siteText={siteText} />
    </React.Fragment>
  );
};

export default TutorLandingPage;
