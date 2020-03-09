import React, { Fragment, useEffect, useState } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import MyProfile from './MyProfile';
import MyStore from './MyStore';
import MyProject from './MyProjects';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import AllProfiles from '../Profiles/AllProfiles';
import ProjectDash from '../ProjectItems/ProjectDash';
import FreeProfile from '../Profiles/FreeProfile';
import { acceptInvitation } from '../../actions/project';
import { deleteInvitation } from '../../actions/user';
import Footer from '../Landing/footer';
import logohorizantal from '../Landing/svg/logohorizontal.svg';
import './HomePage.css';

const HomePage = ({
  deleteInvitation,
  acceptInvitation,
  auth: { user },
  logout,
  alerts = null,
  loading,
}) => {
  const [formData, setFormData] = useState({
    requests: null,
  });
  const [isonline, setIsOnline] = useState(false);
  //. this is realtime thing
  const socket = io('ws://localhost:5000/', {
    transports: ['websocket'],
  });

  const alert = useAlert();

  useEffect(() => {
    if (alerts !== null && alerts.length > 0) {
      alerts.map(el => {
        if (el.alertType === 'success') alert.success(`${el.msg}`);
        else if (el.alertType === 'error') alert.error(`${el.msg}`);
        return null;
      });
    }
  });
  if (!isonline) {
    socket.once('connect', () => {
      console.log('connected');
      if (user !== null) user != null && socket.emit('joinNotificationsRoom', user._id);
    });
    socket.on('newRequest', data => {
      data && alert.show(`${data.name}  sent you a work invitation`);
      setFormData({ ...formData, requests: data });
    });
    setIsOnline(true);
  }

  if (loading || user === null)
    return (
      <div className='container'>
        <div className='d-flex justify-content-center text-primary'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <Fragment>
      {/* ------------------------------------------------ */}
      <header className='navbar'>
        <Link to='/Welcome'>
          <img src={logohorizantal} className='navlogo' alt='designhub-logo'></img>
        </Link>
        <ul className='homenavlist'>
          <Link to='/DesignHubHome/profile'>
            <li>
              <a href=''>Profile</a>
            </li>
          </Link>
          <Link to='/DesignHubHome/store'>
            <li>
              <a href=''>Store</a>
            </li>
          </Link>
          <Link to='/DesignHubHome/projects'>
            <li>
              <a href=''>Projects</a>
            </li>
          </Link>
          <Link to='/DesignHubHome/search'>
            <li>
              <a href=''>Search</a>
            </li>
          </Link>
          <Link to='/welcome'>
            <li>
              <a
                href=''
                onClick={() => {
                  socket.disconnect();
                  logout();
                }}>
                Logout
              </a>
            </li>
          </Link>
        </ul>
      </header>
      {/* ------------------------------------------------ */}
      <div className='hubcontainer homebackcolor'>
        {formData.requests !== null && (
          <p className='hubgreen-text'>New request from {formData.requests.name}</p>
        )}
      </div>
      <div>
        {user.workrequests.length > 0 &&
          user.workrequests.map((work, i) => (
            <div className='hubcontainer' key={i}>
              <h3>{`${work.name} need a freelancer for this project: ${work.brief}`}</h3>
              <button
                className='hubbtn hubbtn-success'
                onClick={() => {
                  acceptInvitation(work.projectId, {
                    userId: work.id,
                    memberId: user._id,
                  });
                  deleteInvitation({ projectId: work.projectId });
                }}>
                accept
              </button>
            </div>
          ))}
      </div>

      <Redirect to='/DesignHubHome/search' />

      <Switch>
        <Route exact path='/DesignHubHome/profile' component={MyProfile} />
        <Route exact path='/DesignHubHome/store' component={MyStore} />
        <Route exact path='/DesignHubHome/projects' component={MyProject} />
        <Route exact path='/DesignHubHome/search' component={AllProfiles} />
        <Route exact path='/DesignHubHome/projectDash' component={ProjectDash} />
        <Route exact path='/DesignHubHome/freelancerProfile' component={FreeProfile} />
      </Switch>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};
HomePage.propTypes = {
  logout: PropTypes.func.isRequired,
  alerts: PropTypes.array,
};
const mapState = state => ({
  alerts: state.alert,
  loading: state.auth.loading,
  auth: state.auth,
});
export default connect(mapState, { logout, acceptInvitation, deleteInvitation })(
  HomePage
);
