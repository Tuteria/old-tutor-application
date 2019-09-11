import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button, { PrimaryButton } from "../src/simple/Button";
import AutoSelect, { AsyncAutoSelect } from "../src/simple/AutoSelect";
import {
  DateWithStateComponent as DateComponent,
  InputComponent,
  CheckboxComponent,
  RadioComponent,
  DropdownComponent,
  TextareaComponent,
  PhoneNumberComponent,
  IncrementComponent
} from "../src/form";
import { spacing } from "../src/siteStyle";
import { Select, Option } from "../src/simple/Select";
import { Div } from "../src/primitives/index";
import { InputAddon } from "../src/simple/InputAddon";
import SFlag from "../src/simple/Flag";
import ToggleSwitch from "../src/simple/ToggleSwitch";

storiesOf("Form Fields", module)
  .add("Input", () => (
    <Div>
      <Div>
        <InputComponent
          error={true}
          error_message="This field is required."
          placeholder="Input placeholder"
        />
      </Div>
      <Div>
        <InputComponent label="Input with label" />
      </Div>
      <Div>
        <InputComponent
          label="Text Label"
          success
          showIcon
          small
          placeholder="Text with Icon"
        />
      </Div>
      <Div>
        <InputComponent
          label="With Password"
          type="password"
          placeholder="*****"
        />
      </Div>
    </Div>
  ))
  .add("Select", () => (
    <Div
      css={`
        > div {
          margin-bottom: 10px;
        }
      `}
    >
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        label="Select an Option"
        value="Option 3"
      />
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        label="Select an Option"
        value="Option 3"
        error={true}
      />
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        direction="up"
        label="Select an Option"
        value="Option 3"
        error={true}
      />
    </Div>
  ))
  .add("Checkbox and Radio", () => (
    <Div
      css={`
        display: flex;
        flex-direction: column;
        & > div {
          margin-bottom: 20px;
        }
      `}
    >
      <CheckboxComponent
        style={{ marginTop: "0.5rem" }}
        checked={true}
        onChange={action("checked")}
        text="I’d like to receive marketing and policy communication from Tuteria and it’s partners."
      />
      <CheckboxComponent
        style={{ marginTop: "0.5rem" }}
        checked={false}
        onChange={action("onchecked")}
        text="I’d like to receive marketing and policy communication from Tuteria and it’s partners."
      />
      <CheckboxComponent
        style={{ marginTop: "0.5rem" }}
        checked={true}
        big
        onChange={action("onchecked")}
        text="I’d like to receive marketing and policy communication from Tuteria and it’s partners."
      />
      <CheckboxComponent
        style={{ marginTop: "0.5rem" }}
        checked={false}
        big
        onChange={action("onchecked")}
        text="I’d like to receive marketing and policy communication from Tuteria and it’s partners."
      />
      <RadioComponent
        label="Horizontal layout of options"
        options={["Yes", "No"]}
        value="Yes"
        onChange={action("onchecked")}
      />
      <RadioComponent
        label="Array of objects as options"
        options={[{ value: "M", text: "Male" }, { value: "F", text: "Female" }]}
        value="F"
        onChange={action("onchecked")}
      />
      <RadioComponent
        label="Inline Layout of Label and options"
        inline
        options={["Yes", "No"]}
        value="Yes"
        onChange={action("onchecked")}
      />
    </Div>
  ))
  .add("TextArea", () => (
    <TextareaComponent label="With Password" placeholder="*****" />
  ))
  .add("Input Addon", () => (
    <Div
      css={`
        > div {
          margin-bottom: 10px;
        }
      `}
    >
      <InputComponent
        label="Text Label"
        success
        // showIcon
        placeholder="Input Addon Component with regular text"
        addonComponent={<div>+234</div>}
      />
      <InputComponent
        label="Text Label"
        success
        // showIcon
        error
        placeholder="Input Addon Component with regular text"
        addonComponent={<div>+234</div>}
      />
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        label="Select an Option"
        addonComponent={<SFlag name="ng" />}
        value="Option 3"
      />
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        label="Select an Option"
        addonComponent={<SFlag name="ng" />}
        error
        value="Option 3"
      />
      <DropdownComponent
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={action("on select changed")}
        label="Select an Option"
        addonComponent={<SFlag name="ng" />}
        value=""
      />
    </Div>
  ))
  .add("AutoSelect", () => (
    <Div>
      <AutoSelect
        label="Sample Select"
        promptText="Create Option "
        placeholder="Vicinity..."
        onChange={action("clicked")}
        items={["apple", "pear", "orange", "grape", "banana"]}
      />
      <AsyncAutoSelect
        label="Sample Select"
        promptText="Create Option "
        placeholder="Vicinity..."
        data={["apple", "pear", "orange", "grape", "banana"]}
        onChange={action("changed")}
        getData={dd =>
          new Promise((resolve, reject) => {
            if (dd.startsWith("uno")) {
              resolve(["unologo", "unologic", "unolatin", "unoibadan"]);
            }
          })
        }
      />
    </Div>
  ))
  .add("Date Component", () => (
    <Div
      css={`
        margin-top: 30px;
        width: 50%;
        & > div {
          margin-bottom: 10px;
        }
      `}
    >
      <DateComponent
        label="Date of Birth"
        fieldHasError={() => false}
        updateDate={action("update date")}
        dob={{}}
      />
      <DateComponent
        label="Date of Birth"
        onChange={data => console.log(data)}
        value={""}
        error
        field_name="dob"
        errors={{
          day: ["The day is missing"],
          // month: ["The month is missing"],
          year: ["The year is missing"],
          dob: ["Please check the date."]
        }}
      />
    </Div>
  ))
  .add("Toggle Switch", () => (
    <ToggleSwitch defaultChecked={true} onChange={action("controlled")} />
  ))
  .add("Phone Number Field", () => (
    <PhoneNumberComponent
      label="Phone Number"
      countryCode="234"
      value="0807732232"
      updateText={action("update text")}
    />
  ))
  .add("Increment Component", () => {
    return <IncrementComponent />;
  });
