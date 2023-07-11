export interface Option {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  answer: string;
}

export interface QuizState {
  questions: Question[];
  employee: string;
}

export enum QuizActionTypes {
  ADD_QUIZ = "ADD_QUIZ",
}

export interface AddQuizAction {
  type: QuizActionTypes.ADD_QUIZ;
  payload: QuizState;
}

export type QuizAction = AddQuizAction;

export const initialState: QuizState = {
  questions: [],
  employee: "",
};
