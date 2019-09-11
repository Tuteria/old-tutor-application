// @flow
import React from "react";
import styled from "styled-components";
import {
  PhoneNumberComponent,
  InputComponent,
  CountryComponent,
  DropdownComponent
} from "../../form";
import { FormFieldsContainer } from "../../layout/SpecialColumn";
import { spacing } from "../../siteStyle";
import {
  FormComponent,
  FormSelect,
  Option,
  ErrorBlock,
  SpecialColumn,
  FormInput,
  StyledMenu,
  xs,
  NoticeAction,
  InputAddon,
  Heading,
  Text,
  Div
} from "../components";
type Props = {
  countries: Array<{
    locale: string,
    text: string,
    code: string
  }>,
  errorMessageForField: Function,
  updateGlobalData: Function,
  customErrorMessages: Function,
  value: {
    country: string,
    phone_numbers: Array<{
      number: string,
      primary: boolean
    }>
  }
};
const Menu = styled(StyledMenu)`
  & ul {
    left: -2.5em;
    width: calc(115%);
  }
`;

class PhoneNumberSet extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.value.country || "ng",
      openSecondary: false,
      how_you_heard: this.props.value.how_you_heard
    };
  }

  updateGlobalState(state) {
    this.props.updateGlobalData(state);
  }
  transformNumber(number) {
    const { code = "", locale = "" } = this.getCountryValue(this.state.country);
    if (number.startsWith("0")) {
      return number.replace("0", code);
    }
    return number;
  }
  updateHowYouHeard = how_you_heard => {
    this.setState({ how_you_heard });
    this.updateGlobalState({ ...this.props.value, how_you_heard });
  };
  updatePhoneNumber = (value: string, key: string) => {
    const { value: { phone_numbers = [] } } = this.props;
    let savedNumbers = phone_numbers;
    if (savedNumbers.length === 1 && key !== "primary" && value !== "") {
      savedNumbers.push({
        number: this.transformNumber(value),
        primary: false
      });
    }
    if (savedNumbers.length === 0 && key === "primary") {
      savedNumbers.push({
        number: this.transformNumber(value),
        primary: true
      });
    }
    this.updateGlobalState({
      country: this.state.country.toUpperCase(),
      phone_numbers: savedNumbers.map(x => {
        console.log(x);
        if (key === "primary") {
          return {
            ...x,
            number: x.primary ? this.transformNumber(value) : x.number
          };
        }
        return {
          ...x,
          number: !x.primary ? this.transformNumber(value) : x.number
        };
      })
    });
  };
  updateCountry = (country: string) => {
    this.setState({
      country
    });
    this.updateGlobalState({
      country,
      phone_numbers: this.props.value.phone_numbers
    });
  };
  cleanNumber(number) {
    const { code = "", locale = "" } = this.getCountryValue(this.state.country);
    if (number.startsWith(code)) {
      return number.replace(code, "0");
    }
    return number;
  }
  getCountryValue = (value, key = "locale") => {
    const { countries } = this.props;
    let index = -1;
    if (!!value) {
      index = countries.findIndex(
        o => o[key].toLowerCase() === value.toLowerCase()
      );
    }
    return index > -1
      ? countries[index]
      : {
          text: ""
        };
  };
  singleSet(
    instance: string,
    label: string = "Primary Phone Number",
    style = {}
  ) {
    const {
      errorMessageForField,
      value: { phone_numbers = [], country = "" }
    } = this.props;

    const primary = phone_numbers.find(x => x.primary);
    const secondary = phone_numbers.find(x => !x.primary);
    const state = {
      primary,
      secondary
    };

    return (
      <PhoneNumberComponent
        label={label}
        instance={instance}
        countryCode={this.getCountryValue(this.state.country).code}
        value={
          !!state[instance] ? this.cleanNumber(state[instance].number) : ""
        }
        placeholder="8078368264"
        updateText={val => this.updatePhoneNumber(val, instance)}
      />
    );
  }
  render() {
    const {
      countries,
      customErrorMessages = () => {},
      display_error,
      value: { country = "" }
    } = this.props;
    const country_primary_error = customErrorMessages(
      "country",
      "phone_numbers"
    );
    let countryValue = this.getCountryValue(this.state.country);
    return (
      <div>
        <FormFieldsContainer
          field_name="country_combined"
          cssProps={spacing.xl}
          extraCss={` + div.c-errmessage {
                margin-top: -16px;
              }`}
        >
          <CountryComponent
            onChange={this.updateCountry}
            value={countryValue.locale}
            countries={countries}
          />{" "}
          {this.singleSet("primary")}{" "}
        </FormFieldsContainer>
        <NoticeAction
          condition={true}
          conditionNode={
            <Div
              css={`
                width: 50%;
                @media (max-width: ${xs}px) {
                  width: 90%;
                }
              `}
            >
              <DropdownComponent
                className="dd2"
                value={this.state.how_you_heard}
                onChange={val => {
                  this.updateHowYouHeard(val);
                }}
                defaultText="Select one"
                direction="up"
                top="-305px"
                errorStyle="margin-top: 8px !important;"
                field_name="how_you_heard"
                css={`
                  margin-bottom: 0;
                  @media (max-width: ${xs}px) {
                    width: 90%;
                  }
                  & span {
                    padding: 12px 16px !important;
                  }
                `}
                options={this.props.whereYouHeardOptions}
              />
            </Div>
          }
          extraStyle={`
          margin-top: 0;
          
          @media(max-width:${xs}px){
            margin-bottom: 30px;
          } `}
          buttonStyle={`span {
            padding: 0 11px !important;
            margin: 0 auto;
          }`}
          onClick={() =>
            this.setState(state => ({
              ...state,
              openSecondary: true
            }))
          }
        >
          <div>
            <Heading tag="h2"> How did you hear about us ? </Heading>
            <Text> This is used for data purposes only </Text>
          </div>
        </NoticeAction>
      </div>
    );
  }
}
export default PhoneNumberSet;
