const dotenv = require("dotenv");
const jwtService = require('../services/jwt');

//Get config vars
dotenv.config();


const checkAuth = (req,res,next) =>{
try{
    const accessToken= req.headers.authorization.split(" ")[1];

    const {id, email} = jwtService.validateAccessToken(accessToken);
    
    req.userData={id:id, email:email}
        
    next()
}
catch(error){
    res.status(401).json({message: 'You are not authenticated', error: error})
}
}

module.exports= checkAuth;