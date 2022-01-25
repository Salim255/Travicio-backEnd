import axios from 'axios';
import { setAlert} from './alertAction';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, USER_LOADED } from './actionTypes';

//Get posts
export const getPosts = () => async dispatch =>{
    try {
        
        const res = await axios.get('/api/posts');
       
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
};
//ADD like to posts
export const addLike = (id) => async dispatch =>{
    try {
        
        const res = await axios.put(`/api/posts/like/${id}`);
        
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
        
    } catch (error) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
};

//Remove like to posts
export const removeLike = (id) => async dispatch =>{
    try {
        
        const res = await axios.put(`/api/posts/unlike/${id}`);
       console.log('🌎',res);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes:res.data}
        })

       
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}