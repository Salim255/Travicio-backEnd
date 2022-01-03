const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Poste');
const Profile = require('../../models/profileModel');
const User = require('../../models/User');


//1route POST api/posts
//2description Create a post 
//3access Private
router.post('/',
[ 
    auth, 
  [
    check('text','Text is required')
    .not()
    .isEmpty()
  ] 
],
 async (req, res)=> {
   
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          
            return res.status(400).json({
                errors:errors.array()
            })
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
               }
            )
            const post = await newPost.save();

            res.json(post);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    
});

//GET api/posts
//Get all posts
//Privite

router.get('/', auth,async (req, res) =>{
  
        try {
            const posts = await Post.find().sort({data: -1});

            res.json(posts)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

//Get api/posts/:id
//Get post by id
//Privite
router.get('/:id', auth, async(req, res) =>{
    
    try {
         const post  = await Post.findById(req.params.id);
         if(!post){
             return res.status(404).json({msg: 'Post not found'});
         }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

//delete api/posts/:id
//delete post by Id
//Privite
router.delete('/:id', auth,async (req, res) =>{
   
        try {
            const post = await Post.findById(req.params.id);
            if(!post){
                return res.status(404).json({msg: 'Post not found'});
            }
            //Check user
            if(post.user.toString() !== req.user.id){
                    return res.status(401).json({ msg: 'User not authorized' })
            }
            await post.remove();

            res.json({msg: 'Post removed'})
        } catch (error) {
            console.error(error.message);
            if(error.kind === 'ObjectId'){
                return res.status(404).json({msg: 'Post not found'});
            }
            res.status(500).send('Server Error');
        }
});

module.exports = router;