import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import './SignUpPage.css';

const SignUpPage = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    profession: '',
    email: '',
    region: '',
    details: '',
    phone: '',
    gender: '',
    password: '',
    password2: '',
  });

  const {
    firstname,
    lastname,
    profession,
    email,
    region,
    details,
    phone,
    gender,
    password,
    password2,
  } = formData;
  const alert = useAlert();
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGender = e => setFormData({ ...formData, gender: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      alert.error('Passwords do not match');
    } else {
      register({
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
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/DesignHubHome' />;
  }
  return (
    <Fragment>
      <div className='mysignuppage'>
        <div className='myrealsignuppage'>
          <h1 className='hublarge hubblue-text'>Sign Up</h1>
          <p className='hublead'>Create Your Account</p>
          <form className='hubform' onSubmit={e => onSubmit(e)}>
            <div className='hubform-group'>
              <input
                type='text'
                placeholder='First Name'
                name='firstname'
                value={firstname}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <input
                type='text'
                placeholder='Last Name'
                name='lastname'
                value={lastname}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <select name='profession' value={profession} onChange={e => onChange(e)}>
                <option>Profession</option>
                <option value='graphic designer'>Graphic Designer</option>
                <option value='motion designer'>Motion Designer</option>
                <option value='photographer'>Photographer</option>
                <option value='web developer'>Web Developer</option>
              </select>
            </div>
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
                type='text'
                placeholder='Region Address'
                name='region'
                value={region}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <input
                type='text'
                placeholder='Details of Address'
                name='details'
                value={details}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='hubform-group'>
              <input
                type='radio'
                name='gender'
                value='male'
                onChange={e => handleGender(e)}
              />{' '}
              Male
              <input
                type='radio'
                name='gender'
                value='female'
                onChange={e => handleGender(e)}
              />{' '}
              Female
            </div>
            <div className='hubform-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='hubform-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                minLength='6'
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <input type='submit' value='Register' className='hubbtn hubbtn-primary' />
          </form>
          <p className='hubmy-1'>
            Already have an account?{' '}
            <Link to='/welcome/login'>
              <span className='hubgreen-text'> Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
SignUpPage.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapState, { register })(SignUpPage);
