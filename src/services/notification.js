const  UserNotifications = require('../models/notification').UserNotifications;
const  Notification = require('../models/notification').Notification;

exports.generateUsersNotifications = async (userId) => {
    const newUserNotifications = new UserNotifications(
        {
            userId: userId,
            notificationPreferences: 'all',
            notificationsArray: []
        });

    await newUserNotifications.save()
        .then(() => {
            console.log("new usersNotifications added successfully")
        })
        .catch((err) => {
            console.log("Error at generating new usersNotifications  Err:" + err)
        })
}

exports.deleteUserNotifications = async (userId) => {
    console.log('delete notifications was called');

    const deleteUserNotificationsPromise = await UserNotifications.deleteOne({ "userId": userId });
    const deleteAllUserNotificationsPromise = await Notification.deleteMany({userId: userId});

    return Promise.all(
        [deleteUserNotificationsPromise,deleteAllUserNotificationsPromise])

}

exports.getAllNotifications = async (userId) => {
    return UserNotifications.findOne({ userId: userId })
}

exports.updateNotificationPref = async (userId, newNotiPreferences) => {
    return await UserNotifications.updateOne({ 'userId': userId }, { NotificationPreferences: newNotiPreferences })
}
