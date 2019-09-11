export {
  LocationComponent,
  PersonalInfoComponent,
  ClientThankYou,
  PageContainer
} from "../ClientRequestPages";
export { LessonScheduleComponent } from "./LessonScheduleComponent";
export { ExamSelectionComponent } from "./ExamSelectionComponent";
export { ExamExpectationComponent } from "./ExamExpectationComponent";
const getSections = (list, or = false) => exam_type => {
  if (list.every(x => typeof x === "string")) {
    return list;
  }
  if (or) {
    let found = list.find(x => x.type === exam_type);
    if (found) {
      return found.papers;
    }
  }
  return list.filter(x => exam_type.includes(x.type));
};
export function isObject(n) {
  if (n == null) return false;
  return Object.prototype.toString.call(n) === "[object Object]";
}
const getMaxScore = (list, or = false) => exam_type => {
  if (isObject(list)) {
    return list;
  }
  if (list.every(x => typeof x === "string")) {
    return list.map(o => o.split("-"));
  }
  if (or) {
    let found = list.find(x => x.type === exam_type);
    if (found) {
      if (found.options) {
        let result = {};
        found.options.map(o => {
          let temp = o.split("-");
          result[temp[0]] = temp[1];
        });
        return result;
      }
      return found.score;
    }
  }
  return list
    .filter(x => exam_type.includes(x.type))
    .map(u => u.options.map(o => o.split("-")));
};
export function getExamType(selected_exam, groups) {
  if (Boolean(selected_exam)) {
    let lowercase = selected_exam.toLowerCase();
    let examData = groups[lowercase];
    let { or, exam_type, sections, max_score, purposes, cross_sell } = examData;
    let result = {
      exam_type,
      or,
      purposes,
      sections: getSections(sections, or)
    };
    if (Boolean(max_score)) {
      result.max_score = getMaxScore(max_score, or);
    }
    return result;
  }
  return { or: true, exam_type: [] };
}
