import {
    GET_ANSWERLIST,
    GET_ANSWER,
    ADD_ANSWER,
    ANSWER_ERROR,
    ANSWER_UNLOADED,
    ANSWERLIST_UNLOADED
  } from '../actions/types';
  
  const initialState = {
    answerList: [],
    answer: null,
    error: {},
    answerLoading: true
  };
  
  export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ANSWERLIST:
      return {
        ...state,
        answerList: payload,
        askLoading: false   
      } ;
    case GET_ANSWER:
        return {
          ...state,
          answer: payload,
          answerLoading: false       
        } ;      
    case ADD_ANSWER:
      return {
        ...state,
        answerList: [...state.answerList,payload],
        answerLoading: false 
      };
    case ANSWER_ERROR:
      return {
        ...state,
        error: payload,
        answerLoading: false 
      };
    case ANSWER_UNLOADED:
      return {
        ...state,
        answer: null,
        answerLoading: true 
      };
    case ANSWERLIST_UNLOADED:
      return {
        ...state,
        answerList: [],
        answerLoading: true 
      }; 
    default:
      return state;
    
  }
  }