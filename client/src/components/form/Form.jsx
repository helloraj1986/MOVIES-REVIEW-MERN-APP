import React, { useEffect, useState } from 'react'
import './form.css'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import axios from 'axios'

export default function Form({ formData, setFormData, editActive, getEditId, setEditActive }) {
	const handleSelectedFile = (e) => {
		setFormData({ ...formData, poster: e.target.files[0] })
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const formdata = new FormData()
		formdata.append('title', formData.title)
		formdata.append('desc', formData.desc)
		formdata.append('review', formData.review)
		formdata.append('year', formData.year)
		formdata.append('poster', formData.poster)
		formdata.append('ageLimit', formData.ageLimit)
		formdata.append('genre', formData.genre)
		formdata.append('rating', formData.rating)

		try {
			if (!editActive) {
				await axios.post('/movies/', formdata)
			}
			if (editActive) {
				await axios.patch(`/movies/${getEditId}`, formdata)
				setEditActive(false)
			}
			setFormData({
				title: '',
				desc: '',
				year: '',
				poster: '',
				review: '',
				ageLimit: '',
				genre: '',
				rating: '',
			})
			window.location.reload(true)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		console.log(formData)
	}, [formData])
	return (
		<div className='form'>
			<div className='formWrapper'>
				<form action='' className='formFields'>
					<div className='field'>
						<label required htmlFor='title'>
							Title
						</label>
						<input
							required
							type='text'
							name='title'
							value={formData.title}
							className='input'
							placeholder='Avenger EndGame'
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						/>
					</div>
					<div className='field'>
						<label htmlFor='desc'>Story</label>
						<textarea
							required
							type='text'
							name='desc'
							value={formData.desc}
							className='input'
							placeholder='A story about heroes who are going to save the world...'
							onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
						/>
					</div>
					<div className='field'>
						<label htmlFor='review'>Review</label>
						<textarea
							required
							type='text'
							name='review'
							value={formData.review}
							className='poster'
							placeholder='Amazing movie..I enjoyed a lot.A must watch'
							onChange={(e) => setFormData({ ...formData, review: e.target.value })}
						/>
					</div>
					<div className='field'>
						<label htmlFor='genre'>Genre</label>
						<input
							type='text'
							required
							name='genre'
							value={formData.genre}
							className='input'
							placeholder='Super Hero,Thriller'
							onChange={(e) =>
								setFormData({ ...formData, genre: e.target.value.split(',') })
							}
						/>
					</div>
					<div className='field'>
						<label htmlFor='year'>Year</label>
						<input
							required
							type='number'
							name='year'
							className='input'
							placeholder='2019'
							value={formData.year}
							onChange={(e) => setFormData({ ...formData, year: e.target.value })}
						/>
					</div>
					<div className='field'>
						<label htmlFor='ageLimit'>Age</label>
						<input
							required
							type='number'
							name='ageLimit'
							className='input'
							placeholder='18'
							value={formData.ageLimit}
							onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
						/>
					</div>
					<div className='field'>
						<label htmlFor='rating'>Rating</label>
						<input
							required
							type='number'
							name='rating'
							className='input'
							placeholder='8.1'
							value={formData.rating}
							onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
						/>
					</div>
					<div className='field' style={{ justifyContent: 'flex-start' }}>
						<label htmlFor='poster' className='labelForPoster'>
							<CameraAltOutlinedIcon className='iconPoster' />
							Select Poster
						</label>
						<input
							required
							type='file'
							name='file'
							id='poster'
							className='input'
							style={{ display: 'none' }}
							onChange={(e) => handleSelectedFile(e)}
							accept='image/x-png,image/gif,image/jpeg'
						/>
						{formData?.poster.name ? (
							<p className='selectedPosterTitle'>
								{formData.poster.name.substring(0, 15) + '...'}
							</p>
						) : (
							''
						)}
					</div>
					<button type='submit' className='review' onClick={handleSubmit}>
						{editActive ? 'Edit' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	)
}
