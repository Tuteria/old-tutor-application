import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import jsonData from "../../src/data.json";
import {
  ClientThankYou,
  LocationComponent,
  PageContainer,
  PersonalInfoComponent,
  LessonScheduleComponent,
  ExamSelectionComponent,
  ExamExpectationComponent
} from "../../src/pages/ExamRequestPages";
import groups from "./groups.json";
import { ExamLandingPage } from "../../src/pages/ExternalPages/ExamLandingPage";
import { SecondaryLinkButton } from "../../src/simple/Button";
import { SearchPage } from "./search-page";
const states = jsonData.states.map(x => x.name);

const sampleData = [
  {
    name: "Nsini",
    price: 48000,
    verified: true,
    bio:
      "My name is Nsini, I enjoy meeting people, helping them have an uplifting experience and impacting knowledge. i love reading motivational books, watching action movies, listening to gospel music, eating continental dishes with my favourite subject being literature and government. I am a result oriented person with confident in my ability and constantly innovate to create value.",
    vicinity: "Ikeja",
    city: "Lagos",
    lesson_location: "your home",
    ratings: 4,
    hours_taught: 16,
    headline:
      "Experienced IELTS Instructor with Personalized Teaching Approach",
    education: ["B.Sc. in banking and finance, lagos state university"],
    certifications: [],
    subjects: ["IELTS", "ICAN"],
    help_text:
      "As an experienced IELTS instructor and former staff of the British Council, I use physical approach, an interactive /visual and audio method in lecturing my students, I give them the easy steps of scoring high band in the four modules and also the common mistakes they have to avoid. In addition, I educate them on the general tips about IELTS exams, with this personalized approach I use for my students, it calms their nervousness thereby giving them the courage to go in for the exams and come out with high band scores. These same skills were what I applied to the last 5 students that I tutored before they went in for the exams, and when the results were out, they were all happy.",
    levels: ["Sss", "Undergraduate Adult"],
    image:
      "https://res.cloudinary.com/tuteria/image/upload/c_fill,f_auto,g_faces,h_161,q_85,r_5,w_227/v1515433354/ytg2assnapcwg1snlzzf.jpg",
    years_of_experience: 6
  }
];

let tabs = [
  "About Exam",
  "Exam Expectation",
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
  if (["first_name", "last_name", "email"].includes(field)) {
    return Boolean(state[field]);
  }
  return true;
}
storiesOf("Exam Flow", module)
  .add("Exam Selection Page", () => (
    <PageContainer steps={tabs} current={1}>
      <ExamSelectionComponent
        data={{
          exam: "ielts",
          student_no: 1,
          exam_before: false,
          selections: [],
          purpose: null,
          targeted_score: null
        }}
        groups={groups}
        onSubmit={action("result")}
      />
    </PageContainer>
  ))
  .add("Exam Expectation Page", () => (
    <PageContainer steps={tabs} current={2}>
      <ExamExpectationComponent
        groups={groups}
        data={{
          exam: "IELTS",
          student_no: 1,
          exam_before: false,
          selections: [],
          exam_type: "Academic Test",
          online_lesson: null,
          exam_date: "2018-08-08T11:00:00.000Z",
          purpose: null,
          targeted_score: null,
          expectation: null
        }}
        onSubmit={action("result2")}
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
  //   .add("Upsell Page", () => (
  //     <PageContainer steps={tabs} current={4}>
  //       <UpSellComponent />
  //     </PageContainer>
  //   ))
  .add("Lesson schedule Page Default", () => (
    <PageContainer steps={tabs} current={4}>
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
          discount: 0,
          plan: null
        }}
        onSubmit={action("result 3")}
        planFactors={{ "Plan 1": 1, "Plan 2": 1.5, "Plan 3": 2 }}
        hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
      />
    </PageContainer>
  ))
  .add("Lesson schedule Page Full", () => (
    <PageContainer steps={tabs} current={4}>
      <LessonScheduleComponent
        data={{
          days: ["Monday", "Tuesday", "Wednesday"],
          hours: 1,
          no_of_teachers: 1,
          start_date: "2018-10-25T11:00:00.000Z",
          no_of_weeks: 2,
          per_hour: 2500,
          processing_fee: 3000,
          transport_fare: 0,
          classes: ["hello", "world"],
          discount: 0,
          plan: 3,
          time_of_lesson: "4"
        }}
        onSubmit={action("result 3")}
        planFactors={{ "Plan 1": 1, "Plan 2": 1.5, "Plan 3": 2 }}
        hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
      />
    </PageContainer>
  ))
  .add("IELTS Exam Landing Page", () => (
    <ExamLandingPage
      linkRender={(text, props = { big: true }) => (
        <SecondaryLinkButton {...props} href="/">
          {text}
        </SecondaryLinkButton>
      )}
    />
  ))
  .add("Search Page", () => <SearchPage data={sampleData} />);
