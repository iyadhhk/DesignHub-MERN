import axios from 'axios';
import { setAlert } from './alert';
import {
  PORTFOLIO_ERROR,
  UPDATE_PORTFOLIO,
  GET_PORTFOLIOS,
  CLEAR_PORTFOLIO,
  GET_PORTFOLIO,
  // ACCOUNT_DELETED,
  // GET_REPOS,
} from './types';

//create Store
export const createPortfolio = () => async dispatch => {
  try {
    const res = await axios.post('/api/portfolio');
    dispatch({
      type: GET_PORTFOLIO,
      payload: res.data,
    });
    dispatch(setAlert('You can add your work to portfolio now', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get current user store
export const getCurrentPortfolio = () => async dispatch => {
  try {
    const res = await axios.get('/api/portfolio/me');

    dispatch({
      type: GET_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// ADD new work
export const addPortfolio = (formData, preview) => async dispatch => {
  try {
    const response = await axios.post('/api/resources/preview', preview, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    formData.preview = response.data;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/portfolio/portfolio', formData, config);
    dispatch({
      type: UPDATE_PORTFOLIO,
      payload: res.data,
    });
    dispatch(setAlert('portfolio Added', 'success'));
    dispatch(getCurrentPortfolio());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//. delete work
export const deletePortfolio = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/portfolio/work/${id}`);
    dispatch({
      type: UPDATE_PORTFOLIO,
      payload: res.data,
    });
    dispatch(setAlert('Work Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//. get all works
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PORTFOLIO });
  try {
    const res = await axios.get('/api/portfolio');
    dispatch({
      type: GET_PORTFOLIOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// . get store by user id
export const getPortfolioById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/portfolio/work/${userId}`);
    dispatch({
      type: GET_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// edit  work
export const updatePortfolio = (id, formData) => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put(`/api/portfolio/work/${id}`, formData, config);
    dispatch({
      type: UPDATE_PORTFOLIO,
      payload: res.data,
    });
    dispatch(setAlert('portfolio updated', 'success'));
    dispatch(getCurrentPortfolio());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
