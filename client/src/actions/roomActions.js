import axios from 'axios';
import { 
  ROOM_REQUEST,
  GET_ROOMLIST,
  GET_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  ROOM_ERROR
} from './types';

//Get all room
export const getAllRoom = () => async (dispatch) => {
  try {
    dispatch({type: ROOM_REQUEST});
    const res = await axios.get('/api/room');
    dispatch({
      type: GET_ROOMLIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Get room by room_id (User) 
export const getRoomById = roomId => async (dispatch) => {
  try {
    dispatch({type: ROOM_REQUEST});
    const res = await axios.get(`/api/room/${roomId}`);
    dispatch({
      type: GET_ROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Get room by user_id(user)
export const getRoomByUserId = userId => async (dispatch) => {
  try {
    dispatch({type: ROOM_REQUEST});
    const res = await axios.get(`/api/room/user/${userId}`);
    console.log(res.data)
    dispatch({
      type: GET_ROOMLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Join room
export const joinRoom = (roomId,userId)=> async (dispatch) => {
  try {
    dispatch({type: ROOM_REQUEST});
    const res = await axios.post(`/api/room/join/${roomId}`,userId);

    dispatch({
      type: JOIN_ROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Leave room
export const leaveRoom = (roomId,userId) => async (dispatch) => {
  try {
    dispatch({type: ROOM_REQUEST});
    await axios.delete(`/api/room/leave/${roomId}`,userId);

    dispatch({
      type: LEAVE_ROOM,
      payload: roomId
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

