import { combineReducers } from "redux";
import alert from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    alert, authReducer, profileReducer
});