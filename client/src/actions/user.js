import axios from 'axios';
import { USER_LOADED } from '../actions/types';
import { setAlert } from './alert';

export const inviteToWork = formData => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/users/invite', formData, config);
    dispatch(setAlert('Invitation sent', 'success'));
  } catch (error) {
    throw new Error(error);
  }
};
export const cancelInvitation = formData => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/users/caninvite', formData, config);
    dispatch(setAlert('Invitation Cancelled', 'success'));
  } catch (error) {
    throw new Error(error);
  }
};
//. update info
export const updateUserInfo = formdata => async dispatch => {
  try {
    const config = { hearders: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/users/myinfos', formdata, config);
    dispatch(setAlert('Infos updated', 'success'));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
//. delete invitation
export const deleteInvitation = formData => async dispatch => {
  try {
    const config = { hearders: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/users/deleteInvitation', formData, config);
    dispatch(setAlert('confirm sent', 'success'));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
