const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/sonoma-state/image/upload/v1616136180/CS355Project1/mnts9_c8lc6s.jpg"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);