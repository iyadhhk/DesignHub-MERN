import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from '../Profiles/ProfileItem';
import { getProject } from '../../actions/project';
import { getProfiles } from '../../actions/profile';

const ProjectDash = ({ auth: { user }, myProject, loading, getProfiles, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  if (loading || myProject === null)
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
      <h2 className='hubblue-text'>My Project</h2>
      <p>
        <span className='hubgreen-text'>Brief :</span> {myProject.brief}
      </p>
      <p>
        <span className='hubgreen-text'>Budget :</span> {myProject.badget}{' '}
        <span>DNT</span>
      </p>
      <p>
        <span className='hubgreen-text'>Max Team Memb :</span>
        {myProject.maxteam}
      </p>
      <div>
        {' '}
        {myProject.members !== undefined && myProject.members.length > 0
          ? myProject.members.map((mem, i) => (
              <div key={i}>
                <p>
                  member :{mem.name} status:{' '}
                  {mem.confirm ? 'confirm' : ' not yet confirm'}
                </p>
              </div>
            ))
          : 'You should build a team'}
      </div>
      <p cl>Status : {myProject.conclusive ? 'conclusive' : 'In progress'}</p>
      <div>
        {profiles.length > 0 && profiles !== null && user !== null ? (
          profiles
            .filter(prof => prof.user._id !== user._id)
            .map(profile => (
              <ProfileItem key={profile._id} profile={profile} team={true} />
            ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </div>
  );
};

ProjectDash.propTypes = {
  myProject: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  profiles: state.profile.profiles,
  auth: state.auth,
  myProject: state.project.myProject,
  loading: state.project.loading,
});
export default connect(mapState, { getProject, getProfiles })(ProjectDash);
