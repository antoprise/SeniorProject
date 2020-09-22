import {
  GET_ASKLIST,
  GET_ASK,
  ADD_ASK,
  ASK_ERROR,
  ASK_UNLOADED,
  ASKLIST_UNLOADED
} from '../actions/types';

const initialState = {
  askList: [],
  ask: null,
  error: {},
  askLoading: true
};

export default function(state = initialState, action) {
const { type, payload } = action;
switch (type) {
  case GET_ASKLIST:
    return {
      ...state,
      askList: payload,
      askLoading: false   
    } ;
  case GET_ASK:
      return {
        ...state,
        ask: payload,
        askLoading: false       
      } ;      
  case ADD_ASK:
    return {
      ...state,
      askList: [...state.askList,payload],
      askLoading: false 
    };
  case ASK_ERROR:
    return {
      ...state,
      error: payload,
      askLoading: false 
    };
  case ASK_UNLOADED:
    return {
      ...state,
      ask: null,
      askLoading: true 
    };
  case ASKLIST_UNLOADED:
    return {
      ...state,
      askList: [],
      askLoading: true 
    }; 
  default:
    return state;
  
}
}