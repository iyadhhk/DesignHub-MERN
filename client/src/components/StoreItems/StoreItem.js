import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProduct, updateProduct } from '../../actions/store';

const StoreItem = ({ prod, deleteProduct, updateProduct }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    tags: '',
  });
  const { description, price, tags } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <img
        src={`/${prod.preview}`}
        style={{ height: '200px', width: '200px' }}
        alt='face'
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '800px',
          flexWrap: 'wrap',
        }}>
        {editing ? (
          <input
            type='text'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Description :</span> {prod.description}
          </p>
        )}

        {editing ? (
          <input type='text' name='price' value={price} onChange={e => onChange(e)} />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Price :</span> {prod.price} <span>DNT</span>
          </p>
        )}

        {editing ? (
          <input type='text' name='tags' value={tags} onChange={e => onChange(e)} />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Tags :</span> {prod.tags}
          </p>
        )}
        <div>
          <button
            className='hubbtn hubbtn-danger'
            onClick={() => deleteProduct(prod._id)}>
            Delete
          </button>

          <button
            className='hubbtn hubbtn-success'
            onClick={() => {
              if (editing) {
                updateProduct(prod._id, formData);
              } else
                setFormData({
                  ...formData,
                  description: prod.description,
                  price: prod.price,
                  tags: prod.tags,
                });

              setEditing(!editing);
            }}>
            Edit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

StoreItem.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteProduct, updateProduct })(StoreItem);
