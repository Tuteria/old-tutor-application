import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import { Heading, Text } from "../src/simple/Text";
import { Div } from "../src/primitives/index";
const NewDiv = styled(Div)`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: space-around;
`;

storiesOf("Text", module)
  .add("Big Heading", () => (
    <NewDiv>
      <Heading big>This is a big heading</Heading>
      <Heading big color="red">
        This is a big red heading
      </Heading>
      <Heading
        moderate
        css={`
          text-align: center;
        `}
      >
        This is a moderate text centered
      </Heading>
    </NewDiv>
  ))
  .add("Regular Heading", () => (
    <NewDiv>
      <Heading>This is a regular heading</Heading>
      <Heading tag="h2">This is an h2 heading</Heading>
    </NewDiv>
  ))
  .add("Regular Text", () => (
    <NewDiv>
      <Text>This is a regular text</Text>
      <Text bold>This is a bold text</Text>
      <Text
        big
        css={`
          margin-top: 20px;
        `}
      >
        Big Text with 20px margin-top spacing
      </Text>
      <Text moderate>Moderate Text </Text>
    </NewDiv>
  ));
