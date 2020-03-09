import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience, updateExperience } from '../../actions/profile';

const ExperienceItem = ({ auth, profile, exp, deleteExperience, updateExperience }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    startyear: '',
    endyear: '',
    description: '',
  });

  const { position, company, startyear, endyear, description } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ display: 'flex' }}>
      {editing ? (
        <input type='text' name='position' value={position} onChange={e => onChange(e)} />
      ) : (
        <p>
          <span className='hubgreen-text'>Position :</span> {exp.position}
        </p>
      )}
      {editing ? (
        <input type='text' name='company' value={company} onChange={e => onChange(e)} />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Company :</span> {exp.company}
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
          <span className='hubgreen-text'>Description :</span> {exp.description}
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
          <span className='hubgreen-text'>Start Year :</span> {exp.startyear}
        </p>
      )}
      {editing ? (
        <input type='text' name='endyear' value={endyear} onChange={e => onChange(e)} />
      ) : (
        <p>
          <span className='hubgreen-text'>End Year :</span> {exp.endyear}
        </p>
      )}

      <div>
        <button
          className='hubbtn hubbtn-danger'
          onClick={() => deleteExperience(exp._id)}>
          Delete
        </button>
        <button
          className='hubbtn hubbtn-success'
          onClick={() => {
            editing
              ? updateExperience(exp._id, formData)
              : setFormData({
                  ...formData,
                  position: exp.position,
                  company: exp.company,
                  description: exp.description,
                  startyear: exp.startyear,
                  endyear: exp.endyear,
                });
            setEditing(!editing);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
};

ExperienceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};
const mapState = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapState, { deleteExperience, updateExperience })(ExperienceItem);
