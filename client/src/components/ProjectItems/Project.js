import React from 'react';
import { connect } from 'react-redux';
import { deleteProject, getProject } from '../../actions/project';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Project({ proj, deleteProject, getProject }) {
  return (
    <div>
      <h5>
        <span className='hubgreen-text'>Brief :</span> {proj.brief}
      </h5>
      <h5>
        <span className='hubgreen-text'>Budget :</span> {proj.badget} <span> DNT</span>
      </h5>
      <h5>
        <span className='hubgreen-text'>Max Team Members :</span> {proj.maxteam}
      </h5>
      <button className='hubbtn hubbtn-danger' onClick={() => deleteProject(proj._id)}>
        Delete
      </button>
      <Link to={`/DesignHubHome/projectDash`}>
        <button className='hubbtn hubbtn-success' onClick={() => getProject(proj._id)}>
          Project Dash
        </button>
      </Link>
    </div>
  );
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject, getProject })(Project);
