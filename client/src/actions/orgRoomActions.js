import axios from 'axios';
import apiUrl from '../utils/apiUrl' ;
// import { setAlert } from './alertActions';
import Swal from 'sweetalert2'

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
} from './types';

//Get all room
// export const getAllOrgRoom = () => async (dispatch) => {
//   try {

//     const res = await axios.get('/api/room');
//     dispatch({
//       type: GET_ORG_ROOMLIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ORG_ROOM_ERROR,
//       payload: err
//     });    
//   }
// };

//Get room by room_id (Organizer) 
export const getOrgRoomById = roomId => async (dispatch) => {
  try {
    console.log('room before action', roomId )
    const res = await axios.get(`${apiUrl}/api/room/${roomId}`);
    console.log('room at action', res.data )
    dispatch({
      type: GET_ORG_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

//Get owner roomlist
export const getOrgRoomList =()=> async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/room/owner/list`);
    dispatch({
      type: GET_ORG_ROOMLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

// Create room
export const createRoom = formData => async (dispatch) => {
  try {

    const res = await axios.post(`${apiUrl}/api/room`, formData);

    dispatch({
      type: CREATE_ROOM,
      payload: res.data,
    });

    Swal.fire({
      title:'Room Created !',
      icon:'success'
    })

    // dispatch(setAlert('Room Created', 'success'));

  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

//Delete room
export const deleteRoom = roomId => async (dispatch) => {
  try {

    await axios.delete(`${apiUrl}/api/room/${roomId}`);

    dispatch({
      type: DELETE_ROOM,
      payload: roomId,
    });

    Swal.fire({
      title:'Room Removed !',
      icon:'success'
    })
    // dispatch(setAlert('Room Removed', 'success'));

  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

//Edit room name 
export const editRoomName = (roomId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/api/room/editname/${roomId}`, formData);

    dispatch({
      type: EDIT_ROOM,
      payload: res.data,
    });

    Swal.fire({
      title:'Room Edited !',
      icon:'success'
    })

    // dispatch(setAlert('Room Edited', 'success'));

  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

//Edit ask status
export const editAskStatus = (roomId) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/api/room/editstatus/ask/${roomId}`);

    dispatch({
      type: EDIT_ASK_STATUS,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

export const editFeedbackStatus = (roomId) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/api/room/editstatus/feedback/${roomId}`);

    dispatch({
      type: EDIT_FEEDBACK_STATUS,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: ORG_ROOM_ERROR,
      payload: err
    });    
  }
};

//Organizer room Unload
export const orgRoomUnload = () => async dispatch => {
  console.log('room unload action')
  try {
      dispatch({type: ORG_ROOM_UNLOADED});
  } catch (err) {
      dispatch({
          type: ORG_ROOM_ERROR,
          payload: err
      });    
  }
};

//Organizer roomList Unload
export const orgRoomListUnload = () => async dispatch => {
  console.log('roomlist unload action')
  try {
      dispatch({type: ORG_ROOMLIST_UNLOADED});
  } catch (err) {
      dispatch({
          type: ORG_ROOM_ERROR,
          payload: err
      });    
  }
};