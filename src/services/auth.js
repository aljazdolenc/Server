const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

//Get config vars
dotenv.config();

// If user exists it returns it else returns false
const checkUserExistance = (email) => {
 return User.findOne({ email: email })
};

const createNewUser = (email,password) =>{
    bcrypt.hash(password, 10)
    .then((hash) =>{
        const newUser = new User({
            email: email,
            password: hash
        });
        return newUser.save(); 
    });
};

const checkPasswordMatch = (password, passwordDB)=>{
    let passwordMatch;
    bcrypt.compare(password, passwordDB)
    .then(result => passwordMatch=result)
    return  passwordMatch;
}

const generateJWT= (email,expiration)=>{
    jwt.sign(
        { email: email },
        process.env.TOKEN_SECRET,
        { expiresIn: expiration }
    )
}

module.exports={
    checkUserExistance, 
    createNewUser,
    checkPasswordMatch,
    generateJWT
            }
