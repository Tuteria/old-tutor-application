import React from "react";
import Modal from "../../../simple/Modal";
import {
  PrimaryButton,
  ButtonWithIcon,
  SwitchBetweenButtonAndLink
} from "../../../simple/Button";
import {
  spacing,
  color,
  font_used,
  font_weight,
  text_color
} from "../../../siteStyle";
import styled, { css } from "styled-components";
import Icon from "../../../simple/Icon";
import { xs } from "../../../siteStyle";
import { Heading, Text } from "../../../simple/Text";
import { Div } from "../../../primitives/index";

const SummaryItem = ({ icon, children }) => (
  <Div
    css={`
      display: flex;
      align-items: flex-start;
      margin-bottom: ${spacing.m};
      text-transform: uppercase;
      & img {
        padding-right: 1.75rem;
      }
      & p {
        ${css`
          ${font_used.small_body};
        `} letter-spacing: 0.4px;
        font-weight: ${font_weight.bold};
        color: ${text_color.primary};
      }
      &:last-child {
        margin-bottom: 0;
      }
    `}
  >
    <Icon width={16} fill={color.green.primary} name={icon} />
    <div>{children}</div>
  </Div>
);
const ModalBody = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: ${xs}px) {
      flex-direction: column;
    }
    & .big-img {
      /* height: ${props => props.Nheight}px; */
      background-image: url(${props => props.image});
      background-size: cover;
      background-position: ${props => props.backgroundPosition || -125}px;
      background-repeat: no-repeat;
      width: 100%;
      flex: 1.2;
      border-radius: 4px 0 0 4px;
      @media (max-width: ${xs}px) {

        border-radius: 4px 4px 0 0;
        // background-position: 0;
        background-position: 0 -16px;
      }
      /* max-width: 400px; */
      /* max-height: 600px; */
      img {
        max-width: 100%;
        max-height: 100%;
      }
      position: relative;
      & .content {
        position: absolute;
        bottom: 0;
        color: white;
        padding-bottom: 15px;
        padding-left: 15px;
        padding-right: 15px;
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
      @media only screen and (min-width: 320px) and (max-height: 568px) {
        height: 180px !important;
      }
  
      @media only screen and (min-width: 375px) and (max-height: 667px) {
        /* height: 250px !important; */
      }
      @media only screen and (min-width: 414px) and (max-height: 736px) {
        /* height: 250px !important; */
      }
      @media (max-width: ${xs}px) {
        /* flex-grow: 1; */
        /* width: 100%; */
        /* height: auto; */
        height: 192px;
        .content {
          position: relative;
        }
      }
    }
    & .detail {
      flex: 1;
      padding: ${spacing.xxl};
      & .summary {
        margin-top: ${spacing.m};
        padding-top: ${spacing.l};
        border-top: 1px solid ${color.gray.ui_03};
        svg {
          padding-right: 20px;
        }
        @media (max-width: ${xs}px) {
          display: none;
        }
      }
      & ${PrimaryButton} {
        margin-top: ${spacing.l};
      }
      
      & a {
        margin-top: ${spacing.m};
      }
      @media (max-width: ${xs}px) {
        padding: ${spacing.l};
      }
    }
  `;
const TutorModal = ({
  Nheight = window.innerHeight - 3,
  testimonial: { content, image, name, description, joined, lessonsCompleted },
  loggedIn,
  loggedInText,
  openLoginModal,
  nextUrl,
  bp
}) => {
  return (
    <ModalBody backgroundPosition={bp} Nheight={Nheight} image={image}>
      <div className="big-img" />
      <div className="detail">
        <Heading
          tag="h3"
          mobile="big"
          css={`
            margin-bottom: ${spacing.m};
          `}
        >
          Hi, I'm {name}
        </Heading>
        <Text big mobile="small">
          {" "}
          {content}{" "}
        </Text>
        <div className="summary">
          <SummaryItem icon="user">
            <p>{`Joined ${joined} ago`}</p>
          </SummaryItem>
          <SummaryItem icon="time">
            <p>{`completed ${lessonsCompleted} lessons`}</p>
          </SummaryItem>
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
                  width: 100%;
                `}
        />
      </div>
    </ModalBody>
  );
};

const SingleDetail = ({ tutorInfo, ...rest }) => {
  return <TutorModal Nheight={663} testimonial={tutorInfo} {...rest} />;
};

export const TutorDetailModal = ({
  modal_content,
  handleCloseModal,
  showModal,
  loggedIn,
  loggedInText,
  openLoginModal,
  nextUrl
}) => {
  let val = undefined;
  if (modal_content.the_index === 5) {
    val = -30;
  }
  if (modal_content.the_index === 6) {
    val = -80;
  }
  if (modal_content.the_index === 0) {
    val = -180;
  }
  return (
    <Modal
      css={`
        max-width: 832px;
        width: 100%;
        top: 50%;
        border-width: 0;
        transform: translate(-50%, -50%) scale(1) translate3d(0, 0, 0) !important;
        left: 50%;
        top: 50%;
        @media (max-width: ${xs}px) {
          top: 46%;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        @media only screen and (min-width: 320px) and (max-height: 568px) {
          .detail {
            h1 {
              font-size: 18px;
            }
            button {
              margin-top: 1rem !important;
            }
          }
        }
        @media only screen and (min-width: 375px) and (max-height: 667px) {
          .detail {
            h1 {
              font-size: 24px;
            }
          }
        }
        @media only screen and (min-width: 414px) and (max-height: 736px) {
          .detail {
            h1 {
              font-size: 24px;
            }
          }
        }
        @media (max-width: 768px) {
          //max-width: 400px;
          width: 90%;
        }
      `}
      width={63.125}
      gutter={0}
      closeTimeoutMS={300}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      backgroundColor="rgba(0, 0, 0, 0.75)"
    >
      <SingleDetail
        tutorInfo={modal_content}
        loggedIn={loggedIn}
        loggedInText={loggedInText}
        nextUrl={nextUrl}
        bp={val}
        openLoginModal={() => {
          handleCloseModal();
          openLoginModal();
        }}
      />
      <ButtonWithIcon
        onClick={handleCloseModal}
        icon="close"
        full_width
        fill={color.gray.primary}
        iconStyle={{
          width: "16px",
          fill: "#fff"
        }}
        css={`
          width: auto;
          background-color: transparent !important;
          border-color: transparent !important;
          :hover {
            background-color: transparent !important;
            border-color: transparent !important;
          }
          position: absolute !important;
          svg {
            right: ${spacing.l};
            padding-left: 0 !important;
            left: 0 !important;
          }
          @media (min-width: ${xs + 1}px) {
            top: 0;
            right: 0;
            svg {
              g {
                fill: ${color.gray.primary};
              }
            }
            span {
              display: none;
            }
          }
          @media (max-width: ${xs}px) {
            display: block;
            :focus {
              outline: none;
            }
            :active {
              background-color: transparent !important;
              border-color: transparent !important;
            }
            margin-top: ${spacing.m};
            svg {
              position: relative !important;
              padding: 0 !important;
              top: 2px !important;
            }
            span {
              padding-left: ${spacing.s};
            }
          }
        `}
      >
        Close
      </ButtonWithIcon>
    </Modal>
  );
};

export default TutorDetailModal;
