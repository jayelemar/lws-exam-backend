import express from "express"
import { loginUser, logoutUser, registerUser, getUser, loginStatus } from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router()

router
  .post("/register", registerUser )
  .post("/login", loginUser )
router
  .get("/logout", logoutUser )
  .get("/getuser",protect, getUser)
  .get("/loggedin", loginStatus)

export default router;
