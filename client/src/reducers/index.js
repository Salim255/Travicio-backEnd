import { combineReducers } from "redux";
import alert from './alertReducer';
import authReducer from './authReducer'

export default combineReducers({
    alert, authReducer
});