import { LOAD_API_VALUES, LOAD_API_VALUES_SUCCESS, LOAD_API_VALUES_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_API_VALUES: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        values: action.values,
      };

      return newState;
    }
    case LOAD_API_VALUES_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        values: action.values,
      };
      return newState;
    }

    case LOAD_API_VALUES_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }
}

export default appReducer;
