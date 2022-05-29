const path = require("path");
const express= require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Imported routes
const NotificationRoutes= require('./routes/notifications');
const UserRoutes= require('./routes/user');
const WatchlistsRoutes= require('./routes/watchlists');

// Initializing Express
const app = express();


// Connecting to Database
mongoose.connect(
    'mongodb+srv://aljazdolenc5:3k8S9jee6r7J43Ka@cluster0.6c4wl.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to Database!')
})
.catch(()=>{
    console.log('Connection with DB failed')
})



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")

    res.setHeader(
        'Access-Control-Allow-Headers',
        "Origin,X-Requested-With,Content-Type, Accept")

    res.setHeader('Access-Control-Allow-Methods',
    "GET,POST,PATCH,DELETE,OPTIONS") 

    next()
})

// Declaring routes
app.use("/notifications",NotificationRoutes);
app.use("/user",UserRoutes);
app.use("/watchlists",WatchlistsRoutes);

module.exports=app;