import axios from "axios";
import apiUrl from '../utils/apiUrl' ;
import {
  GET_QUESTIONLIST,
  GET_QUESTION,
  QUESTION_ERROR,
  QUESTION_UNLOADED,
  QUESTIONLIST_UNLOADED,
} from "./types";

//Get all question
// export const getAllQuestion = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/question');
//     dispatch({
//       type: GET_QUESTIONLIST,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: QUESTION_ERROR,
//       payload: err
//     });
//   }
// };

//Get question by question_id (User)
export const getQuestionById = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/question/${questionId}`);
    console.log("question", res);
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err,
    });
  }
};

//Get user questionlist
export const getUserQuestionList = (roomId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/question/user/room/${roomId}`);
    dispatch({
      type: GET_QUESTIONLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err,
    });
  }
};

//question Unload
export const questionUnload = () => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_UNLOADED });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err,
    });
  }
};

//questionlist Unload
export const questionListUnload = () => async (dispatch) => {
  try {
    dispatch({ type: QUESTIONLIST_UNLOADED });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err,
    });
  }
};
