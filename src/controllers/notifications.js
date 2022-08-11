const {getAllNotifications, updateNotificationPref }= require('../services/notification');

exports.getAllNotifications = async (req, res) => {
    const userId = req.userData.id;

    try {
        const allWatchlists = await getAllNotifications(userId);
        
       return res.status(200).json({ allWatchlists: allWatchlists });
    }
    catch (err) {
       return res.status(400).json({ message: 'Error has occured', error: err })
    }
}
exports.updateNotificationPreferences = async (req, res) => {
    const userId = req.userData.id;
    const newNotiPreferences = req.body.newNotiPreferences;
    
    try {
        if (!newNotiPreferences|| !((typeof newNotiPreferences) === "string" )) {
            return res.status(400).json({ message: 'Invalid notification preferences parameters' })
        }
            await updateNotificationPref(userId, newNotiPreferences)    
            return res.status(200).json({ message: 'Successfully updated notification preferences' });
    } catch (err) {
        return res.status(400).json({ message: 'Error has occured', error: err })
    }
}