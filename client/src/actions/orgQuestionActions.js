import axios from "axios";
import apiUrl from '../utils/apiUrl' ;
// import { setAlert } from "./alertActions";
import {
  CREATE_QUESTION,
  GET_ORG_QUESTIONLIST,
  GET_ORG_QUESTION,
  ORG_QUESTION_ERROR,
  ORG_QUESTION_UNLOADED,
  ORG_QUESTIONLIST_UNLOADED,
  DELETE_QUESTION,
  EDIT_QUESTION,
} from "./types";

//Get all question (Organizer)
// export const getAllOrgQuestion = () => async dispatch => {
//     try {

//         const res = await axios.get('/api/question')
//         dispatch({
//             type: GET_ORG_QUESTIONLIST,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ORG_QUESTION_ERROR,
//             payload: err
//         });
//     }
// };

//Get question by question_id (Organizer)
export const getOrgQuestionById = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/question/${questionId}`);

    dispatch({
      type: GET_ORG_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

// //Get owner questionList
// export const getOrgQuestionList = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/question/owner/list`);
//     dispatch({
//       type: GET_ORG_QUESTIONLIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ORG_QUESTION_ERROR,
//       payload: err,
//     });
//   }
// };

// Create question
export const createQuestion = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiUrl}/api/question`, formData);

    dispatch({
      type: CREATE_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

//Get organizer questionlist
export const getOrgQuestionList = (roomId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/question/owner/room/${roomId}`);
    dispatch({
      type: GET_ORG_QUESTIONLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

//Organizer question Unload
export const orgQuestionUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_QUESTION_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

//Organizer questionList Unload
export const orgQuestionListUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_QUESTIONLIST_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

//Delete question
export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/api/question/${questionId}`);

    dispatch({
      type: DELETE_QUESTION,
      payload: questionId,
    });

    // dispatch(setAlert("Question Removed", "success"));
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};

//Edit question
export const editQuestion = (questionId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/api/question/editquestion/${questionId}`,formData);

    dispatch({
      type: EDIT_QUESTION,
      payload: res.data,
    });

    // dispatch(setAlert("Question Edited", "success"));
  } catch (err) {
    dispatch({
      type: ORG_QUESTION_ERROR,
      payload: err,
    });
  }
};
