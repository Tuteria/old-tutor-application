import React from "react";
import logo from "./logo.svg";
import TemplateWrapper, { Header, Link } from "./TemplateWrapper";
import { WithoutScroll } from "../TutorLandingPage/ScrollLogicContainer/WithoutScroll";
import Home from "./Home";
import { TopPriceSection } from "./TopSection";
import { DefaultCarousel } from "./Carousel/DefaultCarousel";
import { Div } from "../../../primitives";

export const SSRCarouselWrapper = ({
  loggedIn,
  loggedInText,
  nextUrl,
  images,
  image,
  siteText,
  headerProps,
  sectionProps
}) => (
  <DefaultCarousel
    loggedIn={loggedIn}
    loggedInText={loggedInText}
    nextUrl={nextUrl}
    images={images}
    image={image}
    siteText={siteText}
  >
    <WithoutScroll
      render={scrolling => (
        <Header
          render={(_, handleOpenModal, linkRender) => (
            <h1>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              {/* <Link to="/about">Sign in</Link> */}
              {linkRender(handleOpenModal)}
            </h1>
          )}
          {...headerProps}
        />
      )}
    >
      <TopPriceSection PriceSectionComponent={Div} {...sectionProps} />
    </WithoutScroll>
  </DefaultCarousel>
);

// export default CarouselWrapper;
