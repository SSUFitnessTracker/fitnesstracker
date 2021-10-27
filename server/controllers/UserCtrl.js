const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userCtrl = {
    register: async (req, res) => {
        try {
            const {username, email, password} = req.body;
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
                username, email, password: passwordHash
            }

            
            console.log(newUser);

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
} 

let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = userCtrl;