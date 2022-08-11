const dotenv=require('dotenv').config({path:'../.env'});
const path = require("path");
const express= require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors= require('cors')




// Imported routes
const NotificationRoutes= require('./routes/notifications');
const UserRoutes= require('./routes/user');
const WatchlistsRoutes= require('./routes/watchlists');
const RefreshTokenRoutes = require('./routes/refresh-token');

const ConnectToDB = require('./services/mongo').ConnectToDB;

// Initializing Express
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    credentials:true,
    methods:['GET','POST','PATCH','PUT','DELETE',"OPTIONS"]
    
}))

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(cookieParser());

 ConnectToDB()

 app.use((req,res,next)=>{


    res.set(
        'Access-Control-Allow-Headers',
        "Origin,X-Requested-With,Content-Type, Accept, Authorization")

    next()
})

// Declaring routes
/* app.use("/notifications",NotificationRoutes); */
app.use("/user",UserRoutes);
app.use("/watchlists",WatchlistsRoutes);
app.use("/refresh-token", RefreshTokenRoutes);
app.enable

  const port =3000;

  app.listen(port,()=>{
      console.log('listening on port: ' + port)
  });