import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import Button, {
  PrimaryButton,
  SecondaryButton,
  ButtonWithIcon,
  LoadingButton
} from "../src/simple/Button";
import FacebookButton from "../src/compound/FacebookButton";
import GoogleButton from "../src/compound/GoogleButton";
import { Div } from "../src/primitives/index";
import { Promise } from "es6-promise";

const NewDiv = styled(Div)`
  display: flex;
  width: 70%;
  justify-content: space-around;
  ${props =>
    css`
      ${props.css};
    `};
`;
class Controller extends React.Component {
  state = {
    loading: false
  };
  onClick = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };
  render() {
    return (
      <LoadingButton
        controlled
        controlledOnClick={this.onClick}
        loading={this.state.loading}
        kind={PrimaryButton}
      >
        Hello world
      </LoadingButton>
    );
  }
}
storiesOf("Button", module)
  .add("Primary", () => (
    <NewDiv>
      <PrimaryButton onClick={action("clicked")}>Regular</PrimaryButton>
      <PrimaryButton outline onClick={action("clicked")}>
        Outline
      </PrimaryButton>
      <PrimaryButton small onClick={action("clicked")}>
        Small
      </PrimaryButton>
      <PrimaryButton
        css={`
          display: block;
        `}
        big
        onClick={action("clicked")}
      >
        Big button on mobile
      </PrimaryButton>
    </NewDiv>
  ))
  .add("Secondary", () => (
    <NewDiv>
      <SecondaryButton onClick={action("clicked")}>Regular</SecondaryButton>
      <SecondaryButton outline onClick={action("clicked")}>
        Outline
      </SecondaryButton>
      <SecondaryButton small onClick={action("clicked")}>
        Small
      </SecondaryButton>
    </NewDiv>
  ))
  .add("Regular", () => (
    <NewDiv>
      <Button onClick={action("clicked")}>Regular</Button>
      <Button outline onClick={action("clicked")}>
        Outline
      </Button>
      <Button small onClick={action("clicked")}>
        Small
      </Button>
    </NewDiv>
  ))
  .add("Social Media Button", () => (
    <NewDiv
      css={`
        width: 20%;
        margin-left: 20px;
        flex-direction: column;
        > button {
          margin-top: 20px;
        }
      `}
    >
      <FacebookButton
        icon="facebook2"
        appId="1113079532095710"
        text="Facebook Social Button"
        iconStyle={{ width: "18px", height: "18px" }}
      />
      <FacebookButton
        icon="facebook3"
        transparent
        appId="1113079532095710"
        text="Facebook Social Button"
        iconStyle={{ width: "18px", height: "18px" }}
      />
      <GoogleButton
        icon="google"
        client_id="527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com"
        text="Google Social Button"
        iconStyle={{ width: "18px", height: "18px" }}
      />
      <GoogleButton
        icon="google"
        transparent
        client_id="527492296794-s4k9h629rvi518ddi22lt95pd91uq4fp.apps.googleusercontent.com"
        text="Google Social Button"
        iconStyle={{ width: "18px", height: "18px" }}
      />
    </NewDiv>
  ))
  .add("Button with Icon", () => (
    <NewDiv
      css={`
        width: 20%;
        margin-left: 20px;
        flex-direction: column;
        > button {
          margin-top: 20px;
        }
      `}
    >
      <ButtonWithIcon
        className="email"
        icon="email1"
        primary
        onClick={action("Social media button")}
        iconStyle={{ width: "18px", height: "18px" }}
      >
        Sign up with Email
      </ButtonWithIcon>
      <ButtonWithIcon
        secondary
        small
        right
        icon="email1"
        iconStyle={{ width: "18px", height: "18px" }}
      >
        Small Icon
      </ButtonWithIcon>
    </NewDiv>
  ))
  .add("Loading Button 1", () => (
    <LoadingButton
      onClick={() =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("Hello world");
          }, 3000);
        })
      }
      kind={PrimaryButton}
      big
    >
      Hello world
    </LoadingButton>
  ))
  .add("Loading Button 2", () => (
    <LoadingButton
      onClick={() =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("Hello world");
          }, 3000);
        })
      }
      render={(state, onClick) => {
        return (
          <PrimaryButton disabled={state.loading} onClick={onClick}>
            {state.loading ? "Loading" : "Hello world"}
          </PrimaryButton>
        );
      }}
    />
  ))
  .add("Controlled Loading Button", () => <Controller />);
