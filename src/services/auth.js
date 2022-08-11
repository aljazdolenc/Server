const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const { generateRandomId } = require('./shared-services');
const { generateUsersWatchlist } = require('./watchlists')

//Get config vars
dotenv.config();

exports.checkUserExistance = async (email) => {

    return await User.findOne({ email: email }).exec();
};

exports.hashPassword = (password) => {
    return bcrypt.hash(password, 10)
}

exports.createNewUser = async (email, password) => {

        const hashedPassword = await bcrypt.hash(password, 10);
        const usersId = generateRandomId();

        const newUser = new User({
            'id': usersId,
            email: email,
            password: hashedPassword
        });

        await newUser.save()
            .then(() => console.log('successfully added new user'))
            .catch(err => {
                console.log('failed to add new user err:'+ err)
            throw "ERROR_DB"});

        await generateUsersWatchlist(usersId)

};

exports.checkPasswordMatch = async (password, passwordDB) => {
    console.log('check password was called')

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordDB, (err, isValid) => {
            if (err) {
                reject(err)
            }
            resolve(isValid);
        });
    });
};

exports.deleteUser = async (email) => {
    return await User.deleteOne({ email: email });
}
