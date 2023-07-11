import { Reducer } from "redux";
import { QuizState, QuizAction, QuizActionTypes, initialState } from "./types";

const quizReducer: Reducer<QuizState, QuizAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case QuizActionTypes.ADD_QUIZ:
      return {
        ...state,
        questions: action.payload.questions,
        employee: action.payload.employee,
      };
    default:
      return state;
  }
};

export default quizReducer;
