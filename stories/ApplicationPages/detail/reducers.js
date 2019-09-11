// @flow
import {
  hasAllQuestionsBeenAnswered,
  generateQuestionErrorMessages,
  getSubjectDetails
} from "./utils";
// import { mapStateToProps as SubjectList } from "../SubjectListPage/reducers";
import { SUBJECT_SELECT_DATA } from "../data/subjectSelectDATA";
export const OVERVIEW_UPDATE_FIELD = "OVERVIEW_UPDATE_ALL_FIELDS";
export const PRICING_UPDATE_FIELD = "PRICING_UPDATE_ALL_FIELDS";
const overviewDefaultState = {
  title: "Hello World",
  description: "",
  certifications: [],
  questions: {
    "JSS-1": ["JSCE"]
  },
  curriculums: [],
  selectedClasses: ["JSS 3"]
};

function subjectInstanceForPassedSittings(consideredSubjects, allSubjects) {
  return allSubjects([]).filter(x => consideredSubjects.indexOf(x.name) > -1);
}
export const allSubjects = (selectedSubjects = []) => {
  const result = SUBJECT_SELECT_DATA.data.categories.map((category, index) => {
    const skills = category.subcategories.map(sub => {
      let results = sub.skills;
      return results.map(x => ({
        ...x,
        category: category.name,
        subcategory: sub.name
      }));
    });
    return [].concat.apply([], skills);
  });
  const r = [].concat.apply([], result);
  let set = [...new Set(r.map(u => u.name))];
  const rr = set.map(w => {
    let xo = r.find(y => y.name === w);
    return xo;
  });
  const selectSub = [...new Set(selectedSubjects.map(u => u.name))];
  return rr.filter(x => selectSub.indexOf(x.name) === -1);
};

export const SubjectList = () => {
  const subjects = [
    {
      name: "General Mathematics",
      slug: "general-mathematics",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "general-mathematics-quiz"
    },
    {
      name: "Swimming",
      slug: "swimming",
      testable: false
    },
    {
      name: "Kalabari",
      slug: "kalabari",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "kalabari-quiz"
    },
    {
      name: "Boxing",
      slug: "boxing",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "boxing-quiz"
    },
    {
      name: "Voice Training",
      slug: "voice-training",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "voice-traning-quiz"
    },
    {
      name: "Sewing and Tailoring",
      slug: "sewing-and-tailoring",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "sewing-and-tailoring-quiz"
    },
    {
      name: "TOFEL ( Test of English as a foreign Language)",
      slug: "tofel-test-of-english-as-a-foreign-language",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "tofel-test-of-english-as-a-foreign-language-quiz"
    },
    {
      name: "Dyslexia",
      slug: "dyslexia",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "dyslexia-quiz"
    },
    {
      name: "Web Development",
      slug: "web-development",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "web-development-quiz"
    },
    {
      name: "Handwriting",
      slug: "handwriting",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "handwriting-quiz"
    },
    {
      name: "Differential Equations",
      slug: "differential-equations",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "differential-equations-quiz"
    }
  ];
  const sittings = [
    {
      name: "Boxing",
      slug: "boxing",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "boxing-quiz"
    }
  ];
  const consideredSubjects = [
    ...new Set(sittings.map(x => x.name).concat(subjects.map(x => x.name)))
  ];
  const actual_instances = subjectInstanceForPassedSittings(
    consideredSubjects,
    allSubjects
  );
  const selectedSubjects = actual_instances.map((x, index) => {
    const foundIndex = sittings.findIndex(y => y.name === x.name);
    let result = {
      id: index,
      subject: x,
      taken: false,
      score: {}
    };
    if (foundIndex > -1) {
      let val = sittings[foundIndex];
      return {
        ...result,
        taken: true,
        score: {
          passed: val.passed,
          figure: `${val.score}%`,
          badge: `${val.passed ? "Top" : "Bottom"} ${val.percentile}%`
        }
      };
    }
    return {
      ...result,
      taken: true,
      score: {
        passed: true
      }
    };
  });
  return {
    selectedSubjects,
    subjectExists: (slug, canTakeQuiz) => {
      let result = [];
      if (canTakeQuiz) {
        result = selectedSubjects
          .filter(x => x.taken === false)
          .map(x => x.subject);
      } else {
        result = subjectInstanceForPassedSittings(sittings.map(x => x.name));
      }

      return result.findIndex(x => x.slug === slug) > -1;
    },
    subjects
  };
};

export const externalStateToProps = ownProps => {
  // const valid = SubjectList().selectedSubjects;
  const valid = SubjectList().selectedSubjects.filter(x => x.taken);
  const subjects = valid.filter(x => x.score.passed);
  // const subjects = valid;
  const logic = (slug, instance = false) => {
    const slugs = subjects.map(x => (instance ? x.subject : x.subject.slug));
    if (instance) {
      return slugs.find(x => x.slug === slug);
    }
    return slugs.indexOf(slug) > -1;
  };
  return { logic, ...ownProps };
};

export const mapStateToProps = (ownProps = { slug: "general-mathematics" }) => {
  const { logic } = externalStateToProps(ownProps);
  const subject = logic(ownProps.slug, true);
  const questions = getSubjectDetails(subject);
  return { subject, questions, ...ownProps };
};
export const pricingStateToProps = (state, ownProps) => {
  const data = state.subjects["subject-detail"].pricing;
  return {
    data,
    ...ownProps
  };
};
export const detailStateToProps = (state, ownProps) => {
  // const data = overviewDefaultState;
  const data = {};
  const GetValidationFunc = certification => {
    return {};
  };
  const allQuestionErrors = (appState, questions) => {
    return generateQuestionErrorMessages(appState, { questions });
  };
  const canSubmit = (appState, question) => {
    return hasAllQuestionsBeenAnswered(appState, question);
  };
  return {
    data,
    GetValidationFunc,
    allQuestionErrors,
    canSubmit,
    ...ownProps
    // ...mapStateToProps()
  };
};
