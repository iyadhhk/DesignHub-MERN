import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function FreeInfos({ profile, loading }) {
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
    <div>
      {/* /-----------------------------Service------------------------------------ */}
      <Fragment>
        <h2 className='hubmy hubblue-text'>Services</h2>
        <div className='hubtable' style={{ width: '100%' }}>
          <Fragment>
            {profile.service.length > 0 && profile.service !== undefined ? (
              profile.service.map(serv => (
                <div
                  style={{
                    display: 'flex',
                    width: '700px',
                    justifyContent: 'space-between',
                  }}>
                  <p>
                    <span className='hubgreen-text'>Title :</span> {serv.title}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Type :</span> {serv.type}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Cost :</span> {serv.cost}
                  </p>
                </div>
              ))
            ) : (
              <h4 className='hubgreen-text'>No Services found</h4>
            )}
          </Fragment>
        </div>
      </Fragment>
      {/* /------------------------------------------------------------------------------ */}
      {/* /-------------------------qualification---------------------------------------- */}
      <Fragment>
        <h2 className='hubmy hubblue-text'>Qualifications</h2>
        <div className='hubtable' style={{ width: '100%' }}>
          <Fragment>
            {profile.qualification.length > 0 && profile.qualification !== undefined ? (
              profile.qualification.map(qual => (
                <div
                  style={{
                    display: 'flex',
                    width: '800px',
                    justifyContent: 'space-between',
                  }}>
                  <p>
                    <span className='hubgreen-text'>Certificate :</span>{' '}
                    {qual.certificate}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Organization :</span>{' '}
                    {qual.organization}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Description :</span>{' '}
                    {qual.description}
                  </p>
                  <p>
                    <span className='hubgreen-text'>Start Year :</span> {qual.startyear}
                  </p>
                </div>
              ))
            ) : (
              <h4 className='hubgreen-text'>No qualification found</h4>
            )}
          </Fragment>
        </div>
      </Fragment>
      {/* /----------------------------------------------------------------- */}
      {/* /------------------------Education----------------------------------------- */}
      <Fragment>
        <h2 className='hubmy hubblue-text'>Educations</h2>
        <div className='hubtable' style={{ width: '100%' }}>
          <Fragment>
            {profile.education.length > 0 && profile.education !== undefined ? (
              profile.education.map(edu => (
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '700px' }}>
                  <p>
                    <span className='hubgreen-text'>Country :</span> {edu.country}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>College :</span> {edu.college}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Degree :</span> {edu.degree}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Field Of Study :</span>{' '}
                    {edu.fieldofstudy}
                  </p>
                  <p>
                    <span className='hubgreen-text'>Start Year :</span> {edu.startyear}
                  </p>
                  <p>
                    <span className='hubgreen-text'>End Year :</span> {edu.endyear}
                  </p>
                </div>
              ))
            ) : (
              <h4 className='hubgreen-text'>No Education found</h4>
            )}
          </Fragment>
        </div>
      </Fragment>
      {/* /----------------------------------------------------------------- */}
      {/* /----------------------------Experience------------------------------------- */}
      <Fragment>
        <h2 className='hubmy hubblue-text'>Experiences</h2>
        <div className='hubtable' style={{ width: '100%' }}>
          <Fragment>
            {profile.experience.length > 0 && profile.experience !== undefined ? (
              profile.experience.map(exp => (
                <div style={{ display: 'flex' }}>
                  <p>
                    <span className='hubgreen-text'>Position :</span> {exp.position}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Company :</span> {exp.company}
                  </p>
                  <p className='hubhide-sm'>
                    <span className='hubgreen-text'>Description :</span> {exp.description}
                  </p>
                  <p>
                    <span className='hubgreen-text'>Start Year :</span> {exp.startyear}
                  </p>
                  <p>
                    <span className='hubgreen-text'>End Year :</span> {exp.endyear}
                  </p>
                </div>
              ))
            ) : (
              <h4 className='hubgreen-text'>No experience found</h4>
            )}
          </Fragment>
        </div>
      </Fragment>
      {/* /----------------------------------------------------------------- */}
    </div>
  );
}
const mapState = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapState)(FreeInfos);
