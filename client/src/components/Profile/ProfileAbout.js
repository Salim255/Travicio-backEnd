import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({profile: {bio, skills, user: {name} }}) => <div className="profile-about bg-light p-2">
    {bio && (<Fragment>
    <h2 className="text-primary">{name}'s Bio</h2>
    <p>
    {bio}
    </p>
    </Fragment>)}
 
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skil, index) =>(
          <div key={index} className='p-1'>
                <i className="fas fa-check"></i>{skil}
          </div>
      ))}
    </div>
  </div>;


ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
