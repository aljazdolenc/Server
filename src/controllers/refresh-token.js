const jwtService= require('../services/jwt');
const jwt=require('jsonwebtoken');
const dotenv = require("dotenv");

//Get config vars
dotenv.config();
const { ACCESS_TOKEN_EXPIRATION}= process.env;

exports.getNewToken = async (req, res) => {
    const refresh_token = req.cookies.refresh_token;

    if(!refresh_token){
        return res.status(403).json({ message: 'No refresh token provided'})
    }

    try {    
        const decodedToken= jwtService.validateRefreshToken(refresh_token);
        const newAccessToken = jwtService.generateAccessToken(decodedToken.id, decodedToken.email);
        const newRefreshToken = jwtService.generateRefreshToken(decodedToken.id, decodedToken.email);

        res.cookie('refresh_token', newRefreshToken, {maxAge:86400000, secure:true, httpOnly: true})

            return res.status(200).json({accessToken: newAccessToken, expiresIn: ACCESS_TOKEN_EXPIRATION });
    }
    catch (err) {
       return res.status(400).json({ message: 'Error at generating new Tokens', error: err })
    }
}
