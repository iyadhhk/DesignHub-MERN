import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import project from './project';
import store from './store';
import portfolio from './portfolio';
export default combineReducers({
  auth,
  alert,
  profile,
  project,
  store,
  portfolio,
});
