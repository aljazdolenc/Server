const dotenv = require('dotenv')
const mongoose = require('mongoose');

//Get config vars
dotenv.config();

const ConnectToDB = ()=>
mongoose.connect(process.env.MONGOOSE_SECRET)
.then(()=>{
    console.log('Connected to Database!')
})
.catch(()=>{
    console.log('Connection with DB failed')
})

module.exports={
    ConnectToDB
}