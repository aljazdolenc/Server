
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Get config vars
dotenv.config();

const { 
    ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRATION, 
    REFRESH_TOKEN_EXPIRATION 
} = process.env;

exports.generateAccessToken = (id, email) => {
    return jwt.sign(
        { id: id, email: email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    )
}

exports.generateRefreshToken = (id, email) => {
    return jwt.sign(
        { id: id, email: email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    )
}

exports.validateRefreshToken = (refreshToken) => {
    return jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) { throw err };
            return decoded;
        }
    )
}

exports.validateAccessToken = (accessToken) => {
    return jwt.verify(
        accessToken,
        ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) { throw err };
            return decoded;
        }
    )
}
