import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profileAction';

import { connect } from 'react-redux';

const Dashboard = ({getCurrentProfile, auth, profile}) => {

    useEffect(() =>{
        getCurrentProfile();
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profileReducer
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
