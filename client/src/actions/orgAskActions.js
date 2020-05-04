import axios from 'axios';
import { 
    ORG_ASK_REQUEST,
    GET_ORG_ASKLIST,
    GET_ORG_ASK,
    ORG_ASK_ERROR,
    ORG_ASK_UNLOADED,
    ORG_ASKLIST_UNLOADED
} from './types';

//Get all ask (Organizer)
export const getAllOrgAsk = () => async dispatch => {
    try {
        dispatch({type: ORG_ASK_REQUEST});
        const res = await axios.get('https://ask-project.herokuapp.com//api/ask')
        dispatch({
            type: GET_ORG_ASKLIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ORG_ASK_ERROR,
            payload: err
        });    
    }
};

//Get ask by ask_id (Organizer)
export const getOrgAskById = askId => async dispatch => {
    try {
        dispatch({type: ORG_ASK_REQUEST});
        const res = await axios.get(`https://ask-project.herokuapp.com//api/ask/${askId}`)

        dispatch({
            type: GET_ORG_ASK,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ORG_ASK_ERROR,
            payload: err
        });    
    }
};

//Get List ask by room_id (Organizer)
export const getOrgAskByRoomId = roomId => async dispatch => {
    try {
        dispatch({type: ORG_ASK_REQUEST});
        const res = await axios.get(`https://ask-project.herokuapp.com//api/ask/room/${roomId}`)
    
        dispatch({
            type: GET_ORG_ASKLIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ORG_ASK_ERROR,
            payload: err
        });    
    }
};

//Organizer ask Unload
export const orgAskUnload = () => async dispatch => {
    try {
        dispatch({type: ORG_ASK_UNLOADED});
    } catch (err) {
        dispatch({
            type: ORG_ASK_ERROR,
            payload: err
        });    
    }
};

//Organizer askList Unload
export const orgAskListUnload = () => async dispatch => {
    try {
        dispatch({type: ORG_ASKLIST_UNLOADED});
    } catch (err) {
        dispatch({
            type: ORG_ASK_ERROR,
            payload: err
        });    
    }
};