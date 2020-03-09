import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddProject from '../ProjectItems/AddProject';
import Project from '../ProjectItems/Project';
import { getCurrentProject } from '../../actions/project';
const MyProjects = ({ project, loading, getCurrentProject }) => {
  useEffect(() => {
    getCurrentProject();
  }, [getCurrentProject]);
  if (loading || project === null)
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
      <h1 className='hubmy hubblue-text'>My Projects</h1>
      {project.projects.length > 0 ? (
        project.projects.map(proj => <Project key={proj._id} proj={proj} />)
      ) : (
        <h4 className='hubgreen-text'>No Projects Found</h4>
      )}
      <AddProject />
    </div>
  );
};

MyProjects.propTypes = {
  getCurrentProject: PropTypes.func.isRequired,
  project: PropTypes.object,
  loading: PropTypes.bool,
};
const mapState = state => ({
  project: state.project.project,
  loading: state.project.loading,
});
export default connect(mapState, { getCurrentProject })(MyProjects);
