import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPortfolio } from '../../actions/portfolio';

const AddPortfolio = ({ addPortfolio }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    skills: '',
  });
  const [file, setFile] = useState('');

  const { type, title, description, skills } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeFile = e => {
    setFile(e.target.files[0]);
  };
  return (
    <Fragment>
      <h2 className='hubtext-primary'>Add Your Work</h2>
      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          const preview = new FormData();
          preview.append('file', file);
          addPortfolio(formData, preview);
          setFormData({
            ...formData,
            type: '',
            title: '',
            description: '',
            skills: '',
          });
        }}>
        <div className='hubform-group'>
          <input
            type='file'
            className='hubcustom-file-input'
            id='customFile'
            onChange={onChangeFile}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='type '
            name='type'
            value={type}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
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
          <input
            type='text'
            placeholder='skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='hubbtn hubbtn-primary my-1' value='Add Product' />
      </form>
    </Fragment>
  );
};

AddPortfolio.propTypes = {
  addPortfolio: PropTypes.func.isRequired,
};

export default connect(null, { addPortfolio })(withRouter(AddPortfolio));
