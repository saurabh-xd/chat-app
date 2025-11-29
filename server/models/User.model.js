import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },

},
{timestamps: true})

const User =  mongoose.model("User", userSchema);

export default User;