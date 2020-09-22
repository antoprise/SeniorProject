import axios from 'axios';
import apiUrl from '../utils/apiUrl' ;
// import { setAlert } from './alertActions';
import Swal from 'sweetalert2'

import { 
  GET_ROOMLIST,
  GET_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  ROOM_ERROR,
  ROOM_UNLOADED,
  ROOMLIST_UNLOADED
} from './types';

//Get all room
// export const getAllRoom = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/room');
//     dispatch({
//       type: GET_ROOMLIST,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: ROOM_ERROR,
//       payload: err
//     });    
//   }
// };

//Get room by room_id (User) 
export const getRoomById = roomId => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/room/${roomId}`);
    console.log('room',res)
    dispatch({
      type: GET_ROOM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: err
    });    
  }
};

//Get user roomlist
export const getRoomList =()=> async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/room/user/list`);
    dispatch({
      type: GET_ROOMLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: err
    });    
  }
};

//Join room
export const joinRoom = (roomCode)=> async (dispatch) => {
  try {
    const res = await axios.post(`${apiUrl}/api/room/join/${roomCode}`);

    dispatch({
      type: JOIN_ROOM,
      payload: res.data
    });

    Swal.fire({
      title:'Room Joined !',
      icon:'success'
    })

    // dispatch(setAlert('Room Joined', 'success'));

  } catch (err) {
    
    const errorMessage = err.response.data.msg ;
    
    if (errorMessage) {
      // dispatch(setAlert(errorMessage, 'danger'));
      Swal.fire({
        title: `${errorMessage} !`,
        icon:'error'
      })
    }

    dispatch({
      type: ROOM_ERROR,
      payload: err
    });
    
  }
};

//Leave room
export const leaveRoom = (roomId) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/api/room/leave/${roomId}`);
    
    dispatch({
      type: LEAVE_ROOM,
      payload: roomId
    });
    
    Swal.fire({
      title:'Room left !',
      icon:'success'
    })
    // dispatch(setAlert('Room left', 'success'));
    
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: err
    });    
  }
};

//room Unload
export const roomUnload = () => async dispatch => {
  try {
      dispatch({type: ROOM_UNLOADED});
  } catch (err) {
      dispatch({
          type: ROOM_ERROR,
          payload: err
      });    
  }
};

//roomList Unload
export const roomListUnload = () => async dispatch => {
  try {
      dispatch({type: ROOMLIST_UNLOADED});
  } catch (err) {
      dispatch({
          type: ROOM_ERROR,
          payload: err
      });    
  }
};
