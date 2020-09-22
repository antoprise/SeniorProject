import {
  GET_QUESTIONLIST,
  GET_QUESTION,
  QUESTION_ERROR,
  QUESTION_UNLOADED,
  QUESTIONLIST_UNLOADED,
} from "../actions/types";

const initialState = {
  questionList: [],
  question: null,
  error: {},
  questionLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTIONLIST:
      return {
        ...state,
        questionList: payload,
        questionLoading: false,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: payload,
        questionLoading: false,
      };
    case QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        questionLoading: false,
      };
    case QUESTION_UNLOADED:
      return {
        ...state,
        question: null,
        questionLoading: true,
      };
    case QUESTIONLIST_UNLOADED:
      return {
        ...state,
        questionList: [],
        questionLoading: true,
      };
    default:
      return state;
  }
}
