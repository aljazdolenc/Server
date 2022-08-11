const express = require('express');
const router = express.Router();

const WatchlistControllers = require('../controllers/watchlists');
const checkAuth = require('../middleware/check-auth');
const { ObjectValidationMiddleware } = require('../middleware/validation');
const {watchlistParametersSchema}= require('../schemas/watchlist-params')

router.get("/", checkAuth, WatchlistControllers.getWatchlists)
router.put("/new", checkAuth, WatchlistControllers.addWatchlist)
router.get("/:watchlistId", checkAuth, WatchlistControllers.getWatchlist)
router.put("/:watchlistId",checkAuth,ObjectValidationMiddleware('req.body.newParams', watchlistParametersSchema ),WatchlistControllers.updateWatchlist);
router.delete("/:watchlistId", checkAuth, WatchlistControllers.deleteWatchlist);
router.put("/:watchlistId/:notificationId", checkAuth, WatchlistControllers.notificationWasSeen);
//! havent checked


module.exports = router;