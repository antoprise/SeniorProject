import axios from 'axios';
import { 
    ASK_REQUEST,
    GET_ASKLIST,
    GET_ASK,
    ADD_ASK,
    ASK_ERROR,
    ASK_UNLOADED,
    ASKLIST_UNLOADED
} from './types';

//Get all ask
export const getAllAsk = () => async dispatch => {
    try {
        dispatch({type: ASK_REQUEST});
        const res = await axios.get('https://ask-project.herokuapp.com/api/ask')
        dispatch({
            type: GET_ASKLIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};

//Get ask by ask_id
export const getAskById = askId => async dispatch => {
    try {
        dispatch({type: ASK_REQUEST});
        const res = await axios.get(`https://ask-project.herokuapp.com/api/ask/${askId}`)

        dispatch({
            type: GET_ASK,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};

//Get ask by room_id and user_id
export const getAskByRoomIdUserId = (roomId,userId) => async dispatch => {
    try {
        dispatch({type: ASK_REQUEST});
        const res = await axios.get(`https://ask-project.herokuapp.com/api/ask/room/${roomId}/${userId}`)
    
        dispatch({
            type: GET_ASKLIST,
            payload: res.data
        });    
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};

// Add ask
export const addAsk = formData => async dispatch => {
    try {
        dispatch({type: ASK_REQUEST});
        const res = await axios.post('https://ask-project.herokuapp.com/api/ask', formData);

        dispatch({
          type: ADD_ASK,
          payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};

//ask Unload
export const askUnload = () => async dispatch => {
    try {
        dispatch({type: ASK_UNLOADED});
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};

//askList Unload
export const askListUnload = () => async dispatch => {
    try {
        dispatch({type: ASKLIST_UNLOADED});
    } catch (err) {
        dispatch({
            type: ASK_ERROR,
            payload: err
        });    
    }
};