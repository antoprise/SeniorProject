import {
  GET_ROOMLIST,
  GET_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  ROOM_ERROR,
  ROOM_UNLOADED,
  ROOMLIST_UNLOADED
} from '../actions/types';

const initialState = {
  roomList: [],
  room: null,
  error: {},
  roomLoading: true 
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOMLIST:
      return {
        ...state,
        roomList: payload,
        roomLoading: false    
      } ;
    case GET_ROOM:
      return {
        ...state,
        room: payload,
        roomLoading: false    
      } ; 
    case JOIN_ROOM:
        return {
          ...state,
          roomList: [...state.roomList,payload],
          roomLoading: false    
    } 
    case LEAVE_ROOM:
        return {
          ...state,
          roomList: state.roomList.filter(room => room._id !== payload),
          roomLoading: false    
    }   
    case ROOM_ERROR:
      return {
        ...state,
        error: payload,
        roomLoading: false
      };
    case ROOM_UNLOADED:
       return {
        ...state,
        room: null,
        roomLoading: true 
      };
    case ROOMLIST_UNLOADED:
      return {
        ...state,
        roomList: [],
        roomLoading: true 
      };     
    default:
      return state;
  }
}
