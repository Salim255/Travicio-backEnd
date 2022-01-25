import axios from 'axios';
import { setAlert} from './alertAction';
import { GET_POSTS, POST_ERROR } from './actionTypes';

//Get posts
export const getPosts = () => async dispatch =>{
    try {
        console.log("🌍🌔");
        const res = await axios.get('/api/posts');
        console.log("🌍🌔", res);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}