import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled, { css } from "styled-components";
import { Div } from "../src/primitives";
import {
  InputComponent,
  DropdownComponent,
  MultiselectComponent,
  RadioComponent,
  getCompontentForQuestion,
  FormsetComponent
} from "../src/pages/SubjectDetailsPage/question-types";
import {
  getPrefix,
  generateQuestionErrorMessages
} from "./ApplicationPages/detail/utils";
import { Formset } from "../src/pages/components";
import { WorkExperienceForm } from "../src/pages/QualificationPage";
import { PortfolioForm } from "../src/pages/SubjectDetailsPage/question-types/FormsetComponent";
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        questions: this.props.ddd || {}
      },
      dependants: {},
      display_error: true
    };
    this.formsetRef = {
      training: null,
      award: null,
      q: null
    };
    this.componentFunc = getCompontentForQuestion(
      this,
      this.setState.bind(this),
      this.formsetRef
    );
    this.listener = this.listener.bind(this);
  }
  listener(data) {
    console.log(this.state);
    this.formsetRef.training.handleSubmit();
  }
  render() {
    const { question, index = 0, depends, prefix = "" } = this.props;
    return (
      <React.Fragment>
        {this.componentFunc(question, index, depends, prefix)}
        <button onClick={this.listener}>Submit</button>
      </React.Fragment>
    );
  }
}
storiesOf("Subject detail question types", module)
  .add("InputComponent", () => {
    let question = {
      name: "Regular Input",
      extra: { placeholder: "Sample placeholder" }
    };
    const Input1 = InputComponent(question)(
      "Sample Text",
      action("onChange"),
      () => false
    );
    const Input2 = InputComponent({
      ...question,
      name: "Search Input",
      extra: {
        ...question.extra,
        saved_list: ["Unilage", "Abuja"],
        autocomplete: true
      }
    })(
      [
        "Rivers",
        "Lagos",
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008"
      ],
      action("onChange"),
      () => false
    );
    return (
      <Div
        css={`
          width: 30%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          & > div {
            margin-bottom: 30px;
          }
        `}
      >
        {Input1}
        {Input2}
      </Div>
    );
  })
  .add("DropdownComponent", () => {
    let question = {
      extra: {},
      name: "Dropdown 1",
      options: ["Just starting", 10, "year"]
    };
    const Dropdown1 = DropdownComponent(question)();
    const Dropdown2 = DropdownComponent({
      secondary: {
        input: "What is my name"
      },
      options: ["First", "Second", "Third", "Forth"],
      useDefault: true,
      name: "This is a dropdown"
    })({ value: "Third", value2: "Hello 2" }, action("Data"));
    const Dropdown3 = DropdownComponent({
      secondary: {
        options: [
          {
            text: "Impressive",
            value: "90% and above"
          },
          {
            text: "Good",
            value: "70 - 89%"
          },
          {
            text: "Average",
            value: "50 - 69%"
          },
          {
            text: "Below Average",
            value: "40 - 49%"
          },
          {
            text: "Not Good",
            value: "39% and below"
          }
        ],
        label: "Child’s current performance"
      },
      options: ["First", "Second", "Third", "Forth"],
      useDefault: true,
      name: "This is a dropdown"
    })({ value: "Third", value2: "70 - 89%" }, action("Data2"));
    return (
      <Div
        css={`
          width: 60%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          & > div {
            margin-bottom: 30px;
          }
        `}
      >
        {Dropdown1}
        {Dropdown2}
        {Dropdown3}
      </Div>
    );
  })
  .add("MultiSelect Component", () => {
    let question = {
      name: "Multiselect 1",
      options: ["JSCE", "BECE", "Checkpoints"]
    };
    const M1 = MultiselectComponent(question)();
    const M2 = MultiselectComponent({
      ...question,
      name: "Multiselect 2",
      extra: {
        direction: "column"
      }
    })([], action("onChange"));
    return (
      <Div
        css={`
          display: flex;
          flex-direction: column;
          & > div {
            margin-bottom: 30px;
          }
        `}
      >
        {M1}
        {M2}
      </Div>
    );
  })
  .add("RadioComponent", () => {
    let question = {
      name: "Radio Component",
      extra: ["Hello world"]
    };
    let node = null;
    const radio1 = RadioComponent(question)();
    const radio2 = RadioComponent(
      {
        ...question,
        fields: ["Name of Award", "Name of Awarding Body", "Year"],
        kind: "award"
      },
      {
        refFunc: node2 => (node = node2)
      }
    )("Yes", data => {
      console.log(data);
    });
    return (
      <Div
        css={`
          display: flex;
          flex-direction: column;
          & > div {
            margin-bottom: 30px;
          }
        `}
      >
        {radio1}
        {radio2}
        <button
          onClick={() => {
            console.log(node.getResult());
            node.toggleError();
          }}
        >
          ONClick
        </button>
      </Div>
    );
  })
  .add("Input change Trigger", () => {
    let question = {
      name: "Regular Input",
      extra: { placeholder: "Sample placeholder" },
      type: "Text",
      id: 1
    };
    return (
      <ExampleComponent
        subject={{ name: "English Language" }}
        getPrefix={getPrefix}
        question={question}
        questions={{ questions: [question] }}
        allQuestionErrors={(qppState, questions = {}) =>
          generateQuestionErrorMessages(qppState, { questions })
        }
      />
    );
  })
  .add("DropdownComponent change Trigger", () => {
    let question = {
      name: "Regular Input",
      type: "SingleChoice",
      extra: {},
      options: ["Select", "Just starting", 10, "year"],
      id: 1
    };
    return (
      <ExampleComponent
        subject={{ name: "English Language" }}
        getPrefix={getPrefix}
        question={question}
        questions={{ questions: [question] }}
        allQuestionErrors={(qppState, questions = {}) =>
          generateQuestionErrorMessages(qppState, { questions })
        }
      />
    );
  })
  .add("Multiselect change Trigger", () => {
    let question = {
      name: "Multiselect 1",
      options: ["JSCE", "BECE", "Checkpoints"],
      type: "MultiChoice",
      extra: {
        direction: "column"
      },
      id: 1
    };
    return (
      <ExampleComponent
        subject={{ name: "English Language" }}
        getPrefix={getPrefix}
        question={question}
        ddd={{ 1: ["BECE"] }}
        questions={{ questions: [question] }}
        allQuestionErrors={(qppState, questions = {}) =>
          generateQuestionErrorMessages(qppState, { questions })
        }
      />
    );
  })
  .add("Formset condition questions", () => {
    let question = {
      id: 1,
      type: "YesNo",
      name: "Do you have any professional training in Special Needs?",
      fields: ["Name of Training", "Name of organization", "Year"]
    };
    return (
      <ExampleComponent
        subject={{ name: "English Language" }}
        question={question}
        getPrefix={getPrefix}
        questions={{ questions: [question] }}
        allQuestionErrors={(qppState, questions = {}) =>
          generateQuestionErrorMessages(qppState, { questions })
        }
      />
    );
  })
  .add("Portfolio Formset", () => {
    return FormsetComponent(
      [
        "Project Title",
        "A little description of what you did",
        "Upload a picture of your work"
      ],
      "portfolio",
      ["title", "description", "images"],
      {
        title: ["This field is required"],
        description: ["This field is required"],
        images: ["This field is required"]
      },
      PortfolioForm
    )(
      [],
      () => {},
      formset => (
        <React.Fragment>
          <h2 className="">{formset.training}</h2>
          <p className="">
            {formset.organization}
            {formset.year ? " | Currently Working" : ""}
          </p>
        </React.Fragment>
      )
    );
  });
