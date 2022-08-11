const express= require('express')
const router= express.Router();

const UserControllers= require('../controllers/user');
const checkAuth = require('../middleware/check-auth');



router.post("/login", UserControllers.LoginUser);
router.post("/signup", UserControllers.CreateUser);
router.delete("/delete", checkAuth,UserControllers.DeleteUser);
router.put("/change-password", checkAuth,UserControllers.ChangePassword);

module.exports= router;