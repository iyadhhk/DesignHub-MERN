import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(
      (el, index) => <Fragment key={index}>{alert.show(`${el}`)}</Fragment>
      // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      //   {alert.msg}
      // </div>
    )
  );
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapState = state => ({
  alerts: state.alert,
});
export default connect(mapState)(Alert);
