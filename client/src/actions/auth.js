import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { createProfile } from './profile';
import { createProject } from './project';
import { createStore } from './store';
import { createPortfolio } from './portfolio';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROJECT,
  CLEAR_PROFILE,
} from './types';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  Register User
export const register = ({
  firstname,
  lastname,
  profession,
  email,
  region,
  details,
  phone,
  gender,
  password,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    firstname,
    lastname,
    profession,
    email,
    region,
    details,
    phone,
    gender,
    password,
  });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(createProfile());
    dispatch(createProject());
    dispatch(createStore());
    dispatch(createPortfolio());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/api/auth/', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    await dispatch(loadUser());
    // dispatch(getCurrentProfile());
  } catch (error) {
    if (error) {
      // console.log(error.response);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
    }
    // dispatch(setAlert('Please try later', 'error'));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_PROJECT });
  dispatch({ type: LOGOUT });
};
