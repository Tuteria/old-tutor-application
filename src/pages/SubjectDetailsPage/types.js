//@ts-check
//@flow
import { QuestionType } from "./question-types/types";

export type CertificationFieldType = {
  +name: string,
  +company: string,
  +year: string
};
export type FormsetResultType = {
  +answer: string,
  +formset: Array<CertificationFieldType>
};

type QuestionStateType = {
  [string]: string | FormsetResultType
};
export type LevelType = {
  +classes: Array<string>,
  +questions: Array<QuestionType>
};

export type OverviewStateType = {
  +selectedClasses: Array<string>,
  +curriculums: Array<string>,
  title: string,
  +description: string,
  +questions: QuestionStateType,
  certficiations: Array<CertificationFieldType>
};
export type Props = {
  +data: OverviewStateType,
  +questions: {
    +levels: string | LevelType,
    +questions: Array<QuestionType>,
    +subcategoryQuestions: Array<QuestionType>,
    +levelClassification: Function
  },
  +subject: {
    +name: string,
    +slug: string
  },
  +toSubjectListPage: Function,
  +navigateTo: Function,
  +canSubmit: Function,
  +dispatch: Function,
  allQuestionErrors: Function
};
