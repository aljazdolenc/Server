const mongoose = require('mongoose');

exports.ConnectToDB = () =>{
    mongoose.connect(process.env.MONGOOSE_SECRET);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
}

