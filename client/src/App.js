import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/routingprivate/PrivateRoute';
import LandingPage from './components/Landing/LandingPage';
import HomePage from './components/Home/HomePage';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import GuestPage from './components/Landing/GuestPage';
import { loadUser } from './actions/auth';
import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({ loading, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  if (loading)
    return (
      <div>
        <div className='d-flex justify-content-center text-primary'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );
  return (
    <Fragment>
      <Redirect to='/Welcome' />
      <section>
        <Switch>
          <Route path='/Welcome' component={LandingPage} />
          <Route path='/Guest' component={GuestPage} />
          <PrivateRoute path='/DesignHubHome' component={HomePage} />
        </Switch>
      </section>
    </Fragment>
  );
};
const mapState = state => ({
  loading: state.auth.loading,
});
export default connect(mapState, { loadUser })(App);
