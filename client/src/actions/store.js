import axios from 'axios';
import { setAlert } from './alert';
import { STORE_ERROR, UPDATE_STORE, GET_STORE, GET_STORES, CLEAR_STORE } from './types';

// .create Store
export const createStore = () => async dispatch => {
  try {
    const res = await axios.post('/api/store');
    dispatch({
      type: GET_STORE,
      payload: res.data,
    });
    dispatch(setAlert('You can add your products to Store now', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// . Get current user store
export const getCurrentStore = () => async dispatch => {
  try {
    const res = await axios.get('/api/store/mystore');

    dispatch({
      type: GET_STORE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. add new product
export const addProduct = (formData, preview) => async dispatch => {
  try {
    const response = await axios.post('/api/resources/preview', preview, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    formData.preview = response.data;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/store/product', formData, config);
    dispatch({
      type: UPDATE_STORE,
      payload: res.data,
    });
    dispatch(setAlert('Product Added', 'success'));
    dispatch(getCurrentStore());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. edit Product
export const updateProduct = (id, formData) => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put(`/api/store/product/${id}`, formData, config);
    dispatch({
      type: UPDATE_STORE,
      payload: res.data,
    });
    dispatch(setAlert('product updated', 'success'));
    dispatch(getCurrentStore());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. delete product
export const deleteProduct = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/store/product/${id}`);
    dispatch({
      type: UPDATE_STORE,
      payload: res.data,
    });
    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//. get all stores
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_STORE });
  try {
    const res = await axios.get('/api/store');
    dispatch({
      type: GET_STORES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// . get store by user id
export const getStoreById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/store/products/${userId}`);
    dispatch({
      type: GET_STORE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STORE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
