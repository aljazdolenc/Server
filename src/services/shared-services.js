const uuid = require('uuid');

exports.generateRandomId = () =>{
    return uuid.v1();
}