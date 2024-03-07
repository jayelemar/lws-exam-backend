import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { createAnime, deleteAnime, getAnimeById, getAnimes, importAnimes, updateAnime } from "../controllers/animeController.js";


const router = express.Router()

router
  .post("/import", importAnimes )
  .post("/",protect, createAnime )
  .get("/", getAnimes )
  .get("/:id", getAnimeById )
  .put("/:id",protect, updateAnime )
  .delete("/:id",protect, deleteAnime )


export default router;
