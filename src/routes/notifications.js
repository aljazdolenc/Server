const express= require('express')
const router= express.Router();

const {getAllNotifications, updateNotificationPreferences}= require('../controllers/notifications');



router.get("/", getAllNotifications);// Returns list of all notifications
router.put("/", updateNotificationPreferences);// Updates preferences for notifications


module.exports= router;