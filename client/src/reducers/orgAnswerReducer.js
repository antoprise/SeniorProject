import {
  GET_ORG_ANSWERLIST,
  GET_ORG_ANSWER,
  ORG_ANSWER_ERROR,
  ORG_ANSWER_UNLOADED,
  ORG_ANSWERLIST_UNLOADED,
} from "../actions/types";

const initialState = {
  answerList: [],
  answer: null,
  error: {},
  answerLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORG_ANSWERLIST:
      return {
        ...state,
        answerList: payload,
        answerLoading: false,
      };
    case GET_ORG_ANSWER:
      return {
        ...state,
        answer: payload,
        answerLoading: false,
      };
    case ORG_ANSWER_ERROR:
      return {
        ...state,
        error: payload,
        answerLoading: false,
      };
    case ORG_ANSWER_UNLOADED:
      return {
        ...state,
        answer: null,
        answerLoading: true,
      };
    case ORG_ANSWERLIST_UNLOADED:
      return {
        ...state,
        answerList: [],
        answerLoading: true,
      };

    default:
      return state;
  }
}
