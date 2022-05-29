const express= require('express')
const router= express.Router();

import{ GetNotifications,
        UpdateNotifications}
        from "../controllers/notifications.js"

router.get("/", GetNotifications);// Returns list of all notifications
router.put("/", UpdateNotifications);// Updates preferences for notifications


module.exports= router;