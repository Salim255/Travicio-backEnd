const mongooose = require('mongoose');

const UserShema = new mongooose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    avatar:{//Its allow  to attach a profile image to your email
        type:String,//
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = User = mongoose.module('user', UserShema)