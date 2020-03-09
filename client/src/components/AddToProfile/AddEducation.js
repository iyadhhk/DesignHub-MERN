import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
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
  let years = [];
  for (let i = 2000; i <= 2020; i++) {
    years.push(i);
  }

  return (
    <Fragment>
      <h2 className='hubtext-primary'>Add Your Education</h2>

      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData);
          setFormData({
            ...formData,
            country: '',
            college: '',
            degree: '',
            fieldofstudy: '',
            startyear: '',
            endyear: '',
          });
        }}>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder=' country'
            name='country'
            value={country}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='college'
            name='college'
            value={college}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='degree'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='field of study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <select name='startyear' value={startyear} onChange={e => onChange(e)}>
            <option>start year</option>
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className='hubform-group'>
          <select name='endyear' value={endyear} onChange={e => onChange(e)}>
            <option>end year</option>
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='hubbtn hubbtn-primary hubmy-1'
          value='Add new education'
        />
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
