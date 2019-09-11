import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import jsonData from "../../src/data.json";
import {
  AboutUserComponent,
  ClientThankYou,
  LessonScheduleComponent,
  LocationComponent,
  PageContainer,
  PersonalInfoComponent,
  RecommendationComponent,
  UpSellComponent,
  SelectSubjectComponent
} from "../../src/pages/ClientRequestPages";
import { DropdownWithCheckbox } from "../../src/pages/ClientRequestPages/SubjectSelectionComponent";
import { Div, Text } from "../../src/pages/components";
import { ClientLandingPage } from "../../src/pages/ExternalPages/ClientRequestLandingPage";
import { SecondaryLinkButton } from "../../src/simple/Button";
import { xs } from "../../src/siteStyle";
import includes from "lodash/includes";

import groups from "./groups.json";

const states = jsonData.states.map(x => x.name);
let personalInfo = {
  first_name: "Kolawole",
  last_name: "Tioluwani",
  email: "gbozee@gmail.com",
  dob: "07/19/1991",
  phone_number: "8078657912",
  how_you_heard: "2"
};
let tabs = [
  "About Child",
  "Contact Information",
  "Lesson Schedule",
  "Complete Request"
];
let errors = {
  first_name: ["This field is required"],
  last_name: ["Your last name is required"],
  email: ["Your last name is required"],
  combined: "Your first name and last name is invalid",
  phone_number: ["this field is required"],
  phone_combined: ["This field is invalid"]
};
function validateField(state, field, err) {
  if (field === "combined") {
    return !!state.first_name && !!state.last_name;
  }
  if (field === "phone_number") {
    return (
      Boolean(state.phone_number) && isMobilePhone(state.phone_number, "en-NG")
    );
  }
  if (field === "email") {
    return Boolean(state.email) && isEmail(state.email);
  }
  if (field === "phone_combined") {
    return (
      Boolean(state.phone_number) && isMobilePhone(state.phone_number, "en-NG")
    );
  }
  if (includes(["first_name", "last_name", "email"], field)) {
    return Boolean(state[field]);
  }
  return true;
}
storiesOf("Client Request Flow", module)
  .add("About User Page", () => (
    <PageContainer steps={tabs} current={1}>
      <AboutUserComponent
        groups={groups}
        onSubmit={action("Klasses")}
        loading={false}
        classes={[{ class: "Primary 1" }]}
      />
    </PageContainer>
  ))
  .add("Personal Info Page", () => (
    <PageContainer steps={tabs} current={2}>
      <PersonalInfoComponent
        onSubmit={form_data => {
          // startSaving();
          return new Promise((resolve, reject) => {
            console.log(form_data);
            resolve();
          });
        }}
        displayValidation={false}
        defaultValidation={false}
        errors={errors}
        validateField={validateField}
        // data={personalInfo}
        whereYouHeardOptions={[
          { value: "1", text: "TV" },
          { value: "2", text: "Radio" },
          { value: "3", text: "Facebook" },
          { value: "4", text: "LinkedIn" },
          { value: "5", text: "Twitter" },
          { value: "6", text: "Search Engine (Google/Yahoo/Bing)" },
          { value: "7", text: "Friend/Family/Word of Mouth" },
          {
            value: "8",
            text: "SMS Notification"
          },
          { value: "9", text: "LindaIkeji Blog" },
          { value: "10", text: "Nairaland" },
          { value: "11", text: "BellaNaija" },
          { value: "12", text: "Instagram" },
          { value: "14", text: "Youtube" },
          { value: "15", text: "Event" },
          { value: "16", text: "Agent" },
          { value: "13", text: "Others" }
        ]}
      />
    </PageContainer>
  ))
  .add("Thank you Page", () => <ClientThankYou />)
  .add("Location Page", () => (
    <PageContainer steps={tabs} current={2}>
      <LocationComponent
        defaultCoordinate={{ lat: 6.465422, lng: 3.406448 }}
        onSubmit={(fields, errorCallback) => {
          return new Promise((resolve, reject) => {
            console.log(fields);
            setTimeout(() => {
              resolve({ success: {}, error: null });
            }, 5000);
          });
        }}
        customValidation={fields => true}
        states={states}
        data={{}}
        validateField={() => true}
        errors={{
          address: ["This field is required"],
          state: ["Please select a state"],
          vicinity: [
            "Select a vicinity within your state. this could be your lga"
          ],
          area: ["Input a popular busstop within your area."],
          combined_state: ["Please ensure your vicinity is inputed"]
        }}
      />
    </PageContainer>
  ))
  .add("Upsell Page", () => (
    <PageContainer steps={tabs} current={4}>
      <UpSellComponent />
    </PageContainer>
  ))
  .add("Lesson schedule Page", () => (
    <PageContainer steps={tabs} current={3}>
      <LessonScheduleComponent
        data={{
          days: [],
          hours: 1,
          no_of_teachers: 1,
          start_date: null,
          no_of_weeks: null,
          per_hour: 2500,
          processing_fee: 3000,
          transport_fare: 0,
          classes: ["hello", "world"],
          discount: 0
        }}
        checkCoupon={(coupon, callback) => {
          return fetch(`http://localhost:3001/s/api/coupons?coupon=${coupon}`)
            .then(resp => resp.json())
            .then(({ data }) => {
              if (Boolean(data.expiry_date)) {
                callback(parseInt(data.discount, 10));
              } else {
                callback(0);
              }
            })
            .catch(e => callback(0));
        }}
        hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
      />
    </PageContainer>
  ))
  .add("Select subject Page", () => (
    <PageContainer steps={tabs} current={1}>
      <SelectSubjectComponent
        groups={groups}
        data={{
          classes: [
            { class: "Primary 1" },
            { class: "JSS 1" },
            { class: "SSS 1" }
          ]
        }}
        onSubmit={action("SelectPage Data")}
        curriculums={["Nigerian", "British", "American", "Not sure"]}
      />
    </PageContainer>
  ))
  .add("Recommendation ", () => (
    <Div>
      <RecommendationComponent>
        <Text>
          To achieve your goal, we recommend you select at least 2 hours. This
          will allow the tutor spend sufficient time with your child
        </Text>
      </RecommendationComponent>
      <RecommendationComponent
        showBreakdown
        heading="To achieve your goal, we recommend you select at least 2 hours. This
      will allow the tutor spend sufficient time with your child"
      />

      <RecommendationComponent showBreakdown mobile>
        <Text>
          For the best results, we recommend you select at least 3 days
        </Text>
      </RecommendationComponent>
    </Div>
  ))
  .add("Subject Selection", () => (
    <Div
      css={`
        width: 50%;
        @media (max-width: ${xs}px) {
          width: 100%;
        }
      `}
    >
      <DropdownWithCheckbox
        options={[
          {
            group: "Step 1",
            options: Array(10)
              .fill("")
              .map((x, i) => `Option ${i}`)
          },
          {
            group: "Step 2",
            options: Array(10)
              .fill("")
              .map((x, i) => `Option 2${i}`)
          }
        ]}
        label={`Select and Options`}
        values={["Option 3"]}
      />
      <DropdownWithCheckbox
        options={Array(10)
          .fill("")
          .map((x, i) => `Option ${i}`)}
        label={`Select and Options`}
        values={["Option 3"]}
      />
    </Div>
  ))
  .add("Academic Landing Page", () => (
    <ClientLandingPage
      linkRender={(text, props = { big: true }) => (
        <SecondaryLinkButton {...props} href="/">
          {text}
        </SecondaryLinkButton>
      )}
    />
  ));
