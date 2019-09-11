// @flow
import DATA2 from "./data2";
import includes from "lodash/includes";

export const flatten = arr => [].concat.apply([], arr);

export const displayCurriculum = (classes, question) => {
  const { levels = [], curriculum_exclude = [] } = question;
  const levelNames = levels.map(x => x.name);
  const considered = levelNames.filter(x => !includes(curriculum_exclude, x));
  const classLevels = levels
    .filter(x => x.classes.some(x => includes(classes, x)))
    .map(x => x.name);
  const x = classLevels.filter(o => includes(considered, o));
  return x.length > 0;
};
export const getAcademicSubjectCategory = (levels2: Array<Array<string>>) => {
  let last = null;

  const items = [
    { name: "Nursery Classes", values: ["Nursery 1", "Nursery 2"] },
    {
      name: "Primary Classes",
      values: [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6"
      ]
    },
    {
      name: "Secondary Classes",
      values: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"]
    },
    {
      name: "Undergraduate Classes",
      values: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
    }
  ];
  const rows = [];
  items.forEach(o => {
    let instance = { ...o };
    levels2.forEach(x => {
      if (!!last) {
        if (last.name !== o.name) {
          if (includes(o.values, x[0])) {
            let n = { ...instance };
            n.values = x;
            rows.push(n);
          }
        }
      } else {
        if (includes(o.values, x[0])) {
          let n = { ...instance };
          n.values = x;
          rows.push(n);
        }
      }
    });
    last = o;
  });
  let temp = null;
  let newRows = [];
  rows.forEach(val => {
    if (!!temp) {
      if (temp !== val.name) {
        newRows.push(val);
      } else {
        let index = newRows.findIndex(x => x.name === temp);
        let values = newRows[index].values;
        newRows[index].values = [...new Set([...values, ...val.values])];
      }
    } else {
      newRows.push(val);
    }
    temp = val.name;
  });
  return newRows;
};

// function flatten2(array, isDeep) {
//   var i = -1,
//     result = [];

//   isDeep = isDeep || true;

//   // Perform an action if there's a valid array and this array contains any value in it
//   if (array && array.length) {
//     var length = array.length;
//     while (++i < length) {
//       var value = array[i];
//       if (Array.isArray(value)) {
//         // Recursively flatten2 arrays
//         result = result.concat(isDeep ? flatten2(value, isDeep) : value);
//       } else {
//         result.push(value);
//       }
//     }
//   }
//   return result;
// }
const getKey = (val, condition) => {
  let key = val;
  if (!!condition) {
    key = `${condition}-${key}`;
  }
  return key;
};
export const getPrefix = (level: string | null, val = "") => getKey(val, level);
const resultForQuestion = (answers, question, index = 0) => {
  let key = getKey(question.id || index + 1, question.level);
  let result = answers[key];
  if (Boolean(result)) {
    return result;
  }
  return result;
};
//gets the result of the question depended on.
const getParentResult = (question, questions, index) => {
  let parentKey = getKey(question.depended_on || index, question.level);
  return questions[parentKey];
};
const hasAnsweredQuestion = (question, answers, answeredQuestions, index) => {
  const qOnly = answeredQuestions.map(x => x.question);
  const wasTaken = qOnly.find(
    x => JSON.stringify(x) === JSON.stringify(question)
  );
  if (question.type === "SingleChoice") {
    let oo = resultForQuestion(answers, question, index);
    return oo === 0 || Boolean(oo);
  }
  if (question.type === "MultiChoice") {
    let rr = resultForQuestion(answers, question, index);
    return Boolean(rr) && rr.length > 0;
  }
  // console.log(question);
  if (!!wasTaken) {
    let result = resultForQuestion(answers, question, index);
    if (!!question.depended_on) {
      // let parentKey = getKey(question.depended_on || index, question.level);
      // const parentAnswer = answers[parentKey];
      const parentAnswer = getParentResult(question, answers, index);
      let condition = Boolean((question.extra || {}).autocomplete)
        ? result.length > 0
        : !!result;
      return parentAnswer === "Yes" && condition;
    }
    if (question.type === "YesNo") {
      if (question.hasOwnProperty("fields")) {
        if (result.hasOwnProperty("answer") && result.answer === "Yes") {
          const formsset = result.formset || [];
          return formsset.length > 0;
        }
        return !!result.answer;
      }
      // return Boolean(result)
    }
    if (question.type === "Text") {
      return Boolean(result);
    }
    // if (question.type === "MultiChoice") {
    //   return result.length > 0;
    // }

    return true;
  }
  const { extra = {} } = question;
  const { empty = false } = extra;
  return empty;
};
const getQuestionsAnswered = (questions, answers, withLevels) => {
  let same = true; //checks if a dependant question result is NO
  let result = Object.keys(answers.questions).map(x => {
    const index = x.split("-")[1];
    let question = null;
    if (!!index) {
      const questionsInSameLevel = questions.filter(
        u => u.level === x.split("-")[0]
      );
      question = questionsInSameLevel.find((u, i) => {
        const id = u.id || i + 1;
        return parseInt(index, 10) === id;
      });
    } else {
      question = questions.find((o, t) => {
        const id = o.id || t + 1;
        return id === parseInt(x, 10);
      });
    }
    return {
      question,
      answer: x
    };
  });
  result = result.filter(x => {
    if (Boolean(x.question) && Boolean(x.question.depended_on)) {
      const parentAnswer = getParentResult(x.question, answers.questions);
      if (parentAnswer === "No") {
        same = false;
      }
      return parentAnswer !== "No";
      // return parentAnswer === "Yes" && !!ans[x.answer];
    }
    return x;
  });
  return { result, same };
};
function workingResult(answers, questionObject) {
  const evaluation = evaluateResult(answers, questionObject);
  return evaluation.filter((x, index) => {
    // const answer = resultForQuestion(answers.questions, x.question);
    if (x.question.depended_on) {
      const parentAnswer = resultForQuestion(
        answers.questions,
        evaluation[index - 1].question
      );
      // if (parentAnswer === "Yes") {
      //   return !!answer;
      // }
      return parentAnswer !== "No";
    }
    return true;
  });
}
const getAllErrorsForQuestions = (answers, questionObject) => {
  const resultsToConsider = workingResult(answers, questionObject);
  // let supportedLevels = Object.keys(answers.questions);
  let result = {};
  resultsToConsider.forEach(x => {
    // const { id, level } = x.question;
    // const foundLevel = supportedLevels.find(x => x.includes(id));
    // const key = getKey(id, level);
    result[x.key] = x.is_answered;
    // if (foundLevel === key) {
    //   result[key] = x.is_answered;
    // } else {
    //   result[foundLevel] = x.is_answered;
    // }
  });
  return result;
};

export const generateQuestionErrorMessages = (state, qObj) => {
  const allErrors = getAllErrorsForQuestions(state, qObj);
  return key => !allErrors[key];
};
export const hasAllQuestionsBeenAnswered = (answers, questionObject) => {
  const resultsToConsider = workingResult(answers, questionObject);
  return resultsToConsider.reduce((x, val) => x && val.is_answered, true);
};
export const evaluateResult = (answers, questionObject) => {
  const {
    questions: {
      levels,
      levelClassification,
      questions = [],
      subcategoryQuestions = []
    }
  } = questionObject;
  let mergedQuestions = [];
  let questionsAnswered = [];
  if (!!levels) {
    const classification = levelClassification(answers.selectedClasses);
    const classWithQuestions = classification.map((x, i) => {
      let solution = {
        name: x,
        questions: levels.find(o => o.name === x).questions
      };
      if (i === 0) {
        solution.questions = solution.questions.concat(questions);
      }
      return solution;
    });
    mergedQuestions = classWithQuestions;
  } else {
    mergedQuestions = subcategoryQuestions.concat(questions);
  }
  let flat = flatten(
    mergedQuestions.map(x => {
      if (x.hasOwnProperty("questions")) {
        return !!x.questions
          ? x.questions.map(o => ({ ...o, level: x.name }))
          : [];
      }
      return x;
    })
  );
  // flat = flat.map((x, i) => ({ ...x, id: i + 1 }));
  const { result, same } = getQuestionsAnswered(flat, answers);
  questionsAnswered = result;
  let results = flat.map((q, i) => ({
    question: q,
    is_answered: hasAnsweredQuestion(
      q,
      answers.questions,
      questionsAnswered,
      i
    ),
    key: getKey(q.id || i + 1, q.level)
  }));
  if (!same) {
    results = results.filter((x, i) => {
      if (Boolean(x.question.depended_on)) {
        let parentAnswer = getParentResult(x.question, answers.questions, i);
        return parentAnswer !== "No";
      }
      return x;
    });
  }
  return results;
};

export function getSubjectDetails(subject) {
  const categories = flatten(
    DATA2.categories.filter(x =>
      includes([subject.category, subject.subcategory], x.name)
    )
  );
  const skill = DATA2.skills.find(x => x.subject === subject.name);
  if (!!skill) {
    const isAcademic = skill.levels;
    if (!!isAcademic) {
      if (categories.length === 1) {
        const category = categories[0];
        const levels = category.levels.filter(x =>
          includes(isAcademic, x.name)
        );
        const levelClassification = (classes = []) => {
          return levels
            .filter(x => x.classes.some(y => includes(classes, y)))
            .map(x => x.name);
        };
        return {
          curriculum: category.curriculum,
          curriculum_exclude: category.curriculum_exclude,
          levels,
          levelClassification,
          questions: skill.questions || []
        };
      }
    }
  }
  let questions = [];
  if (!!skill && !!skill.questions) {
    questions = skill.questions;
  }
  return {
    subcategoryQuestions: flatten(
      categories.map(x => (!!x.questions ? x.questions : []))
    ).map((x, i) => ({ ...x, id: i + 1 })),
    questions,
    portfolio: categories[0].portfolio
  };
}

// export function range(start = 0, end) {
//   return Array.from(new Array(end), (x, i) => i + start);
// }

export function range(start, end, step) {
  var _end = end || start;
  var _start = end ? start : 0;
  var _step = step || 1;
  return Array((_end - _start) / _step)
    .fill(0)
    .map((v, i) => _start + i * _step);
}
