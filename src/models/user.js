const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const WatchlistGroup= require('./watchlists')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlistGroups:{ type:[WatchlistGroup], required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
