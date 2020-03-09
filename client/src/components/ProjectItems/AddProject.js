import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/project';

function AddProject({ addProject }) {
  const [formData, setFormData] = useState({
    brief: '',
    badget: '',
    maxteam: '',
  });
  const { brief, badget, maxteam } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  let members = [];
  for (let i = 1; i <= 10; i++) {
    members.push(i);
  }
  return (
    <Fragment>
      <h2 className='hubblue-text'>Start Your Next Project</h2>
      <form
        className='hubform'
        onSubmit={e => {
          e.preventDefault();
          addProject(formData);
          setFormData({ ...formData, brief: '', badget: '', maxteam: '' });
        }}>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder=' Brief'
            name='brief'
            value={brief}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <input
            type='text'
            placeholder='Budget'
            name='badget'
            value={badget}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='hubform-group'>
          <select name='maxteam' value={maxteam} onChange={e => onChange(e)}>
            <option>Max Team Members</option>
            {members.map((member, i) => (
              <option key={i} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='hubbtn hubbtn-primary hubmy-1'
          value='Add new Project'
        />
      </form>
    </Fragment>
  );
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(AddProject);
