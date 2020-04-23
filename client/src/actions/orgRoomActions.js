import axios from 'axios';
import { 
    ORG_ROOM_REQUEST,
    GET_ORG_ROOMLIST,
    GET_ORG_ROOM,
    CREATE_ROOM,
    DELETE_ROOM,
    EDIT_ROOM,
    ORG_ROOM_ERROR
} from './types';

//Get all room
export const getAllOrgRoom = () => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    const res = await axios.get('/api/room');
    dispatch({
      type: GET_ORG_ROOMLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Get room by room_id (Organizer) 
export const getOrgRoomById = roomId => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    const res = await axios.get(`/api/room/${roomId}`);

    dispatch({
      type: GET_ORG_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Get room by user_id(owner)
export const getRoomByOwnerId = userId => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    const res = await axios.get(`/api/room/owner/${userId}`);
    console.log(res.data)
    dispatch({
      type: GET_ORG_ROOMLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

// Create room
export const createRoom = formData => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    const res = await axios.post('/api/room', formData);

    dispatch({
      type: CREATE_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Delete room
export const deleteRoom = roomId => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    await axios.delete(`/api/room/${roomId}`);

    dispatch({
      type: DELETE_ROOM,
      payload: roomId,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};

//Edit room name 
export const editRoomName = (roomId, formData) => async (dispatch) => {
  try {
    dispatch({type: ORG_ROOM_REQUEST});
    const res = await axios.put(`/api/room/editname/${roomId}`, formData);

    dispatch({
      type: EDIT_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: { msg: err.message }
    });    
  }
};
