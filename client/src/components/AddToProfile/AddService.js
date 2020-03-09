import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addService } from '../../actions/profile';

const AddService = ({ addService }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    cost: '',
  });

  const { title, type, cost } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h2 className='hubtext-primary'>Add Your Service</h2>

      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          addService(formData);
          setFormData({ ...formData, title: '', type: '', cost: '' });
        }}>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder=' Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='Service type'
            name='type'
            value={type}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='Service cost'
            name='cost'
            value={cost}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='hubbtn hubbtn-primary hubmy-1'
          value='Add new service'
        />
      </form>
    </Fragment>
  );
};

AddService.propTypes = {
  addService: PropTypes.func.isRequired,
};

export default connect(null, { addService })(withRouter(AddService));
