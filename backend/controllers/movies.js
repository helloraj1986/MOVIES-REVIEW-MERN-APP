import MovieModel from '../models/movieModel.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import express from 'express'
dotenv.config()

//coundinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})

///get all movies
export const getAllMovies = async (req, res) => {
	try {
		const movies = await MovieModel.find()
		res.status(200).json({
			data: movies,
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

//get a single movie
export const getOneMovie = async (req, res) => {
	const { id } = req.params
	try {
		const movie = await MovieModel.findById(id)
		res.status(200).json(movie)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

//create a movie
export const createMovie = async (req, res) => {
	const movie = req.body
	const file = req.files.poster
	let newMovie
	cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
		newMovie = new MovieModel({
			...movie,
			createdAt: new Date().toISOString(),
			poster: result?.secure_url,
			publicId: result?.public_id,
		})

		newMovie.save()
		res.status(201).json(newMovie)
	})
}

//update a movie
export const updateOneMovie = async (req, res) => {
	const movie = req.body

	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('No Post with that ID')
	let movieData
	//select the movie so that we can remove the old posterImg from the cloudinary
	const selectedMovie = await MovieModel.findById(req.params.id)
	// name "poster"is coming from the frontend
	const file = req.files.poster
	//delete operation from the cloudinary of the old image file for the movie
	await cloudinary.uploader.destroy(selectedMovie.publicId)
	const result = await cloudinary.v2.uploader.upload(file.tempFilePath)
	//finally movie data
	movieData = {
		...movie,
		poster: result.secure_url || selectedMovie.secure_url,
		publicId: result.public_id || selectedMovie.public_id,
	}
	//upload new movie data alaong with the image to cloudinary
	const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, movieData, { new: true })
	res.json(updatedMovie)
}

//delete a movie
export const deleteOneMovie = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that ID')
	//delete image from cloudinary
	const selectedMovie = await MovieModel.findById(id)
	await cloudinary.uploader.destroy(selectedMovie.publicId)
	//delete from database
	await MovieModel.findByIdAndRemove(id)
	res.json({ message: 'Movie Deleted Successfully' })
}

// get movies by category
export const getMovieBySearchQuery = async (req, res) => {
	const { searchTitle, searchTags } = req.query
	const queryOptions = {
		$or: [
			{ title: { $regex: searchTitle, $options: 'i' } },
			{ genre: { $regex: searchTags, $options: 'i' } },
		],
	}
	try {
		const movies = await MovieModel.find(queryOptions)
		res.status(200).json(movies)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}
