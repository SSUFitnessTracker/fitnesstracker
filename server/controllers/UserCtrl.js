const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userCtrl = {
    register: async (req, res) => {
        try {
            const {username, email, password, height, weight, fitnessLevel} = req.body;

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

            const newUser = new Users({
                username, email, password: passwordHash, height, weight, fitnessLevel
            });

            // const activation_token = createActivationToken(newUser);

            // console.log({activation_token});
            await newUser.save();
            res.json({msg: "ACCOUNT CREATED!"});

            console.log(newUser);

        } catch (error) {
            return res.status(500).json({msg: error.message})
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
    }

} 

// let createActivationToken = (payload) => {
//     return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {expiresIn: '10m'});
// }


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