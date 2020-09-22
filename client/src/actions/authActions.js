import axios from 'axios';
import apiUrl from '../utils/apiUrl' ;
import { 
    USER_LOADED,
    TOKEN_LOADED,
    AUTH_ERROR,
    LOGOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
    try {
      const res = await axios.get(`${apiUrl}/api/auth/current_user`);
      console.log(res.data)
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      });
    }
  };

// Load Token
export const loadToken = token => async dispatch => {
  try {
    dispatch({
      type: TOKEN_LOADED,
      payload: token
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err
    });
  }
};

// Logout
export const logout = () => async dispatch => {
  try {
    dispatch({ 
      type: LOGOUT
    });
  }catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err
    });
  }  
};