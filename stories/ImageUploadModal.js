import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import "../src/fonts/index";
import { Div } from "../src/primitives";
import { spacing } from "../src/siteStyle";
import { ImageModal, ImageUpload } from "../src/pages/ProfileUploadPage";

storiesOf("QualificationComponent", module)
  .add("Modal", () => (
    <ImageModal image="/static/img/profile/francis.png" showModal={true} />
  ))
  .add("UploadArea", () => (
    <ImageUpload image="/static/img/profile/francis.png" />
  ));
