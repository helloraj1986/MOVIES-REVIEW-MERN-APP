import React, { useEffect, useState } from 'react'
import MovieCard from '../movieCard/MovieCard'
import './feed.css'
import axios from 'axios'

export default function Feed({ formData, setFormData, setEditActive, setGetEditId }) {
	const [movieData, setMovieData] = useState('')
	const [loading, setLoading] = useState(true)
	const fetchData = async () => {
		try {
			setLoading(true)
			const res = await axios
				.get('http://localhost:5000/movies')
				.catch((err) => console.log('Error Fetching Movie data:', err))

			setMovieData(res.data.data)
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	console.log(movieData)
	return (
		<div className='feed'>
			<div className='feedWrapper'>
				{loading && <h1>loading...</h1>}
				{!loading &&
					movieData?.map((m) => {
						return (
							<MovieCard
								key={m._id}
								movie={m}
								setFormData={setFormData}
								setEditActive={setEditActive}
								setGetEditId={setGetEditId}
							/>
						)
					})}
			</div>
		</div>
	)
}
