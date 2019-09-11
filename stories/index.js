import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
const Button = styled.button`
  background-color: red;
  padding: 10px;
  color: white;
  :hover {
    background-color: pink;
    cursor: pointer;
  }
  :active {
    background-color: blue;
  }
`;
storiesOf("uu", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>😀 😎 👍 💯</button>
  ));
// import "./LandingPages"
