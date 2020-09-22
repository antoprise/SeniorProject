import axios from "axios";
import apiUrl from '../utils/apiUrl' ;
import {
  GET_ORG_ANSWERLIST,
  GET_ORG_ANSWER,
  ORG_ANSWER_ERROR,
  ORG_ANSWER_UNLOADED,
  ORG_ANSWERLIST_UNLOADED,
} from "./types";

//Get all answer (Organizer)
// export const getAllOrgAnswer = () => async dispatch => {
//     try {

//         const res = await axios.get('/api/answer')
//         dispatch({
//             type: GET_ORG_ANSWERLIST,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ORG_ANSWER_ERROR,
//             payload: err
//         });
//     }
// };

//Get answer by answer_id (Organizer)
// export const getOrgAnswerById = (answerId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/answer/${answerId}`);

//     dispatch({
//       type: GET_ORG_ANSWER,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ORG_ANSWER_ERROR,
//       payload: err,
//     });
//   }
// };

// //Get answer by question_id (Organizer)
// export const getOrgAnswerById = (questionId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/answer/${questionId}`);

//     dispatch({
//       type: GET_ORG_ANSWER,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ORG_ANSWER_ERROR,
//       payload: err,
//     });
//   }
// };

//Get organizer answerlist
export const getOrgAnswerList = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/answer/${questionId}`);
    dispatch({
      type: GET_ORG_ANSWERLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_ANSWER_ERROR,
      payload: err,
    });
  }
};

//Organizer answer Unload
export const orgAnswerUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_ANSWER_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_ANSWER_ERROR,
      payload: err,
    });
  }
};

//Organizer answerlist Unload
export const orgAnswerListUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_ANSWERLIST_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_ANSWER_ERROR,
      payload: err,
    });
  }
};
