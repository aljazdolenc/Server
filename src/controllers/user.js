const dotenv = require('dotenv');
const User = require('../models/user');

const checkUserExistance = require('../services/auth').checkUserExistance;
const createNewUser = require('../services/auth').createNewUser;
const deleteUser = require('../services/auth').deleteUser;
const checkPasswordMatch = require('../services/auth').checkPasswordMatch;
const hashPassword = require('../services/auth').hashPassword;
const deleteUserNotifications = require('../services/notification').deleteUserNotifications;
const deleteAllUsersWatchlists = require('../services/watchlists').deleteAllUsersWatchlists;
const jwtService= require('../services/jwt');

//Get config vars
dotenv.config();
const{ACCESS_TOKEN_EXPIRATION}=process.env

exports.CreateUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        userExists = await checkUserExistance(email);
        if (userExists) {
            console.log("user does exist")
            res.status(409).send({ 
                message: "This email is already in use!", 
                state:"ALREADY_EXISTS"});
        } else {
            console.log("user does not exist")
            createNewUser(email, password)
            res.status(200).send({ 
                message: "Added successfully!",
                state:"SUCCESS"});
        }
    }
    catch (err) {
        console.log('error at generating new user err:' + err)
    }
}

exports.LoginUser = async (req, res) => {

    const { email, password } = req.body;

    await User.findOne({ email })
        .then(async fetchedUser => {

            const {id, email} = fetchedUser;

            if (!fetchedUser) { return res.status(401).json({ message: 'Invalid email or password' }) };

            const passwordIsCorrect = await checkPasswordMatch(password, fetchedUser.password);

            if (!passwordIsCorrect) { return res.status(401).json({ message: 'Invalid email or password' }) };

            const accessToken = jwtService.generateAccessToken(id, email);
            const refreshToken= jwtService.generateRefreshToken(id, email);

            res.cookie('refresh_token', refreshToken, {maxAge:86400000, secure:true, httpOnly: true})

            return res.status(200).json({accessToken:accessToken, expiresIn: ACCESS_TOKEN_EXPIRATION });
        })
        .catch(err => {
            res.status(401).json({
                message: "Auth failed!",
                error: err
            })
        })
};

exports.ChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id, email } = req.userData.email;

    try {
        fecthedUser = await User.findOne({ email })

        if (!fetchedUser) { return res.status(401).json({ message: 'Invalid email or password' }) };

        const passwordIsCorrect = await checkPasswordMatch(oldPassword, fetchedUser.password);

        if (!passwordIsCorrect) { return res.status(401).json({ message: 'Invalid password' }) };

        const newHashedPassword = hashPassword(newPassword)

        const filter = { id: id }
        const update = { password: newHashedPassword }

        let user = await User.findOneAndUpdate(filter,update)

        return res.status(200).json({ message: 'Password was changed successfully' });

    } catch (err) {
        return res.status(401).json({
            message: "Password change failed!",
            error: err
        })
    }

}

exports.DeleteUser = async (req, res) => {
    const email = req.userData.email;
    const userId = req.userData.id;


        try {
            await deleteUserNotifications(userId);
            console.log(userId)
            await deleteAllUsersWatchlists(userId);
            console.log(userId)
            await deleteUser(email);
            console.log('Finished deleting User')

            return res.status(200).json({ message: "Successfully deleted user" });
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: "Error at deleting process", error: error })
        }
}
