const mongoose = require("mongoose");
const { type } = require("os");

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        trim: true
    },
    password: {
        type:String,
        required: true
    },
    profilePicture: {
        type:Object,
        public_id: String,
        url: String,
    },
    bio:{
        type: String,
    },
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
},{
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;


