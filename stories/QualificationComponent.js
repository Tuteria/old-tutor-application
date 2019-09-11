import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  QualificationComponent,
  Formset
} from "../src/compound/FormsetContainer";
import { InputComponent } from "../src/form";
import "../src/fonts/index";
import {
  EducationForm,
  WorkExperienceForm
} from "../src/pages/QualificationPage";

import { PricingForm } from "../src/pages/PricingPage/PricingForm";

class DemoComponent extends React.Component {
  render() {
    return (
      <div>
        <Formset
          data={[
            {
              school: "University of Lagos",
              course: "Systems Engineering",
              degree: "B.Sc",
              country: "ng"
            }
          ]}
          form_fields={["school", "course", "degree", "country"]}
          errors={{
            school: ["This field is required"],
            course: ["This field is required"],
            degree: ["Please select a degree"],
            country: ["Select the country where you got the degree"]
          }}
          onSubmit={data => {}}
          render={formset => (
            <React.Fragment>
              <h2 className="">Bachelor of Science ({formset.degree})</h2>
              <p className="">{formset.school} | Nigeria</p>
            </React.Fragment>
          )}
          ref={node => (this.node = node)}
          addText="Add another School"
          formElement={EducationForm}
        />
        {this.props.children(() => this.node)}
      </div>
    );
  }
}

storiesOf("QualificationComponent", module)
  .add("QualificationComponent", () => (
    <QualificationComponent
      heading="Bachelor of Science (B.Sc)"
      formId="educations"
      subtitle="University of Benin | Nigeria"
      onEditItem={action("edit")}
      cancelAction={action("cancel")}
    >
      <InputComponent
        label="Text Label"
        success
        showIcon
        placeholder="Text with Icon"
      />
    </QualificationComponent>
  ))
  .add("FormsetItem", () => {
    const degrees = [{ value: "B.Sc", text: "Bachelor of Science" }];
    const countries = [{ text: "Nigeria", locale: "ng" }];
    return (
      <Formset
        data={[]}
        form_fields={["school", "course", "degree", "country"]}
        errors={{
          school: ["This field is required"],
          course: ["This field is required"],
          degree: ["This field is required"],
          country: ["This field is required"]
        }}
        onSubmit={data => data}
        formProps={{ degrees, countries }}
        render={formset => {
          let text = degrees.find(x => x.value === formset.degree);
          let country = countries.find(x => x.locale === formset.country);
          return (
            <React.Fragment>
              <h2 className="">
                {text.text} ({formset.degree})
              </h2>
              <p className="">
                {formset.school} | {country.text}
              </p>
            </React.Fragment>
          );
        }}
        addText="Add another School"
        formElement={EducationForm}
      />
    );
  })
  .add("WorkExperience Formset", () => {
    return (
      <Formset
        data={[]}
        form_fields={["name", "role"]}
        errors={{
          name: ["This field is required"],
          role: ["This field is required"]
        }}
        onSubmit={data => {
          return data;
        }}
        onCreate={{ is_private: false, currently_work: false }} // validateFunc={fields => ["name", "role"].reduce()}
        render={formset => (
          <React.Fragment>
            <h2 className="">{formset.name}</h2>
            <p className="">
              {formset.role}
              {formset.currently_work ? " | Currently Working" : ""}
            </p>
          </React.Fragment>
        )}
        addText="Add another Work Experience"
        formElement={WorkExperienceForm}
      />
    );
  })
  .add("Pricing Form", () => (
    <PricingForm
      state={{
        price: "",
        discount: "",
        adminPercent: 30
      }}
      updateFields={action("updateFields")}
    />
  ));
