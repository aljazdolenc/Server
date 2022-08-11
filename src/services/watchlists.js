const { generateRandomId }= require('./shared-services');
const {UsersWatchlists, Watchlist, WatchlistParameters}= require('../models/watchlists');


exports.generateUsersWatchlist = async (userId)=>{
    const newUsersWatchlist = new UsersWatchlists({userId : userId, watchlistsArray: []});
    
    await newUsersWatchlist.save()
    .then(()=>{
        console.log("new usersWatchlist added successfully")
    })
    .catch((err)=>{
        console.log("Error at generating new usersWatchlist  Err:"+ err)
        throw "ERROR_DB";
    })
}

exports.addNewWatchlist = async (userId, searchParams) => {

    const newWatchlistId = generateRandomId();
    const searchParameters = new WatchlistParameters({
        name: searchParams.name,
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
        location: searchParams.location,
        offerType:searchParams.offerType,
    });

    
    const newWatchlist=new Watchlist({
        userId: userId,
        watchlistId: newWatchlistId,
        searchParams: searchParameters,
        notificationsArray: []
    })


    try{
     
        await UsersWatchlists.updateOne(
            {"userId": userId },
            {"$push": {"watchlistsArray":{"watchlistId" : newWatchlistId}}},
            {upsert: true}
            );

        await newWatchlist.save() 
       
    }catch(err){
        console.log('error while adding new watchlist err: '+ err);
        throw err;
    }
    
};

exports.getWatchlist = async(watchlistId) => {
    return await Watchlist.findOne({ 'watchlist.id' : watchlistId},{'_id':0,'itemsArray':1,'searchParams':1})
};

exports.deleteWatchlist = async (watchlistId, userId) => {
    try {
        await Watchlist.deleteOne({ watchlistId: watchlistId});
       
        await UsersWatchlists.findOneAndUpdate(
                { "userId": userId },
                {
                    "$pull": 
                { 'watchlistsArray': {"watchlistId" :watchlistId} } 
            }
            );
    
    } catch (error) {
        return error
    }
    
}

exports.getAllWatchlists = async (userId) =>{

   return UsersWatchlists.aggregate([
        {
            $match: { "userId": { $in: [userId] } } // Only allows lookup for specific users watchlists
        },
        {
            $lookup: {
                from: "watchlists",
                localField: 'userId',
                foreignField: 'userId',
                as: "watchlistsArray",
            }
        },
        {
            $unset: ["watchlistsArray._id", "userId","_id","__v"]
        }

    ])
}

exports.updateWatchlistParams = async (watchlistId, newParams)=>{

    const { name, minPrice, maxPrice, location, offerType} = newParams;

    const newWatchlistParameters =  new WatchlistParameters({
        name: name,
        minPrice: minPrice, 
        maxPrice: maxPrice,
        location: location, 
        offerType: offerType
    })

    return await Watchlist.findOneAndUpdate({ 'watchlist.id' : watchlistId},{ searchParams : newWatchlistParameters})
}

exports.markNotificationSeen = async (watchlistId, notificationId)=>{
    return await Watchlist.findOneAndUpdate(
        { "watchlistId": watchlistId, "notificationsArray.id" : notificationId}, 
        { seen: true }
    )

}

exports.deleteAllUsersWatchlists= async (userId) =>{
    try {
       await Watchlist.deleteMany({"userId": userId})
       console.log("Deleted Users Watchlists")
       await  UsersWatchlists.deleteOne({"userId": userId})
       console.log("Deleted Users Watchlists schema")
    } catch (error) {
        return error
    }
        
   
}