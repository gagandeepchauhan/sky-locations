import createDataContext from "./createDataContext";
import { v4 as uuidV4 } from 'uuid';

const flashMessageReducer = (state, action) => {
    switch (action.type) {
        case 'add_message':
            return [...state, { id: action.payload.id, message: action.payload.message }];
        case 'clear_message':
            return [...state.filter(msg => msg.id !== action.payload)];
        default:
            return state;
    }
};

const addMessage = dispatch => (message) => {
    let id = uuidV4();
    dispatch({
        type: 'add_message',
        payload: {
            id,
            message
        }
    });
    setTimeout(() => {
        dispatch({
            type: 'clear_message',
            payload: id
        });
    }, 3000);
};

const clearMessage = dispatch => (id) => {
    dispatch({
        type: 'clear_message',
        payload: id
    });
};

const initialValue = [];

export const { Context, Provider } = createDataContext(
    flashMessageReducer,
    { addMessage, clearMessage },
    initialValue
);