const dotenv = require('dotenv');

const checkUserExistance = require('../services/auth');
const createNewUser= require('../services/auth');
const checkPasswordMatch = require('../services/auth');

//Get config vars
dotenv.config();


const CreateUser = (req, res) => {
    const {userEmail, userPassword} = req.body

    if(checkUserExistance(userEmail)){
        return res.status(409).json({
            message: "This email is already in use!"
        });
    };

    createNewUser(userEmail,userPassword)
    .then(result => {
       return res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        return res.status(500).json({
          message: "Invalid authentication credentials!",
          error: err
        });
      });
    }; 

const LoginUser = (req, res) => {

    const {userEmail, userPassword} = req.body
    let fetchedUser;

    checkUserExistance(userEmail)
    .then(user => {
        fetchedUser= user;

    //If user does not exist return 401 "Auth failed"
        if(!fetchedUser) {
            return res.status(401).json({message: 'Auth failed'});
        };

    //If passwords do not match return 401 and "Auth failed"
        if(!checkPasswordMatch(userPassword,fetchedUser.password)){
            return res.status(401).json({ message: 'Auth failed'});
        };

    //Generating jwt token
        const token = generateJWT(fetchedUser.email,'3600s');

    //Sending token back in res
        return res.status(200).json({
            token: token,
            expiresIn: '3600s',
        });
       })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid authentication credentials!",
            error: err
        })
    })
};

const ChangePassword = (req,res) =>{
    
}

module.exports = {
    CreateUser,
    LoginUser,
    ChangePassword
}
