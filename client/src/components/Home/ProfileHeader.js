import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadPhoto, updateRate } from '../../actions/profile';
import { updateUserInfo } from '../../actions/user';

const ProfileHeader = ({
  updateRate,
  updateUserInfo,
  uploadPhoto,
  profile: { profile },
  auth: { user, loading },
}) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    hourlyrate: '',
    region: '',
    phone: '',
  });
  const [file, setFile] = useState('');

  const { hourlyrate, region, phone } = formData;
  const onChangeFile = e => {
    setFile(e.target.files[0]);
  };
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    uploadPhoto(formData);
  };
  if (loading || profile === null)
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
    <Fragment>
      <div className='hubprofile hubbg-light'>
        <img
          src={profile === null ? '/default.jpg' : `/${profile.profilephoto}`}
          alt=''
          className='hubround-img'
        />
        <form onSubmit={onSubmitImage}>
          {/* <div className='custom-file mb-4'> */}
          <input
            // className='btn btn-success'
            type='file'
            className='hubbtn hubbtn-success'
            id='customFile'
            onChange={onChangeFile}
          />
          {/* </div> */}

          <input
            type='submit'
            value='Upload'
            className='hubbtn hubbtn-primary hubbtn-block hubmt-4'
          />
        </form>
        <div>
          <h2 className='hubcapitalheader'>{`${user.firstname} ${user.lastname}`}</h2>
          <h2 className='hubcapitalheader'>{`${user.profession}`}</h2>
          <div className='my'>
            {editing ? (
              <input
                type='text'
                name='region'
                value={region}
                onChange={e => onChange(e)}
              />
            ) : (
              <p>
                <span>Region :</span> {user.address.region}
              </p>
            )}
            {editing ? (
              <input type='text' name='phone' value={phone} onChange={e => onChange(e)} />
            ) : (
              <p>
                <span>Phone :</span> {user.phone}
              </p>
            )}
            {editing ? (
              <input
                type='text'
                name='hourlyrate'
                value={hourlyrate}
                onChange={e => onChange(e)}
              />
            ) : (
              <p>
                <span>HourlyRate :</span> {profile.hourlyrate} <span>DNT</span>
              </p>
            )}
          </div>
          <button
            className='hubbtn hubbtn-primary'
            onClick={() => {
              if (editing) {
                updateUserInfo(formData);
                updateRate(formData);
              } else
                setFormData({
                  ...formData,
                  hourlyrate: profile.hourlyrate,
                  region: user.address.region,
                  phone: user.phone,
                });
              setEditing(!editing);
            }}>
            Edit My Info
          </button>
        </div>
      </div>
    </Fragment>
  );
};

ProfileHeader.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapState = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapState, { updateUserInfo, uploadPhoto, updateRate })(
  ProfileHeader
);
