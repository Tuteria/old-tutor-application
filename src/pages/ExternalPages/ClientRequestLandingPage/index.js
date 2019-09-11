// Import React and Styled Components
import React, { Component } from "react";
import styled, { css, injectGlobal } from "styled-components";
import {
  TopHero,
  FeatureSection,
  SatisfactionGuarantee,
  TestimonialBlock,
  OurServices,
  HowToData,
  TestimonialBlock2,
  FeaturedLogo,
  VideoTestimonial,
  TutorDisplaySection,
  CTASection,
  FAQSection,
  BottomHero,
  FooterSection,
  BigTestimonialBlock,
  ResultsSection,
  BenefitsSection
} from "./components";
import {
  HowToSection,
  SingleHowTo,
  HowToStyling,
  ContainerStyling
} from "../shared";
import { color, spacing, font_used } from "../../../design-systems";
import { Div } from "../../components";
import { PersonalInfoContent, IELTSContent } from "./PageContent";

// ====== Render Landing Page to Storybook =========
export const ClientLandingPage = ({
  linkRender,
  state,
  vicinity,
  videoLink
}) => {
  return (
    <React.Fragment>
      <TopHero
        overlay
        heroContent={PersonalInfoContent.heroContent(state, vicinity)}
        linkRender={linkRender}
        {...{ state, vicinity }}
      />
      <FeatureSection
        {...{
          state,
          vicinity,
          ...PersonalInfoContent.benefitContent
        }}
      />
      <SatisfactionGuarantee
        {...{
          state,
          vicinity,
          ...PersonalInfoContent.guaranteeContent
        }}
      />
      <TestimonialBlock linkRender={linkRender} {...{ state, vicinity }} />
      <OurServices
        {...{ state, vicinity, ...PersonalInfoContent.servicesContent }}
      />
      <HowToSection {...HowToData} {...{ state, vicinity }} />
      <TestimonialBlock2 linkRender={linkRender} {...{ state, vicinity }} />
      <FeaturedLogo {...{ state, vicinity }} />
      <VideoTestimonial
        linkRender={linkRender}
        {...{
          state,
          vicinity,
          videoLink,
          ...PersonalInfoContent.videoSectionContent
        }}
      />
      <TutorDisplaySection
        {...{ state, vicinity, ...PersonalInfoContent.tutorDisplayContent }}
      />
      <CTASection
        linkRender={linkRender}
        {...{ state, vicinity, ...PersonalInfoContent.ctaSectionContent }}
      />
      <FAQSection
        {...{ state, vicinity, ...PersonalInfoContent.faqSectionContent }}
      />
      <BottomHero linkRender={linkRender} {...{ state, vicinity }} />
      <FooterSection {...{ state, vicinity }} />
    </React.Fragment>
  );
};

const examLandingCustomStyle = `
.exam-page-button {
  @media(max-width: 768px) {
    line-height: 54px;
  }
  svg {
    display:none;
  }
}
.content-area {
  max-width: 552px;
  margin: 0!important;
}
.results-heading {
  padding-top: ${spacing.l};
}
.results-subheading {
  font-weight: normal;
}
.feature-section-heading {
  font-size: 48px;
  line-height: 56px;

  @media(max-width: 420px) {
    font-size: 36px;
    line-height: 40px;
  }
}
.feature-block {
  margin-top: 40px;
  @media(max-width: 768px) {
    margin-top: 20px;
  } 
}
.satisfaction-guarantee__content-section {
  padding: 32px 56px!important;

  @media(max-width: 980px) {
    padding: 32px 56px 32px 24px!important;

    svg {
      margin-right: 40px;
    }
  }
}
.satisfaction-guarantee__content-section a {
  background-color: ${color.white}!important;
  border-color: ${color.white};
  color: ${color.gray.primary};
  width: 100%;
  margin-top: ${spacing.xl};
}
.how-to-section {
  .feature-section-heading {
    padding: ${spacing.xxl} 0;
  }

  .feature-block {
    margin-top: 0;
  }

  .feature-block__item {
    margin: 0 24px 0 40px;

    @media(max-width: 420px) {
      text-align: center;
      margin-left: 0!important;
      margin-right: 0;
    }

    @media(max-width: 800px) {
      margin: 0!important;
      margin-bottom: 24px!important;
    }

    @media(max-width: 1052px) {
      margin: 0 24px;
    }
  }

  .text-group {
    p {
      font-size: 19px;
      line-height: 28px;
    }
  }
}

.highest-score-section {

  .feature-block {
    padding-bottom: ${spacing.xxxl};
  }

  .feature-block__item {
    margin: 0 24px 0 40px;

    @media(max-width: 420px) {
      text-align: center;
      margin-left: 0!important;
      margin-right: 0;
    }

    @media(max-width: 800px) {
      display:flex!important;
      margin: 0!important;
      margin-bottom: 24px!important;

      svg {
        margin-right: 0;
        margin-top: 16px;
      }
    }

    @media(max-width: 1052px) {
      margin: 0 24px;
    }
  }

  .text-group {
    p {
      font-size: 19px;
      line-height: 28px;
    }
  }
}
.how-to-content__text {
  padding-top: 0;
  @media(max-width: 620px) {
        padding-top: 4vh;
  }
  h1 {
    font-size: 48px;
    line-height: 56px;

    @media(max-width: 820px) {
      font-size: 36px;
      line-height: 40px;
    }
  }
  p {
    font-size: 22px;
    line-height: 28px;


    @media(max-width: 768px) {
      font-size: 19px;
      line-height: 24px;
    }
  }
}
.featured-logo-section {
  h1 {
    font-size: 48px;
    line-height: 56px;

    @media(max-width: 420px) {
      font-size: 36px!important;
      line-height: 40px!important;
    }

  }
}
.tutor-display-section {
  margin-top: 0;
  padding-top: 0;
  @media(max-width: 1024px) {
    .tutor-grid__item:nth-of-type(3n) {
      display: none;
    }
  }
  .heading-group {
    margin-bottom: ${spacing.xxl};
    h1 {
      font-size: 48px;
      line-height: 56px;

      @media(max-width: 420px) {
        font-size: 36px;
        line-height: 40px;
      }
    }
    p {
      font-size: 22px;
    }
  }
}
.featured-logo-section {
  h1 {
    font-size: 48px;
    line-height: 56px;
  }
  .logo-grid {
    margin-top: ${spacing.xxl};
  }
}
.our-services-section {
  & > h1 {
    font-size: 48px;
    font-size: 48px;
    line-height: 56px;
    padding-bottom: 48px;

    @media(max-width: 420px) {
      font-size: 36px!important;
      line-height: 40px!important;
    }
  }
  .services-group {
    margin-top: 0!important;
  }
  .text-group {
    h1 {
      padding-bottom: 0;
    }
  }
}
.contact-us {
  margin-bottom: ${spacing.max};
  .contact-info {
    padding-top: ${spacing.m};
    flex-flow: row wrap;

    a {
      color: #212529;
      margin-right: ${spacing.xl};
      text-decoration: none!important;
    }
  }
}
.testimonial-one {
  .testimonial-text {
    font-size: 42px;

    @media(max-width: 660px) {
      ${font_used.big_heading};
      font-weight: normal;
      line-height: 48px;
    }

    @media(max-width: 570px) {
      ${font_used.regular_heading};
      font-weight: normal;
      line-height: 40px;
    }
  }
}
.benefits-section {
  .benefits-subheading {
    font-weight: normal;
  }
  .exam-page-button {
    position: relative;
    svg {
      display:inline!important;
      width: 12px;
      height: 12px;
      padding-left: 4px;
      position: relative;
      top: -2px;
    }
  }

  .text-group {
    p {
      font-size: 19px;
      line-height: 28px;
    }
  }
}
.study-online-section {
  padding-top: 80px;

  & > div {
    justify-content: center;
  }

  .how-to-image {
    width: 480px;
    height: auto;
    @media(max-width: 620px) {
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .how-to-content__text {
    margin-right: 8vw;
    @media(max-width: 620px) {
      margin-right: 0;
    }
  }

  .how-to-content__number {
    display: none;
  }
}
.bg-container a {
  width: 250px;
}
// .faq-section {
//   max-width: 70vw;
// }

.pre-footer-section {
  & > div {
    justify-content: center;
  }
  .how-to-image {
    width: 500px;
    height: auto;
    @media(max-width: 620px) {
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .how-to-content__text {
    @media(max-width: 620px) {
      margin-right: 0;
    }
  }
}
`;

export const ExamLandingPage = ({
  linkRender,
  state,
  vicinity,
  videoLink,
  content,
  buttonText
}) => {
  return (
    <Div css={examLandingCustomStyle}>
      <TopHero
        heroContent={content.heroContent(state, vicinity)} // bgImage={`/static/img/exams/excited-tuteria-client-passed-ielts.png`}
        linkRender={linkRender}
        {...{ state, vicinity }}
      />
      <ResultsSection
        {...{ numberOfCells: 3, ...content.resultsSectionContent }}
      />
      <Div css={ContainerStyling}>
        <BigTestimonialBlock
          width="70vw"
          {...content.firstTestimonialContent}
          className="testimonial-one"
        />
      </Div>
      <Div className="highest-score-section">
        <FeatureSection
          {...{
            state,
            vicinity,
            align: "left",
            svgStyle: `margin-left: -30px`,
            hasDivider: true,
            ...content.highestScoreContent(state, vicinity)
          }}
        />
      </Div>
      <SatisfactionGuarantee
        linkRender={linkRender}
        {...{
          state,
          vicinity,
          bgColor: color.blue.primary,
          svgColor: color.blue.primary,
          buttonText,
          ...content.guaranteeContent
        }}
      />
      <div className="how-to-section">
        <FeatureSection
          {...{ state, vicinity, align: "left", ...content.howtoContent }}
        />
      </div>
      {/* <VideoTestimonial
        linkRender={linkRender}
        {...{
          state,
          vicinity,
          videoLink,
          hasQuote: true,
          fullButton: false,
          boldHeading: false,
          ...content.videoSectionContent,
        }}
      /> */}
      <Div css={ContainerStyling} className="big-testimonial">
        <BigTestimonialBlock
          width="70vw"
          className="testimonial-one"
          {...content.secondTestimonialContent}
        />
      </Div>
      <BenefitsSection
        linkRender={linkRender}
        hasDivider
        buttonText={buttonText}
        {...{
          numberOfCells: 2,
          alignContent: `left`,
          ...content.benefitsContent
        }}
      />
      <TutorDisplaySection
        {...{
          state,
          vicinity,
          textAlign: `center`,
          ...content.tutorDisplayContent
        }}
      />
      <Div css={HowToStyling} className="study-online-section">
        <SingleHowTo
          centered
          reverse={false}
          linkRender={linkRender}
          buttonText={buttonText}
          {...content.onlinePreferenceSection}
        />
      </Div>
      <FeaturedLogo
        {...{
          state,
          vicinity,
          numberOfCells: "5",
          display: "block",
          logoHasShadow: false,
          alignHeading: "center",
          headingWidth: "800px"
        }}
      />
      <OurServices
        hasDivider
        {...{
          state,
          vicinity,
          alignIcon: "center",
          alignHeading: "center",
          numberOfCells: 2,
          ...content.servicesContent
        }}
      />
      <CTASection
        linkRender={linkRender}
        {...{ state, vicinity, icon: "shield-3", ...content.ctaSectionContent }}
      />
      <FAQSection
        {...{
          state,
          vicinity,
          alignHeading: "center",
          contactSectionDirection: "column",
          contactSectionAlignItems: "start",
          svgColor: color.blue.primary,
          type: "link",
          ...content.faqSectionContent
        }}
      />
      <Div css={HowToStyling} className="pre-footer-section">
        <SingleHowTo
          reverse
          centered
          linkRender={linkRender}
          buttonText={buttonText}
          {...content.preFooterSection}
        />
      </Div>
      <FooterSection {...{ state, vicinity }} />
    </Div>
  );
};
