// Import React and Styled Components
import React, { Component } from "react";
import styled, { css, injectGlobal } from "styled-components";
import Modal from "react-modal";
import Media from "react-media";

// Import the Button Component
import {
  SecondaryButton,
  SecondaryLinkButton,
  PrimaryButton,
  PrimaryLinkButton
} from "../../../simple/Button";

// Importing the Icon, Text and Spacing Primitive Components
import Icon from "../../../simple/Icon";
import { Heading, Text } from "../../../simple/Text";
import { spacing, color, font_used } from "../../../siteStyle";

import { device_style, font_weight } from "../../../design-systems/index";
import { Div, Container } from "../../../primitives/index";
import { line_height } from "../../../design-systems/font";
import LogoCombined from "../../../compound/icons/Logo";
import { HowToSection, ContainerStyling } from "../shared";
import {
  numberWithCommas,
  getLatestDates,
  getLozengeBgColor
} from "../GroupLandingPage/utils";
import { Link } from "../../ClientRequestPages/PricingComponent";
import { ToggleModal } from "../../../simple/Modal";
import { CloseButton } from "../../components";
import { ModalBody } from "../../AboutTutorPage/ExampleModal";
import {
  getTimeToGo,
  getLocaleDateString,
  getDurationFromDates
} from "./utils";
const xs = 768;
const tablet = 992;

export const MAXWIDTH = `max-width: 1024px;`;
const ReduceHeaderOnMobile = `
  @media(max-width: 420px){
      ${font_used.regular_heading}
  }
`;

injectGlobal`
body {
  background: ${color.white}!important;
}
`;

const box_shadow = "0px 0px 14px rgba(0, 0, 0, 0.14)";

// =========== [PRIMITIVE] Flexbox Grid Component =============
const calcCellWidth = numberOfCells => {
  if (numberOfCells === 1) {
    return `
    .cell {
      width: 100%;
    }`;
  }
  return `
  .cell {
    width: calc(50% - 2rem);
  }`;
};

export const Grid = ({ gridCss, children, numberOfCells, className }) => (
  <Div
    css={`
      .cell {
        margin: 1rem;
      }
      @media screen and (min-width: 600px) {
        display: flex;
        ${calcCellWidth(numberOfCells)};
        flex-wrap: wrap;
        justify-content: space-between;
      }
      @media screen and (min-width: 1000px) {
        .cell {
          width: calc((100% / ${numberOfCells}) - 2rem);
        }
      }
      ${gridCss};
    `}
    className={className}
  >
    {children}
  </Div>
);

// =========== [PRIMITIVE] Landing Page Section Heading Component =============
const LandingPageSectionHeadingDiv = styled.div`
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  text-align: ${props => props.alignText || "center"};

  h1 {
    margin: ${props => (props.alignText !== "center" ? "unset" : "0 auto")};
    max-width: ${props => props.headingWidth || "100%"};
    padding-bottom: 8px;
    color: ${color.gray.primary};
  }

  p {
    margin: ${props => (props.alignText !== "center" ? "unset" : "0 auto")};
    max-width: ${props => props.subheadingWidth || "100%"};
    ${font_used.big_body};
    color: ${color.gray.primary};
  }
`;

const LandingPageSectionHeading = ({
  heading,
  subheading,
  marginTop,
  marginBottom,
  alignText,
  headingWidth,
  subheadingWidth
}) => {
  return (
    <LandingPageSectionHeadingDiv
      marginBottom={marginBottom}
      marginTop={marginTop}
      alignText={alignText}
      headingWidth={headingWidth}
      subheadingWidth={subheadingWidth}
    >
      <Heading hero>{heading}</Heading>
      <Text>{subheading}</Text>
    </LandingPageSectionHeadingDiv>
  );
};

const MediaObjectDiv = styled.div`
  text-align: left;
  display: flex;

  @media (max-width: 1028px) {
    display: block;
    text-align: center;
  }

  @media (max-width: 520px) {
    text-align: center;
  }

  .media-object {
    &__icon {
      align-self: ${props => props.alignIcon || `flex-start`};
      margin-right: ${spacing.m};
      margin-bottom: 16px;

      @media (max-width: 1028px) {
        margin-right: 0;
      }

      svg {
        min-width: 32px;
        width: 32px;
        height: 40px;

        @media (max-width: 1028px) {
          margin-bottom: 4px !important;
          margin-right: 0px !important;
        }
      }
    }
    &__number {
      flex: 0 0 auto;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: ${color.blue.primary};
      font-size: 24px;
      letter-spacing: -0.6px;
      line-height: 40px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${color.white};

      @media (max-width: 1028px) {
        margin: 0 auto;
      }
    }
    &__body {
      h1 {
        ${font_used.big_body};
      }

      p {
        ${font_used.regular_body};
        margin-top: 4px !important;

        @media (max-width: 1028px) {
          margin: 0 auto;
          text-align: center;
        }
      }
    }
  }
`;

const MediaObject = ({ heading, body, number, icon, alignIcon, color }) => (
  <MediaObjectDiv className="media-object" alignIcon={alignIcon}>
    <div className="media-object__icon">
      {icon && <Icon name={icon} />}
      {number && <div className="media-object__number">{number}</div>}
    </div>
    <div className="media-object__body">
      <Heading color={color}>{heading}</Heading>
      <Text color={color}>{body}</Text>
    </div>
  </MediaObjectDiv>
);

// =========== [SECTION] Top Hero Section =============

export const TopHeroStyling = styled.div`
  min-height: 90vh;
  /* min-height: 400px; */
  background-color: #484848;
  background-image: url('${props => props.bgImage}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white !important;
  ${props =>
    Boolean(props.overlay)
      ? `
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.6);`
      : ``}

  @media (max-width: 800px) {
    height: 72vh;
  }

  > div:nth-of-type(1) {
    padding: 24px;

    @media (min-width: 1200px) {
      max-width: 1120px !important;
      margin: auto;
    }

    .tuteria-logo {
      height: 15%;
      text-align: center;
      svg {
        height: 32px;
      }
    }

    .content-area {
      margin: 0 4vw;
      height: 65%;
      padding-top: 24vmin;


      @media (max-width: 800px) {
        padding-left: 40px;
        padding-right: 40px;
      }

      @media (max-width: 520px) {
        text-align: center;
        width: 80vw;
        margin: 0 auto;
        padding: 16vh 0;

        button,
        a {
          width: auto !important;
        }
      }

      h1 {
        &:nth-of-type(2) {
          font-weight: ${font_weight.regular} !important;
          margin-top: 8px;
        }
      }

      button,
      a {
        margin-top: 32px;
      }
    }
  }
  ${props => props.heroStyle};
`;
// export const
export const TopHero = ({
  overlay,
  linkRender,
  heroContent = {},
  heroStyle
}) => {
  const bgImage = heroContent.bgImage;
  return (
    <TopHeroStyling {...{ bgImage, overlay, heroStyle }}>
      <div>
        <div className="tuteria-logo">
          <LogoCombined textColor="white" />
        </div>
        <div className="content-area">
          <Heading hero color="#fff">
            {heroContent.heading}
          </Heading>
          <Heading small>{heroContent.subTitle}</Heading>
          {linkRender(heroContent.buttonText)}
        </div>
      </div>
    </TopHeroStyling>
  );
};

//====== [UTILITY COMPONENT] Feature Block =======

export const FeatureBlockStyling = align => `
  text-align: ${align || "center"};
  flex: 1;
  margin: 0 16px 40px;

  .text-group{
      margin-top: ${spacing.m} !important;

      > p{
          margin-top: ${spacing.s} !important;
      }
  }

`;

// Defining the Default Placeholder for a Feature Block
export const FeatureBlockProps = {
  heading: "Feature Block Heading",
  paragraph:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  icon: "quality-tutor"
};

export const FeatureBlock = ({
  heading = FeatureBlockProps.heading,
  paragraph = FeatureBlockProps.paragraph,
  icon,
  className,
  align,
  image,
  number,
  linkRender
}) => {
  return (
    <Div className={className} css={FeatureBlockStyling(align)}>
      {icon ? <Icon name={icon} /> : null}
      {image ? (
        <div className="feature-image">
          <img src={image} />
        </div>
      ) : null}
      {number ? <div className="feature-number">{number}</div> : null}
      <div className="text-group">
        <Heading small>{heading}</Heading>
        <Text>{paragraph}</Text>
        {linkRender ? linkRender : null}
      </div>
    </Div>
  );
};

//======= [SECTION] Put your kids ahead in school ==========

export const FeatureSectionStyling = svgStyle => `
  text-align:center;
  ${ContainerStyling};

  .feature-block{
      display:flex;
      flex-flow: row wrap;
      margin-top: ${spacing.xxxl};
      
      @media(max-width: 800px){
          display: block !important;
      }

      svg{
          min-width: 104px !important;
          ${svgStyle};
          
          @media(max-width: 800px){
            margin-right: ${spacing.xl};
            width: 80px !important;
          }

          @media(max-width: 420px){
            margin-right: 0;
            margin-left: 0;
          }
      }


      .feature-block__item {

        .feature-number {
          flex: 0 0 auto;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-color: ${color.blue.primary};
          ${font_used.big_heading};
          display:flex;
          align-items:center;
          justify-content:center;
          color: ${color.white};
          margin-bottom: ${spacing.l};

          @media(max-width: 800px) {
            margin-right: 32px;
            margin-top: 16px;
          }

          @media(max-width: 420px){
            margin: 0 auto;
          }
        }
          
          @media(max-width: 800px){
              display: flex !important;
              text-align: left;
          }

          @media(max-width: 420px){
              display: block !important;
              text-align: center;
          }
      }
  }

`;

export const FeatureSection = ({
  heading,
  features,
  align,
  svgStyle,
  hasDivider = false
}) => {
  return (
    <Div css={FeatureSectionStyling(svgStyle)}>
      {hasDivider ? <HeadingDivider /> : null}
      <Heading big className="feature-section-heading">
        {heading}
      </Heading>
      <Div className="feature-block">
        {features.map((feature, index) => (
          <FeatureBlock
            {...feature}
            key={index}
            className="feature-block__item"
            align={align}
          />
        ))}
      </Div>
    </Div>
  );
};

// ======= [SECTION] Satisfaction Guaranteed ==========

export const SatisfactionGuaranteeStyling = (bgColor, bgImage, svgColor) => `
  height: 80vh;
  display: flex;
  flex-flow: row wrap;
  background-color: ${bgColor || color.green.primary};
  color: white;

  svg {
    g > path {
      fill: ${svgColor}
    }
  }

  @media (max-width: 980px){
      flex-direction: column;
      height: auto !important;
  }

  > div:nth-of-type(1){
      align-self: center;
      flex:1.2;
      padding: 32px 40px;

      @media (max-width: 980px){
          order: 2;
          padding: ${spacing.l};
          margin-bottom: ${spacing.m};
      }
      
      > div{
          margin-bottom:0 !important;
          text-align:left !important;

          @media(max-width: 980px){
              display: flex !important;
              align-items: center;
              svg{
                  margin-right: ${spacing.xl};
                  min-width: 80px !important;
              }
          }

          @media(max-width: 620px){
              display: block !important;
              text-align: center !important;
              margin:0;
              
              svg{
                  margin-right: 0 !important;
                  margin-top: -72px;
              }
          }
          
          h1{
              ${font_used.big_heading};
          }

          p{
              ${font_used.big_body};
          }
      }
  }

  .bg-image{
      flex:3;
      background-color: grey;
      background-image: url(${bgImage});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      min-height:64vh;
  }


`;

export const SatisfactionGuarantee = ({
  heading,
  paragraph,
  image,
  bgColor,
  icon = "circular-shield",
  bgImage,
  svgColor = color.green.primary,
  linkRender = () => {},
  buttonText
}) => {
  return (
    <Div css={SatisfactionGuaranteeStyling(bgColor, bgImage, svgColor)}>
      <div className="satisfaction-guarantee__content-section">
        <FeatureBlock
          heading={heading}
          paragraph={paragraph}
          icon={icon}
          linkRender={linkRender(buttonText, { big: true })}
        />
      </div>
      <div className="bg-image" />
    </Div>
  );
};

//======= [SECTION] What do you need help with? ==========

export const OurServicesStyling = (alignIcon, alignHeading, numberOfCells) => `
  ${ContainerStyling};

    > h1{
      text-align: ${alignHeading || `left`};
      @media(max-width: 520px){
          text-align: center !important;
      }
    }

  .services-group{
      margin-top: ${spacing.xxl};
      display: flex;
      flex-wrap: wrap;
      margin:24px -16px 0;

      .services-group__item{
          background-color: white;
          box-shadow: 0 2px 7px 0 #DDDDDD;
          border-radius: 8px;
          padding: ${spacing.l};
          flex: ${100 / (numberOfCells + 1)}%;
          margin: 16px;
          text-align:left;
          display:flex;

          @media(max-width: 1028px){
              display: block;
          }

          @media(max-width: 800px){
              flex: 33.333%;
          }

          @media(max-width: 520px){
              flex: 100%;
              text-align: center;
          }

          h1{
              ${font_used.big_body};
          }

          p{
              ${font_used.regular_body};
              margin-top: 4px !important;
          }

          svg{
              align-self: ${alignIcon || `flex-start`};
              margin-right: ${spacing.m};
              min-width: 32px;
              width: 32px;
              height: 40px;

              @media(max-width: 1028){
                margin-bottom: 4px !important;
                margin-right: 0px !important;
              }
          }

          div{
              margin-top: 0 !important;    
          }
      }
  }

`;

export const OurServices = ({
  alignIcon,
  alignHeading,
  heading,
  services,
  numberOfCells = 3,
  hasDivider
}) => {
  return (
    <Div
      className="our-services-section"
      css={OurServicesStyling(alignIcon, alignHeading, numberOfCells)}
    >
      {hasDivider ? <HeadingDivider /> : null}
      <Heading big>{heading}</Heading>
      <div className="services-group">
        {services.map((item, index) => (
          <FeatureBlock
            key={index}
            {...item}
            className="services-group__item"
          />
        ))}
      </div>
    </Div>
  );
};

//======= [SECTION] Testimonial ==========

export const TestimonialBlockStyling = styled.div`
  box-sizing: border-box;
  padding: 48px 24px;
  margin: 0 auto 40px;
  background-color: ${color.gray.ui_02};
  display: flex;
  align-items: center;

  @media (min-width: 1128px) {
    padding: 80px;
  }

  @media (max-width: 940px) {
    display: block;
    width: 100%;

    > div:nth-of-type(2) {
      width: 100%;
      text-align: center;
      margin-top: ${spacing.xl};
    }
  }

  .client-testimonial {
    display: flex;
    flex: 9 5;

    .client-info {
      min-width: 100px;
      text-align: center;
      margin: 0 auto;
      margin-right: ${spacing.xxl};
      align-self: center;
    }

    .client-avatar {
      width: 88px;
      height: 88px;
      background-color: #484848;
      ${props =>
        `background-image: url('/static/img/${
          props.image
        }');`} background-position: center;
      background-size: cover;
      border-radius: 50%;
      margin: auto;
      margin-bottom: ${spacing.s};
    }

    p {
      font-weight: ${font_weight.bold};
    }
    blockquote {
      margin-right: ${spacing.xxl};
      margin-left: ${spacing.xxl};
      margin-bottom: 0;
      h1 {
        font-weight: ${font_weight.regular};
        line-height: ${line_height.xl};
      }

      @media (max-width: 670px) {
        margin-left: 0;
        h1 {
          ${font_used.big_body};
        }
      }
    }

    @media (max-width: 670px) {
      flex-direction: column;
      .client-info {
        order: 2;
        margin: 24px auto 0;
      }
      blockquote {
        margin-right: 0;
        text-align: center;
        order: 1;
      }
    }
  }
`;
const AvatarImageStyling = styled.div`
  min-width: 100px;
  text-align: center;
  margin: 0 auto;
  align-self: center;

  .client-avatar {
    width: ${props => props.avatarWidth || "88px"};
    height: ${props => props.avatarHeight || "88px"};
    background-color: #484848;
    ${props =>
      `background-image: url('${props.image}');`} background-position: center;
    background-size: cover;
    border-radius: 50%;
    margin: auto;
    margin-bottom: ${spacing.s};
  }
  ${props => props.css};
`;
export const AvatarImage = ({
  image,
  text,
  rating = 5,
  overRideCss = ``,
  avatarWidth,
  avatarHeight
}) => {
  return (
    <AvatarImageStyling
      css={overRideCss}
      image={image}
      className="client-info"
      avatarWidth={avatarWidth}
      avatarHeight={avatarHeight}
    >
      <div className="client-avatar" />
      <Text big className="Text">
        {text}
      </Text>
      <Icon name="five-stars" />
    </AvatarImageStyling>
  );
};
export const TestimonialBlock = ({ linkRender }) => {
  return (
    <TestimonialBlockStyling image="mrs-soetan-tuteria-client.jpeg">
      <div className="client-testimonial">
        <div className="client-info">
          <div className="client-avatar" />
          <Text big>Mrs. Soetan</Text>
          <Icon name="five-stars" />
        </div>
        <blockquote>
          <Heading small>
            “My daughter scored among the highest in her common entrance exam
            into a top school and got admitted the same day! It's been very
            gratifying to see her improve under her tutor, to the point where
            she now contends with the top students in class.”
          </Heading>
        </blockquote>
      </div>
      <div>{linkRender(`Get a home tutor`, { big: true })}</div>
    </TestimonialBlockStyling>
  );
};

export const TestimonialBlock2 = ({ linkRender }) => {
  return (
    <TestimonialBlockStyling image="mrs-alice-tuteria-client.png">
      <div className="client-testimonial">
        <AvatarImage
          text="Mrs. Alice"
          image="/static/img/mrs-alice-tuteria-client.png"
        />

        <blockquote>
          <Heading small>
            “The lessons have been very productive. My son’s grades have really
            improved, and even his school teachers commend his new confidence.
            He now answers questions in class, and scores higher than most of
            his class mates.”
          </Heading>
        </blockquote>
      </div>
      <div>{linkRender(`Get a home tutor`, { big: true })}</div>
    </TestimonialBlockStyling>
  );
};

//======= [SECTION] Tuteria has been featured - Logo grid ==========

export const FeaturedLogoStyling = (
  numberOfCells,
  display,
  alignHeading,
  logoHasShadow,
  headingWidth
) => `
  ${ContainerStyling}
  display: ${display || `flex`};
  flex-flow: row wrap;
  align-items: center;
  padding-top: 0 !important;
  text-align: ${alignHeading || `left`};

  @media(max-width: 980px){
    display: block;
  }

  h1{
    flex: 1 2;
    line-height: 48px;
    font-weight: ${font_weight.medium} !important;
    
    @media(min-width: 980px){
      width: ${headingWidth || `auto`};
      ${display === `flex` ? `margin-right: 32px;` : `margin: 0 auto;`}
    }

    @media(max-width: 920px){
      text-align: center !important;
    }

    ${ReduceHeaderOnMobile}
  }
  

  .logo-grid{
    display: flex;
    text-align:center;
    margin:24px -24px 0;
    flex: 1.5 1;
    flex-flow: row wrap;
    justify-content: space-evenly;

    @media(max-width: 920px){
      margin-left: auto;
      margin-right: auto;
    }
    
    &__item{
      background-color: white;
      box-shadow: ${logoHasShadow ? `0 2px 7px 0 #DDDDDD` : `none`};
      border-radius: 4px;
      min-width: calc((100% / ${numberOfCells}) - 32px);
      height: 80px;
      margin: 16px 0;
      align-items: center;
      display: flex;
      justify-content: center;
      
      @media(max-width: 1200px){
        padding: 16px;
      }

      @media(max-width: 420px){
        margin: 8px;
        flex: 30%;
      }

      img{
        max-height: 48px;
        max-width: 120px;
      }
    }
  }
`;

export const featuresLogos = [
  {
    src: "/static/img/featured-logos/forbes-logo.png",
    alt: "Tuteria was featured on Forbes"
  },
  {
    src: "/static/img/featured-logos/royal-academy-of-engineering-logo.png",
    alt: "Tuteria was featured on Royal Academy of Engineering"
  },
  {
    src: "/static/img/featured-logos/internet-org-facebook-logo.png",
    alt: "Tuteria was featured on Internet.org by Facebook"
  },
  {
    src: "/static/img/featured-logos/bbc-logo.png",
    alt: "Tuteria was featured on BBC"
  },
  {
    src: "/static/img/featured-logos/pitch-at-palace-logo.png",
    alt: "Tuteria was featured on Pitch at Palace"
  },
  {
    src: "/static/img/featured-logos/digital-africa-logo.png",
    alt: "Tuteria was featured on Digital Africa"
  },
  {
    src: "/static/img/featured-logos/thefutureawards-logo.png",
    alt: "Tuteria was featured on The Future Awards"
  },
  {
    src: "/static/img/featured-logos/tony-elumelu-foundation-logo.png",
    alt: "Tuteria was featured on Tony Elemulu"
  },
  {
    src: "/static/img/featured-logos/microsoft-logo.png",
    alt: "Tuteria was featured on Microsoft"
  }
];

export const FeaturedLogo = ({
  numberOfCells = "3",
  display = "flex",
  alignHeading,
  logoHasShadow = true,
  headingWidth
}) => {
  return (
    <Div
      className="featured-logo-section"
      css={FeaturedLogoStyling(
        numberOfCells,
        display,
        alignHeading,
        logoHasShadow,
        headingWidth
      )}
    >
      <Heading big>
        Tuteria has received awards, support and media from these companies
      </Heading>
      <div className="logo-grid">
        {featuresLogos.map((item, index) => (
          <div key={index} className="logo-grid__item">
            <img key={index} {...item} />
          </div>
        ))}
      </div>
    </Div>
  );
};

//======= [SECTION] Testimonial Video: Why Parents Stick with Tuteria ==========

export const VideoTestimonialStyling = (fullButton, boldHeading) => `
  ${ContainerStyling}
  display:flex;
  flex-flow: row wrap;
  align-items: center;

  @media(max-width: 800px){
    display: block;
    background-color: ${color.gray.ui_01};
    padding-top: 32px;
    padding-bottom: 32px;
    text-align: center !important;
  }

  .testimonial-video{
    margin-right: ${spacing.xl};
    flex:3;
    @media(max-width: 800px){
      margin-right: 0;
    }
    
    iframe{
      width: 100% !important;
      margin: auto;
      max-height: 50vw;
    }
  }

  .testimonial-info{
    flex:2.5;
    padding-left: ${spacing.l};

    @media(max-width: 800px){
      padding-left: 0;
      padding: 24px 40px 0;
    }
    @media(max-width: 680px){
      padding: 24px 0 0 0;
    }

    h1{
      line-height 48px;
      ${ReduceHeaderOnMobile}
    }

    p{
      margin-top: ${spacing.s};
    }

    button, a{
      margin-top: ${spacing.l};
      width: ${fullButton ? `100%` : `auto`};
    }

    .quote {
      quotes: \"\\201c\" \"\\201d";
      margin-top: 0;
      &:before {
        content: open-quote;
        color: #ffab00;
        font-size: ${spacing.xxxl};
        position: relative;
        top: ${spacing.l};
      }
    }
    .client-name {
      font-weight: bold;
    }
  }
`;

export const VideoTestimonial = ({
  linkRender,
  videoLink = "https://player.vimeo.com/video/6370469",
  heading,
  paragraph,
  buttonText,
  boldHeading = true,
  hasQuote = false,
  fullButton = true
}) => {
  return (
    <Div
      className="video-testimonial"
      css={VideoTestimonialStyling(fullButton, boldHeading)}
    >
      <div className="testimonial-video">
        <iframe
          src={videoLink}
          width="560"
          height="315"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />{" "}
      </div>
      <div className="testimonial-info">
        {hasQuote ? <Text className="quote" /> : null}
        <Heading big>{heading}</Heading>
        <Text big>{paragraph}</Text>
        {linkRender(buttonText, { big: true })}
      </div>
    </Div>
  );
};

// =========== [SECTION] Get the best tutors for your kids =============

export const TutorDisplaySectionStyling = textAlign => `
  ${ContainerStyling}
  
  .heading-group{
    text-align: ${textAlign || `left`};
    margin-bottom: ${spacing.xl};
    p{
      margin-top: ${spacing.m};
    }
  }

  .tutor-grid{
    display:grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr 1fr;
    
    @media(max-width:1024px){
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width:695px){
      grid-template-columns: 1fr;
    }

   
  }
`;

export const FeaturedTutors = [
  {
    name: "Chinasa",
    title: "Math and English Tutor",
    photo_url:
      "/static/img/tutors/top-tutors/Chinasa-tuteria-math-and-english-tutor.png",
    photo_alt: "Chinasa, Math and English Tutor on Tuteria",
    client_name: "Mrs Ngozi",
    client_testimonial:
      "Chinasa is very supportive to my kids. She listens and pushed them to do more. She goes an extra mile. My kids’ results have improved in Maths.",
    no_of_booking: "96"
  },
  {
    name: "Tobi",
    title: "Common Entrance Tutor",
    photo_url:
      "/static/img/tutors/top-tutors/tobi-tuteria-common-entrance-math-tutor.png",
    photo_alt: "Tobi, Common Entrance Tutor on Tuteria",
    client_name: "Mrs Eniola",
    client_testimonial:
      "I’m grateful to have come in contact with Tobi. I stand proud to say that my son wrote 3 entrance exams and passed all. Tobi was very supportive. ",
    no_of_booking: "108"
  },
  {
    name: "Modupe",
    title: "Montessori and Nursery Tutor",
    photo_url:
      "/static/img/tutors/top-tutors/modupe-tuteria-montessori-and-nursery-tutor.png",
    photo_alt: "Chinasa, Math and English Tutor on Tuteria",
    client_name: "Mrs Adija",
    client_testimonial:
      "My son won academic awards for the first time ever! His reading has improved even above my expectations. I am beyond elated! Thank you Modupe.",
    no_of_booking: "44"
  }
];
const ReviewHeading = ({ name, verified }) => {
  return (
    <Text big>
      {name}
      {verified && (
        <span>
          <Icon name="verified" />
        </span>
      )}
    </Text>
  );
};
const ReviewSummaryStyling = styled.div`
      background: #FFFFFF;
      ${props =>
        props.border
          ? `
      box-shadow: 0 2px 7px 0 #DDDDDD;
      border-radius: 4px;
        `
          : ``}
      padding: ${spacing.l};
      display: flex;
      flex-flow: row wrap;
      width: 33%;
      float: left;

      @supports (display:grid){
        width: auto;
      }
      

      .tutor-detail{
        display: flex;
        flex-flow: row nowrap;


        &__image{
          margin-right: ${spacing.m};
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow:hidden;

          img{
            max-width:100%;
          }
        }

        &__name{
        
          > p:nth-of-type(1){
          font-weight: ${font_weight.medium};
          
          > p:nth-of-type(2){
            font-size: 14px;
          }

          span{
            margin-left: 10px;

            &:nth-of-type(2){
              top: 2px;
              position: relative;
            }
          }
        }
        }
      }

    .client-testimonial{
      margin-top: ${spacing.m};
      
      blockquote{margin: 0 0 16px 0;}
      blockquote > p{
        quotes: \"\\201c\" \"\\201d";
          margin-left: 0;
          margin-right: 0;
          &:before{
            content: open-quote;
          }
          :after{
            content: close-quote;
          }
        }

        > div{
          margin-top: ${spacing.m};
        }
      }


`;
export const ReviewSummaryContainer = ({ tutor, verified, has_border }) => {
  return (
    <ReviewSummaryStyling border={has_border} className="tutor-grid__item">
      <div className="tutor-detail">
        <div className="tutor-detail__image">
          <img src={tutor.photo_url} alt={tutor.photo_alt} />
        </div>
        <div className="tutor-detail__name">
          <ReviewHeading name={tutor.name} verified={verified} />
          <Text>{tutor.title}</Text>
          <TextWithIcon icon="five-stars">{tutor.days_ago}</TextWithIcon>
        </div>
      </div>
      <div className="client-testimonial">
        <blockquote>
          <Text>{tutor.client_testimonial}</Text>
        </blockquote>
        {tutor.client_name && tutor.no_of_booking ? (
          <Text>
            <strong>{tutor.client_name}</strong>
            <br />
            Booked {tutor.no_of_booking} lessons
          </Text>
        ) : null}
      </div>
    </ReviewSummaryStyling>
  );
};

const ReviewCardStyle = styled.div`
  background-color: ${props => props.bgColor};
  padding: 32px;
  min-height: 200px;
  .review-card {
    &__heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: row wrap;
      padding-bottom: 24px;
    }
  }
`;

export const ReviewCard = ({
  name,
  body,
  rating,
  bgColor = color.gray.ui_01
}) => {
  return (
    <ReviewCardStyle className="review-card" bgColor={bgColor}>
      <div className="review-card__heading">
        <Heading small color={color.gray.primary}>
          {name}
        </Heading>
        <RatingComponent rating={rating} />
      </div>
      <div className="review-card__body">
        <Text color={color.gray.primary}>{body}</Text>
      </div>
    </ReviewCardStyle>
  );
};

export const TutorDisplaySection = ({
  heading,
  paragraph,
  textAlign,
  tutors
}) => {
  return (
    <Div
      className="tutor-display-section"
      css={TutorDisplaySectionStyling(textAlign)}
    >
      <div className="heading-group">
        <HeadingDivider />
        <Heading big>{heading}</Heading>
        <Text big>{paragraph}</Text>
      </div>
      <div className="tutor-grid">
        {tutors.map((tutor, index) => (
          <ReviewSummaryContainer
            has_border
            verified
            key={index}
            tutor={tutor}
          />
        ))}
      </div>
    </Div>
  );
};

const ReviewSectionDiv = styled.div`
  padding: 0 16px;
  .review-section {
    &__reviews {
      padding-bottom: 80px;

      &__grid {
        margin: 0 -16px;
      }

      .tutor-grid__item {
        float: unset;
        display: unset;
      }
    }
  }
  .all-reviews__button {
    display: inline-block;
    color: ${color.blue.primary}!important;
    padding-top: 64px;
    ${font_used.big_body};
    font-weight: ${font_weight.bold};
  }
`;

export const ReviewSection = ({
  heading,
  paragraph,
  textAlign,
  reviews = []
}) => {
  const firstFourReviews = reviews.filter((review, index) => {
    if (index < 4) {
      return review;
    }
  });
  return (
    <Container css={MAXWIDTH}>
      <ReviewSectionDiv className="review-section">
        <LandingPageSectionHeading
          heading={heading}
          alignText="center"
          headingWidth="640px"
          marginTop="80px"
          marginBottom="64px"
        />
        <div className="review-section__reviews">
          <Grid numberOfCells={2} className="review-section__reviews__grid">
            {firstFourReviews.map((review, index) => (
              <div className="cell">
                <ReviewCard key={index.toString()} {...review} />
              </div>
            ))}
          </Grid>
          <ToggleModal>
            {(showModal, onOpenModal, onCloseModal) => {
              return (
                <React.Fragment>
                  <ReviewsModal isOpen={showModal}>
                    <CloseButton
                      onClick={onCloseModal}
                      className="close-button"
                    >
                      <Icon name="close" fill="#000" />
                    </CloseButton>
                    <ReviewsModalBody>
                      <Heading className="heading">{heading}</Heading>
                      <div className="reviews-list">
                        <Grid numberOfCells={3}>
                          {reviews.map((review, index) => (
                            <div className="cell">
                              <ReviewCard key={index.toString()} {...review} />
                            </div>
                          ))}
                        </Grid>
                      </div>
                    </ReviewsModalBody>
                  </ReviewsModal>
                  {reviews.length > 4 && (
                    <Link className="all-reviews__button" onClick={onOpenModal}>
                      Read all {reviews.length} reviews
                    </Link>
                  )}
                  }
                </React.Fragment>
              );
            }}
          </ToggleModal>
        </div>
      </ReviewSectionDiv>
    </Container>
  );
};

// =========== [SECTION] Over 2,860 parents trust Tuteria =============

export const CTASectionStyling = `
  ${ContainerStyling}
  .bg-container{
    background-color: ${color.gray.ui_02};
    width:100%;
    padding: 88px 24px;
    text-align:center;
    box-sizing: border-box;

    @media(max-width: 420px){
      padding: 64px 24px;
    }


    > div:nth-of-type(1){
        width: 56vw;
        margin: 0 auto;

        @media(max-width: 640px){
          width: 66vw;
        }
    }

    h1{
      line-height: 46px;
      ${ReduceHeaderOnMobile}
    }

    button, a{
      margin-top: ${spacing.l};
    }
    
    .cta-subtext{
      display: flex;
      flex-flow: row nowrap;
      margin: ${spacing.l} auto 0;
      width: 280px;
      text-align: left;
      align-items: center;

      svg{
        margin-right: ${spacing.s};
        width: 25%;
      }
    }
  }


`;

export const CTASection = ({
  linkRender,
  heading,
  paragraph,
  buttonText,
  icon = "shield-2"
}) => {
  return (
    <Div css={CTASectionStyling}>
      <div className="bg-container">
        <div>
          <Heading big>{heading}</Heading>

          {linkRender(buttonText, { big: true })}
          <div className="cta-subtext">
            <Icon name={icon} />
            <Text small>{paragraph}</Text>
          </div>
        </div>
      </div>
    </Div>
  );
};

// =========== [SECTION] Frequently Asked Question =============

export const FAQSectionStyling = (
  alignHeading,
  contactSectionDirection,
  contactSectionAlignItems,
  bgColor,
  css,
  width
) => `
  ${ContainerStyling}
  > h1{
    text-align: ${alignHeading || `left`};
    @media(max-width: 520px){
        text-align: center !important;
    }
  }
  width: ${width || `90vw`};
  margin: 0 auto;
  box-sizing: border-box;
  .faq-block{
    margin-top: ${spacing.xxxl};

    .faq-answer {
      ${font_used.regular_body};
    }
    
    &__item{
      padding-bottom: ${spacing.xl};
      margin-top: ${spacing.xl};
      border-radius: 8px;
      border-bottom: 1px solid ${color.gray.ui_02};
      
      &:last-child{
        border: none;
      }
    } 
    
    p{
      &:nth-of-type(2){
        margin-top: ${spacing.s};
      } 
    }
  }

  @media(max-width: 768px) {
    width: 95vw;
    padding: 24px 0;
  }

  .contact-us{
    padding: ${spacing.l};
    background-color: ${bgColor || color.gray.ui_02};
    display: flex;
    flex-direction: ${contactSectionDirection || `row`}
    align-items: ${contactSectionAlignItems || `center`};
    margin-top: ${spacing.xl};



    p{
      font-weight:${font_weight.medium} !important;
    }

    @media(max-width: 980px){
      display: block;
    }

    > p:nth-of-type(1){
      flex: 40%;

      @media(max-width: 980px){
        margin-bottom: ${spacing.s};
      }
    }

    > div{
      display: flex;

      @media(max-width: 420px){
        display: block;
      }

      > div:nth-of-type(1){
        margin-right: ${spacing.xxl};
      }
    }
  }
  ${css};

`;

// ===== [UTILITY COMPONENT] Text with Left Icon =====
export const TextWithIcon = ({
  icon,
  children,
  svgColor = "#000",
  iconProps = {},
  className,
  color
}) => {
  return (
    <Div
      css={`
        display: flex;
        align-items: center;
        svg {
          margin-right: ${spacing.s};
          flex: 0 0 auto;
          g {
            fill: ${svgColor}!important;
            path {
              fill: ${svgColor};
            }
          }
        }
      `}
      className={`TextWithIcon ${className}`}
    >
      <Icon name={icon} {...iconProps} />
      <Text big className="Text" color={color}>
        {children}
      </Text>
    </Div>
  );
};

const CustomLink = styled.a`
  ${props => props.css};
`;
export const LinkWithIcon = ({ icon, children, url, svgColor }) => {
  return (
    <CustomLink
      css={`
        display: flex;
        align-items: center;
        svg {
          margin-right: ${spacing.s};
          g {
            fill: ${svgColor}!important;
          }
        }
      `}
      href={url}
    >
      <Icon name={icon} />
      <Text big>{children}</Text>
    </CustomLink>
  );
};

const formatData = (data, highlighted, newString) => {
  if (data.includes(highlighted)) {
    let text = data.replace(
      highlighted,
      `<a href="https://www.tuteria.com/s/ielts-tutors/" target="_blank">${newString}</a>`
    );
    return text;
  }
  return data;
};

export const FAQSection = ({
  heading,
  FAQs,
  alignHeading,
  contactSectionDirection,
  contactSectionAlignItems,
  type = "text",
  contactInfo,
  svgColor = color.green.primary,
  css,
  bgColor,
  width,
  highlighted,
  newString
}) => {
  const ContactItem = type === "link" ? LinkWithIcon : TextWithIcon;
  return (
    <Div
      css={FAQSectionStyling(
        alignHeading,
        contactSectionDirection,
        contactSectionAlignItems,
        bgColor,
        css,
        width
      )}
      className="faq-section"
    >
      <Heading big>{heading}</Heading>
      <div className="faq-block">
        {FAQs.map((faq, index) => (
          <div key={index} className="faq-block__item">
            <Text big>
              <strong>{faq.question}</strong>
            </Text>
            <p
              className="faq-answer"
              dangerouslySetInnerHTML={{
                __html: formatData(faq.answer, highlighted, newString)
              }}
            />
            {/* <Text>{formatData(faq.answer, 'https://www.tuteria.com/s/ielts-tutors/')}</Text> */}
          </div>
        ))}
      </div>
      <div className="contact-us">
        <Text big>
          <strong>Have questions or inquiries? Contact us now</strong>
        </Text>
        <div className="contact-info">
          {contactInfo.map((item, index) => (
            <ContactItem key={index.toString()} svgColor={svgColor} {...item} />
          ))}
          {/* <TextWithIcon icon="clp-email" svgColor={svgColor}>
            info@tuteria.com
          </TextWithIcon>
          <TextWithIcon icon="clp-phone" svgColor={svgColor}>
            0909-452-6878
          </TextWithIcon> */}
        </div>
      </div>
    </Div>
  );
};

// =========== [SECTION] Bottom Hero Section =============

export const BottomHeroStyling = `
  margin-top:${spacing.xxl};
  height: 80vh;
  display: flex;
  align-items: center;
  background-color: #484848;
  background-image: url('/static/img/tuteria-girl-child-happy-smiling.jpg');
  background-repeat: no-repeat;
  background-position: 90% center;
  background-size: 115%;
  color: white;
  padding: 40px;
  box-shadow:inset 0 0 0 2000px rgba(0,0,0,0.3);

  @media(max-width: 1000px){
    background-position: center;
    background-size: cover;
  }

  @media(max-width: 520px){
    background-position-y: -50px;
    background-size: 150%;
  }

  > div{
    flex: 40vw;
    margin-left: 50vw;

    @media(max-width: 520px){
      background-position-y: -60px;
      background-size: 150%;
      margin-left: 0;
      margin-top: 60vw;
    }

    h1:nth-of-type(2){
      font-weight: ${font_weight.regular} !important;
      margin-top: ${spacing.xs};
      margin-bottom: ${spacing.m};
    }

    button {
      margin-top: 24px;
    }
  }

`;

export const BottomHero = ({ linkRender }) => {
  return (
    <Div css={BottomHeroStyling}>
      <div>
        <Heading big>Boost your child’s results</Heading>
        <Heading small>Hire the very best tutor for your child</Heading>
        {linkRender(`Get a home tutor`, { big: true })}
      </div>
    </Div>
  );
};

export const FooterStyling = `
${ContainerStyling}
display:flex;
justify-content:space-between;
align-items:center;
margin-top: 0;
margin-bottom: 0;
@media (max-width: 500px) {
  flex-direction: column;
}

div:last-of-type {
  display:flex;

  a {
    color: inherit;
  }

  p:first-of-type {
    &:after {
      content: "|";
      padding: 0 ${spacing.l};
    }
  }
}
`;

export const FooterSection = () => {
  return (
    <Div css={FooterStyling}>
      <div>
        <Text>&copy; Tuteria Limited</Text>
      </div>
      <div>
        <Text>
          <a href="https://tuteria.com/terms/" target="_blank">
            Terms of service
          </a>
        </Text>
        <Text>
          <a href="https://tuteria.com/policies/" target="_blank">
            Privacy Policy
          </a>
        </Text>
      </div>
    </Div>
  );
};

export const HowToData = {
  heading: "How to get a home tutor",
  data: [
    {
      heading: "Place a request",
      paragraph:
        "Click here to fill a tutor request form and tell us your child’s needs, as well as the subjects they need help with. <br /><br />Also select a lesson schedule that matches your budget and desired learning goals.",
      image:
        "/static/img/how-to/client-request/mother-booking-lessons-on-tuteria-laptop.jpg"
    },
    {
      heading: "Get the most qualified tutors",
      paragraph:
        "We’ll send you options of tutors near you who are most qualified for your request and have produced good results with kids like yours. <br /><br />Once you select your most preferred tutor, you can begin lessons.",
      image:
        "/static/img/how-to/client-request/tuteria-tutor-teaching-child.jpg"
    },
    {
      heading: "Watch your kids improve!",
      paragraph:
        "We don’t stop at getting you tutors, we closely monitor and manage the lessons to ensure your child is making progress. <br /><br />Watch your child improve in their subjects, pass exams and rise above their peers.",
      image:
        "/static/img/how-to/client-request/child-happy-smiling-results-improved.jpg"
    }
  ]
};

const BigTestimonialBlockStyle = (align, width) => `
text-align: ${align || `center`};
max-width: ${width || `90vw`};
@media(max-width: 520px) {
  max-width: 90vw;
}
margin: 0 auto;
& > h1 {
  padding-bottom: ${spacing.xl};
  font-weight: normal;
}
.quote-container {
  width: ${spacing.xxl};
  height: ${spacing.xxl};
  background-color: ${color.blue.primary};
  color: ${color.white};
  display: inline-block;
  border-radius: 50%;
  text-align:center;
  margin-top:${spacing.m};
  margin-bottom: ${spacing.xl};
  .quote {
    quotes: \"\\201c\" \"\\201d";
    margin-top: 0;
    &:before {
      content: open-quote;
      font-size: ${spacing.xxxl};
      position: relative;
      top: ${spacing.l};
    }
  }
}

.client-info {
  p:first-of-type {
    font-weight: bold;
  }
  ${font_used.big_body};
}

.highlight {
  background-color: ${color.blue.primary};
  color: white;
  padding: 0 5px;
}
.testimonial-text {
  line-height: 62px;
}
`;

export const BigTestimonialBlock = ({
  children,
  align,
  width,
  hasRatings,
  name,
  location,
  className,
  testimonial
}) => {
  return (
    <Div className={className} css={BigTestimonialBlockStyle(align, width)}>
      <Div className="quote-container">
        <Text className="quote" />
      </Div>
      <Heading
        hero
        className="testimonial-text"
        dangerouslySetInnerHTML={{ __html: testimonial }}
      />
      <Div className="client-info">
        <Text big>{name}</Text>
        <Text big>{location}</Text>
      </Div>
      {hasRatings ? <Icon name="five-stars" /> : null}
    </Div>
  );
};

const ResultsSectionStyling = (alignHeading, numberOfCells, border = true) => `
${ContainerStyling};
  > h1, p{
    text-align: ${alignHeading || `center`};
    padding-bottom: ${spacing.s};
    @media(max-width: 520px){
        text-align: center !important;
    }
  }

  .results-subheading {
    ${font_used.big_body};
  }

  .results-group {
      margin-top: ${spacing.xxl};
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      @media(max-width: 633px) {
        display: block;
      }
  }

  .results-group__item{

      background-color: white;
      ${
        border
          ? `
      box-shadow: 0 2px 7px 0 #DDDDDD;
      border-radius: 8px;
        `
          : ``
      }
      padding: ${spacing.l};
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;    
      margin: 0 48px 40px; 

      @media(max-width: 1003px) {
        margin: 0 24px 40px;
      } 

      @media(max-width: 859px) {
        margin: 0 16px 40px;
      }

      @media(max-width: 680px) {
        margin: 0 12px 40px;
      }

      .text-group {
        margin-top: 0!important;
      }

      // @media(max-width: 1028px){
      //     display: block;
      // }

      // @media(max-width: 800px){
      //     flex: 33.333%;
      // }

      // @media(max-width: 520px){
      //     flex: 100%;
      //     text-align: center;
      // }

      h1{
          font-size: 56px;
          line-height: 56px;
          color: ${color.blue.primary};
      }

      p{
          ${font_used.big_body};
          margin-top: 4px !important;
      }
  }
`;

export const ResultsSection = ({
  heading,
  subheading,
  results,
  alignHeading,
  numberOfCells,
  border = true
}) => {
  return (
    <Div
      css={ResultsSectionStyling(
        alignHeading,
        numberOfCells,
        (border = border)
      )}
    >
      <Heading hero className="results-heading">
        {heading}
      </Heading>
      <Text className="results-subheading">{subheading}</Text>
      <div className="results-group">
        {results.map((item, index) => (
          <FeatureBlock key={index} {...item} className="results-group__item" />
        ))}
      </div>
    </Div>
  );
};

const BenefitsSectionStyling = (alignHeading, numberOfCells, alignContent) => `
${ContainerStyling};
  > h1, p{
    text-align: ${alignHeading || `center`};
    padding-bottom: ${spacing.s};
    @media(max-width: 520px){
        text-align: center !important;
    }
  }

  .benefits-group {
      margin-top: ${spacing.xxl};
      display: flex;
      flex-wrap: wrap;
      margin: ${spacing.xxl} -16px 0;
  }

  .benefits-group__item{
      background-color: white;
      border-radius: 8px;
      padding: ${spacing.l};
      flex: ${100 / (numberOfCells + 1)}%;
      margin: 16px 45px;
      text-align:${alignContent || `center`};
      display:flex;
      flex-direction:column;

      .text-group {
        margin-top: 0!important;
      }

      @media(max-width: 1058px) {
        margin: 16px 32px;
      }

      @media(max-width: 1028px){
        display: block;
        margin: 16px;
      }

      @media(max-width: 800px){
        margin: 16px 8px;
        flex: 33.333%;
      }

      @media(max-width: 768px){
        flex: 100%;
        text-align: center;
      }

      .feature-image {
        width: 100%;

        img {
          width: 100%;
        }
      }

      h1{
        padding-top: ${spacing.xl};
      }

      p{
          ${font_used.regular_body};
          margin-top: 4px !important;
          text-align: ${alignContent || `center`};
          @media(max-width: 768px) {
            text-align: center;
          }
      }
      a {
        border: 0;
        padding-left: 0;
        background: ${color.white};
        color: ${color.blue.primary}
      }
  }
`;

export const BenefitsSection = ({
  linkRender,
  alignHeading,
  alignContent,
  numberOfCells,
  heading,
  subheading,
  benefits,
  buttonText,
  hasDivider
}) => {
  return (
    <Div
      className="benefits-section"
      css={BenefitsSectionStyling(alignHeading, numberOfCells, alignContent)}
    >
      {hasDivider ? <HeadingDivider /> : null}
      <Heading hero>{heading}</Heading>
      <Heading small className="benefits-subheading">
        {subheading}
      </Heading>
      <div className="benefits-group">
        {benefits.map((benefit, index) => (
          <FeatureBlock
            key={index}
            {...benefit}
            linkRender={linkRender(buttonText, { big: true })}
            className="benefits-group__item"
          />
        ))}
      </div>
    </Div>
  );
};

const HeadingDivider = styled.hr`
  border: ${props => props.thickness || `4px`} solid;
  border-bottom: 0;
  width: ${props => props.width || `80px`};
  margin-bottom: 40px;
  margin-top: 40px;
`;

const TutorSectionStyling = styled.div`
  .tutor-profile {
    padding: 80px 16px 0 16px;
  }
`;

export const IELTSTutorSection = ({ tutors, name }) => {
  let isPlural = tutors.length > 1;
  return (
    <React.Fragment>
      <Container css={MAXWIDTH}>
        <TutorSectionStyling>
          <LandingPageSectionHeading
            heading={`Meet your ${isPlural ? "Tutors" : "Tutor"}`}
            marginTop="80px"
          />
          <TutorProfileSection tutors={tutors} />
        </TutorSectionStyling>
      </Container>
    </React.Fragment>
  );
};
const TwoColumnHeroStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 100px 24px;
  &.with-bgImage {
    background-size: cover;
    background-image: url('${props => props.image}');
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.4);
  }
  .lesson-info__section {
    h1 {
      &:first-of-type {
        font-size: 16px;
        text-transform: uppercase;
      }
      &:last-of-type {
        padding: 16px 0;
      }
    }
    p {
      padding-bottom: 32px;
    }
    button {
      width: 190px;
      @media(max-width: 480px) {
        width: 100%;
      }
    }
  }
  .icon-group {
    padding-top: 32px;

    .class-location {
      padding-bottom: 16px;
    }
  }

  .f-item:first-child {
    max-width: 480px;
    margin-right: 88px;
  }
  .f-item:last-child {
    max-width: 624px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
    padding: 56px 32px 64px;

    .f-item:first-child {
      margin-right: 0;
    }

    .f-item:last-child {
      display: none;
    }
  }
  #class-start__date {
    display: inline-flex;
    align-items: center;
    flex-flow: wrap;

    .lozenge {
      margin-left: 8px;
    }

    .TextWithIcon {
      span {
        font-weight: ${font_weight.bold};
      }
    }
  }
`;
export class TwoColumnHero extends React.Component {
  state = {
    days: 4
  };
  render() {
    let { data, onClick, date, remainingSlot } = this.props;
    return (
      <React.Fragment>
        <Container
          css={`
            max-width: 1200px;
          `}
        >
          <Media query="(min-width: 480px ) and (max-width: 960px)">
            {matches => (
              <TwoColumnHeroStyled
                className={matches && `with-bgImage`}
                image={data.image}
              >
                <div className="f-item">
                  <div className="lesson-info__section">
                    <Heading
                      small
                      color={matches ? color.white : color.gray.primary}
                    >
                      {data.exam} Group Lesson
                    </Heading>
                    <Heading
                      hero
                      color={matches ? color.white : color.gray.primary}
                    >
                      {data.body.heading_main}
                    </Heading>
                    <Text
                      big
                      color={matches ? color.white : color.gray.primary}
                    >
                      {data.body.heading_main_subtext}
                    </Text>
                    <PrimaryButton big onClick={onClick}>
                      {data.body.heading_button_text}
                    </PrimaryButton>
                  </div>
                  <div className="icon-group">
                    <TextWithIcon
                      icon="pin"
                      iconProps={{
                        width: "16",
                        height: "16",
                        color: matches ? color.white : color.gray.primary
                      }}
                      className="class-location"
                      color={matches ? color.white : color.gray.primary}
                    >
                      {data.location}
                    </TextWithIcon>
                    <div id="class-start__date">
                      <TextWithIcon
                        icon="ticket"
                        iconProps={{
                          width: "16",
                          height: "16",
                          color: matches ? color.white : color.gray.primary
                        }}
                        color={matches ? color.white : color.gray.primary}
                      >
                        Starts in <span>{getTimeToGo(new Date(date))}</span>
                      </TextWithIcon>
                      {remainingSlot && (
                        <Lozenge
                          bgColor={getLozengeBgColor(remainingSlot)}
                          color={color.white}
                        >
                          {remainingSlot > 0
                            ? `${remainingSlot} slot${
                                remainingSlot > 1 ? "s" : ""
                              } left`
                            : `Class is full`}
                        </Lozenge>
                      )}
                    </div>
                  </div>
                </div>
                {!matches && (
                  <div className="f-item">
                    <img src={data.image} />
                  </div>
                )}
              </TwoColumnHeroStyled>
            )}
          </Media>
        </Container>
      </React.Fragment>
    );
  }
}

const AuxiliaryStyling = styled.div`
  .results-heading {
    padding-top: 16px;
    color: ${color.gray.primary};
  }
  .results-subheading {
    color: ${color.gray.primary};
  }
  .results-group {
    margin-top: 64px;

    .text-group {
      p {
        color: ${color.gray.primary};
      }
    }
  }
`;
export const AuxiliarySection = ({ data }) => {
  return (
    <React.Fragment>
      <Container css={MAXWIDTH}>
        <AuxiliaryStyling>
          <ResultsSection
            {...{
              numberOfCells: 3,
              heading: data.heading_aux,
              subheading: data.heading_aux_subtext,
              results: data.heading_aux_summary.map(x => {
                if (typeof x.text === "number") {
                  return {
                    heading: `${x.text.toString()}.0`,
                    paragraph: x.value
                  };
                }
                return {
                  heading: x.text,
                  paragraph: x.value
                };
              }),
              border: false
            }}
          />
        </AuxiliaryStyling>
      </Container>
    </React.Fragment>
  );
};
const CurriculumSectionStyling = () => `
  padding: 0 16px;
  .curriculum-section {
    padding: 80px 0;

    .curriculum-card {
      margin-bottom: 32px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;
export const CurriculumSection = ({ heading, subheading, courseOutlines }) => {
  return (
    <Container css={MAXWIDTH}>
      <Div className="benefits-section" css={CurriculumSectionStyling()}>
        <LandingPageSectionHeading
          heading={heading}
          subheading={subheading}
          alignText="center"
          marginTop="80px"
          subheadingWidth="620px"
        />
        <div className="curriculum-section">
          {courseOutlines.map((outline, i) => (
            <CurriculumCard key={i.toString()} {...outline} />
          ))}
        </div>
      </Div>
    </Container>
  );
};

const CurriculumCardDiv = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.14);
  .curriculum__summary {
    background-color: ${color.blue.primary};
    padding: 48px;
    flex: 0 0 300px;

    & > p {
      color: ${color.orange.lighter};
      text-transform: uppercase;
      text-align: left;
    }
    h1 {
      &:first-of-type {
        color: ${color.orange.lighter};
        font-size: 48px;
      }
      &:last-of-type {
        ${font_used.regular_heading};
        color: ${color.white};
        padding: 32px 0;
      }
    }
    .fancy-shape {
      max-width: 240px;
      height: 24px;
      position: relative;
      padding: 8px 16px;
      background: ${color.white};
      border-radius: 4px;
      &:before {
        content: "";
        position: absolute;
        right: -18px;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: 20px solid ${color.white};
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
      }
      p {
        text-align: center;
        @media (max-width: 992px) {
          font-size: 14px;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
      @media (max-width: 992px) {
        max-width: 200px;
      }
      @media (max-width: 768px) {
        max-width: 240px;
      }
    }
    @media (max-width: 992px) {
      padding: 48px 24px;
    }
    @media (max-width: 768px) {
      flex: 1 1 auto;
      padding: 48px;
    }
    @media (max-width: 480px) {
      padding: 48px 32px;
    }
  }
  .curriculum__outlines {
    background-color: ${color.white};
    padding: 64px;

    @media (max-width: 992px) {
      padding: 64px 24px;
    }
    @media (max-width: 768px) {
      flex: 1 1 auto;
      padding: 48px;
    }
    @media (max-width: 480px) {
      padding: 48px 32px;
    }

    .TextWithIcon {
      margin-bottom: 24px;
      align-items: unset;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .highlighted {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .curriculum__summary {
      .fancy-shape {
        &:before {
          content: "";
          position: absolute;
          right: 45%;
          top: 70%;
          height: 0;
          border-left: 20px solid #ffffff;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          transform: rotate(90deg);
        }
      }
    }
  }
`;

// data.replace(highlighted, <span>{highlighted}</span>)

export const CurriculumCard = ({ id, outlines, summary, color }) => {
  return (
    <CurriculumCardDiv className="curriculum-card">
      <div className="curriculum__summary">
        <Text>module</Text>
        <Heading>{`0${id.toString()}`}</Heading>
        <Heading>{summary}</Heading>
        <div className="fancy-shape">
          <Text>In this module you'll learn:</Text>
        </div>
      </div>
      <div className="curriculum__outlines">
        {outlines.map(({ data, highlighted }, i) => {
          let text = data.replace(
            highlighted,
            `<span class="highlighted">${highlighted}</span>`
          );
          return (
            <TextWithIcon
              icon="check-circle-outline"
              key={i.toString()}
              iconProps={{ width: 28, height: 28 }}
            >
              <p dangerouslySetInnerHTML={{ __html: text }} style={{ color }} />
            </TextWithIcon>
          );
        })}
      </div>
    </CurriculumCardDiv>
  );
};

CurriculumCard.defaultProps = {
  color: color.gray.primary
};

const TutorImageCardDiv = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 8px;
  box-shadow: ${box_shadow};
  .blue-div {
    background-color: ${color.blue.primary};
    height: 114px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .white-div {
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .tutor-credentials {
    position: relative;
    bottom: 88px;
  }
`;

const AvatarImageOverRideCss = `
  margin-right: 0;

  .Text {
    font-weight: bold;
  }
`;

export const TutorImageCard = ({ name, image, rating }) => (
  <TutorImageCardDiv image={image}>
    <div className="blue-div" />
    <div className="white-div">
      <div className="tutor-credentials">
        <AvatarImage
          overRideCss={AvatarImageOverRideCss}
          text={name}
          image={image}
          avatarWidth="145px"
          avatarHeight="145px"
        />
      </div>
    </div>
  </TutorImageCardDiv>
);

const TutorProfileDiv = styled.div`
  display: flex;
  /* flex-flow: row wrap; */
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .tutor-profile {
    &__card {
      min-width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .client-avatar {
        margin-bottom: 12px;
      }

      @media (max-width: 879px) {
        margin: 0 auto;
      }
    }
    &__bio {
      max-width: 640px;
      margin: 0 auto;
      color: ${color.gray.primary};

      h1 {
        padding-bottom: 16px;
      }

      @media (max-width: 600px) {
        max-width: 100%;
        margin: 32px 0;
        text-align: center;
      }
    }
    &__accolades {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-flow: column wrap;
      margin-top: 16px;

      .TextWithIcon {
        margin-bottom: 8px;
        color: ${color.gray.darker};
      }
    }
  }
`;

const TutorProfileComponent = ({
  firstName,
  lastName,
  profilePic,
  rating,
  summary: { data },
  accolades
}) => {
  return (
    <TutorProfileDiv className="tutor-profile">
      <div className="tutor-profile__card">
        <AvatarImage
          image={profilePic}
          avatarWidth="100px"
          avatarHeight="100px"
        />
        <div className="tutor-profile__accolades">
          <TextWithIcon
            iconProps={{ width: "16px", height: "16px" }}
            icon="award"
          >
            {accolades[0].text}
          </TextWithIcon>
          <TextWithIcon
            iconProps={{ width: "16px", height: "16px" }}
            icon="fancy-check"
          >
            {accolades[1].text}
          </TextWithIcon>
          <TextWithIcon
            iconProps={{ width: "18px", height: "18px" }}
            svgColor={color.blue.primary}
            icon="time"
          >
            {accolades[2].text}
          </TextWithIcon>
        </div>
      </div>
      <div className="tutor-profile__bio">
        <Heading color={color.gray.darker}>Hi, I'm {firstName} </Heading>
        <Heading small color={color.blue.primary}>
          Top-Rated Expert IELTS Tutor
        </Heading>
        <Text>{data}</Text>
      </div>
    </TutorProfileDiv>
  );
};

export const TutorProfileSection = ({ tutors }) => {
  return tutors.map((tutor, i) => (
    <TutorProfileComponent key={i.toString()} {...tutor} />
  ));
};

const PricingComponentDiv = styled.div`
  position: relative;
  /* width: 100%; */
  background-color: ${color.white};
  box-shadow: ${box_shadow};
  padding: 40px 32px;
  margin-bottom: 16px;

  .Plan-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &__icon {
      padding-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 599px) and (max-width: 799px) {
        flex-direction: row;

        h1 {
          padding-left: 8px;
        }
      }
    }
    &__name {
      padding-bottom: 16px;

      h1 {
        padding-bottom: 8px;
      }

      p {
        color: ${color.gray.primary};
        max-width: 96%;
        margin: 0 auto;
      }
    }
    &__amount {
      padding-bottom: 16px;

      h1 {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 599px) and (max-width: 799px) {
          justify-content: flex-start;
        }

        span {
          font-size: 12px;
          padding-right: 4px;
        }
      }
    }
    &__highlights {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-bottom: 32px;

      @media (min-width: 599px) and (max-width: 799px) {
        max-width: 300px;
        flex: 1;
        padding-right: 16px;
        padding-bottom: 0;
      }
      .TextWithIcon {
        padding-bottom: 16px;
        text-align: left;
        align-items: unset;
        &:last-of-type {
          padding-bottom: 0;
        }
        .Text {
          color: ${color.gray.primary};
          ${font_used.regular_body};
        }
      }
    }
    &__action-button {
      @media (max-width: 480px) {
        width: 100%;
      }
    }
    &__group {
      @media (min-width: 599px) and (max-width: 799px) {
        max-width: 200px;
        padding-right: 16px;
      }
    }
    @media (min-width: 599px) and (max-width: 799px) {
      flex-direction: row;
      text-align: left;
      /* justify-content: space-between; */
    }
  }
`;

export const PricingComponent = ({
  type,
  amount,
  description,
  highlights,
  icon,
  button_text,
  className,
  onClick,
  color
}) => (
  <PricingComponentDiv className={className}>
    <div className="Plan-info">
      <div className="Plan-info__group">
        <div className="Plan-info__icon">
          <Icon name={icon} />
          <Heading small color={color}>
            {type}
          </Heading>
        </div>
        <div className="Plan-info__name">
          <Text color={color}>{description}</Text>
        </div>
        <div className="Plan-info__amount">
          <Heading big color={color}>
            <span>&#8358;</span>
            {numberWithCommas(amount)}
          </Heading>
        </div>
      </div>
      <div className="Plan-info__highlights">
        <div>
          {highlights.map((highlight, i) => (
            <TextWithIcon icon="check-mark" key={i.toString()} color={color}>
              {highlight}
            </TextWithIcon>
          ))}
        </div>
      </div>
      <div className="Plan-info__action-button">
        <PrimaryButton onClick={onClick}>{button_text}</PrimaryButton>
      </div>
    </div>
  </PricingComponentDiv>
);

PricingComponent.defaultProps = {
  color: color.gray.primary
};

const PricingSectionDiv = styled.div`
  .plans-section {
    padding-bottom: 80px;
    &__grid {
      flex-wrap: unset;

      @media (min-width: 599px) and (max-width: 799px) {
        flex-direction: column;
        .cell {
          width: auto;
        }
      }
      @media (max-width: 599px) {
        flex-wrap: wrap;
        .cell {
          margin-bottom: 16px !important;
        }
      }
    }
  }
`;

class SSR extends React.Component {
  state = {
    isSSr: true
  };
  componentDidMount() {
    if (typeof document !== "undefined") {
      this.setState({ isSSr: false });
    }
  }
  render() {
    return this.props.children(this.state.isSSr);
  }
}
export const PricingSection = ({
  heading,
  subheading,
  plans,
  innerRef,
  onClassSelected
}) => {
  let isServer = () => {
    return typeof document !== "undefined";
  };
  const plansWithButtonText = plans
    .map(plan => ({
      ...plan,
      button_text: "Join a Class"
      // schedule: schedules
    }))
    .map((plan, i) => {
      if (plan.type === "Quick Prep") {
        return { ...plan, icon: "fast" };
      }
      if (plan.type === "Extended") {
        return { ...plan, icon: "orange-arrows" };
      }
      if (plan.type === "Weekend") {
        return { ...plan, icon: "send" };
      }
      if (plan.type === "Standard") {
        return { ...plan, icon: "briefcase" };
      }
    });
  return (
    <div ref={innerRef}>
      <Container
        css={`
          max-width: 800px;
        `}
      >
        <PricingSectionDiv>
          <LandingPageSectionHeading
            heading={heading}
            subheading={subheading}
            marginBottom="80px"
            marginTop="80px"
          />
          <div className="plans-section">
            <Grid
              numberOfCells={plansWithButtonText.length}
              className="plans-section__grid"
            >
              {plansWithButtonText.map((plan, i) => (
                <ToggleModal>
                  {(showModal, onOpenModal, onCloseModal) => {
                    return (
                      <React.Fragment>
                        <SSR>
                          {isSSr => {
                            return isSSr ? null : (
                              <PricingModal isOpen={showModal}>
                                <CloseButton
                                  onClick={onCloseModal}
                                  className="close-button"
                                >
                                  <Icon name="close" fill="#000" />
                                </CloseButton>
                                <PricingModalBody>
                                  <Heading className="heading">
                                    {heading}
                                  </Heading>
                                  <div className="schedule-list">
                                    {getLatestDates(plan.schedule).map(
                                      (schedule, i) => (
                                        <ScheduleCard
                                          key={i.toString()}
                                          onClick={onClassSelected}
                                          plan={plan}
                                          {...schedule}
                                        />
                                      )
                                    )}
                                  </div>
                                </PricingModalBody>
                              </PricingModal>
                            );
                          }}
                        </SSR>
                        <div className="cell">
                          <PricingComponent
                            key={i.toString()}
                            onClick={onOpenModal}
                            {...plan}
                          />
                        </div>
                      </React.Fragment>
                    );
                  }}
                </ToggleModal>
              ))}
            </Grid>
          </div>
        </PricingSectionDiv>
      </Container>
    </div>
  );
};

const RefundSectionDiv = styled.div`
  background-color: ${color.gray.ui_02};
  padding: 72px 24px;
  margin: 0 16px;
  .refund-section {
    &__container {
      display: flex;
      align-items: center;
      max-width: 750px;
      margin: 0 auto;
      @media (max-width: 563px) {
        display: block;
        text-align: center;
      }

      &__left {
        padding-right: 48px;
        @media (max-width: 563px) {
          padding-right: 0;
          padding-bottom: 16px;
        }
      }
      &__right {
        p {
          padding: 16px 0;
        }
      }
    }
  }
`;

export const RefundSection = ({
  heading,
  subheading,
  button_text,
  icon = "refund-icon",
  onClick,
  color
}) => (
  <Container css={MAXWIDTH}>
    <RefundSectionDiv className="refund-section">
      <div className="refund-section__container">
        <div className="refund-section__container__left">
          <Icon name={icon} />
        </div>
        <div className="refund-section__container__right">
          <Heading big color={color}>
            {heading}
          </Heading>
          <Text color={color}>{subheading}</Text>
          <PrimaryButton onClick={onClick}>{button_text}</PrimaryButton>
        </div>
      </div>
    </RefundSectionDiv>
  </Container>
);

RefundSection.defaultProps = {
  color: color.gray.primary
};

const ThingsToNoteSectionDiv = styled.div`
  padding: 0 16px;
  .things-to-note {
    padding-bottom: 80px;

    .media-object__body {
      p {
        max-width: 400px;
      }
    }

    .cell {
      margin-bottom: 64px !important;
    }

    @media (max-width: 599px) {
      .cell {
        margin: 0 !important;
        margin-bottom: 16px !important;
      }
    }
  }
`;

export const ThingsToNoteSection = ({ heading, items }) => (
  <ThingsToNoteSectionDiv>
    <Container css={MAXWIDTH}>
      <LandingPageSectionHeading
        heading={heading}
        marginBottom="80px"
        marginTop="60px"
      />
      <div className="things-to-note">
        <Grid numberOfCells={2}>
          {items.map(({ heading, body }, i) => (
            <div className="cell" key={i.toString()}>
              <MediaObject
                number={i + 1}
                heading={heading}
                body={body}
                color={color.gray.primary}
              />
            </div>
          ))}
        </Grid>
      </div>
    </Container>
  </ThingsToNoteSectionDiv>
);

const ImageCardStyle = styled.a`
  display: block;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  will-change: box-shadow;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  }
  &:visited {
    color: unset;
  }
  border: 1px solid ${color.gray.ui_03};
  border-radius: 8px;
  padding: 24px;
  .image-card {
    &__children {
      padding-top: 24px;
    }
    &__image {
      width: inherit;
      img {
        width: 100%;
      }
    }
  }
`;

const ImageCard = ({ image, children, href }) => (
  <ImageCardStyle className="image-card" image={image} href={href}>
    <div className="image-card__image">
      <img src={image} alt="image" />
    </div>
    <div className="image-card__children">{children}</div>
  </ImageCardStyle>
);

const UpsellCardStyle = styled.div`
  .tutor-info {
    display: flex;
    &__avatar {
      position: relative;
      width: 44px;
      height: 44px;
      background-color: #484848;
      ${props =>
        `background-image: url('${props.image}');`} background-position: center;
      background-size: cover;
      border-radius: 50%;
      margin-bottom: ${spacing.s};

      svg {
        position: absolute;
        top: 24px;
        right: -8px;
      }
    }
    &__name {
      padding-left: 24px;

      p:last-of-type {
        font-weight: bold;

        path {
          fill: ${color.orange.lighter};
        }
      }
    }
  }
  .lesson-location {
    .Text {
      ${font_used.small_body};
      font-weight: bold;
    }
  }
  .lesson-name {
    padding-top: 8px;
    padding-bottom: 16px;
  }
`;

const UpsellCard = ({
  image,
  location,
  firstName,
  profilePic,
  lastName,
  ratingScore,
  title,
  url
}) => (
  <UpsellCardStyle image={profilePic}>
    <ImageCard image={image} href={url}>
      <div className="lesson-location">
        <TextWithIcon icon="map-marker" color={color.gray.primary}>
          {`${location}`.toUpperCase()}
        </TextWithIcon>
      </div>
      <div className="lesson-name">
        <Heading small color={color.gray.primary}>
          {title}
        </Heading>
      </div>
      <div className="tutor-info">
        <div className="tutor-info__avatar">
          <Icon name="fancy-check" />
        </div>
        <div className="tutor-info__name">
          <Text>{firstName}</Text>
          <Text>
            {ratingScore} <i className="fa fa-star" />
          </Text>
        </div>
      </div>
    </ImageCard>
  </UpsellCardStyle>
);

const UpSellingSectionDiv = styled.div`
  padding: 80px 16px;

  .upselling-section {
    &__grid {
      margin: 0 -16px;
    }
  }
  .upselling-section__classes {
    max-width: 400px;
  }

  @media (max-width: 960px) {
    display: block;
  }
`;

export const UpSellingSection = ({ heading, lessons }) => {
  return (
    <Container css={MAXWIDTH}>
      <UpSellingSectionDiv className="upselling-section">
        <LandingPageSectionHeading
          heading={heading}
          alignText="center"
          marginBottom="64px"
        />
        <div className="upselling-section__classes">
          {/* <Grid
            numberOfCells={data.length}
            className="upselling-section__grid"
          >
            {data.map((lesson, i) => (
              <div className="cell">
                <UpsellCard key={i.toString()} {...lesson} />
              </div>
            ))}
          </Grid> */}

          {lessons.map((lesson, i) => (
            <UpsellCard key={i.toString()} {...lesson} />
          ))}
        </div>
      </UpSellingSectionDiv>
    </Container>
  );
};

const RatingComponentStyle = styled.div`
  .rate {
    path {
      fill: ${color.orange.lighter};
    }
  }
`;

const RatingComponent = ({ rating }) => {
  const array = Array.from(Array(Math.round(rating)), (x, i) => i + 1);
  return (
    <RatingComponentStyle>
      <span className="rate">
        {array.map((value, index) => (
          <i className="fa fa-star" key={index.toString()} />
        ))}
      </span>
    </RatingComponentStyle>
  );
};

const PricingModal = styled(Modal)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 !important;
  border-radius: 0;
  padding-top: 32px;
  padding-bottom: 64px;
  border: none;
  background-color: ${color.gray.ui_01};
  .close-button {
    outline: none;
  }
`;

const PricingModalBody = styled(ModalBody)`
  overflow: auto;
  height: 100vh;
  .heading {
    text-align: center;
  }
  .schedule-list {
    padding-top: 40px;
    padding-bottom: 64px;
    max-width: 500px;
    margin: 0 auto;

    .schedule-card {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const ReviewsModal = styled(Modal)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 !important;
  border-radius: 0;
  padding-top: 32px;
  padding-bottom: 64px;
  border: none;
  .close-button {
    outline: none;
  }
`;

const ReviewsModalBody = styled(ModalBody)`
  overflow: auto;
  height: 100vh;
  .heading {
    text-align: center;
  }
  .reviews-list {
    padding-top: 40px;
    padding-bottom: 64px;
  }
`;

const LozengeStyle = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  display: ${props => (props.inline ? `inline-block` : `block`)};
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  padding: 2px 8px 3px;
`;

const Lozenge = ({ children, bgColor, color, inline = true }) => (
  <LozengeStyle
    bgColor={bgColor}
    color={color}
    inline={true}
    className="lozenge"
  >
    {children}
  </LozengeStyle>
);

const ScheduleCardStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.white};
  border-radius: 8px;
  border: 1px solid ${color.gray.ui_02};
  padding: 24px 32px;

  .schedule-card {
    &__left {
      p {
        &:first-of-type {
          font-weight: bold;
        }
      }
      .lozenge {
        margin: 8px 0;
      }
    }
    @media (max-width: 434px) {
      &__left {
        text-align: center;
        width: 100%;
      }
      &__right {
        width: 100%;
      }
    }
  }
`;

const ScheduleCard = ({
  endDate,
  startDate,
  onClick,
  button_text = "Choose",
  slots = 0,
  maxSlotCount = 15,
  duration,
  summary,
  plan
}) => {
  let remainingSlot = maxSlotCount - slots;
  return (
    <ScheduleCardStyle className="schedule-card">
      <div className="schedule-card__left">
        <Text>{duration}</Text>
        <Text>{`${getLocaleDateString(startDate)} - ${getLocaleDateString(
          endDate
        )}`}</Text>
        {remainingSlot > 0 && (
          <Lozenge
            bgColor={getLozengeBgColor(remainingSlot)}
            color={color.white}
          >
            {remainingSlot > 0
              ? `${remainingSlot} slot${remainingSlot > 1 ? "s" : ""} left`
              : `Class is full`}
          </Lozenge>
        )}
      </div>
      <div className="schedule-card__right">
        <PrimaryButton
          onClick={() =>
            onClick({
              lessonPlan: plan,
              schedule: { slots, startDate, endDate, duration, summary }
            })
          }
        >
          {button_text}
        </PrimaryButton>
      </div>
    </ScheduleCardStyle>
  );
};

const StickyContentStyle = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 1030;
  background-color: ${color.white};
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  .sticky-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    padding: 16px;
    margin: 0 auto;
    &__left-section {
      display: flex;
      align-items: center;

      .tutors-image {
        display: flex;

        .client-avatar__container {
          &:first-child {
            .client-avatar {
              margin-right: 0;
            }
          }
          &:last-child {
            .client-avatar {
              margin-left: 0;
            }
          }
        }
      }

      .class-info {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        svg {
          padding: 0 8px;
        }
      }

      @media (max-width: 420px) {
        min-width: 180px;

        .class-info__reviews {
          display: none;
        }
        .class-title {
          font-size: 16px;
          line-height: normal;
          letter-spacing: normal;
        }
      }
    }

    &__right-section {
      @media (max-width: 721px) {
        button {
          width: 100%;
        }
      }
      @media (max-width: 420px) {
        button {
          width: auto;
          margin-top: 0;
          font-size: 16px;
          padding-left: 16px;
          padding-right: 16px;
        }
      }
    }
  }
`;

const StickyContentAvatarOverride = `
min-width: 88px;
.client-avatar {
  margin: auto;
  margin-bottom: 0;
}
@media (max-width: 641px) {
  display: none;
}
`;

export const StickyContent = ({
  onClick,
  button_text,
  reviews,
  basePath,
  name,
  tutors
}) => (
  <StickyContentStyle>
    <div className="sticky-content">
      <div className="sticky-content__left-section">
        <div className="tutors-image">
          {tutors.map((tutor, i) => (
            <AvatarImageStyling
              image={tutor.profilePic}
              key={i.toString()}
              avatarHeight="56px"
              avatarWidth="56px"
              css={StickyContentAvatarOverride}
              className="client-avatar__container"
            >
              <div className="client-avatar" />
            </AvatarImageStyling>
          ))}
        </div>
        <div>
          <Heading small color={color.gray.primary} className="class-title">
            {name}
          </Heading>
          <div className="class-info">
            <Text>5.0</Text>
            <Icon name="five-stars" />
            <Text className="class-info__reviews">{`(${
              reviews.length
            }) reviews`}</Text>
          </div>
        </div>
      </div>
      <div className="sticky-content__right-section">
        <Media query="(max-width: 420px)">
          {matches => (
            <PrimaryButton onClick={onClick}>
              {matches ? "Join Class" : button_text}
            </PrimaryButton>
          )}
        </Media>
      </div>
    </div>
  </StickyContentStyle>
);
