import {
  GET_PROJECTS,
  GET_CURRENT_PROJECT,
  PROJECTS_ERROR,
  CLEAR_PROJECT,
  UPDATE_PROJECT,
} from '../actions/types';
const initialState = {
  project: null,
  myProject: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
    case UPDATE_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case GET_CURRENT_PROJECT:
      return {
        ...state,
        myProject: payload,
        loading: false,
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROJECT:
      return { ...state, project: null, loading: false, error: {} };
    default:
      return state;
  }
}
