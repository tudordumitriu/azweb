import { CHANGE_USERNAME, CHANGE_SEARCHKEY } from './constants';

// The initial state of the App
const initialState = {
    username: '',
    searchKey: '',
};

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            // Delete prefixed '@' from the github username
            return { ...state, username: action.name.replace(/@/gi, '') };
        case CHANGE_SEARCHKEY:
            // Delete prefixed '@' from the github username
            return { ...state, searchKey: action.searchKey.replace(/@/gi, '') };
        default:
            return state;
    }
}

export default homeReducer;
