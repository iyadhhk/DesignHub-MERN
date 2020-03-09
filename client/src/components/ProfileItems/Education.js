import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EducationItem from './EducationItem';

const Education = ({ profile, loading }) => {
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
      <h2 className='hubmy hubblue-text'>Educations</h2>
      <div className='hubtable' style={{ width: '100%' }}>
        <Fragment>
          {profile.education.length > 0 && profile.education !== undefined ? (
            profile.education.map(edu => <EducationItem key={edu._id} edu={edu} />)
          ) : (
            <h4 className='hubgreen-text'>No Education found</h4>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapState)(Education);
