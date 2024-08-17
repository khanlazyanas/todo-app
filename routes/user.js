import express from "express"
import { getMyprofile, login, logout, registers, } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()


router.post("/new", registers) 
router.post("/login", login) 
router.get("/logout", logout) 

router.get("/me", isAuthenticated, getMyprofile)

// router.get("/userid/:id",getuserDetails)
// router.put("/userid/:id",updateUser)
// router.delete("/userid/:id",deleteUser)


export default router;