import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteQualification } from '../../actions/profile';
import QualificationItem from './QualificationItem';

const Qualification = ({ profile, loading }) => {
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
      <h2 className='hubmy hubblue-text'>Qualifications</h2>
      <div className='hubtable' style={{ width: '100%' }}>
        <Fragment>
          {profile.qualification.length > 0 && profile.qualification !== undefined ? (
            profile.qualification.map(qual => (
              <QualificationItem key={qual._id} qual={qual} />
            ))
          ) : (
            <h4 className='hubgreen-text'>No qualification found</h4>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Qualification.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapState, { deleteQualification })(Qualification);
