const path = require("path");
const express= require('express');
const bodyParser = require('body-parser');


// Imported routes
const NotificationRoutes= require('./routes/notifications');
const UserRoutes= require('./routes/user');
const WatchlistsRoutes= require('./routes/watchlists');

const ConnectToDB = require('./services/mongo');

// Initializing Express
const app = express();


// Connecting to Database 
 ConnectToDB()

//Setting response headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")

    res.setHeader(
        'Access-Control-Allow-Headers',
        "Origin,X-Requested-With,Content-Type, Accept")

    res.setHeader('Access-Control-Allow-Methods',
    "GET,POST,PATCH,PUT,DELETE,OPTIONS") 

    next()
})

// Declaring routes
app.use("/notifications",NotificationRoutes);
app.use("/user",UserRoutes);
app.use("/watchlists",WatchlistsRoutes);

module.exports=app;