const express= require('express')
const router= express.Router();

const { getNewToken } = require('../controllers/refresh-token');

router.get("/", getNewToken);

module.exports= router;