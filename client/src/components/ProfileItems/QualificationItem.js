import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteQualification, updateQualification } from '../../actions/profile';

function QualificationItem({
  auth,
  profile,
  qual,
  deleteQualification,
  updateQualification,
}) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    certificate: '',
    organization: '',
    description: '',
    startyear: '',
  });

  const { certificate, organization, description, startyear } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ display: 'flex', width: '800px', justifyContent: 'space-between' }}>
      {editing ? (
        <input
          type='text'
          name='certificate'
          value={certificate}
          onChange={e => onChange(e)}
        />
      ) : (
        <p>
          <span className='hubgreen-text'>Certificate :</span> {qual.certificate}
        </p>
      )}
      {editing ? (
        <input
          type='text'
          name='organization'
          value={organization}
          onChange={e => onChange(e)}
        />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Organization :</span> {qual.organization}
        </p>
      )}
      {editing ? (
        <input
          type='text'
          name='description'
          value={description}
          onChange={e => onChange(e)}
        />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Description :</span> {qual.description}
        </p>
      )}
      {editing ? (
        <input
          type='text'
          name='startyear'
          value={startyear}
          onChange={e => onChange(e)}
        />
      ) : (
        <p>
          <span className='hubgreen-text'>Start Year :</span> {qual.startyear}
        </p>
      )}
      <div>
        <button
          className='hubbtn hubbtn-danger'
          onClick={() => deleteQualification(qual._id)}>
          Delete
        </button>
        <button
          className='hubbtn hubbtn-success'
          onClick={() => {
            editing
              ? updateQualification(qual._id, formData)
              : setFormData({
                  ...formData,
                  certificate: qual.certificate,
                  organization: qual.organization,
                  description: qual.description,
                  startyear: qual.startyear,
                });
            setEditing(!editing);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
}

QualificationItem.propTypes = {
  deleteQualification: PropTypes.func.isRequired,
};
const mapState = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapState, { deleteQualification, updateQualification })(
  QualificationItem
);
