const {
    addNewWatchlist,
    getWatchlist,
    deleteWatchlist,
    getAllWatchlists,
    
    updateWatchlistParams, 
    markNotificationSeen}= require('../services/watchlists');

exports.getWatchlists = async (req, res) => {
    const userId = req.userData.id;

    try {
        const allWatchlists = await getAllWatchlists(userId);
        
       return res.status(200).json({ allWatchlists: allWatchlists });
    }
    catch (err) {
       return res.status(400).json({ message: 'Error has occured', error: err })
    }
}
exports.addWatchlist = async (req, res) => {
    const userId = req.userData.id;
    const watchlistParams = req.body.watchlistParams;

    const { name, minPrice, maxPrice, location, offerType } = watchlistParams
    
    try {
        if (!name || !(typeof(minPrice) =="number" ) || !maxPrice || !location || !offerType) {
            return res.status(400).json({ message: 'Invalid watchlist parameters' })
        }

        const itemArray = await addNewWatchlist(userId, watchlistParams)
            
            return res.status(200).json({ itemArray: itemArray });
    } catch (err) {
        return res.status(400).json({ message: 'Error has occured', error: err })
    }
}
exports.getWatchlist = async (req, res) => {

    const watchlistId = req.params.watchlistId;

    try {
        const watchlistArray = await getWatchlist(watchlistId)
        res.status(200).json({ watchlistArray })
    } catch (error) {
        res.status(400).json({ message: 'failed to get watchlistArray!', error: error })
    }
}
exports.updateWatchlist = async (req, res) => {
    const { newParams } = req.body;

    const watchlistId = req.params.watchlistId;

    try {
        const watchlistArray = await updateWatchlistParams(watchlistId, newParams)
        res.status(200).json({ watchlistArray })
    } catch (error) {
        res.status(400).json({ message: 'failed to get watchlistArray!', error: error })
    }
}
exports.deleteWatchlist = async (req, res) => {

    const watchlistId = req.params.watchlistId;
    const userId = req.userData.id;

    try {
        const deletedWatchlist = await deleteWatchlist(watchlistId,userId );
        res.status(200).json({ deletedWatchlist })
    } catch (error) {
        res.status(400).json({ message: 'failed to delete watchlistArray!', error: error })
    }
}
exports.notificationWasSeen = async (req, res) => {

    const {watchlistId, notificationId } = req.params;

    try {
        const updatedNotification = await markNotificationSeen(watchlistId, notificationId);
        res.status(200).json({ updatedNotification })
    } catch (error) {
        res.status(400).json({ message: 'failed to update notification!', error: error })
    }
}