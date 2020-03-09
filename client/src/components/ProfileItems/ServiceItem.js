import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteService, updateService } from '../../actions/profile';

const ServiceItem = ({ auth, profile, serv, deleteService, updateService }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    cost: '',
  });

  const { title, type, cost } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (profile.loading)
    return (
      <div className='container'>
        <div className='d-flex justify-content-center text-primary'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ display: 'flex', width: '700px', justifyContent: 'space-between' }}>
      {editing ? (
        <input type='text' name='title' value={title} onChange={e => onChange(e)} />
      ) : (
        <p>
          <span className='hubgreen-text'>Title :</span> {serv.title}
        </p>
      )}

      {editing ? (
        <input type='text' name='type' value={type} onChange={e => onChange(e)} />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Type :</span> {serv.type}
        </p>
      )}
      {editing ? (
        <input type='text' name='cost' value={cost} onChange={e => onChange(e)} />
      ) : (
        <p className='hubhide-sm'>
          <span className='hubgreen-text'>Cost :</span> {serv.cost} <span>DNT</span>
        </p>
      )}
      <div>
        <button className='hubbtn hubbtn-danger' onClick={() => deleteService(serv._id)}>
          Delete
        </button>
        <button
          className='hubbtn hubbtn-success'
          onClick={() => {
            editing
              ? updateService(serv._id, formData)
              : setFormData({
                  ...formData,
                  title: serv.title,
                  type: serv.type,
                  cost: serv.cost,
                });
            setEditing(!editing);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
};

ServiceItem.propTypes = {
  deleteService: PropTypes.func.isRequired,
};
const mapState = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapState, { deleteService, updateService })(ServiceItem);
