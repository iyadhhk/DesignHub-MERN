import {
  PORTFOLIO_ERROR,
  UPDATE_PORTFOLIO,
  GET_PORTFOLIOS,
  CLEAR_PORTFOLIO,
  GET_PORTFOLIO,
} from '../actions/types';
const initialState = {
  portfolio: null,
  portfolios: null,
  loading: true,
  error: {},
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PORTFOLIO:
    case UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: payload,
        loading: false,
      };
    case GET_PORTFOLIOS:
      return {
        ...state,
        portfolios: payload,
        loading: false,
      };
    case PORTFOLIO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PORTFOLIO:
      return {
        ...state,
        portfolio: null,
        portfolios: null,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
}
