const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const notification = require(".notification")


//Contains watchlist parameters and its notifications
const WatchlistGroup = mongoose.Schema({
    searchParams: {type: WatchlistParameters, required: true},
    notificationsArray: {type:[notification], required:false}
})


//Schema for Watchlist parameters
const WatchlistParameters= mongoose.Schema({
  name: { type: String, required: true, unique: true },
  minPrice: {type:Number, require:true},
  maxPrice: {type:Number, require:true},
  location: {type:String, require:true},
  OfferType: {type: String, required: true}
});

WatchlistParameters.plugin(uniqueValidator);

module.exports = mongoose.model("WatchlistGroup", WatchlistGroup);