import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
const AllProfiles = ({ getProfiles, auth: { user }, profiles, loading }) => {
  const [searching, setSearching] = useState({
    isSearching: false,
    searchBy: '',
  });
  const { isSearching, searchBy } = searching;
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

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
      <div className='hubcontainer'>
        <h1 className='hubblue-text'>Freelancers</h1>
        <div style={{ display: 'flex' }}>
          <button
            className='btn bg-light'
            onClick={() => {
              if (isSearching && searchBy === 'graphic designer')
                setSearching({ isSearching: false, searchBy: '' });
              else if (!isSearching)
                setSearching({ isSearching: true, searchBy: 'graphic designer' });
              else setSearching({ ...searching, searchBy: 'graphic designer' });
            }}>
            Graphic Designer
          </button>
          <button
            className='btn bg-light'
            onClick={() => {
              if (isSearching && searchBy === 'motion designer')
                setSearching({ isSearching: false, searchBy: '' });
              else if (!isSearching)
                setSearching({ isSearching: true, searchBy: 'motion designer' });
              else setSearching({ ...searching, searchBy: 'motion designer' });
            }}>
            Motion Designer
          </button>
          <button
            className='btn bg-light'
            onClick={() => {
              if (isSearching && searchBy === 'photographer')
                setSearching({ isSearching: false, searchBy: '' });
              else if (!isSearching)
                setSearching({ isSearching: true, searchBy: 'photographer' });
              else setSearching({ ...searching, searchBy: 'photographer' });
            }}>
            Photographer
          </button>
          <button
            className='btn bg-light'
            onClick={() => {
              if (isSearching && searchBy === 'web developer')
                setSearching({ isSearching: false, searchBy: '' });
              else if (!isSearching)
                setSearching({ isSearching: true, searchBy: 'web developer' });
              else setSearching({ ...searching, searchBy: 'web developer' });
            }}>
            Web Developer
          </button>
        </div>
        {profiles.length > 0 && profiles !== null && user !== null ? (
          profiles
            .filter(prof => prof.user._id !== user._id)
            .filter(profile =>
              isSearching
                ? profile.user.profession === searchBy
                : profile.user.profession !== ''
            )
            .map(profile => <ProfileItem key={profile._id} profile={profile} />)
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </Fragment>
  );
};

// AllProfiles.propTypes = {};
const mapState = state => ({
  auth: state.auth,
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});
export default connect(mapState, { getProfiles })(AllProfiles);
