import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/store';

const Addproduct = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    tags: '',
  });
  const [file, setFile] = useState('');
  const { description, price, tags } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeFile = e => {
    setFile(e.target.files[0]);
  };
  return (
    <Fragment>
      <h2 className='hubblue-text'>Add Product</h2>
      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          const preview = new FormData();
          preview.append('file', file);
          addProduct(formData, preview);
          setFormData({
            ...formData,
            description: '',
            price: '',
            tags: '',
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
            placeholder='description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='price'
            name='price'
            value={price}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='tags'
            name='tags'
            value={tags}
            onChange={e => onChange(e)}
          />
        </div>

        <input
          type='submit'
          className='hubbtn hubbtn-primary hubmy-1'
          value='Add Product'
        />
      </form>
    </Fragment>
  );
};

Addproduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(Addproduct);
