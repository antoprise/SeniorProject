import {
  GET_ORG_FEEDBACKLIST,
  GET_ORG_FEEDBACK,
  ORG_FEEDBACK_ERROR,
  ORG_FEEDBACK_UNLOADED,
  ORG_FEEDBACKLIST_UNLOADED,
} from "../actions/types";

const initialState = {
  feedbackList: [],
  feedback: null,
  error: {},
  feedbackLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORG_FEEDBACKLIST:
      return {
        ...state,
        feedbackList: payload,
        feedbackLoading: false,
      };
    case GET_ORG_FEEDBACK:
      return {
        ...state,
        feedback: payload,
        feedbackLoading: false,
      };
    case ORG_FEEDBACK_ERROR:
      return {
        ...state,
        error: payload,
        feedbackLoading: false,
      };
    case ORG_FEEDBACK_UNLOADED:
      return {
        ...state,
        feedback: null,
        feedbackLoading: true,
      };
    case ORG_FEEDBACKLIST_UNLOADED:
      return {
        ...state,
        feedbackList: [],
        feedbackLoading: true,
      };
    default:
      return state;
  }
}
