import React from 'react'
import './movieCard.css'
import { Delete, Edit } from '@mui/icons-material'
import axios from 'axios'
import { Link } from 'react-router-dom'

//
export default function MovieCard({ movie, setFormData, setEditActive, setGetEditId }) {
	const { _id, title, rating, ageLimit, year, poster, desc, review, genre } = movie
	//delete one card
	const handleDelete = async () => {
		await axios.delete(`http://localhost:5000/movies/${_id}`)
		window.location.reload(true)
	}
	//edit one card
	const handleEdit = () => {
		setFormData({
			title: title,
			desc: desc,
			year: year,
			poster: '',
			review: review,
			ageLimit: ageLimit,
			genre: genre.join(' , '),
			rating: rating,
		})
		setGetEditId(_id)
		setEditActive(true)
	}

	return (
		<div className='movieCard'>
			<Link to={`/movies/${_id}`}>
				<div className='top'>
					<div className='shadowOverImg'>
						<h3>MR Recommended</h3>
					</div>
					<img src={poster} alt='' className='movie-img' />
				</div>
			</Link>

			<div className='bottom'>
				<div className='left'>
					<h5 className='title'>{title}</h5>
					<span className='rating'>{rating} / 10</span>
					<button
						type='text'
						className='iconButton'
						style={{ color: 'red' }}
						onClick={handleDelete}
					>
						<Delete />
					</button>
				</div>
				<div className='right'>
					<span className='age'>{ageLimit}+</span>
					<span className='year'>{year}</span>
					<button type='text' className='iconButton' style={{ color: 'grey' }}>
						<Edit onClick={handleEdit} />
					</button>
				</div>
			</div>
		</div>
	)
}
