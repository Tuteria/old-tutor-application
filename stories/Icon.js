import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import { Heading, Text } from "../src/simple/Text";
import Icon from "../src/simple/Icon";
import { Div } from "../src/primitives/index";

const NewDiv = styled(Div)`
  display: grid;
  padding-left: 10px;
  padding-top: 20px;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: 120px;
  svg{
      display:block;
  }

  }
`;
const all_icons = [
  "bulb",
  "lightbulb-o",
  "check",
  "naira",
  "arrows-v",
  "check-circle",
  "chevron-up",
  "chevron-down",
  "chevron-right",
  "chevron-left",
  "edit",
  "exclamation-circle",
  "world-pin",
  "pencil",
  "delete",
  "close",
  "calender",
  "select",
  "document-time",
  "time",
  "align-left",
  "calendar",
  "leftArrow",
  "watch",
  "refresh",
  "image",
  "list",
  "lock",
  "phone",
  "facebook",
  "facebook2",
  "facebook3",
  "fancyIcon",
  "linkedIn",
  "linkedin",
  "googlePlus",
  "google",
  "email",
  "email1",
  "emailSolid",
  "phoneSolid",
  "fbSimple",
  "checked",
  "shield",
  "moneybag",
  "handshake",
  "lesson",
  "subjects",
  "tutors",
  "wallet",
  "tuteria-trust",
  "tuteria-payment",
  "tuteria-teach",
  "exam-book",
  "exam-target",
  "exam-calender",
  "heart",
  "help",
  "user",
  "time",
  "plus",
  "arrow-left",
  "rotate",
  "upload-monitor",
  "quality-tutor",
  "safe-and-trusted",
  "tailored-to-child",
  "circular-shield",
  "open-book",
  "three-up-arrows",
  "open-book-2",
  "abc",
  "home-school",
  "special-user",
  "five-stars",
  "verified",
  "nigeria-flag",
  "shield-2",
  "shield-3",
  "clp-email",
  "clp-phone",
  "circle-n",
  "customer-care",
  "study-material",
  "schedule",
  "best-in-class",
  "success-rate",
  "diamond-icon",
  "whatsapp",
  "pin",
  "ticket",
  "award",
  "fancy-check"
];
storiesOf("Icons", module).add("All Icons", () => (
  <NewDiv>
    {all_icons.map((icon, index) => (
      <span>
        <Icon name={icon} key={index} color={"#000"} full />
        {icon}
      </span>
    ))}
  </NewDiv>
));
