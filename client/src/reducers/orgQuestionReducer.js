import {
  GET_ORG_QUESTIONLIST,
  GET_ORG_QUESTION,
  ORG_QUESTION_ERROR,
  ORG_QUESTION_UNLOADED,
  ORG_QUESTIONLIST_UNLOADED,
  CREATE_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
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
    case CREATE_QUESTION:
      return {
        ...state,
        questionList: [...state.questionList, payload],
        questionLoading: false,
      };
    case GET_ORG_QUESTIONLIST:
      return {
        ...state,
        questionList: payload,
        questionLoading: false,
      };
    case GET_ORG_QUESTION:
      return {
        ...state,
        question: payload,
        questionLoading: false,
      };
    case ORG_QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        questionLoading: false,
      };
    case ORG_QUESTION_UNLOADED:
      return {
        ...state,
        question: null,
        questionLoading: true,
      };
    case ORG_QUESTIONLIST_UNLOADED:
      return {
        ...state,
        questionList: [],
        questionLoading: true,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questionList: state.questionList.filter(
          (question) => question._id !== payload
        ),
        questionLoading: false,
      };
    case EDIT_QUESTION:
      return {
        ...state,
        questionList: state.questionList.map((q) =>
          q._id === payload._id
            ? { ...q, questionDetail: payload.questionDetail }
            : q
        ),
        questionLoading: false,
      };
    default:
      return state;
  }
}
