import React from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component,auth:{isAuthenticated, loading}, ...rest}) => (
    <Route 
    {...rest} 
    render={ props => 
        !isAuthenticated && !loading ? (
         <Redirect to='/login'/>
         ): (<Component {...props}/>) }/>
)

PrivateRoute.propTypes = {
     auth: PropTypes.object.isRequired,
}//Once the state brought from mapStateToProps we can add it to our component

const mapStateToProps = state =>({
    auth: state.authReducer
})//This will brign in all the states that on the authReducer

export default connect(mapStateToProps)(PrivateRoute)
