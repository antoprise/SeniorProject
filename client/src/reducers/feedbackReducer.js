import {
    GET_FEEDBACKLIST,
    GET_FEEDBACK,
    ADD_FEEDBACK,
    FEEDBACK_ERROR,
    FEEDBACK_UNLOADED,
    FEEDBACKLIST_UNLOADED
  } from '../actions/types';
  
  const initialState = {
    feedbackList: [],
    feedback: null,
    error: {},
    feedbackLoading: true
  };
  
  export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FEEDBACKLIST:
      return {
        ...state,
        feedbackList: payload,
        askLoading: false   
      } ;
    case GET_FEEDBACK:
        return {
          ...state,
          feedback: payload,
          feedbackLoading: false       
        } ;      
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbackList: [...state.feedbackList,payload],
        feedbackLoading: false 
      };
    case FEEDBACK_ERROR:
      return {
        ...state,
        error: payload,
        feedbackLoading: false 
      };
    case FEEDBACK_UNLOADED:
      return {
        ...state,
        feedback: null,
        feedbackLoading: true 
      };
    case FEEDBACKLIST_UNLOADED:
      return {
        ...state,
        feedbackList: [],
        feedbackLoading: true 
      }; 
    default:
      return state;
    
  }
  }