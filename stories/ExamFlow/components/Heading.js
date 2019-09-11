import React from "react";
import styled from "styled-components";
import Icon from "../../../src/simple/Icon";
import { Heading, Text } from "../../../src/simple/Text";
import { color } from "../../../src/design-systems";

export const panelSharedStyles = `
margin-bottom: 20px;
padding: 15px 20px;
background-color: #fff;
border-radius: 4px;
-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);`;

const HeadingStyle = styled.div`
  .panel {
    ${panelSharedStyles};
    padding: 32px 48px;
    border: none !important;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .panel__text-section {
    max-width: 560px;
    margin-left: 32px;
    @media (max-width: 768px) {
      text-align: center;
      margin-left: 0;
    }
  }
`;

export const Header = () => (
  <HeadingStyle>
    <div className="panel">
      <div className="panel__icon-section">
        <Icon name="success-rate" />
      </div>
      <div className="panel__text-section">
        <Heading>Book IELTS Lessons</Heading>
        <Text color={color.gray.primary}>
          <span>2 tutors</span> match your search. Select your preferred tutor
          from the options below and proceed to book lessons. Up to 10% discount
          available!
        </Text>
      </div>
    </div>
  </HeadingStyle>
);

export const Bottom = () => (
  <HeadingStyle>
    <div className="panel">
      <div className="panel__icon-section">
        <Icon name="success-rate" />
      </div>
      <div className="panel__text-section">
        <Heading color={color.green.primary}>We're here to help!</Heading>
        <Text color={color.gray.primary}>
          Call our Customer Support now for 1-on-1 guidance: (+234)-9094526878
        </Text>
      </div>
    </div>
  </HeadingStyle>
);
