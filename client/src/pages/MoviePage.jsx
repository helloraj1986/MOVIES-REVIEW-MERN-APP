import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import SingleMovie from '../components/singleMovie/SingleMovie'

import { useParams } from 'react-router-dom'

const MoviePage = () => {
	const { id } = useParams()

	return (
		<>
			<Navbar />
			<div style={{ marginTop: '60px' }}>
				<SingleMovie id={id} />
			</div>
		</>
	)
}

export default MoviePage
