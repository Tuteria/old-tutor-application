//@flow
export type QuestionType = {
  +name: string,
  +extra:
    | Array<string>
    | {
        +placeholder: string,
        +saved_list: Array<string>,
        +autocomplete: boolean
      },
  +fields: Array<string>
};
