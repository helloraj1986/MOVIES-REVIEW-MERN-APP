import express from 'express'
import {
	createMovie,
	deleteOneMovie,
	getAllMovies,
	getMovieBySearchQuery,
	getOneMovie,
	updateOneMovie,
} from '../controllers/movies.js'

const router = express.Router()

router.get('/', getAllMovies)
router.get('/search', getMovieBySearchQuery)
router.get('/:id', getOneMovie)
router.post('/', createMovie)
router.patch('/:id', updateOneMovie)
router.delete('/:id', deleteOneMovie)

export default router
