import React, { useEffect, useState } from 'react'
import './singleMovie.css'
import img from '../../images/avenger.jpg'
import axios from 'axios'

const SingleMovie = ({ id }) => {
	const [singleMovie, setSingleMovie] = useState('')
	const fetchSingleMovie = async (id) => {
		try {
			const res = await axios.get(`http://localhost:5000/movies/${id}`)
			setSingleMovie(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchSingleMovie(id)
	}, [])
	return (
		<div className='movie1'>
			<div className='left'>
				<img src={singleMovie.poster} alt='' />
				<img src={singleMovie.poster} alt='' className='imgFront' />
			</div>
			<div className='right'></div>
		</div>
	)
}

export default SingleMovie
