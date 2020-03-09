import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { getProfileById } from '../../actions/profile';
import { inviteToWork, cancelInvitation } from '../../actions/user';
import { addTeamMember, getProject, cancelTeamMember } from '../../actions/project';

const ProfileItem = ({
  getProfileById,
  cancelInvitation,
  cancelTeamMember,
  getProject,
  addTeamMember,
  inviteToWork,
  isauth,
  project,
  loading,
  myself,
  team,
  profile: {
    user: { _id, firstname, lastname, profession, address, phone },
    profilephoto,
    hourlyrate,
  },
}) => {
  let socket = io('ws://localhost:5000', { transports: ['websocket'] });
  //. we send senWorkRequest event to server with infos
  const sendReq = (id, name) => {
    socket.emit('sendWorkRequest', {
      myId: myself._id,
      myName: myself.firstname,
      user2Id: id,
      user2name: name,
    });
  };
  //. projetc dashboard case
  const projDash = (
    <div>
      {team &&
        (project.myProject.members.filter(mem => mem.id === _id).length > 0 ? (
          <button
            className='hubbtn hubbtn-danger'
            onClick={() => {
              cancelInvitation({ id: _id });
              cancelTeamMember(project.myProject._id, { id: _id });
            }}>
            Cancel Invitation
          </button>
        ) : (
          <button
            className='hubbtn hubbtn-success'
            onClick={() => {
              sendReq(_id, firstname);
              inviteToWork({
                name: `${myself.firstname} ${myself.lastname}`,
                brief: project.myProject.brief,
                id: _id,
                projectId: project.myProject._id,
              });
              addTeamMember(project.myProject._id, {
                id: _id,
                name: `${firstname} ${lastname}`,
              });
              getProject(project.myProject._id);
            }}>
            Send Invitation
          </button>
        ))}
    </div>
  );
  if ((team && loading) || (team && project.myProject === null))
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
    <div className='hubprofile hubbg-light'>
      <img src={`/${profilephoto}`} alt='' className='hubround-img' />
      <div>
        <h2 className='hubblue-text hubcapitalheader'>{`${firstname} ${lastname}`}</h2>
        <h3 className='hubgreen-text hubcapitalheader'>{profession}</h3>
        <p>
          <span>Region :</span> {address.region}
        </p>
        <p>
          <span>Phone</span> :{phone}
        </p>
        <p>
          <span>HourlyRate :</span> {hourlyrate} <span>DNT</span>
        </p>
        <Link to={isauth ? '/DesignHubHome/freelancerProfile' : '/Guest/profile'}>
          <button className='hubbtn hubbtn-primary' onClick={() => getProfileById(_id)}>
            Show Profile
          </button>
        </Link>
        {!loading && team && project != null && projDash}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object,
};
const mapState = state => ({
  isauth: state.auth.isAuthenticated,
  myself: state.auth.user,
  project: state.project,
  loading: state.project.loading,
});
export default connect(mapState, {
  inviteToWork,
  addTeamMember,
  getProject,
  cancelInvitation,
  cancelTeamMember,
  getProfileById,
})(ProfileItem);
