import {express} from "express";
const router= express.Router();

router.get("/login", LoginUser);// Loggs user in
router.post("/signup", SignupUser);// Registers user in DB
router.delete("/delete-user", DeleteUser);// Deletes user
router.put("change-password", ChangePassword);// Changes users password

module.exports= router;