import React, {Fragment,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import  { getProfiles } from '../../actions/profileAction';

const Profiles = ({ getProfiles, profile:{ profiles, loading}}) => {
  
  useEffect(() => {
   
    getProfiles();
    
    
  },[getProfiles] );
  
  return <Fragment>
  { loading ? <Spinner/> : <Fragment>
    <h1 className="large text-primary">Devlopers</h1>
    <p className="lead">
      <i className="fab fa-connectdevelop"></i>
      Browse and connect with develpers</p>
      <div className="profiles">
       {profiles.length > 0 ? (
         profiles.map(profile => (
           <ProfileItem key={profile._id} profile={profile}/>
         ))
       ) : <h4> No proiles found... </h4> } </div></Fragment>}
</Fragment>;
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  
}

const mapStateToProps = state => ({
  profile: state.profileReducer
})
export default connect(mapStateToProps, { getProfiles})(Profiles);
