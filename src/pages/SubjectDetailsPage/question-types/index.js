import { DropdownComponent } from "./DropdownComponent";
import { MultiselectComponent } from "./MultiselectComponent";
import { RadioComponent } from "./RadioComponent";
import { TextareaComponent } from "./TextareaComponent";
import { InputComponent } from "./InputComponent";

export { DropdownComponent } from "./DropdownComponent";
export { FormsetComponent } from "./FormsetComponent";
export { MultiselectComponent } from "./MultiselectComponent";
export { RadioComponent } from "./RadioComponent";
export { TextareaComponent } from "./TextareaComponent";
export { InputComponent } from "./InputComponent";

const options = {
  YesNo: RadioComponent,
  SingleChoice: DropdownComponent,
  MultiChoice: MultiselectComponent,
  Text: InputComponent,
  Description: TextareaComponent
};
const getRefInstance = ref => node => (ref = node);
const replaceWithSkillName = (str, value) =>
  str
    .replace("[Skill]", value)
    .replace("[skill]", value)
    .replace("[Language]", value)
    .replace("[Exam]", value)
    .replace("[exam]", value);

const toggleQuestionErrorFunc = (props, state) => key => {
  const errors = props.allQuestionErrors(state.fields, props.questions);
  console.log("key", key);
  return state.display_error && errors(key);
};
const updateQuestionAnswerFunc = setState => (value, id, dependant) => {
  setState(state => {
    let fields = state.fields;
    let questions = { ...fields.questions, [id]: value };
    if (!!dependant && value !== "Yes") {
      questions[dependant] = [];
    }
    return { ...state, fields: { ...fields, questions } };
  });
};
export const getCompontentForQuestion = (_this, setState, formsetRef) => (
  question,
  index,
  depends,
  prefix = ""
) => {
  const { fields: { questions } } = _this.state;
  const { subject, getPrefix } = _this.props;
  const id = question.id || index + 1;
  const updateQuestionAnswer = updateQuestionAnswerFunc(setState);
  const Component = options[question.type];
  let params = [
    {
      ...question,
      name: replaceWithSkillName(question.name, subject.name)
    }
  ];
  const prefId = getPrefix(prefix, id);
  let callback = [
    !!question.depended_on ? _this.state.dependants[prefId] : questions[prefId],
    val => {
      let p = [val, prefId];
      if (Boolean(depends)) {
        p.push(getPrefix(prefix, depends.id));
      }
      updateQuestionAnswer(...p);
      if (!!question.depended_on) {
        setState({
          dependants: { ..._this.state.dependants, [prefId]: val }
        });
      }
    }
  ];
  if (!!question.fields) {
    const answerWithFormset = questions[prefId] || {};
    params.push({
      refFunc: node => (_this.formsetRef[question.kind || "training"] = node),
      ref: node => {
        if (Boolean(node)) {
          _this.formsetRef[question.kind || "training"] = node.node;
        }
      }
    });
    // params.push({
    // });
    callback = [
      answerWithFormset.answer,
      (val, node) => {
        const newLocal = state => {
          const fields = state.fields;
          return {
            ...state,
            fields: {
              ...state.fields,
              questions: {
                ...fields.questions,
                [prefId]: {
                  answer: val.question,
                  formset: val.formset
                }
              }
            }
          };
        };
        setState(newLocal);
      }
    ];
  } else {
  }
  callback.push(toggleQuestionErrorFunc(_this.props, _this.state));
  callback.push(prefId);
  return Component(...params)(...callback);
};
