import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQualification } from '../../actions/profile';

const AddQualification = ({ addQualification }) => {
  const [formData, setFormData] = useState({
    certificate: '',
    organization: '',
    description: '',
    startyear: '',
  });

  const { certificate, organization, description, startyear } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  let years = [];
  for (let i = 2000; i <= 2020; i++) {
    years.push(i);
  }
  return (
    <Fragment>
      <h2 className='hubtext-primary'>Add Your Qualification</h2>

      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          addQualification(formData);
          setFormData({
            certificate: '',
            organization: '',
            description: '',
            startyear: '',
          });
        }}>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder=' certificate'
            name='certificate'
            value={certificate}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='organization '
            name='organization'
            value={organization}
            onChange={e => onChange(e)}
          />
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
        <input
          type='submit'
          className='hubbtn hubbtn-primary my-1'
          value='Add new qualification'
        />
      </form>
    </Fragment>
  );
};

AddQualification.propTypes = {
  addQualification: PropTypes.func.isRequired,
};

export default connect(null, { addQualification })(withRouter(AddQualification));
