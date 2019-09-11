// @flow
import React, { Component } from "react";
import styled, { css } from "styled-components";
import {
  PrimaryButton,
  SwitchBetweenButtonAndLink
} from "../../../simple/Button";
import Accordion from "../../../compound/Accordion";
import Icon from "../../../simple/Icon";

import { Heading, Text } from "../../../simple/Text";
import { responsive_design, device_style } from "../../../design-systems/index";
import { Container } from "../../../primitives/index";
import { spacing, color, text_color, font_used } from "../../../siteStyle";
import Loadable from "react-loadable";
import { HowToSection as SHowToSection } from "../shared";
const xs = 768;
const tablet = 992;
/* ${Heading} {
      max-width: 30rem;
    } */

const TutorDetailModal = Loadable({
  loader: () => import("./TutorDetailModal"),
  loading: () => <div />
});

const shared = css`
  flex-grow: 1;
  flex-basis: 23%;
  height: 256px;
  border: 8px solid #eff3f9;
`;
const Tutor = styled.a`
${shared}
border-radius: 16px;
  /* border: 8px solid transparent; */
  @media (max-width: ${tablet}px) {
    min-width: 33.33%;
    ${props => `background: url(${props.img}) center no-repeat/cover;`}
  }
  @media (max-width: ${xs}px) {
    min-width: 40%;
  }
  @media (max-width: 500px) {
    height: 170px;
  }
  overflow: hidden;
  position: relative;
  //margin-bottom: 2rem;
  box-sizing: border-box;
  margin-right: 0;
  cursor: pointer;
  /* ${props => `background-image: url(${props.img});`}  */
  ${props => `background: url(${props.img}) center -25px no-repeat/cover;`} 
    background-size: 150%;
  /* background-size: 100% 100%; */
  background-repeat: no-repeat;
  transition: background-size 1s;
  will-change: background-size;
  :hover {
    background-size: 200%;
    /* background-size: ${props => (props.currentHover ? "200%" : "200%")}; */
    /* background-size: ${props =>
      props.currentHover ? "102% 102%" : "100% 100%"}; */
      
    ::before {
      opacity: 0.7 !important;
    }
  }
  ::before {
    content: "";
    /* background: #1f1f1f;
    opacity: ${props => (props.currentHover ? "0.8" : "0.1")}; */
    position: absolute;
    /* z-index: 2; */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    background-image: linear-gradient(-180deg,rgba(255,255,255,0.00) 20%,rgba(0,0,0,0.93) 122%);
    transition: opacity 0.3s;
  }
    &:nth-child(6){
      &:hover{
        background-size: 170%;
      }
      
    }
  .on-hover {
    background-size: 102%;

    ::before {
    }
  }
  @media (max-width: ${xs}px) {
    /* max-width: 37%; */
    /* height: auto; */
    margin-right: 0;
    margin-left: 0;
    //margin-bottom: 1rem;
    &:nth-child(7) {
      display: none;
    }
    &:nth-child(8) {
      max-width: 100%;
    }
  }
  &:hover {
  }
  &:first-child,
  &:nth-child(5) {
    margin-left: 0;
  }

  &:nth-child(4),
  &:nth-child(8) {
    margin-right: 0;
  }
  & img {
    width: 100%;
  }
  & > div {
    position: absolute;
    bottom: 0;
    padding-bottom: 1.5rem;
    padding-left: 2rem;
    color: ${color.white};
    @media (max-width: ${xs}px) {
      padding-left: 1rem;
      padding-bottom: 1rem;

      & p {
        margin-bottom: 0;
      }
    }
  }
  ${props =>
    props.ishovered
      ? `&:before {
            content: '';
            display: block;
            position: absolute;
            z-index: 2;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
          }`
      : ``};
`;

export class TutorSection extends React.Component {
  state = {
    hoverEffect: false,
    hoverId: null
  };
  focusOnTutor = id => {
    // const hoveredTutor = siteText.tutor_list_section.data.find(
    //   tutor => tutor.id === id
    // );
    // hoveredTutor.hovered = true;
    // console.log(hoveredTutor);
    console.log("Hover");
  };
  getStyle = id => {
    if (id !== this.state.hoverId) {
      return {};
    }
    return {};
  };

  render() {
    const {
      content,
      onClick,
      openLoginModal,
      loggedIn,
      loggedInText,
      nextUrl
    } = this.props;
    return (
      <Div
        css={`
          background-color: rgba(227, 237, 248, 0.5);
          .call-to-action {
            width: 100%;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            color: #484848;
            background-color: white;
            @media (max-width: ${xs}px) {
              & > div {
                display: flex;
                justify-content: center;
                margin-bottom: 1rem;
                & img {
                  width: 1rem;
                  height: 1rem;
                  margin-right: 0.3rem;
                }
              }
              & ${PrimaryButton} {
                width: 100%;
              }
            }
            & > div {
              position: relative;
              padding-left: 0;
              padding-bottom: 0;
            }
            & img {
              width: 3.4rem;
              height: 3.4rem;
            }
            & ${PrimaryButton} {
              border-radius: 2px;
              border: 1px solid transparent;
            }
            & button {
              width: calc(100% - 64px);
              margin: 0 auto;
            }
          }
          @media (max-width: ${xs}px) {
            padding: 2rem 1.25rem;
          }
          & .image-section {
            width: 1120px;
            margin: 0 auto;
            padding-bottom: ${spacing.max};
            display: flex;
            flex-wrap: wrap;
            //justify-content: space-between;
            @media (max-width: ${tablet}px) {
              width: 100%;
            }
            @media (max-width: ${xs}px) {
              width: 100%;
              padding-bottom: 16px;
            }
            @media (max-width: 500px) {
              width: 100%;
              padding-bottom: 16px;
            }
            & .image {
              min-width: 25%;
              height: 256px;
              overflow: hidden;
              position: relative;
              cursor: pointer;
              @media (max-width: ${xs}px) {
                //padding: 2rem 1.25rem;
              }
              &.action {
                ${shared} box-sizing: border-box;
                padding: 4px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                color: #484848;
                background-color: white;
                a {
                  margin: 0 auto;
                  width: 60%;
                }
                @media (max-width: ${tablet}px) {
                  min-width: 100%;
                  margin: 0;
                  padding: 0;
                }
                @media (max-width: ${xs}px) {
                  min-width: 100%;
                  margin: 0;
                  padding: 0;
                }
                @media (max-width: ${xs}px) {
                  margin: 0;
                  padding: 0;

                  & > div {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                    & img {
                      width: 1rem;
                      height: 1rem;
                      margin-right: 0.3rem;
                    }
                  }
                  & ${PrimaryButton} {
                    width: 100%;
                  }
                }
                & > div {
                  position: relative;
                  padding-left: 0;
                  padding-bottom: 0;

                  & h1 {
                    padding-bottom: 16px;
                  }
                }
                & img {
                  width: 3.4rem;
                  height: 3.4rem;
                }
                & ${PrimaryButton} {
                  border-radius: 2px;
                }
                & button {
                  width: calc(100% - 64px);
                  margin: 0 auto;
                }
              }
            }
          }
        `}
      >
        <Heading
          big={true}
          color={text_color.secondary}
          css={`
            text-align: center;
            padding-top: ${spacing.xxxl};
            padding-bottom: ${spacing.xxl};
            margin-top: 8vh;

            @media (max-width: 768px) {
              padding-top: 0;
              padding-bottom: ${spacing.m};
              font-size: 28px !important;
            }
          `}
        >
          {content.title}
        </Heading>
        <div className="image-section">
          {content.data.map((tutor, index) => (
            <Tutor
              onClick={() =>
                onClick({
                  the_index: index,
                  image: tutor.img,
                  ...tutor
                })
              }
              key={index.toString()}
              onMouseEnter={() => this.setState({ hoverId: index })}
              onMouseLeave={() => {
                this.setState({ hoverId: null });
              }}
              img={tutor.img}
              style={this.getStyle(index)}
            >
              <div>
                <Heading mobile>I'm {tutor.name}</Heading>
                <Text
                  css={`
                    @media (max-width: 600px) {
                      font-size: 0.5625rem;
                      line-height: 11px;
                    }
                  `}
                >
                  — {tutor.description}
                </Text>
              </div>
            </Tutor>
          ))}
          <div
            className="image action"
            onMouseEnter={() => this.setState({ hoverId: 12 })}
            onMouseLeave={() => this.setState({ hoverId: null })}
          >
            <div>
              <Icon name="heart" width={"35"} height={"35"} />
              <Heading>
                What’s <br />
                Your Skill?
              </Heading>
            </div>
            <SwitchBetweenButtonAndLink
              isLoggedIn={loggedIn}
              loggedInText={loggedInText}
              text={"Become a Tutor"}
              onClick={openLoginModal}
              href={nextUrl}
              linkCss={`
                  width: inherit;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              buttonCss={`
                  width: inherit;
                `}
            />
          </div>
        </div>
      </Div>
    );
  }
}

const Div = styled.div`
  ${props =>
    css`
      ${props.css};
    `};
`;
// & ${Heading} {
// }
const HowToSection = ({ content }) => (
  <SHowToSection heading={content.title} data={content.data} />
);
const SafetySection = ({ content }) => (
  <Div
    css={`
      color: #484848;
      text-align: center;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.31) 0%,
        rgba(192, 220, 251, 0.3) 100%
      );
      & .detail {
        width: 1120px;
        margin: 0 auto;
        @media (max-width: ${xs}px) {
          width: 100%;
        }
        @media (max-width: ${tablet}px) {
          width: 100%;
        }
        display: flex;
        justify-content: space-between;
        padding-bottom: 4.5rem;
        @media (max-width: ${xs}px) {
          flex-direction: column;
        }
      }

      & h3 {
        font-weight: bold;
        line-height: 2rem;
        font-size: 1.5rem;
      }
      & .news-section {
        width: 1120px;
        margin: 0 auto;
        @media (max-width: ${tablet}px) {
          width: 100%;
        }
        @media (max-width: ${xs}px) {
          width: 90%;
        }
        display: flex;
        padding-bottom: ${spacing.xxl};
        justify-content: space-between;
        & > a {
          max-width: 8rem;
          & img {
            width: 100%;
          }
        }
        & > a:nth-child(6n) {
          & img {
            width: 50%;
          }
        }
      }

      @media (max-width: ${xs}px) {
        padding: 2rem 0;

        & h3 {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        & .detail {
          padding-bottom: 1rem;
          & > div {
            margin-right: 0;
            margin-left: 0;
            margin-bottom: 2.5rem;
            @media (max-width: 768px) {
              margin-bottom: 0;
            }
          }
        }
        & .news-section {
          margin-top: 0;
          flex-wrap: wrap;

          & > a {
            padding-right: 1rem;
            padding-left: 1rem;
            padding-top: 3rem;
          }
        }
      }
    `}
  >
    <Heading
      big={true}
      color={text_color.secondary}
      css={`
        padding-top: ${spacing.xxxl};
        padding-bottom: ${spacing.xxl};

        @media (max-width: ${xs}px) {
          padding-top: ${spacing.l};
          padding-bottom: 0;
          font-size: 28px !important;
        }
      `}
    >
      {content.title}
    </Heading>
    <div className="detail">
      {content.data.map((detail, index) => (
        <SafetyDetail key={index} image={detail.icon} heading={detail.heading}>
          {detail.description}
        </SafetyDetail>
      ))}
    </div>
    <Heading
      mobile
      color={text_color.secondary}
      css={`
        padding-bottom: ${spacing.xxl};
        @media (max-width: ${xs}px) {
          width: 60%;
          margin: 0 auto;
          padding-bottom: 0;
        }
      `}
    >
      {content.subtitle}
    </Heading>
    <div className="news-section">
      {content.awards.map((award, index) => (
        <a key={index} href={award.link} target="_blank">
          <img src={award.image} alt={award.name} />
        </a>
      ))}
    </div>
  </Div>
);
export const FAQSection = ({ content }) => {
  let length = Math.ceil(content.data.length / 2);
  let groupq = content.data.slice(0, length);
  let groupv = content.data.slice(length);
  let mapFunc = (item, index) => (
    <Accordion
      key={index}
      label={item.heading}
      opened={item.opened}
      className="flex-item"
    >
      <Text dangerouslySetInnerHTML={{ __html: item.description }} />
    </Accordion>
  );
  return (
    <Div
      css={`
        background-color: #f6f6f6;
        color: ${text_color.secondary};
        @media (max-width: ${xs}px) {
          display: block;
          padding: 0 ${spacing.m};
        }
        & .faqs {
          width: 1120px;
          margin: 0 auto;
          @media (max-width: ${xs}px) {
            width: 100%;
            display: block;
          }
          @media (max-width: ${tablet}px) {
            width: 100%;
          }
          padding-bottom: ${spacing.max};
          display: flex;
          flex-wrap: wrap;
          & .left,
          .right {
            flex: 1;
            & .flex-item {
              background: #fff;
              margin-bottom: 1.5rem;
            }
          }
          & .left {
            margin-right: 1rem;
            @media (max-width: ${xs}px) {
              margin-right: 0;
            }
          }
          & .right {
            margin-left: 1rem;
            @media (max-width: ${xs}px) {
              margin-left: 0;
            }
          }
        }
      `}
    >
      <Heading
        big
        color={text_color.secondary}
        css={`
          text-align: center;
          padding-top: ${spacing.xxxl};
          padding-bottom: ${spacing.xxl};
          @media (max-width) {
            font-size: 28px !important;
          }
        `}
      >
        {content.title}
      </Heading>
      <div className="faqs">
        <div className="left">
          <Heading
            color={text_color.secondary}
            css={`
              text-align: left;
              padding-bottom: ${spacing.l};
              ${font_used.regular_body};
              @media (max-width: ${xs}px) {
                font-size: 22px !important;
              }
            `}
          >
            GETTING STARTED
          </Heading>
          {groupq.map(mapFunc)}
        </div>
        <div className="right">
          <Heading
            small
            color={text_color.secondary}
            css={`
              text-align: left;
              padding-bottom: ${spacing.l};
              ${font_used.regular_body};
            `}
          >
            EARNINGS
          </Heading>
          {groupv.map(mapFunc)}
        </div>
      </div>
    </Div>
  );
};
export const CallToAction = ({
  content,
  openLoginModal,
  loggedIn,
  loggedInText,
  nextUrl
}) => (
  <Div
    css={`
      color: white;
      background-image: url(${content.image});
      display: block;
      max-width: 100%;
      background-size: cover;
      height: 38rem;
      background-repeat: no-repeat;
      padding-top: 11.875rem;
      margin: 0 auto;
      text-align: center;
      h1 {
        margin-bottom: 0.8rem;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 1.8rem;
        line-height: 2rem;
      }
      a {
        margin: 0 auto;
        width: 30%;
      }
      ${PrimaryButton} {
        display: flex;
        justify-content: center;
        flex-direction: column;
        border: none;
        padding: 1.1rem 3.03rem;
      }
      & > div:first-child {
        max-width: 38rem;
        margin: 0 auto;
      }
      @media (max-width: ${xs}px) {
        height: 19rem;
        background-position: 51% 0;
        padding-top: 3rem;
        p {
          ${font_used.regular_body};
          padding: 0;
        }
        ${PrimaryButton} {
          padding: ${spacing.m} ${spacing.xl};
        }
      }
    `}
  >
    <div>
      <Heading
        big={true}
        css={`
          @media (max-width: 768px) {
            font-size: 28px !important;
          }
        `}
      >
        {content.title}
      </Heading>
      <Text>{content.description}</Text>
      <SwitchBetweenButtonAndLink
        isLoggedIn={loggedIn}
        loggedInText={loggedInText}
        text={content.button_text}
        onClick={openLoginModal}
        big
        href={nextUrl}
        linkCss={`
                  width: inherit;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
        buttonCss={`
                  width: inherit;
                `}
      />
    </div>
  </Div>
);
const Footer = ({ content }) => {
  return (
    <Div
      css={`
        background-color: white;
        color: #767676;
        & .thanks {
          padding-top: 2rem;
          text-align: center;
          padding-bottom: 2.8rem;
          & svg {
            width: 1rem;
          }
          @media (max-width: ${xs}px) {
            padding: 1rem 2rem;
          }
        }

        & footer {
          padding-bottom: 2.5rem;
          padding-left: 5.5rem;
          padding-right: 5.5rem;
          display: flex;
          justify-content: space-between;

          & a {
            text-decoration: none;
            color: inherit;
            padding-left: 0.6rem;
            padding-right: 0.6rem;
          }
          @media (max-width: ${xs}px) {
            padding: 0rem 2rem;
            flex-direction: column;
            & div {
              padding-bottom: 1rem;
              text-align: center;
              & .holla {
                display: none;
              }
            }
          }
        }
      `}
    >
      <div className="thanks">
        Made with <Icon name="heart" width={"16"} height={"16"} /> by folks at
        Tuteria.
      </div>
      <footer>
        <div>
          © Tuteria Limited 2015 - {new Date().getFullYear()}.
          <span className="holla"> All Rights Reserved</span>
        </div>
        <div>
          <a href={content.terms_link}>Terms of Service</a> |{" "}
          <a href={content.privacy_link}>Privacy Policy</a>
          {/* |
          <a href={content.help_link}>Help</a> */}
        </div>
      </footer>
    </Div>
  );
};
const states = [
  { state: "Lagos", state_factor: 1 },
  { state: "Lagos Island", state_factor: 1, region_factor: 1.15 },
  { state: "Abuja", state_factor: 0.95 },
  { state: "Rivers", state_factor: 0.9 },
  { state: "Akure", state_factor: 0.7 },
  { state: "Others", state_factor: 0.7 }
];

class IndexPage extends React.Component {
  state = {
    showModal: false,
    modal_content: {},
    loggedIn: false
  };
  handleOpenModal = modal_content => {
    this.setState({ modal_content });
    this.openModal("showModal");
  };

  openModal(field, value = true) {
    this.setState(state => ({ ...state, [field]: value }));
  }

  handleCloseModal = () => {
    this.openModal("showModal", false);
  };

  render() {
    const siteText = this.props.siteText;
    return (
      <div>
        <Container
          css={`
            @media (max-width: 768px) {
              margin-top: 300px;
            }

            .example-animation-enter {
              transform: scale(0.9);
            }

            .example-animation-enter.example-animation-enter-active {
              transform: scale(1);
              transition: all 0.5s ease-in-out;
            }

            .example-animation-leave {
              transform: scale(1);
            }

            .example-animation-leave.example-animation-leave-active {
              transform: scale(0.9);
              transition: all 0.5s ease-in-out;
            }
          `}
        >
          <Div
            css={`
              ${responsive_design.tablet_only} {
                //max-width: ${device_style.big_desktop}px;
                margin-left: auto;
                margin-right: auto;
              }
              @media (max-width: 768px) {
                padding-top: 15px;
              }
            `}
          >
            <div id="tutor-section">
              <TutorSection
                content={siteText.tutor_list_section}
                onClick={this.handleOpenModal}
                openLoginModal={this.props.handleOpenModal}
                loggedIn={this.props.loggedIn}
                nextUrl={siteText.nextUrl}
                loggedInText={this.props.loggedInText}
              />
            </div>
            <HowToSection content={siteText.become_tutor_section} />
            <SafetySection content={siteText.safety_section} />
            <div id="faq-section">
              <FAQSection content={siteText.faq_section} />
            </div>
          </Div>
          <TutorDetailModal
            modal_content={this.state.modal_content}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            openLoginModal={this.props.handleOpenModal}
            loggedIn={this.props.loggedIn}
            loggedInText={this.props.loggedInText}
            nextUrl={siteText.nextUrl}
          />
        </Container>
        <div id="call-to-action-section">
          <CallToAction
            content={siteText.call_to_action_section}
            openLoginModal={this.props.handleOpenModal}
            loggedIn={this.props.loggedIn}
            loggedInText={this.props.loggedInText}
            nextUrl={siteText.nextUrl}
          />
        </div>
        <Footer content={siteText.footer_section} />
      </div>
    );
  }
}

// & ${Heading} {
//   .mobile-only{
//     display:none;
//   ${responsive_design.mobile_only}{
//       display:inline;
//       color: #36b37e;

//     }
//   }
// }

const SafetyDetailStyle = styled.div`
  text-align: center;
  color: #484848;
  padding: ${spacing.l};
  @media (max-width: ${tablet}px) {
    padding: ${spacing.l} ${spacing.m};
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  & svg {
    margin-bottom: 1.8rem;
    @media (max-width: ${xs}px) {
      margin-bottom: 0;
    }
  }
  & h3 {
    ${font_used.small_heading};
    margin-bottom: ${spacing.m};
  }
  & p {
    width: 292px;
    margin: 0 auto;
    ${font_used.big_body} @media (max-width: ${xs}px) {
      ${font_used.regular_body};
    }
  }
`;
const SafetyDetail = ({ children, image, heading }) => (
  <SafetyDetailStyle>
    <Icon name={image} />
    <h3>{heading}</h3>
    <p>{children}</p>
  </SafetyDetailStyle>
);
const ModalBody = styled.div`
  display: flex;
  & .big-img {
    background-image: url(${props => props.image});
    background-size: cover;
    flex-grow: 1.8;
    height: ${props => props.Nheight}px;
    max-height: 40rem;
    position: relative;
    & .content {
      position: absolute;
      bottom: 0;
      color: white;
      padding-bottom: 3rem;
      padding-left: 3rem;
      padding-right: 3rem;
      & > p {
        line-height: 1.7rem;
        margin-bottom: 1rem;
      }
      & .tutor-summary {
        & h3 {
          color: #36b37e;
          font-weight: bold;
          line-height: 1.8rem;
          padding-bottom: 0.2rem;
        }
      }
    }
  }
  & .detail {
    flex: 1;
    padding: 2.9rem 2.8rem;
    & h3 {
      font-size: 1.1875;
      line-height: 1.5;
      font-weight: bold;
      color: #484848;
    }
    & .summary {
      padding-bottom: 2rem;
    }
    & ${PrimaryButton} {
      border-radius: 4px;
      width: 90%;
      padding: 0.8125rem 2.75rem;
      border: none;
      margin-top: 2rem;
    }
  }
`;

export default IndexPage;
