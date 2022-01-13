import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import PropTypes from 'prop-types';

const Login = ({ login,isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password)
        
    }
   

    //Redirect if logged in 
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
    <Fragment>
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password} onChange={e => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have  have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
    </Fragment>
    )
}

Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
