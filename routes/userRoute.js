import express from "express"
import { loginUser, logoutUser, registerUser, getUser, loginStatus, getLikedAnimes, addLikedAnime, deleteLikedMovies } from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router()

router
  .post("/register", registerUser )
  .post("/login", loginUser )
  .get("/logout", logoutUser )
  .get("/getuser",protect, getUser)
  .get("/loggedin", loginStatus)
router
  .post("/favorites", protect, addLikedAnime)
  .get("/favorites", protect, getLikedAnimes)
  .delete("/favorites", protect, deleteLikedMovies)

export default router;
