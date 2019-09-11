// @ts-nocheck
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import PersonalInfoPage from "../src/pages/PersonalInfoPage";
import PricingPage from "../src/pages/PricingPage";
import AddressPage from "../src/pages/LocationPage";
import QualificationPage, {
  EducationForm,
  WorkExperienceForm
} from "../src/pages/QualificationPage";
import ProfilePicUploadPage from "../src/pages/ProfileUploadPage";
import AboutTutorPage from "../src/pages/AboutTutorPage";
import includes from "lodash/includes";
import {
  PageWrapper as Container,
  SavingContext,
  CurrentApplicationPageContext,
  Page
} from "../src/pages/TutorApplicationUtils";
import jsonData from "../src/data.json";
import { ApplicationTooltip } from "../src/simple";
import { ProgressContext } from "../src/pages/WizardWrapper";
import isMobilePhone from "validator/lib/isMobilePhone";
import { NotificationContext } from "../src/pages/TutorApplicationUtils/PageWrapper";

let example1 = {
  title: "Examples of good title",
  kind: "title",
  content: [
    "Experienced Fashion Design Trainer for More than 10 Years",
    "Expert Software Developer and Python Programmer",
    "Classical Piano Tutor (ABRSM, MUSON) with more than 5 years' experience",
    "Learn the art of speaking and writing German like a German"
  ]
};
let example = {
  title: "Examples of good description (1 of 2)",
  kind: "description",
  content: [
    `I am a very experienced IELTS and IGCSE tutor who uses highly systematic
        and result-oriented approach to help students score very high mark. I
        specialize in teaching the Speaking, Reading, Listening and Writing
        skills to those aiming at Band score of at least 8.0`,
    `By experience, I have taught those who scored in the 9 point range, and
        those who scored in the 7-8 point range. My ideal students are those who
        don't just want to pass the exam, but who are aiming for a high score,
        typically 8.0 and above. That way, we would be able to derive the best
        value from our time together.`,
    `I normally assess each student for their individual needs. I believe in
        making my students feel comfortable and creating an environment good for
        learning by using interesting, challenging and engaging material. One of
        my students, Emem, scored 8.0 overall - 8.5 in Listening, 8.5 in
        Reading, 7.0 in Speaking and 7.0 in Writing. Subsequently, I have taught
        clients who have scored overall band between 8.5 and 9.0.`
  ]
};
const steps = [
  {
    text: "Step 1: Personal Details",
    display: true,
    url: "personal-info",
    completed: false
  },
  {
    display: true,
    text: "Step 2: Credentials & Education",
    url: "qualifications",
    completed: false
  },
  {
    text: "Step 3: Tutor Profile",
    display: true,
    url: "about-tutor",
    completed: false
  },
  {
    text: "Step 4: Create Subjects",
    display: true,
    url: "",
    completed: false
  }
];
let personalInfo = {
  // first_name: "Abiola",
  // last_name: "Oyeniyi",
  // email: "gbozee@example.com",
  // gender: "M",
  // dob: "1990-08-12",
  // country: "US",
  // phone_numbers: [
  //   // {
  //   //   number: "2348160127567",
  //   //   primary: true,
  //   //   verified: true
  //   // }
  // ]
  first_name: "Oyeniyi Abiola",
  last_name: null,
  email: "gbozee@gmail.com",
  dob: "07/19/1991",
  phone_numbers: [],
  country: null,
  gender: null,
  location: null
};
let qualificationData = {
  educations: [
    {
      school: "University of Lagos",
      course: "Systems Engineering",
      degree: "B.Sc",
      country: "ng"
    }
  ],
  workExperiences: [
    {
      name: "University of Lagos",
      role: "Systems Engineering",
      currently_work: false,
      is_private: false
    }
  ]
};
let qualificationErrors = {
  educations: {
    school: ["This field is required"],
    course: ["This field is required"],
    degree: ["Please select a degree"],
    country: ["Select the country where you got the degree"],
    combined: ["There appears to be an error with your degree, country"]
  },
  workExperiences: {
    name: ["This field is required"],
    role: ["This field is required"]
  }
};
const states = jsonData.states.map(x => x.name);
let locationData = {
  // address: "",
  // state: "",
  // vicinity: "",
  // area: ""
};
let countries = [
  {
    text: "Nigeria",
    locale: "ng",
    code: "234"
  }
];
let errors = {
  first_name: ["This field is required"],
  last_name: ["Your last name is required"],
  gender: ["You forgot to place a gender"],
  dob: ["You won't be able to become a tutor on tuteria"],
  day: ["This field is required"],
  country: ["Please this field is required"],
  primary: ["Please insert a valid phone number"],
  secondary: ["Please insert a secondary number"],
  combined: "Your first name and last name is invalid",
  country_combined: "Please check either your country or your number"
};
const personalInfoPromise = form_data =>
  new Promise((resolve, reject) => {
    resolve({
      error: {
        last_name: ["This field is required"],
        combined: ["The last name is required"],
        day: ["invalid date"],
        dob: ["Please select the day in the month"]
      },
      success: {}
    });
  });
function validateField(state, field, err) {
  const validateNumber = (key = true) => {
    let primary = state.phone_numbers.find(x => x.primary === key);
    if (key) {
      return !!primary && isMobilePhone(primary.number, "en-NG");
    }
    return primary ? !!primary && isMobilePhone(primary.number, "en-NG") : true;
  };
  if (field === "combined") {
    return !!state.first_name && !!state.last_name;
  }
  if (field === "primary") {
    return validateNumber();
  }
  if (field === "country_combined") {
    return validateNumber() && !!state.country;
  }
  if (field === "secondary") {
    return validateNumber(false);
  }
  if (includes(["first_name", "last_name", "gender", "country"], field)) {
    return !!state[field];
  }
  if (includes(["day", "month", "year", "dob"], field)) {
    if (typeof state.dob !== "string") {
      if (field !== "dob") {
        let dob = state.dob || {};
        let missing_fields = Object.keys(dob).filter(x => !!dob[x] === false);
        if (missing_fields.length > 0) {
          err.dob = "Some date fields are missing.";
        }
        return !!dob[field];
      }
    }
    return !!state.dob && !isNaN(new Date(state.dob).getTime());
  }
  return true;
}
function validateAboutTutor(state, field, err) {
  if (field === "how_you_heard") {
    return true;
  }
  if (field === "profile_title") {
    return (
      !!state[field] && state[field].length > 0 && state[field].length <= 80
    );
  }
  if (field === "profile_description") {
    return (
      !!state[field] && state[field].length > 120 && state[field].length <= 500
    );
  }
  return state[field] !== undefined;
}
function validatePricing(state, field, err) {
  if (field === "price") {
    return !!state[field] && parseInt(state[field], 10) > 500;
  }
  if (field === "discount") {
    return Number.isInteger(state[field]);
  }
  return !!state[field];
}
class Helper extends React.Component {
  componentDidMount() {
    this.props.updateCurrent(this.props.title);
  }
  render() {
    return this.props.children;
  }
}
class MockPromise extends React.Component {
  state = {
    loading: false
  };
  updateState = loading => {
    this.setState({ loading });
  };
  render() {
    return this.props.render(this.state.loading, this.updateState);
  }
}
storiesOf("Tutor Application Pages", module)
  .add("Personal Info Page", () => (
    <Container steps={steps} current="personal-info">
      {/* <Page steps={steps}> */}
      <SavingContext.Consumer>
        {({ startSaving, stopSaving }) => (
          <MockPromise
            render={(loading, updateState) => (
              <NotificationContext.Consumer>
                {({ toggleNotification }) => (
                  <PersonalInfoPage
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
                    section="personal-info"
                    data={personalInfo}
                    loading={loading}
                    onSubmit={form_data => {
                      // startSaving();
                      return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          console.log(form_data);
                          resolve({
                            error: {
                              last_name: ["This field is required"],
                              combined: ["The last name is required"],
                              day: ["invalid date"],
                              dob: ["Please select the day in the month"]
                            },
                            success: {}
                          });
                          updateState(false);
                          toggleNotification({
                            text: "Personal Info saved",
                            kind: "success"
                          });
                          // stopSaving();
                        }, 1000);
                      });
                    }}
                    defaultValidation={false}
                    // customValidation={fields => true}
                    validateField={validateField}
                    // validateField={() => true}
                    errors={errors}
                    countries={countries}
                  />
                )}
              </NotificationContext.Consumer>
            )}
          />
        )}
      </SavingContext.Consumer>
    </Container>
  ))
  .add("Personal Info Page with Errors", () => (
    <Container steps={steps} current="personal-info">
      <PersonalInfoPage
        section="personal-info"
        data={personalInfo}
        onSubmit={personalInfoPromise}
        displayValidation={true}
        errors={errors}
        validateField={validateField}
        countries={countries}
      />
    </Container>
  ))
  .add("Location Page", () => (
    <Container steps={steps}>
      <MockPromise
        render={(loading, updateState) => (
          <AddressPage
            section="personal-info"
            loading={loading}
            defaultCoordinate={{ lat: 6.465422, lng: 3.406448 }}
            data={locationData}
            onSubmit={(fields, errorCallback) => {
              updateState(true);
              return new Promise((resolve, reject) => {
                console.log(fields);
                setTimeout(() => {
                  resolve({ success: {}, error: null });
                  updateState(false);
                }, 5000);
              });
            }}
            customValidation={fields => true}
            states={states}
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
        )}
      />
    </Container>
  ))
  .add("AboutTutor Page", () => (
    <Container steps={steps}>
      <MockPromise
        render={(loading, updateState) => (
          <AboutTutorPage
            section="about-tutor"
            examples={[
              example,
              {
                ...example,
                title: "Examples of good description (2 of 2)"
              },
              example1
            ]}
            loading={loading}
            onSubmit={fields => {
              updateState(true);
              new Promise((resolve, reject) => {
                console.log(fields);
                setTimeout(() => {
                  resolve({ success: {}, error: null });
                  updateState(false);
                }, 5000);
              });
            }}
            defaultValidation={true}
            previousPage={action("go to previous page")}
            mobilePreviousPage={action("mobile previous page")}
            descriptionLabel={{
              mobile: "Professional Description",
              desktop: "Write a brief professional description of yourself"
            }}
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
            validateField={validateAboutTutor}
            proDescription={`Describe your teaching experience, skills and track record`}
            data={{
              phone_numbers: []
              // years_of_experience: 3,
              // online_experience: false,
              // profile_title: "An experienced Tutor",
              // profile_description: "I have taught a number of well meaning tutors."
            }}
            errors={{
              years_of_experience: ["this field is required"],
              online_experience: ["this field is required"],
              profile_title: ["this field is required"],
              profile_description: ["this field is required"]
            }}
          />
        )}
      />
    </Container>
  ))
  .add("Pricing Page", () => (
    <ProgressContext.Provider value={{ progress: 20 }}>
      <Container steps={steps}>
        <MockPromise
          render={(loading, updateState) => (
            <PricingPage
              section="about-tutor"
              validateField={validatePricing}
              loading={loading}
              priceTip={
                <ApplicationTooltip icon="naira" heading="Price Tip">
                  <p>Tutors who teach Adobe Illustrator typically charge:</p>
                  <h4 style={{ color: "#36b37e" }}>N3,600/hr</h4>
                  <p>
                    <span className="asterick">*</span>
                    Be sure to set a fair competitive price so clients can pick
                    you.
                  </p>
                </ApplicationTooltip>
              }
              data={{
                // price: 3000,
                // discount: "10",
                adminPercent: 30
              }}
              defaultValidation={false}
              errors={{
                price: ["Please state your charge per hour"],
                discount: ["Please select a discount to apply"]
              }}
              onSubmit={fields => {
                updateState(true);
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    console.log(fields);
                    resolve({ success: {}, error: null });
                    updateState(false);
                  }, 5000);
                });
              }}
              previousPage={action("go to previous page")}
            />
          )}
        />
      </Container>
    </ProgressContext.Provider>
  ))
  .add("Qualification Page", () => (
    <Container steps={steps}>
      <MockPromise
        render={(loading, updateState) => (
          <QualificationPage
            section="qualifications"
            errors={qualificationErrors}
            previousPage={() => {}}
            loading={loading}
            educationDisplay={(text, country, formset) => (
              <React.Fragment>
                <h2 className="">
                  {text.text} ({formset.degree})
                </h2>
                <p className="">
                  {formset.school} | {country.text}
                </p>
              </React.Fragment>
            )}
            workExperienceDisplay={formset => (
              <React.Fragment>
                <h2 className="">{formset.name}</h2>
                <p className="">
                  {formset.role}
                  {formset.currently_work ? " | Currently Working" : ""}
                </p>
              </React.Fragment>
            )}
            data={qualificationData}
            degrees={[{ value: "B.Sc", text: "Bachelor of Science" }]}
            countries={[{ text: "Nigeria", locale: "ng" }]}
            form_fields={{
              educations: ["school", "course", "degree", "country"],
              workExperiences: ["name", "role"]
            }}
            onSubmit={data => {
              updateState(true);
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(data);
                  resolve({ success: {}, error: null });
                  updateState(false);
                }, 5000);
              });
            }}
          />
        )}
      />
    </Container>
  ))
  .add("Image Upload Page", () => (
    <Container steps={steps}>
      <MockPromise
        render={(loading, updateState) => (
          <ProfilePicUploadPage
            section="about-tutor"
            loading={loading}
            image={null}
            previousPage={() => {}}
            onSubmit={data => {
              updateState(true);
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(data);
                  resolve({ success: {}, error: null });
                  updateState(false);
                }, 5000);
              });
            }}
          />
        )}
      />
    </Container>
  ))
  .add("EducationComponent", () => (
    <EducationForm
      updateFields={action("eudcationAction")}
      errors={{}}
      state={{}}
      degrees={[{ value: "B.Sc", text: "Bachelor of Science" }]}
      countries={[{ text: "Nigeria", locale: "ng" }]}
    />
  ))
  .add("Work Experience Component", () => (
    <WorkExperienceForm
      errors={{}}
      state={{}}
      updateFields={action("workExperienceAction")}
    />
  ));
