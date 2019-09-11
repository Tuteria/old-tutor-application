import React, { Component } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import { Heading } from "../../../simple/Text";
import { SwitchBetweenButtonAndLink } from "../../../simple/Button";
import { Div, Container } from "../../../primitives/index";
import { TopPriceSection, Price } from "./TopSection";
import Loadable from "react-loadable";
import { spacing } from "../../../design-systems";

export const Link = styled.a``;
const xs = 768;

const Loading = () => null;
const ModalForm = Loadable({
  loading: Loading,
  loader: () => import("./ModalForm")
});
const HeaderStyle = styled.div`
  .header-flex-item {
    align-items: center;
  }
  ${props =>
    props.isScrolling
      ? `position: fixed; 
        width: 100%; 
        background: #fff; 
        z-index: 1300;
        box-shadow: 0 1px 4px 0 rgba(99,114,130,0.15);
        @media (max-width: ${xs}px) {
            bottom: 0;
        }
        & > div {
        padding: ${spacing.m} 0!important;
        }
        .header-flex-item:last-of-type {
            display: flex;
            .flex-item {
                padding-right: ${spacing.l};
                border-left: none;
                h1 {
                    color: #484848;
                }
                p {
                    color: #000000;
                }
            }
            .desktop-text {
              display: inline-block;
            }

            .mobile-text {
              display: none;
            }
            @media (max-width: ${xs}px) {
              .desktop-text {
                display: none;
              }

              .mobile-text {
                display: block;
                position: relative;
                top: 7px;
              }
            }
        }
        `
      : ``} & > div {
    width: 1120px;
    margin: 0 auto;

    @media (max-width: ${xs}px) {
      width: 80%;
    }
    padding-top: 40px;
    padding-bottom: 24px;
    @media (max-width: ${xs}px) {
      padding: 2rem 0;
    }
    & h1 {
      margin: 0;
      & a {
        color: white;
        cursor: pointer;
        text-decoration: none;
        &:last-child {
          background-color: rgba(52, 52, 52, 0.41);
          float: right;
          font-size: 1rem;
          padding: 0.5rem 2rem;
          border-radius: 4px;
          border: 1px solid #a6a6a6;
        }
      }
    }
  }
`;

const ScrollingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${xs}px) {
    flex-direction: column;
    & .help-tip {
      display: none;
    }
  }
`;
export class Header extends React.Component {
  render() {
    const {
      handleOpenModal,
      isScrolling,
      loggedIn,
      loggedInText,
      nextUrl,
      render
    } = this.props;

    return (
      <HeaderStyle isScrolling={isScrolling}>
        <Container>
          {render(isScrolling, handleOpenModal, this.props.linkRender)}
        </Container>
      </HeaderStyle>
    );
  }
}

const CarouselWrapper = ({
  CarouselComponent,
  ScrollLogicContainer,
  loggedIn,
  loggedInText,
  nextUrl,
  images,
  image,
  siteText,
  headerProps,
  sectionProps
}) => (
  <CarouselComponent
    loggedIn={loggedIn}
    loggedInText={loggedInText}
    nextUrl={nextUrl}
    images={images}
    image={image}
    siteText={siteText}
  >
    <ScrollLogicContainer
      render={scrolling => (
        <Header
          isScrolling={scrolling}
          render={(isScrolling, handleOpenModal, linkRender) => {
            return isScrolling ? (
              <ScrollingHeader>
                <div
                  className="header-flex-item"
                  style={{ alignItems: "center" }}
                >
                  <Heading
                    css={`
                      color: #484848;
                      padding-top: ${spacing.s};
                      .desktop-text {
                        display: block;
                      }

                      .mobile-text {
                        display: none;
                      }
                      @media (max-width: ${xs}px) {
                        padding-top: 0;
                        font-size: 16px !important;

                        .desktop-text {
                          display: none;
                        }

                        .mobile-text {
                          display: block;
                        }
                      }
                    `}
                    small
                  >
                    <span className="desktop-text">
                      What you could earn in Lagos, NG
                    </span>
                    <span className="mobile-text">You could earn</span>
                  </Heading>
                </div>{" "}
                <div className="header-flex-item">
                  <Price
                    className="flex-item"
                    price={headerProps.price}
                    icon
                    fillColor={"#9b9b9b"}
                    iconWidth={"16"}
                    iconHeight={"16"}
                    textStyle={`font-size: 14px; line-height: normal;`}
                    position={"bottom"}
                  >
                    <span
                      className="desktop-text"
                      style={{
                        color: "rgb(72, 72, 72)"
                      }}
                    >
                      {" "}
                      monthly potential{" "}
                    </span>
                    <span className="mobile-text">/month</span>
                  </Price>
                  <SwitchBetweenButtonAndLink
                    isLoggedIn={headerProps.loggedIn}
                    loggedInText={headerProps.loggedInText}
                    text={"Get Started"}
                    onClick={handleOpenModal}
                    href={headerProps.nextUrl}
                    linkCss={`
                                      width: inherit;
                                      display: flex;
                                      justify-content: center;
                                      align-items: center;
                                      height: 40px;
                                    `}
                    buttonCss={`
                                      width: inherit;
                                      height: 40px;
                                    `}
                  />
                </div>
              </ScrollingHeader>
            ) : (
              <h1>
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
                {/* <Link to="/about">Sign in</Link> */}
                {linkRender(handleOpenModal)}
              </h1>
            );
          }}
          {...headerProps}
        />
      )}
    >
      <TopPriceSection {...sectionProps} />
    </ScrollLogicContainer>
  </CarouselComponent>
);
export class LoginModal extends React.Component {
  state = {
    showModal: this.props.showModal || this.props.siteText.popUpModal,
    signUp: true,
    signUpToggle: false
  };

  handleOpenModal = (signUp = true, signUpToggle = false) => {
    this.setState({ signUp, signUpToggle });
    this.openModal("showModal");
  };

  openModal(field, value = true) {
    this.setState(state => ({ ...state, [field]: value }));
  }

  toggleSignUpForm = (field = "signUpToggle", value = true) => {
    this.setState({ [field]: value });
  };
  handleCloseModal = () => {
    this.openModal("showModal", false);
    console.log("hllo");
  };
  render() {
    let {
      facebookUrls,
      siteText,
      googleUrls,
      signUpErrors,
      customValidation,
      saveUserAction,
      resetPasswordAction,
      loginErrors,
      loginUserAction
    } = this.props;
    return (
      <React.Fragment>
        {this.props.render(this.handleOpenModal, this.handleCloseModal)}
        <ModalForm
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          toggleSignUpForm={this.toggleSignUpForm}
          signUpToggle={this.state.signUpToggle}
          signUp={this.state.signUp}
          {...{
            facebookUrls,
            siteText,
            googleUrls,
            signUpErrors,
            customValidation,
            saveUserAction,
            resetPasswordAction,
            loginErrors,
            loginUserAction
          }}
        />
      </React.Fragment>
    );
  }
}

export class StateHolder extends React.Component {
  state = {
    totalPrice: 0
  };

  getPrice = totalPrice => {
    this.setState({ totalPrice });
  };

  render() {
    let {
      siteText,
      loggedInLogic,
      CarouselComponent,
      ScrollLogicContainer,
      ...rest
    } = this.props;
    return (
      <LoginModal
        siteText={siteText}
        {...rest}
        render={handleOpenModal => (
          <CarouselWrapper
            {...{
              CarouselComponent,
              ScrollLogicContainer,
              loggedIn: siteText.loggedIn,
              loggedInText: siteText.loggedInText,
              nextUrl: siteText.nextUrl,
              images: siteText.carousel_images,
              image: siteText.carousel_images[0],
              siteText
            }}
            headerProps={{
              handleOpenModal: handleOpenModal,
              loggedIn: siteText.loggedIn,
              price: this.state.totalPrice,
              loggedInText: siteText.loggedInText,
              nextUrl: siteText.nextUrl,
              linkRender: loggedInLogic
            }}
            sectionProps={{
              siteText: siteText,
              handleOpenModal: handleOpenModal,
              getPrice: this.getPrice,
              loggedIn: siteText.loggedIn,
              loggedInText: siteText.loggedInText,
              nextUrl: siteText.nextUrl
            }}
          />
        )}
      />
    );
  }
}
