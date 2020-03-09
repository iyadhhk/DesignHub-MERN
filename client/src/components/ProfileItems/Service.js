import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteService } from '../../actions/profile';
import ServiceItem from './ServiceItem';

const Service = ({ profile, loading }) => {
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
      <h2 className='hubmy hubblue-text'>Services</h2>
      <div className='hubtable' style={{ width: '100%' }}>
        <Fragment>
          {profile.service.length > 0 && profile.service !== undefined ? (
            profile.service.map(serv => <ServiceItem key={serv._id} serv={serv} />)
          ) : (
            <h4 className='hubgreen-text'>No Services found</h4>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

Service.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapState, { deleteService })(Service);
