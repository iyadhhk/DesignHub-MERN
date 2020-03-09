import React from 'react';
import { connect } from 'react-redux';
import FreeInfos from './FreeInfos';
const FreeProfile = ({ profile: { profile, loading } }) => {
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
    <div className='hubcontainer'>
      <div className='hubprofile hubbg-light'>
        <img
          src={profile === null ? '/default.jpg' : `/${profile.profilephoto}`}
          alt=''
          className='hubround-img'
        />
        <div>
          <h2 className='hubblue-text hubcapitalheader'>{`${profile.user.firstname} ${profile.user.lastname}`}</h2>
          <h3 className='hubgreen-text hubcapitalheader'>{profile.user.profession}</h3>
          <p>
            <span>Region :</span> {profile.user.address && profile.user.address.region}
          </p>

          <p>
            <span>Phone :</span> {profile.user.phone}
          </p>

          <p>
            <span>Houry Rate: </span>
            {profile.hourlyrate} <span>DNT</span>
          </p>
        </div>
      </div>
      <FreeInfos />
    </div>
  );
};
const mapState = state => ({
  profile: state.profile,
});
export default connect(mapState)(FreeProfile);
