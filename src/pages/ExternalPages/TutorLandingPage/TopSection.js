import React from "react";
import styled, { css } from "styled-components";
import { HelpTip } from "../../../compound/HelpTip";
import { Container, Div } from "../../../primitives/index";
import AutoSelect from "../../../simple/AutoSelect";
import { SwitchBetweenButtonAndLink } from "../../../simple/Button";
import Icon from "../../../simple/Icon";
import { Heading, Text } from "../../../simple/Text";
import {
  color,
  font_weight,
  form_field,
  form_field_styling,
  spacing
} from "../../../siteStyle";
import { getPrice, priceCalculator } from "../../../utils";

//import { siteText } from "../TutorLandingPage";

const xs = 768;
const tablet = 992;

export const PriceSection = styled("div")`
  border-left: 1px solid #2f2f2f;
  @media (max-width: ${xs}px) {
    border-left: none;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;

  & svg {
    position: relative;
    top: ${spacing.xs};
  }
`;

export const Price = ({
  price,
  big = false,
  moderate = false,
  hero = false,
  icon,
  fillColor,
  iconHeight,
  iconWeight,
  text,
  position = "top",
  children,
  textStyle = "",
  ...rest
}) => (
  <PriceSection {...rest}>
    <Heading
      big={true}
      moderate={moderate}
      hero={hero}
      mobile
      css={`
        @media (max-width: 768px) {
          font-size: 28px !important;
        }
      `}
    >
      ₦{priceCalculator({
        studentNo: 2,
        price,
        discount: 0.3,
        tutor_cut: 0.7
      }).toLocaleString()}
    </Heading>
    <Text
      css={`
        margin-bottom: 0 !important;
        @media (max-width: ${xs}px) {
          position: relative;
          bottom: 4px;
        }
        ${textStyle};
      `}
      tag="div"
      big
    >
      {children}{" "}
      {icon ? (
        <HelpTip
          content={
            "This is based on average prices tutors charge in your location assuming you teach 2-hour lessons 3 times a week. How much you actually make may vary with your pricing, location, subjects, demand and other factors."
          }
          position={position}
          icon="help"
          iconProps={{ height: iconHeight, width: iconWeight, fillColor }}
        />
      ) : null}
    </Text>
  </PriceSection>
);

const FormContainer = styled("div")`
  display: flex;
  color: #484848;
  @media (max-width: ${xs}px) {
    flex-direction: column;
    & > div {
      margin-right: 0 !important;
      margin-bottom: 1rem;
    }
  }
  & input {
    ${form_field_styling} ${form_field.normal} :hover {
      ${form_field.hover};
    }
    :focus {
      ${form_field.active};
    }
    font-size: 19px;
  }
  & svg {
    top: 8px;
  }
  /* & input {
    padding: 0.8em;
  } */
  & > div {
    flex-grow: 1;
    margin-right: 1.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;
let Css = `min-height: calc(100vh - 104px);
    @media (max-width: ${tablet}px) {
        padding-top: 0;
        h1 {
            margin-bottom: 1.1rem;
        }
        .mobile-only {
            display: block !important;
            bottom: 0;
            position: absolute;
            width: 100%;
            left: 0;
            padding-top: 1rem;
            padding-bottom: 1rem;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            font-size: 1.3rem;
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 0 8px 16px 0 rgba(27, 39, 51, 0.08);
            & i {
            margin-right: 1rem;
            }
        }
`;
const TopSectionStyle = styled(Div)`
  ${css`
    ${Css};
  `};
`;

class TTopPriceSection extends React.Component {
  constructor(props) {
    super(props);
    let sks = this.props.skills.map(x => x.name);
    this.state = {
      price: 1500,
      location: "",
      subject: sks[Math.floor(Math.random() * sks.length)] || ""
    };
  }
  updateField = (value, field) => {
    let newState = { ...this.state, [field]: value };
    this.setState(state => newState);
    this.updatePrice(newState);
  };
  updatePrice = ({ location, subject }) => {
    const { states = [], skills = [] } = this.props;
    let foundState = states.find(x => x.name === location);
    let result = {};
    if (!!foundState) {
      result = {
        state: foundState.name,
        state_factor: foundState.factor / 100
      };
    }
    let foundSkill = skills.find(x => x.name === subject);
    if (!!foundSkill) {
      result = { ...result, base_rate: foundSkill.base_price };
    }
    let price = getPrice(result);
    this.setState({ price });
    this.props.getPrice(price);
  };

  componentDidMount() {
    this.setState({
      location: "Lagos"
    });
    this.updatePrice({ location: "Lagos" });
  }

  render() {
    const { content, states = [], skills = [], siteText } = this.props;

    return (
      <Div css={``}>
        {this.props.children}
        {/*<div className="mobile-only">
          <Icon name="cash" />
          {siteText.intro_section.action_text}
        </div>*/}
        {/* <Header>
            <Heading> {`${content.heading} Lagos, NG`} </Heading>
            <div className="flex-item">
              <Price moderate price={this.state.price} />
            </div>
          </Header> */}
        <Div
          css={`
            position: relative;
            background: rgba(0, 0, 0, 0.4);
            border-radius: ${spacing.s};
            width: 100%;
            display: flex;
            @media (max-width: ${xs}px) {
              flex-direction: column;
              margin-top: 60px;
              background: transparent;
              color: #484848;
              width: 89%;
              margin-left: auto;
              margin-right: auto;
              & > div.flex-item {
                padding: 0 !important;
              }
            }
            & > div.flex-item {
              flex-grow: 1;

              padding: ${spacing.inset.square.xl};
              &:last-child {
                flex-grow: 0;
              }
            }
          `}
        >
          <div className="flex-item">
            <Heading
              css={`
                margin-bottom: ${spacing.m};
                & span {
                  color: ${color.green.primary};
                }
              `}
            >
              {content.heading}
              <span>Lagos, NG</span>
            </Heading>
            <FormContainer>
              <AutoSelect
                value={this.state.location}
                placeholder={content.location_placeholder}
                onChange={value => this.updateField(value, "location")}
                items={states.map(x => x.name)}
              />

              <AutoSelect
                value={
                  this.state.subject // displayIcon
                }
                placeholder={content.skill_placeholder}
                onChange={value => this.updateField(value, "subject")}
                items={skills.map(x => x.name)}
              />
            </FormContainer>
          </div>
          <Price
            className="flex-item"
            hero
            price={this.state.price}
            icon
            fillColor={"#36B37E"}
            iconWidth={"16"}
            iconHeight={"16"}
            top={false}
            bottom={true}
          >
            monthly potential
          </Price>
        </Div>
      </Div>
    );
  }
}

export const TopPriceSection = ({
  siteText,
  handleOpenModal,
  loggedIn,
  loggedInText,
  nextUrl,
  getPrice,
  PriceSectionComponent = TTopPriceSection
}) => {
  return (
    <Container
      css={`
        margin: 0 auto;
        max-width: 1120px;
        @media (max-width: ${tablet}px) {
          height: 415px;
          position: relative;
        }
      `}
    >
      <TopSectionStyle>
        {/* <IndexStyle> */}

        <PriceSectionComponent
          siteText={siteText}
          states={siteText.states}
          skills={siteText.skills}
          content={siteText.intro_section}
          getPrice={getPrice}
          subject={siteText.defaultSubject}
        >
          <Div
            css={`
                  height: 60vh;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  width: 50%;
                  @media (max-width: ${tablet}px) {
                    // padding: ${spacing.xl};
                    position:relative;    
                    width: 80%;
                    margin-left: auto;
                    margin-right: auto;
                    justify-content: baseline;
                  }`}
          >
            <Heading
              hero
              css={`
                margin-bottom: 24px;
                @media (max-width: ${xs}px) {
                  font-size: 36px !important;
                  line-height: 42px !important;
                  margin-top: ${spacing.xxl};
                }
              `}
            >
              {siteText.intro_section.title}
            </Heading>
            <Heading
              mobile={true}
              css={`
                font-weight: ${font_weight.regular};
                margin-bottom: ${spacing.l};
                @media (max-width: ${xs}px) {
                  font-size: 19px !important;
                }
              `}
              tag="h3"
              small
            >
              {siteText.intro_section.subtitle}
            </Heading>
            <SwitchBetweenButtonAndLink
              isLoggedIn={loggedIn}
              loggedInText={loggedInText}
              onClick={handleOpenModal}
              big
              text={siteText.intro_section.button_text}
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
          </Div>
        </PriceSectionComponent>
        {/* </IndexStyle> */}
      </TopSectionStyle>
    </Container>
  );
};
