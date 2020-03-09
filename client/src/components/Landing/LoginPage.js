import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './LoginPage.css';

const LoginPage = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/DesignHubHome' />;
  }

  return (
    <Fragment>
      <div className='myloginpage'>
        <div className='myrealloginpage'>
          <h1 className='hublarge hubtext-primary'>Sign In</h1>
          <p className='hublead'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </p>
          <form className='hubform' onSubmit={e => onSubmit(e)}>
            <div className='hubform-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <input type='submit' className='hubbtn hubbtn-primary' value='Login' />
          </form>
          <p className='hubmy-1'>
            Don't have an account?{' '}
            <Link to='/Welcome/signup'>
              <span className='hubgreen-text'>Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapState, { login })(LoginPage);
