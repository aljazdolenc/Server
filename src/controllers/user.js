const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

const User = require('../models/user');

//Get config vars
dotenv.config();


const CreateUser = (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user=>{
            //If email is already in use return 409
            if(user){
                return res.status(409).json({
                    message:'This email is already in use!'
                })
            }
        })
        .then(()=>{
            bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                const newUser = new User({
                    email: req.body.email,
                    password: hash
                })
                newUser.save()
                .then(result => {
                    res.status(201).json({
                      message: "User created!",
                      result: result
                    });
                  })
                  .catch(err => {
                    res.status(500).json({
                      message: "Invalid authentication credentials!",
                      error: err
                    });
                  });
            })

    
        })
    
        
    
    

}






const LoginUser = (req, res) => {

    let fetchedUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            //If there is no such user return 401 and "Auth failed"
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            };
            fetchedUser = user;
            //Check if encrypted password matches password in req.body
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            //If passwords do not match return 401 and "Auth failed"
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            };
            //Generating jwt token
            const token = jwt.sign(
                { email: fetchedUser.email },
                process.env.TOKEN_SECRET,
                { expiresIn: '3600s' }
            )
            //Sending token back in res
            return res.status(200).json({
                token: token,
                expiresIn: '3600s',
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!",
                error: err
            })
        })

}



module.exports = {
    CreateUser,
    LoginUser
}











