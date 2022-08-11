const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Notification } = require("./notification");


//Schema for Watchlist parameters
const WatchlistParametersSchema = mongoose.Schema({
  name: { type: String, required: true},
  minPrice: { type: Number, require: true },
  maxPrice: { type: Number, require: true },
  location: { type: String, require: true },
  offerType: { type: String, required: true }
});

//Contains watchlist parameters and its notifications
const WatchlistSchema = mongoose.Schema({
  userId: { type: String, required: true },
  watchlistId: { type: String, required: true },
  searchParams: { type: WatchlistParametersSchema, required: true },
  notificationsArray: { type: [], default: [] },

})

//Contains IDs of all users watchlists
const UsersWatchlistsSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  watchlistsArray: { type: [], required: true, default: [] }
})

//Plugins
WatchlistSchema.plugin(uniqueValidator);
UsersWatchlistsSchema.plugin(uniqueValidator);

const UsersWatchlists = mongoose.model("UsersWatchlists", UsersWatchlistsSchema)
const Watchlist = mongoose.model("Watchlist", WatchlistSchema)
const WatchlistParameters = mongoose.model("WatchlistParameters", WatchlistParametersSchema)
module.exports = {UsersWatchlists, Watchlist, WatchlistParameters}

