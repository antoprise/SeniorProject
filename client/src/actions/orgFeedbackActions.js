import axios from "axios";
import apiUrl from '../utils/apiUrl' ;
import {
  GET_ORG_FEEDBACKLIST,
  GET_ORG_FEEDBACK,
  ORG_FEEDBACK_ERROR,
  ORG_FEEDBACK_UNLOADED,
  ORG_FEEDBACKLIST_UNLOADED,
} from "./types";

//Get all feedback (Organizer)
// export const getAllOrgFeedback = () => async dispatch => {
//     try {

//         const res = await axios.get('/api/feedback')
//         dispatch({
//             type: GET_ORG_FEEDBACKLIST,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ORG_FEEDBACK_ERROR,
//             payload: err
//         });
//     }
// };

// //Get feedback by feedback_id (Organizer)
// export const getOrgFeedbackById = feedbackId => async dispatch => {
//     try {

//         const res = await axios.get(`/api/feedback/${feedbackId}`)

//         dispatch({
//             type: GET_ORG_FEEDBACK,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ORG_FEEDBACK_ERROR,
//             payload: err
//         });
//     }
// };

//Get organizer feedbacklist
export const getOrgFeedbackList = (roomId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/api/feedback/owner/room/${roomId}`);
    dispatch({
      type: GET_ORG_FEEDBACKLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORG_FEEDBACK_ERROR,
      payload: err,
    });
  }
};

//Organizer feedback Unload
export const orgFeedbackUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_FEEDBACK_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_FEEDBACK_ERROR,
      payload: err,
    });
  }
};

//Organizer feedbackList Unload
export const orgFeedbackListUnload = () => async (dispatch) => {
  try {
    dispatch({ type: ORG_FEEDBACKLIST_UNLOADED });
  } catch (err) {
    dispatch({
      type: ORG_FEEDBACK_ERROR,
      payload: err,
    });
  }
};
