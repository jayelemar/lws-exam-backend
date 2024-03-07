// ****** PUBLIC CONTROLLER *******
// @desc import movies
// @route POST /api/movies/import
//@Access Public

import mongoose from 'mongoose';
import { animeData } from '../data/AnimeData.js';
import Animes from '../models/animeModel.js'
import asyncHandler from 'express-async-handler'

const importAnimes = asyncHandler(async ( req, res ) => {
  await Animes.deleteMany({})
  const animes = await Animes.insertMany(animeData)
  res.status(201).json(animes)
});

const getAnimes = asyncHandler(async ( req, res ) => {
  try {
    const { category, search } = req.query;
    let query = {
      ...(category && { category}),
      ...(search && {name: { regex: search, $options: "i"} }),
    }

    // load animes functionalities
    const page = Number(req.query.pageNumber) || 1;
    const limit = 3;  // 3 animes per page
    const skip = (page -1) * limit

    // find animes by query, skip and limit
    const animes = await Animes.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const count = await Animes.countDocuments(query)
    res.json({
      animes, 
      page, 
      pages: Math.ceil(count / limit),
      totalAnimes: count,
    })

    
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

const getAnimeById = asyncHandler(async ( req, res ) => {
  try {
    const id = req.params.id;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      res.status(400);
      throw new Error('Invalid ID format.');
    }

    const anime = await Animes.findById(id);

    if (anime) {
      res.json(anime);
    } else {
      res.status(404);
      throw new Error('No anime found.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const updateAnime = asyncHandler(async ( req, res ) => {
  try {
    const { name, desc, categories } = req.body
    const anime = await Animes.findById(req.params.id)
    if(anime) {
      anime.name = name || anime.name
      anime.desc = desc || anime.desc
      anime.categories = categories || anime.categories

      const updateAnime = await anime.save()
      res.status(201).json(updateAnime)

    } else {
      res.status(404)
      throw new Error("No anime found.")
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

const deleteAnime = asyncHandler(async (req, res) => {
  try {
    const result = await Animes.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount > 0) {
      res.json({ message: 'Anime is deleted' });
    } else {
      res.status(404);
      throw new Error('Anime not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create Anime
// @route POST /api/animes
// @access Private
const createAnime = asyncHandler(async ( req, res ) => {
  try {
    const { name, desc, categories } = req.body
    const anime = new Animes({
      name, desc, categories, userId: req.user._id
    })
    if(anime) {
      const createAnime = await anime.save();
      res.status(201).json(createAnime)
    } else {
      res.status(400)
      throw new Error("Invalid movie data")
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});





export {
  importAnimes, getAnimes, getAnimeById, updateAnime, deleteAnime, createAnime
}