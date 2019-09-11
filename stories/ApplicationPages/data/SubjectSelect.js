import {
  SUBJECT_SELECT_DATA,
  SUBJECT_lIST_DATA as DATA
} from "./subjectSelectDATA";
export const ADD_SUBJECTS = "ADD_SUBJECTS";
export const REMOVE_SUBJECT = "REMOVE_SUBJECT";
export const categories = [
  {
    name: "Academics",
    icon: "atom",
    text: "Like Maths, English, Physics, Chemistry, Further Maths"
  },
  {
    name: "Exam Preparation",
    icon: "paper-diploma",
    text: "Like ICAN, TOEFL, GMAT, GRE, CCNA and others"
  },
  {
    icon: "translate",
    name: "Languages",
    text: "Like Yoruba, Hausa, French, Spanish, Dutch, etc."
  },
  {
    name: "Professional and Business",
    icon: "briefcase",
    text: "Like Financial Analysis, Proposal Writing, Personal Finance"
  },
  {
    icon: "guitar",
    name: "Music",
    text: "Like Saxophone, Guitar, Drum set, Singing, Flute"
  },
  {
    name: "Computer and Software",
    icon: "desktop-screen",
    text: "Like HTML, PHP, Design, Video Animation, Microsoft Apps"
  },
  {
    icon: "needle",
    name: "Vocational Skill",
    text: "Like Sewing, Bead Making, Bag Making, Makeup"
  },
  {
    name: "Special needs",
    icon: "favourite",
    text: "Teach people with disablities like Dyslexia, Hard of Hearing"
  },
  {
    icon: "volleyball",
    name: "Sports",
    text: "Like Football, Basketball, Table Tennis, Games, and Fitness"
  }
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
export function getSubCategories(categorySlug) {
  const flagItem = categorySlug.name || categorySlug;
  const allCategories = getCategories();
  const selected = allCategories.find(x => x.name === flagItem);
  const icons = ["math", "abc", "lab", "chartbar", "hat"];
  const result = selected.subcategories.map(x => ({
    ...x,
    subcategory: x.name,
    icon: icons[getRandomInt(0, icons.length)]
  }));
  return result;
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

export function getSubjects(subcategorySlug) {
  return subcategorySlug.skills.map(x => ({
    ...x,
    checked: false
  }));
}

export function getCategory(categorySlug) {
  const allCategories = getCategories();
  return allCategories[categorySlug];
}

export const getCategories = () => {
  const result = SUBJECT_SELECT_DATA.data.categories.map((category, index) => {
    let item = categories.find(x => x.name === category.name);
    return {
      ...category,
      ...item
    };
  });
  return result;
};
export default (state = [], action) => {
  if (action.type === ADD_SUBJECTS) {
    return action.value;
  }
  if (action.type === REMOVE_SUBJECT) {
    return state.filter(x => x.name !== action.value.name);
  }
  return state;
};
export const mapStateToProps = () => {
  const selectedSubjects = [];
  return {
    selectedSubjects,
    categories: getCategories()
  };
};

function subjectInstanceForPassedSittings(consideredSubjects, allSubjects) {
  return allSubjects([]).filter(x => consideredSubjects.indexOf(x.name) > -1);
}
export const subjectListMapStateToProps = (
  allSubjects,
  subjects = [
    {
      name: "Boxing",
      slug: "boxing",
      testable: true,
      duration: 10,
      pass_mark: 45,
      quiz_url: "boxing-quiz"
    }
  ]
) => {
  const sittings = DATA.data.sittings;
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
    return result;
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
        result = subjectInstanceForPassedSittings(
          sittings.map(x => x.name),
          allSubjects
        );
      }

      return result.findIndex(x => x.slug === slug) > -1;
    },
    subjects
  };
};

export const subjectTestStartMapStateToProps = (state, ownProps) => {
  //const { history } = ownProps;
  const currentSubject = {
    name: "General Mathematics",
    slug: "general-mathematics",
    dateSelected: new Date()
  };
  const duration = 10;
  const endTime = formatDate(
    addMinutes(currentSubject.dateSelected, 60 * 24 * 3)
  );
  // if (!!currentSubject === false) {
  //   history.push(`/subjects/subject-list`);
  // }
  return {
    currentSubject,
    endTime,
    duration
  };
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
function formatDate(date) {
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var time = date.toTimeString().split(" ")[0];
  return `${day}/${monthIndex + 1}/${year}, ${time} (${getTimeZone(date)})`;
}
function getTimeZone(date) {
  var result = "unknown";
  result = date
    .toTimeString()
    .match(new RegExp("[A-Z](?!.*[(])", "g"))
    .join("");
  if (result === "WCAST") return "WAT";
  return result;
}
