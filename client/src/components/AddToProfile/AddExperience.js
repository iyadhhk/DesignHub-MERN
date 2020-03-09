import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    startyear: '',
    endyear: '',
    description: '',
  });

  const { position, company, startyear, endyear, description } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  let years = [];
  for (let i = 2000; i <= 2020; i++) {
    years.push(i);
  }

  return (
    <Fragment>
      <h2 className='hubtext-primary'>Add Your Experience</h2>

      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData);
          setFormData({
            ...formData,
            position: '',
            company: '',
            startyear: '',
            endyear: '',
            description: '',
          });
        }}>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder=' position'
            name='position'
            value={position}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='company'
            name='company'
            value={company}
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
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='hubbtn hubbtn-primary my-1'
          value='Add new Experience'
        />
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
