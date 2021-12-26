const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

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
    check('status', 'Status is required')
    .not().isEmpty(),
    check('skills', 'Skills is required')
    .not().isEmpty()
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
    
})
module.exports = router;