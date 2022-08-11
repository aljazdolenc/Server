const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const NotificationSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    itemUrl: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: Date, required: true },
    seen: { type: Boolean, required: true, default: false }
    
});

const UserNotificationsSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    notificationPreferences: {type: String, required: true},
    notificationsArray: { type:[], required: true}  
});

NotificationSchema.plugin(uniqueValidator);
UserNotificationsSchema.plugin(uniqueValidator);

const Notification = mongoose.model("Notification", NotificationSchema);
const UserNotifications = mongoose.model("UserNotifications", UserNotificationsSchema);
module.exports = { Notification, UserNotifications}