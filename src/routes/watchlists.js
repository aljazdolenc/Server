const express=require('express');
const router= express.Router();

router.get("/", GetAllWatchlists)// Returns whole watchlist
router.put("/new", AddWatchlist) // Adds new watchlist
router.get("/:watchlist", GetWatchlist)// Marks notification as read
router.put("/:watchlist/:id", UpdateWatchlist)// Marks notification as read
router.delete("/:watchlist/:id", DeleteWatchlist)// Marks notification as read
router.put("/:watchlist/:id", NotificationWasSeen)// Marks notification as read


module.exports= router;