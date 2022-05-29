const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    _id:{type:Number, required:true},
    imageUrl:{type:String, required:true},
    name:{type:String, required:true},
    price:{type:Number, required:true},
    itemUrl:{type:String, required:true},
    timeCaught:{type:Date,required:true},
    seen:{type:Boolean, required:true}
});

module.exports = mongoose.model("Notification", NotificationSchema);
