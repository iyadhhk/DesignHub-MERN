import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import ExperienceItem from './ExperienceItem';

const Experience = ({ profile, loading }) => {
  if (loading || profile === null)
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
      <h2 className='hubmy hubblue-text'>Experiences</h2>
      <div className='hubtable' style={{ width: '100%' }}>
        <Fragment>
          {profile.experience.length > 0 && profile.experience !== undefined ? (
            profile.experience.map(exp => <ExperienceItem key={exp._id} exp={exp} />)
          ) : (
            <h4 className='hubgreen-text'>No experience found</h4>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});
export default connect(mapState, { deleteExperience })(Experience);
