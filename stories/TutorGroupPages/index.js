import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { NavBar } from "../../src/compound/Navigation";
import { LessonScheduleComponent } from "../../src/pages/TutorGroupPages/LessonScheduleComponent";
import {
  PaymentPageComponent,
  PaystackButton2,
  Button
} from "../../src/pages/TutorGroupPages/PaymentPageComponent";
import { GroupLandingPage } from "../../src/pages/ExternalPages/GroupLandingPage";
import {
  processData,
  orderByLocation,
  formatReactStaticData,
  getTutorDetails
} from "../../src/pages/ExternalPages/GroupLandingPage/utils";
import groups from "../ExamFlow/groups.json";
import data from "../../src/pages/ExternalPages/GroupLandingPage/data.json";
import { PersonalInfoPage } from "../../src/pages/TutorGroupPages/PersonalInfoPage";
let FETCHED_DATA = processData(data);

let payment_details = {
  paystack: {
    amount: "4000",
    order: "MCYN9OWEOBWA",
    currency: "ngn",
    base_country: "NG",
    description: "Gold Flower",
    discount: 0,
    thumbnail:
      "https://res.cloudinary.com/careerlyft/image/upload/v1533884824/Gold_Flower.jpg",
    user_details: {
      first_name: "Abiola",
      last_name: "Oyeniyi",
      country: "Nigeria",
      email: "gbozee@gmail.com",
      phone_number: "2347035209976",
      contact_address: "Av. Corrientes 2085Nigeria",
      networks: [],
      quickbooks_customer_details: {},
      level: "Graduate",
      key: "pk_test_3f76b7ddac49c6e97f490292425c14708df96c68",
      redirect_url:
        "https://payment.careerlyft.com/paystack/verify-payment/MCYN9OWEOBWA/?amount=400000",
      kind: "paystack",
      js_script: "https://js.paystack.co/v1/inline.js"
    },
    paid: false
  }
};
let students = [
  {
    name: "Adeyinka Chukwudi Musa",
    location: {
      area: "lbs",
      state: "Lagos",
      address: "Ajah ",
      vicinity: "Ajah"
    },
    personal_info: {
      email: "florenkol@yahoo.com",
      last_name: "okoh",
      first_name: "lisa",
      phone_number: "2348183877856",
      how_you_heard: "Search Engine (Google/Yahoo/Bing)"
    },
    subjects: [
      {
        pk: 1,
        skill_name: "English Language",
        days: ["Monday", "Tuesday", "Wednesday"],
        time: "5:00 PM",
        duration: 4,
        hours: 2,
        per_hour: 2500,
        earning_rate: 0.75
      },
      {
        pk: 8,
        skill_name: "Mathematics",
        days: ["Thursday", "Friday"],
        time: "7:00 PM",
        hours: 2,
        duration: 4,
        per_hour: 4500,
        earning_rate: 0.8,
        location: {
          area: "lbs",
          state: "Lagos",
          address: "Ajah ",
          vicinity: "Ajah"
        },
        personal_info: {
          email: "florenkol@yahoo.com",
          last_name: "okoh",
          first_name: "lisa",
          phone_number: "2348183877856",
          how_you_heard: "Search Engine (Google/Yahoo/Bing)"
        }
      }
    ]
  },
  {
    name: "Segun Adebayo",
    location: {
      area: "lbs",
      state: "Lagos",
      address: "Ajah ",
      vicinity: "Ajah"
    },
    personal_info: {
      email: "florenkol@yahoo.com",
      last_name: "okoh",
      first_name: "lisa",
      phone_number: "2348183877856",
      how_you_heard: "Search Engine (Google/Yahoo/Bing)"
    },
    subjects: [
      {
        pk: 2,
        skill_name: "Mathematics",
        days: ["Thursday", "Tuesday", "Wednesday"],
        time: "7:00 PM",
        hours: 2,
        duration: 4,
        per_hour: 3500,
        earning_rate: 0.8
      }
    ]
  }
];
storiesOf("Tutor Group Pages", module)
  .add("Book Lessons Page Default", () => (
    <React.Fragment>
      <NavBar />
      <LessonScheduleComponent
        data={{
          per_hour: 2500,
          processing_fee: 0,
          transport_fare: 0,
          exam: "ielts",
          hours: 1,
          // classes: ["hello", "world"],
          discount: 0
          // status: "completed",
        }}
        students={students}
        onSubmit={action("result 3")}
        // hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
        hourFactors={[]}
      />
    </React.Fragment>
  ))
  .add("Lesson Page Rebook Generic", () => (
    <React.Fragment>
      <NavBar />
      <LessonScheduleComponent
        display_subjects={false}
        selected_subject={`Mathematics`}
        data={{
          per_hour: 2500,
          processing_fee: 0,
          transport_fare: 0,
          exam: "ielts",
          hours: 1,
          // classes: ["hello", "world"],
          discount: 0
        }}
        students={students}
        onSubmit={action("result 3")}
        // hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
        hourFactors={[]}
      />
    </React.Fragment>
  ))
  .add("Lesson Page Rebook Modal", () => (
    <React.Fragment>
      <NavBar />
      <LessonScheduleComponent
        display_subjects={false}
        selected_subject={`Mathematics`}
        data={{
          per_hour: 2500,
          processing_fee: 0,
          transport_fare: 0,
          exam: "ielts",
          hours: 1,
          student: "Segun Adebayo",
          tutor_skill: "5:00 PM",
          days: ["Tuesday", "Friday"],
          // classes: ["hello", "world"],
          discount: 0
          // status: "completed",
        }}
        students={students}
        onSubmit={action("result 3")}
        // hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
        hourFactors={[]}
        student={"Jamie Novac"}
        status={`completed`}
      />
    </React.Fragment>
  ))
  .add("Payment Page", () => (
    <React.Fragment>
      <NavBar />
      <PaymentPageComponent
        data={{
          per_hour: 2500,
          processing_fee: 0,
          transport_fare: 0,
          exam: "ielts",
          hours: 1,
          // classes: ["hello", "world"],
          discount: 0
          // status: "completed",
        }}
        lessonPlan={{
          type: "Extended",
          description: "Everyday lessons ideal for intense preparation",
          amount: "58000",
          bullets: [
            "Mondays to Fridays 4pm - 8pm",
            "15 Lessons (5 days/week)",
            "1 Free Mock Exam"
          ],
          highlights: [
            "Mondays to Fridays 4pm-8pm",
            "15 Lessons (5 days/week)",
            "1 Free Mock Exam"
          ]
        }}
        payment_details={payment_details.paystack}
        schedule={{
          startDate: new Date("2018-12-17T00:00+01:00"),
          endDate: new Date("2019-01-04T00:00+01:00"),
          summary: "December class"
        }}
        students={students}
        onSubmit={action("result 3")}
        // hourFactors={[{ hour: "1", factor: 50 }, { hour: "1.5", factor: 25 }]}
        hourFactors={[]}
        banks={[
          {
            logo: "static/img/banks/UBA-PAY.png",
            account_number: "2105752789"
          },
          {
            logo: "static/img/banks/GTB-PAY.jpg",
            account_number: "0266765638"
          },
          {
            logo: "static/img/banks/zenith.png",
            account_number: "1015484047"
          }
        ]}
      />
    </React.Fragment>
  ))
  .add("Paystack button", () => (
    <PaystackButton2
      render={onClick => {
        return (
          <Button
            style={{ flex: 1 }}
            type="button"
            full_width
            buttonClass={"btn green block"}
            onClick={() => {
              onClick();
            }}
            showSpinner
            loadingText="Processing"
            is={{ fetching: false }}
          >
            Paystack
          </Button>
        );
      }}
      data={payment_details.paystack}
    />
  ))

  .add("Landing Page for Group Lesson", () => {
    let data = formatReactStaticData(FETCHED_DATA);
    let newSkills = data[2];
    console.log("New skills", data);
    return (
      <GroupLandingPage
        {...newSkills}
        // faq={FETCHED_DATA.faqs}
        // faq2={FETCHED_DATA.faq2s}
        // data={newSkills[0]}
        // remainingSlot={4}
      />
    );
  })
  .add("Personal Info Page", () => (
    <PersonalInfoPage data={{ exam: "ielts" }} />
  ));
