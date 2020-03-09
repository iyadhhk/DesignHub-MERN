import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import AddService from '../AddToProfile/AddService';
import Service from '../ProfileItems/Service';
import AddQualification from '../AddToProfile/AddQualification';
import Qualification from '../ProfileItems/Qualification';
import AddEducation from '../AddToProfile/AddEducation';
import Education from '../ProfileItems/Education';
import AddExperience from '../AddToProfile/AddExperience';
import Experience from '../ProfileItems/Experience';
import MyPortfolio from './MyPortfolio';
import { getCurrentProfile } from '../../actions/profile';

const MyProfile = ({ loading, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  if (loading)
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
    <div className='hubcontainer'>
      <h1 className='hublarge hubtext-primary'>My Profile</h1>

      <ProfileHeader />
      <Service />
      <AddService />
      <Qualification />
      <AddQualification />
      <Education />
      <AddEducation />
      <Experience />
      <AddExperience />
      <MyPortfolio />
    </div>
  );
};

MyProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapState = state => ({
  loading: state.profile.loading,
});
export default connect(mapState, { getCurrentProfile })(MyProfile);
