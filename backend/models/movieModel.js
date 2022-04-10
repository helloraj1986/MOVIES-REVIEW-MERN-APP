import mongoose from 'mongoose'

const MovieSchema = mongoose.Schema({
	title: String,
	publicId: String,
	desc: String,
	year: String,
	poster: String,
	review: String,
	ageLimit: String,
	genre: Array,
	rating: String,

	createdAt: {
		type: Date,
		default: new Date(),
	},
})

const movieModel = mongoose.model('movieModel', MovieSchema)

export default movieModel
