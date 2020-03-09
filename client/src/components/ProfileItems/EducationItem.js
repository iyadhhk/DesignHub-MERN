import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation, updateEducation } from '../../actions/profile';

const EducationItem = ({ profile, auth, edu, deleteEducation, updateEducation }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    college: '',
    degree: '',
    fieldofstudy: '',
    startyear: '',
    endyear: '',
  });
  const { country, college, degree, fieldofstudy, startyear, endyear } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '700px' }}>
      {editing ? (
        <input type='text' name='country' value={country} onChange={e => onChange(e)} />
      ) : (
        <p>
          <span className='hubgreen-text'>Country :</span> {edu.country}
        </p>
      )}
      {editing ? (
        <input type='text' name='college' value={college} onChange={e => onChange(e)} />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>College :</span> {edu.college}
        </p>
      )}
      {editing ? (
        <input type='text' name='degree' value={degree} onChange={e => onChange(e)} />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Degree :</span> {edu.degree}
        </p>
      )}
      {editing ? (
        <input
          type='text'
          name='fieldofstudy'
          value={fieldofstudy}
          onChange={e => onChange(e)}
        />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Field Of Study :</span> {edu.fieldofstudy}
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
          <span className='hubgreen-text'>Start Year :</span> {edu.startyear}
        </p>
      )}
      {editing ? (
        <input type='text' name='endyear' value={endyear} onChange={e => onChange(e)} />
      ) : (
        <p>
          <span className='hubgreen-text'>End Year :</span> {edu.endyear}
        </p>
      )}
      <div>
        <button className='hubbtn hubbtn-danger' onClick={() => deleteEducation(edu._id)}>
          Delete
        </button>
        <button
          className='hubbtn hubbtn-success'
          onClick={() => {
            editing
              ? updateEducation(edu._id, formData)
              : setFormData({
                  ...formData,
                  country: edu.country,
                  college: edu.college,
                  degree: edu.degree,
                  fieldofstudy: edu.fieldofstudy,
                  startyear: edu.startyear,
                  endyear: edu.endyear,
                });
            setEditing(!editing);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
};
EducationItem.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};
const mapState = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapState, { deleteEducation, updateEducation })(EducationItem);
