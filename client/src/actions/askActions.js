import axios from 'axios';
import apiUrl from '../utils/apiUrl' ;
// import { setAlert } from './alertActions';
import Swal from 'sweetalert2';

import { 
    GET_ASKLIST,
    GET_ASK,
    ADD_ASK,
    ASK_ERROR,
    ASK_UNLOADED,
    ASKLIST_UNLOADED
} from './types';

//Get all ask
// export const getAllAsk = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/ask')
//         dispatch({
//             type: GET_ASKLIST,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ASK_ERROR,
//             payload: err
//         });    
//     }
// };

//Get ask by ask_id
// export const getAskById = askId => async dispatch => {
//     try {
//         const res = await axios.get(`/api/ask/${askId}`)
//         dispatch({
//             type: GET_ASK,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: ASK_ERROR,
//             payload: err
//         });    
//     }
// };

//Get user asklist
export const getUserAskList = (roomId) => async dispatch => {
    try {
        const res = await axios.get(`${apiUrl}/api/ask/user/room/${roomId}`)

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
        const res = await axios.post(`${apiUrl}/api/ask`, formData);

        dispatch({
          type: ADD_ASK,
          payload: res.data
        });
        
        //test Sweetalert2
        Swal.fire({
            title:'Message Send!',
            icon:'success'
        })
        
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