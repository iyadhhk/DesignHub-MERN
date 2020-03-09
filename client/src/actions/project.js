import axios from 'axios';
import {
  GET_PROJECTS,
  PROJECTS_ERROR,
  UPDATE_PROJECT,
  GET_CURRENT_PROJECT,
} from './types';
import { setAlert } from '../actions/alert';

// .create projects document
export const createProject = () => async dispatch => {
  try {
    const res = await axios.post('/api/project');
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
    dispatch(setAlert('You can start you own projects now', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// .   Get current user list of projects
export const getCurrentProject = () => async dispatch => {
  try {
    const res = await axios.get('/api/project/myprojects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//. add new project
export const addProject = formData => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put('/api/project/newproj', formData, config);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
    dispatch(setAlert('Project Added', 'success'));
    dispatch(getCurrentProject());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//. delete project
export const deleteProject = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/project/${id}`);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. get a project
export const getProject = id => async dispatch => {
  try {
    const res = await axios.get(`/api/project/myprojects/${id}`);
    dispatch({
      type: GET_CURRENT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//. add team member
export const addTeamMember = (id, formData) => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put(`/api/project/team/${id}`, formData, config);
    dispatch({
      type: GET_CURRENT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { err },
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. cancel adding team member
export const cancelTeamMember = (projId, formData) => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put(`/api/project/noteam/${projId}`, formData, config);
    dispatch({
      type: GET_CURRENT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { err },
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//. accept invitation
export const acceptInvitation = (projId, formData) => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.put(`/api/project/confirm/${projId}`, formData, config);
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { err },
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
