import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePortfolio, updatePortfolio } from '../../actions/portfolio';

const PortfolioItem = ({ port, deletePortfolio, updatePortfolio }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    skills: '',
  });
  const { type, title, description, skills } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <img
        src={`/${port.preview}`}
        style={{ height: '200px', width: '200px' }}
        alt='face'
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {editing ? (
          <input type='text' name='type' value={type} onChange={e => onChange(e)} />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Type :</span> {port.type}
          </p>
        )}
        {editing ? (
          <input type='text' name='title' value={title} onChange={e => onChange(e)} />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Title :</span> {port.title}
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
            <span className='hubgreen-text'>Description :</span> {port.description}
          </p>
        )}

        {editing ? (
          <input type='text' name='skills' value={skills} onChange={e => onChange(e)} />
        ) : (
          <p className='hubhide-sm'>
            <span className='hubgreen-text'>Skills :</span> {port.skills}
          </p>
        )}
        <div>
          <button
            className='hubbtn hubbtn-danger'
            onClick={() => deletePortfolio(port._id)}>
            Delete
          </button>

          <button
            className='hubbtn hubbtn-success'
            onClick={() => {
              if (editing) {
                updatePortfolio(port._id, formData);
              } else
                setFormData({
                  ...formData,
                  title: port.title,
                  type: port.type,
                  description: port.description,
                  skills: port.skills,
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

PortfolioItem.propTypes = {
  deletePortfolio: PropTypes.func.isRequired,
};

export default connect(null, { deletePortfolio, updatePortfolio })(PortfolioItem);
