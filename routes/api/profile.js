const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/profileModel');
const User = require('../../models/User');

//1route Get api/profiles/me
//2description Get current user profile 
//3access Public
router.get('/me',auth, async(req, res)=> {
    try {
        
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//1route Post api/profiles
//2description Great or updat a user profile profile 
//3access Private

router.post('/',[auth,
    [ check('status', 'Status is required')
    .not().isEmpty(),
    check('skills', 'Skills is required')
    .not().isEmpty()
  ]
],
async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({
           errors: errors.array()
       });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
         youtube,
        twitter,
        facebook,
        linkedin,
        instagram
      
      } = req.body;

      //Build profile object 
      const profileFields = {
    
      }
      profileFields.user = req.user.id;
      if(company) {
          profileFields.company = company;
      }
      if(website) {
        profileFields.website = website;
    }
    if(location) {
        profileFields.location = location;
    }
    if(status) {
        profileFields.status = status;
    }
    if(bio) {
        profileFields.bio = bio;
    }
    if(githubusername) {
        profileFields.githubusername = githubusername;
    }

    if(skills){
     
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    //Build social object
    profileFields.social = {};//intial
    if(youtube) profileFields.youtube = youtube;
    if(twitter) profileFields.youtube = twitter;
    if(facebook) profileFields.facebook = facebook;
    if(linkedin) profileFields.linkedin = linkedin;
    if(instagram) profileFields.instagram = instagram;
    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            //update profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: profileFields}, {new: true});

            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message)
    }
    
});

//1route Get api/profile
//2description Gret all prfiles
//3access Public

router.get('/', async(req, res) =>{
    try {
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        res.json({profiles});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//1route Get api/profile/user/:user_id
//2description Gret profile by  user_id
//3access Public
router.get('/user/:user_id', async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name','avatar']);

        if(!profile){
            return res.status(400).json({
                msg: 'Profile not found'
            });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            return res.status(400).json({
                msg: 'Profile not found'
            });
        };
        res.status(500).send('Server Error');
    }
});


//1route Delete api/profile
//2description Delet profile, user & posts  
//3access Private
router.delete('/',auth, async(req, res) =>{
    try {
        //Remove users posts

        //Remove profile
         await Profile.findOneAndRemove({ user: req.user.id });

         //Remove user
         await User.findOneAndRemove({ _id: req.user.id });
         
        res.json({msg:  'User deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//1route Put api/profile/experience
//2description Add profile experience,
//3access Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
] ], 
async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
     } = req.body;

     const newExp = {
         title,
         company,
         location,
         from,
         to,
         current,
         description
     }

     try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
     } catch (error) {
         console.error(error.message);
         res.status(500).send('Server error');
     }
});

//1route Delete api/profile/experience/:exp_id
//2description delete experience from profile,
//3access Private
router.delete('/experience/:exp_id', auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne(
            {
            user: req.user.id
        });

        //Get remeove index
        const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id);
        
        profile.experience.splice(removeIndex, 1);//reomve the exprice with the index

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

//1route Put api/profile/eduction
//2description Add profile education,
//3access Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
] ], 
async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
     } = req.body;

     const newEdu = {
        school,
        degree,
        fieldofstudy,
         from,
         to,
         current,
         description
     }

     try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
     } catch (error) {
         console.error(error.message);
         res.status(500).send('Server error');
     }
});

//1route Delete api/profile/education/:edu_id
//2description delete education from profile,
//3access Private
router.delete('/education/:edu_id', auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne(
            {
            user: req.user.id
        });

        //Get remeove index
        const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.edu_id);
        
        profile.education.splice(removeIndex, 1);//reomve the education with the index

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

//1route get api/profile/gethub/:username
//2description Get user from Github,
//3access public

router.get('/github/:username',  (req, res) =>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        }

        request(options, (error, response, body)=>{
            if(error) console.error(error);
            
            if(response.statusCode !== 200){
               return  res.status(404).json({ msg: 'No Github profile found' });
            }

            res.json( JSON.parse(body));
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})
module.exports = router;