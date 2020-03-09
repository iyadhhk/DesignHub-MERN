import {
  STORE_ERROR,
  UPDATE_STORE,
  GET_STORE,
  GET_STORES,
  CLEAR_STORE,
} from '../actions/types';
const initialState = {
  store: null,
  stores: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STORE:
    case UPDATE_STORE:
      return {
        ...state,
        store: payload,
        loading: false,
      };
    case GET_STORES:
      return {
        ...state,
        stores: payload,
        loading: false,
      };
    case STORE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_STORE:
      return { ...state, store: null, stores: null, loading: false, error: {} };
    default:
      return state;
  }
}
