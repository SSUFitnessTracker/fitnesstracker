const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendMail = require('./sendEmail');
const auth = require('../middleware/auth');

const {CLIENT_URL} = process.env

const userCtrl = {
    register: async (req, res) => {
        try {
            const {username, email, password, avatar, height, weight, fitnessLevel, goals, currentProgram } = req.body;

            if(!username || !email || !password){
                return res.status(400).json({msg: "Please fill in all fields."});
            }

            if(!validateEmail(email)){
                return res.status(400).json({msg: "Invalid email entered."});
            }

            const user = await Users.findOne({email})
            if(user){
                return res.status(400).json({msg: "User with this email already exists."});
            }

            if(password.length < 6){
                return res.status(400).json({msg: "Password must be more than 6 characters."});
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {
                username, email, password: passwordHash, avatar, height, weight, fitnessLevel, goals, currentProgram
            };
            
            const activation_token = createActivationToken(newUser);
            

            const url = `${CLIENT_URL}user/activate/${activation_token}`;
            
            sendMail(email, url, "Activate");

            res.json({msg: "Registration pending: Please activate via email"});
            // console.log({activation_token});
            // await newUser.save();
            // res.json({msg: "ACCOUNT CREATED!"});

            // console.log(newUser);

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    activateAccount: async(req, res) => {
        try {
            const {activation_token} = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
            const {username, email, password, avatar, height, weight, fitnessLevel, goals, currentProgram } = user;

            const check = await Users.findOne({email});
            if(check){
                return res.status(400).json({msg: "An account with this email already exists"});
            }

            const newUser = new Users({
                username, email, password, avatar, height, weight, fitnessLevel, goals, currentProgram
            })

            await newUser.save();
            res.json({msg: "Account activated."});
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }, 

    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email});
            if(!user){
                return res.status(400).json({msg: "A user with this email does not exist."});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: "Incorrect password."});
            }

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            console.log({refresh_token});

            res.json({msg: "Login success!"})


        
        } catch (error) {
            return res.status(500).json({msg: err.message});
        }
    },

    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) {
                return res.status(400).json({msg: "User not logged in."});
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if(err){
                    return res.status(400).json({msg: "No user logged in or invalid token"});
                }

                const access_token = createAccessToken({id: user.id});
                res.json({access_token});
            })

        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
            return res.json({msg: "User logged out"});
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },

    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');

            res.json(user);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body; 
            const user = await Users.findOne({email: email});
            if(!user){
                 return res.status(400).json({msg: "This email does not exist."});
            }

            const access_token = createAccessToken({id: user._id});
            const url = `${CLIENT_URL}user/reset/${access_token}`;

            sendMail(email, url, "Reset Password");
            res.json({msg: "Password reset, please check your email."});


        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }, 

    resetPassword: async (req, res) => {
        try {
            const {password} = req.body;
            console.log(password);

            const passwordHash = await bcrypt.hash(password, 12); 
            console.log(req.user);

            await Users.findOneAndUpdate({_id: req.user.id}, {password: passwordHash});
            res.json({msg: "Password has been reset."});
            
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },

    updateUser: async (req, res) => {
        try {
            const {username, avatar} = req.body;
            await Users.findOneAndUpdate({_id: req.user.id}, {username, avatar});

            res.json({msg: "User info has been updated."});
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

} 

let createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {expiresIn: '10m'});
}


let createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '30m'});
}

let createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: '7d'});
}

let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = userCtrl;