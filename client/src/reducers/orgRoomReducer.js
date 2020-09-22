import {
  GET_ORG_ROOMLIST,
  GET_ORG_ROOM,
  CREATE_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  EDIT_ASK_STATUS,
  EDIT_FEEDBACK_STATUS,
  ORG_ROOM_ERROR,
  ORG_ROOM_UNLOADED,
  ORG_ROOMLIST_UNLOADED
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
    case GET_ORG_ROOMLIST:
      return {
        ...state,
        roomList: payload,
        roomLoading: false    
      } ;
    case EDIT_ROOM:
      return {
        ...state,
        roomList: state.roomList.map((r) =>
          r._id === payload._id ? { ...r, roomName: payload.roomName } : r
        ),
        roomLoading: false,
      };    
    case EDIT_ASK_STATUS:
      return {
        ...state,
        room: payload,
        roomLoading: false,
      };
      case EDIT_FEEDBACK_STATUS:
      return {
        ...state,
        room: payload,
        roomLoading: false,
      };    
    case GET_ORG_ROOM:
      return {
        ...state,
        room: payload,
        roomLoading: false    
      } ; 
    case CREATE_ROOM:
      return {
        ...state,
        roomList: [...state.roomList,payload],
        roomLoading: false 
      };
    case DELETE_ROOM:
      return {
        ...state,
        roomList: state.roomList.filter(room => room._id !== payload),
        roomLoading: false
      };
    case ORG_ROOM_ERROR:
      return {
        ...state,
        error: payload,
        roomLoading: false
      };
    case ORG_ROOM_UNLOADED:
      return {
        ...state,
        room: null,
        roomLoading: true 
      };
    case ORG_ROOMLIST_UNLOADED:
      return {
        ...state,
        roomList: [],
        roomLoading: true 
      }; 
    default:
      return state;
  }
}
