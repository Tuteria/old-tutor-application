import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { QualificationComponent } from "../src/compound/FormsetContainer";
import { EditableFormContainer } from "../src/compound/EditableFormContainer";
import "../src/fonts/index";
import { Div } from "../src/primitives";
storiesOf("EditableFormContainer", module)
  .add("CollapsedSection", () => (
    <Div
      css={`
        width: 70%;
        @media (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <EditableFormContainer
        isOpen={false}
        heading="Bachelor of Science (B.Sc)"
        subtitle="University of Benin | Nigeria"
        onEdit={action("edit")}
        onDelete={action("deleted")}
      />
    </Div>
  ))
  .add("ColappsedSection as with Image", () => (
    <Div
      css={`
        width: 70%;
        @media (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <EditableFormContainer
        isOpen={false}
        image="/static/img/profile/exhibit.png"
        heading="Bachelor of Science (B.Sc)"
        subtitle="University of Benin | Nigeria"
        onEdit={action("edit")}
        onDelete={action("deleted")}
      />
    </Div>
  ))
  .add("OpenSection", () => (
    <Div
      css={`
        margin: 0 auto;
        width: 70%;
        @media (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <EditableFormContainer
        isOpen={true}
        heading="Bachelor of Science (B.Sc)"
        subtitle="University of Benin | Nigeria"
        handleSubmit={action("submit")}
        handleCancel={action("cancel")}
      >
        <div />
      </EditableFormContainer>
    </Div>
  ))
  .add("QualificationComponent", () => (
    <QualificationComponent
      heading="Bachelor of Science (B.Sc)"
      formId="educations"
      subtitle="University of Benin | Nigeria"
      onEditItem={action("edit")}
      cancelAction={action("cancel")}
    />
  ))
  .add("QualificationComponent with Image", () => (
    <QualificationComponent
      heading="Bachelor of Science (B.Sc)"
      formId="educations"
      image="/static/img/profile/exhibit.png"
      subtitle="University of Benin | Nigeria"
      onEditItem={action("edit")}
      cancelAction={action("cancel")}
    />
  ));
